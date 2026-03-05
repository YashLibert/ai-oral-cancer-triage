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
# LIFESTYLE RISK ENGINE
# =========================
def calculate_lifestyle_risk(age, tobacco, alcohol, lesion_duration):

    score = 0.0

    if age >= 45:
        score += 0.15

    if tobacco.lower() == "yes":
        score += 0.25

    if alcohol.lower() == "yes":
        score += 0.15

    if lesion_duration >= 14:
        score += 0.20

    return min(score, 1.0)


# =========================
# ADVANCED SYMPTOM RISK
# =========================
def advanced_symptom_risk(pain, bleeding, swallowing, weight_loss, neck_swelling):

    score = 0.0

    if pain == "yes":
        score += 0.20

    if bleeding == "yes":
        score += 0.25

    if swallowing == "yes":
        score += 0.20

    if weight_loss == "yes":
        score += 0.15

    if neck_swelling == "yes":
        score += 0.20

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
# AI MEDICAL REPORT
# =========================
def generate_medical_report(patient_data, analysis_data, triage_level):

    report = f"""
AI ORAL CANCER TRIAGE REPORT
---------------------------------

Patient Information
Age: {patient_data['age']}
Tobacco Use: {patient_data['tobacco']}
Alcohol Use: {patient_data['alcohol']}
Lesion Duration: {patient_data['lesion_duration']} days

Image Analysis
Cancer Probability: {analysis_data['cancer_probability']}%

Risk Assessment
Lifestyle Risk Score: {analysis_data['lifestyle_risk']}%
Symptom Risk Score: {analysis_data['symptom_risk']}%
Final Risk Score: {analysis_data['final_risk']}%

Clinical Symptoms
Pain: {patient_data['pain']}
Bleeding: {patient_data['bleeding']}
Difficulty Swallowing: {patient_data['swallowing']}
Weight Loss: {patient_data['weight_loss']}
Neck Swelling: {patient_data['neck_swelling']}

TRIAGE DECISION
{triage_level}

Recommendation:
Immediate consultation with oral oncology specialist.
Further clinical examination and biopsy recommended.
"""

    return report


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

        # -------------------------
        # Patient Metadata
        # -------------------------
        age = int(request.form.get("age", 0))
        tobacco = request.form.get("tobacco", "no")
        alcohol = request.form.get("alcohol", "no")
        lesion_duration = int(request.form.get("lesion_duration", 0))

        # -------------------------
        # Advanced Symptoms
        # -------------------------
        pain = request.form.get("pain", "no")
        bleeding = request.form.get("bleeding", "no")
        swallowing = request.form.get("swallowing", "no")
        weight_loss = request.form.get("weight_loss", "no")
        neck_swelling = request.form.get("neck_swelling", "no")

        # -------------------------
        # Image Processing
        # -------------------------
        image = Image.open(file)
        processed = preprocess_image(image)

        raw_prediction = float(model.predict(processed, verbose=0)[0][0])

        # Model Output
        # 0 = Cancer
        # 1 = Normal

        cancer_probability = 1 - raw_prediction
        normal_probability = raw_prediction

        # -------------------------
        # Risk Engines
        # -------------------------
        lifestyle_risk = calculate_lifestyle_risk(age, tobacco, alcohol, lesion_duration)

        symptom_risk = advanced_symptom_risk(
            pain,
            bleeding,
            swallowing,
            weight_loss,
            neck_swelling
        )

        # -------------------------
        # FINAL RISK FUSION
        # -------------------------
        final_risk_score = (
            0.6 * cancer_probability +
            0.25 * lifestyle_risk +
            0.15 * symptom_risk
        )

        # -------------------------
        # TRIAGE DECISION
        # -------------------------
        triage_level, recommendation = generate_triage(final_risk_score)

        # -------------------------
        # AI MEDICAL REPORT
        # -------------------------
        medical_report = None

        if triage_level == "URGENT REFERRAL":

            patient_data = {
                "age": age,
                "tobacco": tobacco,
                "alcohol": alcohol,
                "lesion_duration": lesion_duration,
                "pain": pain,
                "bleeding": bleeding,
                "swallowing": swallowing,
                "weight_loss": weight_loss,
                "neck_swelling": neck_swelling
            }

            analysis_data = {
                "cancer_probability": round(cancer_probability * 100, 2),
                "lifestyle_risk": round(lifestyle_risk * 100, 2),
                "symptom_risk": round(symptom_risk * 100, 2),
                "final_risk": round(final_risk_score * 100, 2)
            }

            medical_report = generate_medical_report(
                patient_data,
                analysis_data,
                triage_level
            )

        # -------------------------
        # RESPONSE
        # -------------------------
        return jsonify({

            "status": "success",

            "image_analysis": {
                "cancer_probability": round(cancer_probability * 100, 2),
                "normal_probability": round(normal_probability * 100, 2)
            },

            "lifestyle_risk_score": round(lifestyle_risk * 100, 2),

            "symptom_risk_score": round(symptom_risk * 100, 2),

            "final_risk_score": round(final_risk_score * 100, 2),

            "triage_level": triage_level,

            "recommendation": recommendation,

            "ai_medical_report": medical_report
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(debug=True)