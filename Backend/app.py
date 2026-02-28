from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS
import os
from tensorflow.keras.applications.efficientnet import preprocess_input

app = Flask(__name__)
CORS(app)

# =========================
# CONFIG
# =========================
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "best_oral_model.keras")
IMAGE_SIZE = (224, 224)

# =========================
# LOAD MODEL
# =========================
print("🔄 Loading model...")
model = tf.keras.models.load_model(MODEL_PATH, compile=False)
print("✅ Model loaded successfully!")

# =========================
# IMAGE PREPROCESSING
# =========================
def preprocess_image(image):
    image = image.convert("RGB")
    image = image.resize(IMAGE_SIZE)
    image = np.array(image, dtype=np.float32)
    image = preprocess_input(image)
    image = np.expand_dims(image, axis=0)
    return image


# =========================
# LIFESTYLE RISK SCORING
# =========================
def calculate_lifestyle_risk(age, tobacco, alcohol, lesion_duration):
    score = 0.0

    if age >= 45:
        score += 0.2

    if tobacco.lower() == "yes":
        score += 0.3

    if alcohol.lower() == "yes":
        score += 0.2

    if lesion_duration >= 14:
        score += 0.3

    return min(score, 1.0)


# =========================
# TRIAGE SYSTEM
# =========================
def generate_triage(final_risk_score):
    if final_risk_score >= 0.75:
        return "URGENT REFERRAL", "Immediate specialist consultation required"
    elif final_risk_score >= 0.50:
        return "HIGH RISK", "Schedule specialist review in next medical camp"
    elif final_risk_score >= 0.30:
        return "MODERATE RISK", "Follow-up screening in 30 days"
    else:
        return "LOW RISK", "Routine yearly screening recommended"


# =========================
# ROUTES
# =========================
@app.route("/")
def home():
    return jsonify({
        "message": "AI-Powered Oral Cancer Triage API Running",
        "status": "success"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"status": "error", "message": "No image file provided"}), 400

        file = request.files["image"]

        if file.filename == "":
            return jsonify({"status": "error", "message": "Empty filename"}), 400

        # ---- Patient Metadata ----
        age = int(request.form.get("age", 0))
        tobacco = request.form.get("tobacco", "no")
        alcohol = request.form.get("alcohol", "no")
        lesion_duration = int(request.form.get("lesion_duration", 0))

        # ---- Image Processing ----
        image = Image.open(file)
        processed = preprocess_image(image)

        raw_prediction = float(model.predict(processed, verbose=0)[0][0])

        # Model Output:
        # 0 = Cancer
        # 1 = Normal

        cancer_probability = 1 - raw_prediction
        normal_probability = raw_prediction

        # ---- Lifestyle Risk ----
        lifestyle_risk = calculate_lifestyle_risk(age, tobacco, alcohol, lesion_duration)

        # ---- Final Risk Fusion ----
        final_risk_score = (0.7 * cancer_probability) + (0.3 * lifestyle_risk)

        # ---- Triage Decision ----
        triage_level, recommendation = generate_triage(final_risk_score)

        return jsonify({
            "status": "success",
            "image_analysis": {
                "cancer_probability": round(cancer_probability * 100, 2),
                "normal_probability": round(normal_probability * 100, 2)
            },
            "lifestyle_risk_score": round(lifestyle_risk * 100, 2),
            "final_risk_score": round(final_risk_score * 100, 2),
            "triage_level": triage_level,
            "recommendation": recommendation
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)