import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── STYLES ────────────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #07080f;
    --surface:   #0e1120;
    --surface2:  #141829;
    --border:    #1e2440;
    --borderHi:  #2e3660;
    --cyan:      #00e5ff;
    --cyan2:     #80f3ff;
    --violet:    #a855f7;
    --violet2:   #d8b4fe;
    --rose:      #f43f5e;
    --rose2:     #fda4af;
    --amber:     #f59e0b;
    --amber2:    #fcd34d;
    --emerald:   #10b981;
    --emerald2:  #6ee7b7;
    --text:      #eef2ff;
    --text2:     #94a3b8;
    --text3:     #475569;
    --card:      #0b0d1a;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 10% 0%, rgba(168,85,247,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%, rgba(0,229,255,0.07) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 50% 50%, rgba(244,63,94,0.04) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .app {
    display: grid;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  .sidebar {
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 28px 18px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar::after {
    content: '';
    position: absolute;
    top: -80px; left: -80px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    padding-bottom: 22px;
    border-bottom: 1px solid var(--border);
  }

  .logo-mark {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, var(--violet), var(--cyan));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 19px; flex-shrink: 0;
    box-shadow: 0 0 20px rgba(168,85,247,0.35);
  }

  .logo-text {
    font-family: 'Space Mono', monospace;
    font-size: 17px; font-weight: 700;
    background: linear-gradient(90deg, var(--violet2), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px; line-height: 1;
  }

  .logo-sub {
    font-family: 'Space Mono', monospace;
    font-size: 9px; color: var(--text3);
    letter-spacing: 2px; text-transform: uppercase; margin-top: 3px;
  }

  .back-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 12px; border-radius: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    color: var(--text3); font-size: 12px;
    font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all 0.2s;
    margin-bottom: 12px;
  }
  .back-btn:hover { color: var(--text2); border-color: var(--borderHi); background: rgba(255,255,255,0.05); }

  .nav-group { margin-top: 12px; }
  .nav-group-label {
    font-size: 9px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--text3); padding: 0 10px 8px;
  }

  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 10px;
    cursor: pointer; transition: all 0.18s;
    font-size: 13.5px; font-weight: 500;
    color: var(--text3); border: 1px solid transparent;
    position: relative;
  }

  .nav-item:hover { color: var(--text2); background: var(--surface2); }
  .nav-item.active {
    background: rgba(168,85,247,0.1);
    border-color: rgba(168,85,247,0.22);
    color: var(--violet2);
  }
  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0; top: 25%; bottom: 25%;
    width: 3px;
    background: linear-gradient(180deg, var(--violet), var(--cyan));
    border-radius: 0 2px 2px 0;
  }

  .nav-icon { font-size: 16px; width: 18px; text-align: center; }

  .sidebar-footer {
    margin-top: auto; padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .online-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px;
    background: rgba(16,185,129,0.07);
    border: 1px solid rgba(16,185,129,0.18);
    border-radius: 10px; font-size: 12px;
    color: var(--emerald2);
  }

  .pulse-dot {
    width: 7px; height: 7px;
    background: var(--emerald);
    border-radius: 50%;
    animation: ripple 2s infinite;
  }

  @keyframes ripple {
    0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
    70%  { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
    100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
  }

  .main { display: flex; flex-direction: column; overflow-y: auto; }

  .topbar {
    padding: 20px 30px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(14,17,32,0.85);
    backdrop-filter: blur(16px);
    position: sticky; top: 0; z-index: 20;
  }

  .page-title { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: var(--text); letter-spacing: -0.5px; }
  .page-sub { font-size: 12px; color: var(--text3); margin-top: 2px; }

  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: 20px;
    font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  }

  .chip-cyan    { background: rgba(0,229,255,0.08);  color: var(--cyan);    border: 1px solid rgba(0,229,255,0.18); }
  .chip-violet  { background: rgba(168,85,247,0.08); color: var(--violet2); border: 1px solid rgba(168,85,247,0.2); }
  .chip-rose    { background: rgba(244,63,94,0.08);  color: var(--rose2);   border: 1px solid rgba(244,63,94,0.2); }
  .chip-amber   { background: rgba(245,158,11,0.08); color: var(--amber2);  border: 1px solid rgba(245,158,11,0.2); }
  .chip-emerald { background: rgba(16,185,129,0.08); color: var(--emerald2);border: 1px solid rgba(16,185,129,0.2); }

  .topbar-chips { display: flex; gap: 8px; }

  .content { padding: 26px 30px; display: flex; flex-direction: column; gap: 22px; flex: 1; }

  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }

  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 20px;
    position: relative; overflow: hidden; cursor: default;
  }

  .stat-card::after {
    content: '';
    position: absolute; bottom: -20px; right: -20px;
    width: 90px; height: 90px; border-radius: 50%;
    opacity: 0.06; pointer-events: none; transition: opacity 0.3s;
  }
  .stat-card:hover::after { opacity: 0.12; }
  .stat-card.cyan-card::after   { background: var(--cyan);   box-shadow: 0 0 50px 25px var(--cyan); }
  .stat-card.violet-card::after { background: var(--violet); box-shadow: 0 0 50px 25px var(--violet); }
  .stat-card.rose-card::after   { background: var(--rose);   box-shadow: 0 0 50px 25px var(--rose); }
  .stat-card.amber-card::after  { background: var(--amber);  box-shadow: 0 0 50px 25px var(--amber); }

  .stat-icon-wrap { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 14px; }
  .stat-value { font-family: 'Space Mono', monospace; font-size: 26px; font-weight: 700; letter-spacing: -1px; line-height: 1; }
  .stat-label { font-size: 12px; color: var(--text3); margin-top: 4px; }
  .stat-delta { display: inline-flex; align-items: center; gap: 4px; margin-top: 10px; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; }

  .main-grid { display: grid; grid-template-columns: 1fr 370px; gap: 18px; flex: 1; }

  .upload-section { display: flex; flex-direction: column; gap: 14px; }

  .section-head {
    display: flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--text3);
  }
  .section-head::before { content: ''; width: 3px; height: 14px; border-radius: 2px; background: linear-gradient(180deg, var(--violet), var(--cyan)); }
  .section-head::after  { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, var(--border), transparent); }

  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 22px; display: flex; flex-direction: column; gap: 18px; }

  .patient-form { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text3); }

  .form-input, .form-select {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 10px; padding: 10px 13px;
    font-size: 13px; font-family: 'Outfit', sans-serif;
    color: var(--text); transition: border-color 0.2s, box-shadow 0.2s;
    outline: none; width: 100%;
  }
  .form-input:focus  { border-color: var(--violet); box-shadow: 0 0 0 3px rgba(168,85,247,0.12); }
  .form-select:focus { border-color: var(--cyan);   box-shadow: 0 0 0 3px rgba(0,229,255,0.1); }
  .form-select option { background: var(--surface); }

  .divider { height: 1px; background: var(--border); }

  .drop-zone {
    border: 2px dashed var(--border); border-radius: 14px;
    padding: 32px 20px; text-align: center; cursor: pointer;
    transition: all 0.25s; background: var(--card);
    position: relative; overflow: hidden;
  }
  .drop-zone:hover       { border-color: var(--violet); background: rgba(168,85,247,0.04); box-shadow: 0 0 30px rgba(168,85,247,0.06); }
  .drop-zone.dragging    { border-color: var(--cyan); background: rgba(0,229,255,0.04); box-shadow: 0 0 40px rgba(0,229,255,0.1); }

  .drop-icon  { font-size: 38px; margin-bottom: 10px; }
  .drop-title { font-size: 16px; font-weight: 700; color: var(--text); letter-spacing: -0.3px; }
  .drop-sub   { font-size: 12px; color: var(--text3); margin-top: 5px; }

  .btn-upload {
    display: inline-flex; align-items: center; gap: 7px;
    margin-top: 14px; padding: 9px 20px;
    background: linear-gradient(135deg, var(--violet), #7c3aed);
    color: #fff; border: none; border-radius: 10px;
    font-size: 13px; font-weight: 600; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 20px rgba(168,85,247,0.3);
  }
  .btn-upload:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(168,85,247,0.4); }

  .btn-analyze {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 24px;
    background: linear-gradient(135deg, var(--cyan), #0070f3);
    color: #000; border: none; border-radius: 12px;
    font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 24px rgba(0,229,255,0.25);
  }
  .btn-analyze:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,229,255,0.35); }
  .btn-analyze:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  input[type="file"] { display: none; }

  .preview-area { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start; }

  .preview-img-wrap { position: relative; border-radius: 14px; overflow: hidden; background: var(--card); aspect-ratio: 1; border: 1px solid var(--border); }
  .preview-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }

  .scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--cyan), transparent); animation: scanAnim 2s ease-in-out infinite; box-shadow: 0 0 12px var(--cyan); }
  @keyframes scanAnim { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

  .corner { position: absolute; width: 16px; height: 16px; border-style: solid; border-color: var(--cyan); }
  .corner.tl { top: 8px; left: 8px;   border-width: 2px 0 0 2px; border-radius: 2px 0 0 0; }
  .corner.tr { top: 8px; right: 8px;  border-width: 2px 2px 0 0; border-radius: 0 2px 0 0; }
  .corner.bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; border-radius: 0 0 0 2px; }
  .corner.br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; border-radius: 0 0 2px 0; }

  .result-panel { display: flex; flex-direction: column; gap: 11px; }

  .result-box { border-radius: 14px; padding: 18px; border: 1px solid var(--border); background: var(--card); transition: all 0.5s; }
  .result-box.positive { border-color: rgba(244,63,94,0.4); background: rgba(244,63,94,0.04); box-shadow: 0 0 30px rgba(244,63,94,0.06); }
  .result-box.negative { border-color: rgba(16,185,129,0.4); background: rgba(16,185,129,0.04); box-shadow: 0 0 30px rgba(16,185,129,0.06); }

  .result-micro { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text3); margin-bottom: 8px; }

  .triage-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; }
  .triage-URGENT   { background: rgba(244,63,94,0.12);  color: var(--rose2);   border: 1px solid rgba(244,63,94,0.3); }
  .triage-HIGH     { background: rgba(245,158,11,0.12); color: var(--amber2);  border: 1px solid rgba(245,158,11,0.28); }
  .triage-MODERATE { background: rgba(168,85,247,0.12); color: var(--violet2); border: 1px solid rgba(168,85,247,0.25); }
  .triage-LOW      { background: rgba(16,185,129,0.1);  color: var(--emerald2);border: 1px solid rgba(16,185,129,0.22); }

  .rec-note { margin-top: 9px; padding: 9px 11px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 12px; color: var(--text2); line-height: 1.55; border: 1px solid var(--border); }

  .bar-wrap { margin-top: 12px; }
  .bar-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--text3); margin-bottom: 5px; }
  .bar-track { height: 7px; background: var(--border); border-radius: 4px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; }
  .bar-fill.rose    { background: linear-gradient(90deg, var(--rose), var(--rose2)); }
  .bar-fill.emerald { background: linear-gradient(90deg, var(--emerald), var(--emerald2)); }
  .bar-fill.amber   { background: linear-gradient(90deg, var(--amber), var(--amber2)); }
  .bar-fill.violet  { background: linear-gradient(90deg, var(--violet), var(--violet2)); }
  .bar-fill.cyan    { background: linear-gradient(90deg, var(--cyan), var(--cyan2)); }

  .split-bar { height: 10px; background: var(--border); border-radius: 5px; overflow: hidden; display: flex; }
  .split-cancer { height: 100%; background: linear-gradient(90deg, var(--rose), var(--rose2)); }
  .split-normal { height: 100%; background: linear-gradient(90deg, var(--emerald), var(--emerald2)); }

  .info-grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .info-mini { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; transition: border-color 0.2s; }
  .info-mini:hover { border-color: var(--borderHi); }
  .info-mini-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); font-weight: 600; }
  .info-mini-val   { font-size: 14px; font-weight: 600; color: var(--text); margin-top: 3px; }

  .right-panel { display: flex; flex-direction: column; gap: 14px; }
  .panel-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 18px; position: relative; overflow: hidden; }
  .panel-title { font-size: 12px; font-weight: 700; letter-spacing: 0.3px; color: var(--text2); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; }

  .gauge-svg { width: 100%; max-width: 200px; display: block; margin: 0 auto; }

  .score-row { display: flex; align-items: center; gap: 10px; margin-bottom: 11px; }
  .score-row:last-child { margin-bottom: 0; }
  .score-lbl { font-size: 12px; color: var(--text2); width: 105px; flex-shrink: 0; }
  .score-bar-track { flex: 1; height: 7px; background: var(--border); border-radius: 4px; overflow: hidden; }
  .score-bar-fill  { height: 100%; border-radius: 4px; }
  .score-val { font-family: 'Space Mono', monospace; font-size: 12px; font-weight: 700; width: 38px; text-align: right; flex-shrink: 0; }

  .camp-row { margin-bottom: 12px; }
  .camp-row:last-child { margin-bottom: 0; }
  .camp-row-top { display: flex; justify-content: space-between; font-size: 12px; color: var(--text2); margin-bottom: 5px; }
  .camp-row-count { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text); }

  .scan-list { display: flex; flex-direction: column; gap: 7px; }
  .scan-item { display: flex; align-items: center; gap: 10px; padding: 9px 11px; background: var(--card); border: 1px solid var(--border); border-radius: 10px; transition: border-color 0.18s; }
  .scan-item:hover { border-color: var(--borderHi); }
  .scan-thumb { width: 34px; height: 34px; border-radius: 8px; background: var(--border); overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 15px; }
  .scan-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .scan-info { flex: 1; min-width: 0; }
  .scan-name { font-size: 12px; font-weight: 600; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .scan-meta { font-size: 11px; color: var(--text3); margin-top: 1px; }
  .scan-pill { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; letter-spacing: 0.5px; flex-shrink: 0; }
  .scan-pill.pos { background: rgba(244,63,94,0.1);  color: var(--rose2);   border: 1px solid rgba(244,63,94,0.2); }
  .scan-pill.neg { background: rgba(16,185,129,0.08); color: var(--emerald2); border: 1px solid rgba(16,185,129,0.18); }

  .spinner { width: 32px; height: 32px; border: 2px solid var(--border); border-top-color: var(--cyan); border-right-color: var(--violet); border-radius: 50%; animation: spinIt 0.7s linear infinite; }
  @keyframes spinIt { to { transform: rotate(360deg); } }

  .rec-item { display: flex; gap: 10px; padding: 11px 13px; background: var(--card); border: 1px solid var(--border); border-radius: 10px; font-size: 12px; line-height: 1.55; color: var(--text2); align-items: flex-start; }
  .rec-icon { flex-shrink: 0; font-size: 14px; margin-top: 1px; }

  .error-box { background: rgba(244,63,94,0.06); border: 1px solid rgba(244,63,94,0.22); border-radius: 10px; padding: 13px 15px; font-size: 13px; color: var(--rose2); display: flex; align-items: center; gap: 8px; }

  .empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 36px 20px; color: var(--text3); text-align: center; }
  .empty-icon { font-size: 30px; opacity: 0.4; }
  .empty-text { font-size: 13px; line-height: 1.5; }

  .btn-advanced-diag {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 10px;
    padding: 11px 16px;
    background: linear-gradient(135deg, rgba(244,63,94,0.15), rgba(245,158,11,0.12));
    border: 1px solid rgba(244,63,94,0.45);
    border-radius: 11px;
    font-size: 12.5px;
    font-weight: 700;
    font-family: 'Outfit', sans-serif;
    color: var(--rose2);
    cursor: pointer;
    letter-spacing: 0.3px;
    transition: all 0.22s;
    position: relative;
    overflow: hidden;
  }

  .btn-advanced-diag::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(244,63,94,0.08), transparent);
    opacity: 0;
    transition: opacity 0.22s;
  }

  .btn-advanced-diag:hover {
    border-color: rgba(244,63,94,0.7);
    box-shadow: 0 0 24px rgba(244,63,94,0.2), 0 4px 16px rgba(244,63,94,0.12);
    transform: translateY(-1px);
    color: #fff;
  }

  .btn-advanced-diag:hover::before { opacity: 1; }
  .btn-advanced-diag:active { transform: scale(0.98); }

  .btn-advanced-diag-pulse {
    width: 7px; height: 7px;
    background: var(--rose);
    border-radius: 50%;
    animation: ripple 1.5s infinite;
    flex-shrink: 0;
  }


  /* ── Advanced Diagnosis Modal & Report ── */
  .adv-backdrop { position:fixed; inset:0; background:rgba(7,8,15,0.88); backdrop-filter:blur(10px); z-index:200; }
  .adv-modal { position:fixed; top:0; left:0; right:0; bottom:0; margin:auto; z-index:201; width:min(720px,95vw); height:fit-content; max-height:92vh; overflow-y:auto; background:var(--surface); border:1px solid rgba(244,63,94,0.28); border-radius:22px; box-shadow:0 0 80px rgba(244,63,94,0.10),0 32px 80px rgba(0,0,0,0.65); }
  .adv-header { padding:20px 26px 16px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; background:var(--surface); border-radius:22px 22px 0 0; z-index:2; }
  .adv-body { padding:24px 26px; display:flex; flex-direction:column; gap:20px; }
  .adv-close { width:30px; height:30px; border-radius:8px; background:rgba(255,255,255,0.04); border:1px solid var(--border); color:var(--text3); font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.18s; font-family:inherit; }
  .adv-close:hover { color:var(--text); background:rgba(255,255,255,0.08); }

  .sym-row { display:flex; align-items:center; justify-content:space-between; padding:13px 16px; background:var(--card); border:1px solid var(--border); border-radius:12px; gap:16px; transition:border-color 0.18s; }
  .sym-row:hover { border-color:var(--borderHi); }
  .sym-label { font-size:13px; font-weight:600; color:var(--text2); }
  .sym-sub { font-size:11px; color:var(--text3); margin-top:2px; }
  .sym-opts { display:flex; gap:7px; flex-shrink:0; }
  .sym-btn { padding:5px 16px; border-radius:20px; font-size:12px; font-weight:600; font-family:'Outfit',sans-serif; cursor:pointer; border:1px solid var(--border); background:transparent; color:var(--text3); transition:all 0.18s; white-space:nowrap; }
  .sym-btn:hover { border-color:var(--borderHi); color:var(--text2); }
  .sym-btn.s-none   { background:rgba(16,185,129,0.10); border-color:rgba(16,185,129,0.30); color:var(--emerald2); }
  .sym-btn.s-mild   { background:rgba(245,158,11,0.10); border-color:rgba(245,158,11,0.35); color:var(--amber2); }
  .sym-btn.s-severe { background:rgba(244,63,94,0.12);  border-color:rgba(244,63,94,0.40);  color:var(--rose2); }
  .sym-btn.s-yes    { background:rgba(244,63,94,0.12);  border-color:rgba(244,63,94,0.40);  color:var(--rose2); }
  .sym-btn.s-no     { background:rgba(16,185,129,0.10); border-color:rgba(16,185,129,0.30); color:var(--emerald2); }

  .btn-gen  { display:flex; align-items:center; justify-content:center; gap:8px; padding:13px 20px; background:linear-gradient(135deg,#f43f5e,#f59e0b); border:none; border-radius:12px; font-size:14px; font-weight:700; color:#000; font-family:'Outfit',sans-serif; cursor:pointer; box-shadow:0 4px 24px rgba(244,63,94,0.30); transition:all 0.2s; }
  .btn-gen:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(244,63,94,0.45); }
  .btn-dl   { display:flex; align-items:center; justify-content:center; gap:9px; padding:14px 20px; background:linear-gradient(135deg,#a855f7,#7c3aed); border:none; border-radius:12px; font-size:14px; font-weight:700; color:#fff; font-family:'Outfit',sans-serif; cursor:pointer; box-shadow:0 4px 24px rgba(168,85,247,0.35); transition:all 0.2s; }
  .btn-dl:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(168,85,247,0.50); }
  .btn-back-q { background:transparent; border:1px solid var(--border); border-radius:10px; padding:10px; font-size:12px; color:var(--text3); cursor:pointer; font-family:'Outfit',sans-serif; transition:color 0.18s,border-color 0.18s; }
  .btn-back-q:hover { color:var(--text2); border-color:var(--borderHi); }

  .rpt-sec { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--text3); margin-bottom:11px; display:flex; align-items:center; gap:8px; }
  .rpt-g2 { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
  .rpt-g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:9px; }
  .rpt-f { padding:11px 14px; background:var(--card); border:1px solid var(--border); border-radius:10px; }
  .rpt-f.w { background:rgba(244,63,94,0.05); border-color:rgba(244,63,94,0.22); }
  .rpt-fl { font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--text3); font-weight:600; }
  .rpt-fv { font-size:13px; font-weight:600; color:var(--text); margin-top:3px; }
  .rpt-fv.w { color:var(--rose2); }
  .rpt-fv.ok { color:var(--emerald2); }
  .rpt-risk-banner { padding:16px 20px; background:rgba(244,63,94,0.07); border:1px solid rgba(244,63,94,0.25); border-radius:14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; }

  @media(max-width:640px) { .rpt-g3 { grid-template-columns:1fr 1fr; } .sym-opts { flex-wrap:wrap; } }
  @media (max-width: 1100px) {
    .app { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .main-grid { grid-template-columns: 1fr; }
    .patient-form { grid-template-columns: 1fr; }
  }
`;

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const TRIAGE_CLASS = {
  "URGENT REFERRAL": "triage-URGENT",
  "HIGH RISK":       "triage-HIGH",
  "MODERATE RISK":   "triage-MODERATE",
  "LOW RISK":        "triage-LOW",
};

const TRIAGE_ICON = {
  "URGENT REFERRAL": "🚨",
  "HIGH RISK":       "⚠️",
  "MODERATE RISK":   "🟣",
  "LOW RISK":        "✅",
};

const RECS = {
  positive: [
    { icon: "🚨", text: "Immediate specialist referral required. Flag for priority oncology consultation." },
    { icon: "📋", text: "Document lesion findings and schedule follow-up biopsy within 7 days." },
    { icon: "📞", text: "Notify patient, provide counseling support and referral letter." },
  ],
  negative: [
    { icon: "✅", text: "No malignant lesions detected. Routine follow-up screening in 12 months." },
    { icon: "💡", text: "Counsel patient on tobacco, areca nut & alcohol cessation to reduce risk." },
    { icon: "📊", text: "Archive scan for longitudinal tracking and camp analytics." },
  ],
};

const MOCK_HISTORY = [
  { id: 1, name: "Patient_001.jpg", time: "2 min ago",  result: "negative", triage: "LOW RISK",        finalRisk: 18 },
  { id: 2, name: "Patient_002.jpg", time: "15 min ago", result: "positive", triage: "URGENT REFERRAL",  finalRisk: 82 },
  { id: 3, name: "Patient_003.jpg", time: "1 hr ago",   result: "negative", triage: "MODERATE RISK",    finalRisk: 35 },
  { id: 4, name: "Patient_004.jpg", time: "2 hr ago",   result: "negative", triage: "LOW RISK",         finalRisk: 12 },
];

/* ─── ANIMATION VARIANTS ────────────────────────────────────────────────────── */
const fadeUp  = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } } };
const slideR  = { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

/* ─── GAUGE SVG ─────────────────────────────────────────────────────────────── */
function Gauge({ score, triage }) {
  const ARC    = 188;
  const filled = (score / 100) * ARC;
  const color  =
    triage === "URGENT REFERRAL" ? "#f43f5e" :
    triage === "HIGH RISK"       ? "#f59e0b" :
    triage === "MODERATE RISK"   ? "#a855f7" :
    score > 0                    ? "#10b981" : "#1e2440";

  return (
    <svg className="gauge-svg" viewBox="0 0 120 80">
      <defs>
        <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#10b981" />
          <stop offset="45%"  stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <filter id="arcGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M10 72 A52 52 0 0 1 110 72" fill="none" stroke="#1e2440" strokeWidth="9" strokeLinecap="round"/>
      <path d="M10 72 A52 52 0 0 1 110 72" fill="none" stroke="url(#gGrad)" strokeWidth="9" strokeLinecap="round" opacity="0.12"/>
      <path
        d="M10 72 A52 52 0 0 1 110 72"
        fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
        strokeDasharray={`${filled} ${ARC}`}
        filter="url(#arcGlow)"
        style={{ transition: "stroke-dasharray 1.4s cubic-bezier(0.34,1.56,0.64,1), stroke 0.6s ease" }}
      />
      <text x="60" y="67" textAnchor="middle" fill="#eef2ff" fontSize="22" fontFamily="Space Mono,monospace" fontWeight="700">
        {score > 0 ? `${Math.round(score)}` : "--"}
      </text>
      {score > 0 && (
        <text x="60" y="76" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Outfit,sans-serif">
          RISK SCORE
        </text>
      )}
    </svg>
  );
}


/* ─── PDF DOWNLOAD (jsPDF – true .pdf, dark clinical aesthetic) ─────────────── */
async function downloadMedicalReport({ age, tobacco, alcohol, lesionDuration,
  cancerProb, normalProb, lifestyleRisk, finalRisk, triageLevel, recommendation,
  scanTime, fileName, pain, bleeding, swallowing, weightLoss, neckSwelling }) {

  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, H = 297, M = 16, CW = W - M * 2;
  let y = 0;

  // ── Palette ──
  const rose      = [244, 63,  94];
  const roseDeep  = [180, 30,  55];
  const roseDim   = [80,  20,  32];
  const roseText  = [253, 164, 175];
  const amber     = [245, 158, 11];
  const amberText = [252, 211, 77];
  const emerald   = [16,  185, 129];
  const emeraldT  = [110, 231, 183];
  const violet    = [168, 85,  247];
  const violetT   = [216, 180, 254];
  const cyan      = [0,   229, 255];
  const cyanT     = [128, 243, 255];
  const bg        = [7,   8,   15];
  const surface   = [14,  17,  32];
  const surface2  = [20,  25,  48];
  const border    = [30,  36,  64];
  const borderHi  = [46,  54,  96];
  const white     = [238, 242, 255];
  const gray      = [148, 163, 184];
  const gray2     = [71,  85,  105];
  const gray3     = [40,  48,  70];

  const sf  = (c) => doc.setFillColor(...c);
  const sd  = (c) => doc.setDrawColor(...c);
  const st  = (c) => doc.setTextColor(...c);
  const sfz = (sz, w="normal") => { doc.setFontSize(sz); doc.setFont("helvetica", w); };

  // rounded rect — fill only, stroke only, or both
  const rr = (x, ry, w, h, r, mode="F") => doc.roundedRect(x, ry, w, h, r, r, mode);

  // progress bar
  const pbar = (bx, by, bw, bh, pct, trackC, fillC) => {
    sf(trackC); rr(bx, by, bw, bh, bh / 2);
    if (pct > 0) { sf(fillC); rr(bx, by, Math.max(bw * (pct / 100), bh), bh, bh / 2); }
  };

  // section header with accent stripe + dotted rule
  const secHead = (title, accentC) => {
    sf(accentC); doc.rect(M, y, 2.8, 4.5, "F");
    sfz(7, "bold"); st(gray);
    doc.text(title.toUpperCase(), M + 5.5, y + 3.5);
    sd(border); doc.setLineWidth(0.25);
    const tw = doc.getTextWidth(title.toUpperCase());
    doc.line(M + 5.5 + tw + 3, y + 2.2, W - M, y + 2.2);
    y += 9;
  };

  // info card (label + value with optional warn state)
  const card = (cx, cy, cw, ch, label, value, warn = false) => {
    sf(warn ? roseDim : surface2);
    sd(warn ? roseDeep : border);
    doc.setLineWidth(0.3);
    rr(cx, cy, cw, ch, 2.5, "FD");
    // left accent strip
    sf(warn ? rose : gray3); doc.rect(cx, cy, 2, ch, "F");
    sfz(5.5, "bold"); st(warn ? roseText : gray2);
    doc.text(label.toUpperCase(), cx + 5, cy + 5.5);
    sfz(8, "bold"); st(warn ? roseText : white);
    // truncate long values
    const maxW = cw - 8;
    let val = String(value);
    while (doc.getTextWidth(val) > maxW && val.length > 3) val = val.slice(0, -1);
    if (val !== String(value)) val += "..";
    doc.text(val, cx + 5, cy + 12.5);
  };

  // ══════════════════════════════════════════════════════════
  // BACKGROUND
  // ══════════════════════════════════════════════════════════
  sf(bg); doc.rect(0, 0, W, H, "F");

  // subtle ambient glow blobs
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.045 }));
  sf(violet); doc.ellipse(20, 25, 60, 45, "F");
  sf(cyan);   doc.ellipse(W - 18, H - 28, 55, 42, "F");
  sf(rose);   doc.ellipse(W / 2, H / 2, 40, 30, "F");
  doc.restoreGraphicsState();

  // ══════════════════════════════════════════════════════════
  // HEADER BAND
  // ══════════════════════════════════════════════════════════
  sf(surface); doc.rect(0, 0, W, 36, "F");
  sd(border); doc.setLineWidth(0.35); doc.line(0, 36, W, 36);

  // top accent lines
  doc.setLineWidth(1.6); sd(rose);   doc.line(0, 0, W * 0.55, 0);
  doc.setLineWidth(1.6); sd(violet); doc.line(W * 0.55, 0, W * 0.78, 0);
  doc.setLineWidth(1.6); sd(cyan);   doc.line(W * 0.78, 0, W, 0);

  // logo box
  sf(violet); rr(M, 7, 21, 21, 3.5, "F");
  // inner glow
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.3 }));
  sf(cyanT); rr(M + 5, 12, 11, 11, 2, "F");
  doc.restoreGraphicsState();
  sfz(12, "bold"); st(white); doc.text("O", M + 7, 21);

  // title block
  sfz(14, "bold"); st(white);
  doc.text("AI Oral Cancer Triage Report", M + 26, 17);
  sfz(7); st(gray);
  doc.text("OralAI Detection System  |  Rural Camp Mode  |  Maharashtra, India", M + 26, 23.5);

  // meta (right-aligned)
  const now = new Date().toLocaleString("en-IN");
  sfz(6); st(gray2);
  doc.text(`Generated: ${now}`, W - M, 13, { align: "right" });
  doc.text(`File: ${(fileName || "N/A").substring(0, 30)}`, W - M, 19, { align: "right" });
  doc.text(`Scan time: ${scanTime || "--"}s`, W - M, 25, { align: "right" });

  y = 44;

  // ══════════════════════════════════════════════════════════
  // URGENT REFERRAL BANNER
  // ══════════════════════════════════════════════════════════
  sf(roseDim); sd(rose); doc.setLineWidth(0.5); rr(M, y, CW, 24, 3.5, "FD");
  // pulsing dot rings (simulate)
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.18 }));
  sf(rose); doc.circle(M + 10, y + 12, 6, "F");
  doc.restoreGraphicsState();
  sf(rose); doc.circle(M + 10, y + 12, 3.8, "F");
  sf(white); doc.circle(M + 10, y + 12, 1.4, "F");

  sfz(11, "bold"); st(roseText);
  doc.text(triageLevel, M + 19, y + 9);
  sfz(7.5); st(gray);
  doc.text(recommendation, M + 19, y + 16);

  // big risk number
  sfz(22, "bold"); st(rose);
  doc.text(`${finalRisk}%`, W - M - 3, y + 14, { align: "right" });
  sfz(6); st(gray2);
  doc.text("FINAL RISK SCORE", W - M - 3, y + 20.5, { align: "right" });

  y += 31;

  // ══════════════════════════════════════════════════════════
  // PATIENT DETAILS
  // ══════════════════════════════════════════════════════════
  secHead("Patient Details", cyan);
  const cw4 = (CW - 9) / 4;
  [
    { l: "Age",             v: `${age} yrs`,                                   w: false },
    { l: "Lesion Duration", v: `${lesionDuration || 0} days`,                  w: parseInt(lesionDuration) >= 14 },
    { l: "Tobacco Use",     v: tobacco === "yes" ? "Yes — High Risk" : "None", w: tobacco === "yes" },
    { l: "Alcohol Use",     v: alcohol === "yes" ? "Yes — High Risk" : "None", w: alcohol === "yes" },
  ].forEach((c, i) => card(M + i * (cw4 + 3), y, cw4, 17, c.l, c.v, c.w));
  y += 23;

  // ══════════════════════════════════════════════════════════
  // IMAGE ANALYSIS
  // ══════════════════════════════════════════════════════════
  secHead("Image Analysis Results", rose);
  [
    { l: "Cancer Probability", v: cancerProb,  c: rose,    t: roseText  },
    { l: "Normal Probability", v: normalProb,  c: emerald, t: emeraldT  },
  ].forEach(b => {
    sfz(7.5); st(gray); doc.text(b.l, M, y + 3.5);
    pbar(M + 50, y - 0.5, CW - 68, 5, b.v, border, b.c);
    sfz(8, "bold"); st(b.t); doc.text(`${b.v}%`, W - M, y + 3.5, { align: "right" });
    y += 9;
  });
  y += 3;

  // ══════════════════════════════════════════════════════════
  // LIFESTYLE RISK
  // ══════════════════════════════════════════════════════════
  secHead("Lifestyle Risk Factors", amber);
  [
    { l: "Lifestyle Risk Score",        v: lifestyleRisk, c: amber, t: amberText },
    { l: "Final Fused Risk Score",      v: finalRisk,     c: rose,  t: roseText  },
  ].forEach(b => {
    sfz(7.5); st(gray); doc.text(b.l, M, y + 3.5);
    pbar(M + 50, y - 0.5, CW - 68, 5, b.v, border, b.c);
    sfz(8, "bold"); st(b.t); doc.text(`${b.v}%`, W - M, y + 3.5, { align: "right" });
    y += 9;
  });
  y += 3;

  // ══════════════════════════════════════════════════════════
  // ADVANCED SYMPTOMS
  // ══════════════════════════════════════════════════════════
  secHead("Advanced Symptoms", violet);
  const painLabel = pain === "none" ? "None — Safe" : pain === "mild" ? "Mild — Caution" : "Severe — Alert";
  const cw5 = (CW - 12) / 5;
  [
    { l: "Pain Level",        v: painLabel,                                       w: pain !== "none"       },
    { l: "Bleeding",          v: bleeding    === "yes" ? "Present" : "Absent",    w: bleeding === "yes"    },
    { l: "Swallowing",        v: swallowing  === "yes" ? "Difficulty" : "Normal", w: swallowing === "yes"  },
    { l: "Weight Loss",       v: weightLoss  === "yes" ? "Present" : "None",      w: weightLoss === "yes"  },
    { l: "Lymph Node",        v: neckSwelling=== "yes" ? "Present" : "Absent",    w: neckSwelling === "yes"},
  ].forEach((s, i) => card(M + i * (cw5 + 3), y, cw5, 17, s.l, s.v, s.w));
  y += 23;

  // ══════════════════════════════════════════════════════════
  // FINAL RISK ASSESSMENT
  // ══════════════════════════════════════════════════════════
  secHead("Final Risk Assessment", rose);
  sf(roseDim); sd(rose); doc.setLineWidth(0.4); rr(M, y, CW, 26, 3.5, "FD");

  sfz(6.5); st(gray2); doc.text("TRIAGE DECISION", M + 7, y + 7);
  sfz(13, "bold"); st(rose); doc.text(triageLevel, M + 7, y + 14.5);
  sfz(7); st(gray); doc.text(recommendation, M + 7, y + 20.5);

  sfz(24, "bold"); st(rose); doc.text(`${finalRisk}%`, W - M - 4, y + 16, { align: "right" });
  sfz(6); st(gray2); doc.text("RISK SCORE", W - M - 4, y + 22, { align: "right" });

  // formula note
  sfz(6); st(gray2);
  doc.text("Formula: 60% x Image  +  25% x Lifestyle  +  15% x Symptoms", M + 7, y + 27.5);
  y += 34;

  // ══════════════════════════════════════════════════════════
  // CLINICAL RECOMMENDATIONS
  // ══════════════════════════════════════════════════════════
  secHead("Clinical Recommendations", amber);
  const recs = [
    { title: "Immediate Referral",      text: "Contact oncology specialist within 24-48 hrs. Do not delay under any circumstances.", accent: rose    },
    { title: "Biopsy Required",         text: "Schedule tissue biopsy within 7 days for definitive histopathological diagnosis.",     accent: violet  },
    { title: "Document & Flag",         text: "Complete clinical documentation. Flag patient record for priority follow-up tracking.", accent: amber   },
    { title: "Patient Counselling",     text: "Inform patient carefully. Provide psychosocial support and a formal referral letter.",  accent: cyan    },
    { title: "Specialist Consultation", text: "Coordinate with tertiary oncology centre for advanced imaging (MRI/CT) if indicated.", accent: emerald },
  ];
  recs.forEach(r => {
    sf(surface); sd(border); doc.setLineWidth(0.25); rr(M, y, CW, 14, 2.5, "FD");
    sf(r.accent); doc.rect(M, y, 2.5, 14, "F");
    sfz(7.5, "bold"); st(r.accent); doc.text(r.title, M + 7, y + 5.5);
    sfz(6.8); st(gray); doc.text(r.text, M + 7, y + 10.5, { maxWidth: CW - 12 });
    y += 16;
  });

  // ══════════════════════════════════════════════════════════
  // FOOTER
  // ══════════════════════════════════════════════════════════
  const fy = H - 14;
  sd(border); doc.setLineWidth(0.3); doc.line(M, fy, W - M, fy);
  sfz(5.8); st(gray2);
  doc.text("OralAI Detection System  |  AI-Powered Oral Cancer Screening  |  Rural Health Camps  |  Maharashtra, India", W / 2, fy + 4.5, { align: "center" });
  doc.text("DISCLAIMER: This report is AI-generated and must be reviewed by a qualified medical professional before any clinical action is taken.", W / 2, fy + 9, { align: "center" });
  sfz(5.8); st(gray2); doc.text("Page 1 of 1", W - M, fy + 4.5, { align: "right" });

  doc.save(`OralAI_Report_${Date.now()}.pdf`);
}

/* ─── ADVANCED DIAGNOSIS MODAL ─────────────────────────────────────────────── */
function AdvancedDiagModal({ apiData, age, tobacco, alcohol, lesionDuration, scanTime, fileName, onClose }) {
  const [pain,         setPain]         = useState("none");
  const [bleeding,     setBleeding]     = useState("no");
  const [swallowing,   setSwallowing]   = useState("no");
  const [weightLoss,   setWeightLoss]   = useState("no");
  const [neckSwelling, setNeckSwelling] = useState("no");
  const [stage,        setStage]        = useState("form"); // "form" | "report"
  const [pdfLoading,   setPdfLoading]   = useState(false);

  const cancerProb    = apiData?.image_analysis?.cancer_probability ?? 0;
  const normalProb    = apiData?.image_analysis?.normal_probability ?? 0;
  const lifestyleRisk = apiData?.lifestyle_risk_score ?? 0;
  const finalRisk     = apiData?.final_risk_score ?? 0;
  const triageLevel   = apiData?.triage_level ?? "";
  const recommendation= apiData?.recommendation ?? "";

  /* helper: option button */
  const Opt = ({ field, val, label, setFn, cls }) => (
    <button
      className={`sym-btn${field === val ? ` s-${cls || val}` : ""}`}
      onClick={() => setFn(val)}
    >{label}</button>
  );

  /* symptom display strings */
  const painDisplay = pain === "none" ? "None ✅" : pain === "mild" ? "Mild ⚠️" : "Severe 🚨";
  const dispMap = (v, pos="Present 🚨", neg="Absent ✅") => v === "yes" ? pos : neg;
  const isWarn  = (v) => v !== "no" && v !== "none";

  return (
    <>
      <motion.div className="adv-backdrop"
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        transition={{ duration:0.22 }} onClick={onClose}
      />
      <motion.div className="adv-modal"
        initial={{ opacity:0, scale:0.93 }}
        animate={{ opacity:1, scale:1 }}
        exit={{ opacity:0, scale:0.96 }}
        transition={{ duration:0.36, ease:[0.22,1,0.36,1] }}
      >
        {/* ── Header ── */}
        <div className="adv-header">
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:11, background:"rgba(244,63,94,0.12)", border:"1px solid rgba(244,63,94,0.30)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🔬</div>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:"var(--text)", letterSpacing:"-0.3px" }}>Advanced Diagnosis</div>
              <div style={{ fontSize:11, color:"var(--text3)", marginTop:1 }}>
                {stage === "form" ? "Step 1 of 2 · Clinical Symptom Questionnaire" : "Step 2 of 2 · AI Medical Report"}
              </div>
            </div>
          </div>
          <button className="adv-close" onClick={onClose}>✕</button>
        </div>

        <div className="adv-body">

          {/* Scan result banner — always visible */}
          <div style={{ padding:"13px 18px", background:"rgba(244,63,94,0.07)", border:"1px solid rgba(244,63,94,0.24)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div>
              <div style={{ fontSize:10, color:"var(--text3)", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"Space Mono, monospace", marginBottom:4 }}>Initial Scan Result</div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", background:"rgba(244,63,94,0.12)", border:"1px solid rgba(244,63,94,0.3)", borderRadius:20, fontSize:12, fontWeight:700, color:"var(--rose2)" }}>🚨 {triageLevel}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:10, color:"var(--text3)", fontFamily:"Space Mono, monospace" }}>CANCER · FINAL RISK</div>
              <div style={{ fontFamily:"Space Mono, monospace", fontSize:18, fontWeight:700, color:"var(--rose)", marginTop:2 }}>{cancerProb}% · {finalRisk}%</div>
            </div>
          </div>

          <AnimatePresence mode="wait">

            {/* ── STAGE: FORM ── */}
            {stage === "form" && (
              <motion.div key="form"
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                transition={{ duration:0.28 }}
                style={{ display:"flex", flexDirection:"column", gap:16 }}
              >
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--text3)", display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(180deg,var(--rose),var(--amber))" }} />
                  Please answer all symptom fields below
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:9 }}>

                  <div className="sym-row">
                    <div><div className="sym-label">Pain Level</div><div className="sym-sub">Oral pain or discomfort felt by patient</div></div>
                    <div className="sym-opts">
                      <Opt field={pain} val="none"   label="None"   setFn={setPain} cls="none" />
                      <Opt field={pain} val="mild"   label="Mild"   setFn={setPain} cls="mild" />
                      <Opt field={pain} val="severe" label="Severe" setFn={setPain} cls="severe" />
                    </div>
                  </div>

                  <div className="sym-row">
                    <div><div className="sym-label">Bleeding from Lesion</div><div className="sym-sub">Any spontaneous or contact bleeding</div></div>
                    <div className="sym-opts">
                      <Opt field={bleeding} val="no"  label="No"  setFn={setBleeding} />
                      <Opt field={bleeding} val="yes" label="Yes" setFn={setBleeding} />
                    </div>
                  </div>

                  <div className="sym-row">
                    <div><div className="sym-label">Difficulty Swallowing</div><div className="sym-sub">Trouble eating or swallowing food / liquids</div></div>
                    <div className="sym-opts">
                      <Opt field={swallowing} val="no"  label="No"  setFn={setSwallowing} />
                      <Opt field={swallowing} val="yes" label="Yes" setFn={setSwallowing} />
                    </div>
                  </div>

                  <div className="sym-row">
                    <div><div className="sym-label">Weight Loss Recently</div><div className="sym-sub">Unexplained or unintentional weight loss</div></div>
                    <div className="sym-opts">
                      <Opt field={weightLoss} val="no"  label="No"  setFn={setWeightLoss} />
                      <Opt field={weightLoss} val="yes" label="Yes" setFn={setWeightLoss} />
                    </div>
                  </div>

                  <div className="sym-row">
                    <div><div className="sym-label">Lymph Node Swelling</div><div className="sym-sub">Palpable swelling in neck or jaw region</div></div>
                    <div className="sym-opts">
                      <Opt field={neckSwelling} val="no"  label="No"  setFn={setNeckSwelling} />
                      <Opt field={neckSwelling} val="yes" label="Yes" setFn={setNeckSwelling} />
                    </div>
                  </div>

                </div>

                <motion.button className="btn-gen" onClick={() => setStage("report")}
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}>
                  📋 Generate Medical Report
                </motion.button>
              </motion.div>
            )}

            {/* ── STAGE: REPORT ── */}
            {stage === "report" && (
              <motion.div key="report"
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                transition={{ duration:0.32 }}
                style={{ display:"flex", flexDirection:"column", gap:18 }}
              >
                {/* Patient Details */}
                <div>
                  <div className="rpt-sec">
                    <div style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(180deg,var(--cyan),var(--violet))" }} />
                    Patient Details
                  </div>
                  <div className="rpt-g2">
                    {[
                      { l:"Age",             v:`${age} years`,                                   w:false },
                      { l:"Lesion Duration", v:`${lesionDuration||0} days`,                     w:parseInt(lesionDuration)>=14 },
                      { l:"Tobacco Use",     v:tobacco==="yes"?"Yes ⚠️":"No ✅",                w:tobacco==="yes" },
                      { l:"Alcohol Use",     v:alcohol==="yes"?"Yes ⚠️":"No ✅",                w:alcohol==="yes" },
                    ].map(f => (
                      <div className={`rpt-f${f.w?" w":""}`} key={f.l}>
                        <div className="rpt-fl">{f.l}</div>
                        <div className={`rpt-fv${f.w?" w":""}`}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Analysis Results */}
                <div>
                  <div className="rpt-sec">
                    <div style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(180deg,var(--rose),var(--amber))" }} />
                    Image Analysis Results
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                    {[
                      { l:"Cancer Probability", v:cancerProb,    h:"#f43f5e" },
                      { l:"Normal Probability",  v:normalProb,    h:"#10b981" },
                      { l:"Lifestyle Risk Score",v:lifestyleRisk, h:"#f59e0b" },
                      { l:"Final Risk (Fused)",  v:finalRisk,     h:"#a855f7" },
                    ].map((m,i) => (
                      <div key={m.l} style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ fontSize:12, color:"var(--text2)", width:148, flexShrink:0 }}>{m.l}</div>
                        <div style={{ flex:1, height:7, background:"var(--border)", borderRadius:4, overflow:"hidden" }}>
                          <motion.div style={{ height:"100%", background:`linear-gradient(90deg,${m.h},${m.h}88)`, borderRadius:4 }}
                            initial={{ width:0 }} animate={{ width:`${m.v}%` }}
                            transition={{ duration:0.9, delay:0.07*i, ease:[0.34,1.56,0.64,1] }} />
                        </div>
                        <div style={{ fontFamily:"Space Mono, monospace", fontSize:12, fontWeight:700, color:m.h, width:38, textAlign:"right" }}>{m.v}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lifestyle Risk Factors */}
                <div>
                  <div className="rpt-sec">
                    <div style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(180deg,var(--amber),var(--emerald))" }} />
                    Lifestyle Risk Factors
                  </div>
                  <div className="rpt-g2">
                    {[
                      { l:"Tobacco Use",     v:tobacco==="yes"?"Yes ⚠️":"No ✅",            w:tobacco==="yes" },
                      { l:"Alcohol Use",     v:alcohol==="yes"?"Yes ⚠️":"No ✅",            w:alcohol==="yes" },
                      { l:"Age Risk",        v:parseInt(age)>=45?"High Risk (≥45 yrs)":"Normal (<45 yrs)", w:parseInt(age)>=45 },
                      { l:"Lesion Duration", v:`${lesionDuration||0} days${parseInt(lesionDuration)>=14?" ⚠️":""}`, w:parseInt(lesionDuration)>=14 },
                    ].map(f => (
                      <div className={`rpt-f${f.w?" w":""}`} key={f.l}>
                        <div className="rpt-fl">{f.l}</div>
                        <div className={`rpt-fv${f.w?" w":""}`}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Symptoms */}
                <div>
                  <div className="rpt-sec">
                    <div style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(180deg,var(--violet),var(--rose))" }} />
                    Advanced Symptoms
                  </div>
                  <div className="rpt-g3">
                    {[
                      { l:"Pain Level",          v:painDisplay,                              w:pain!=="none" },
                      { l:"Bleeding",             v:dispMap(bleeding),                        w:bleeding==="yes" },
                      { l:"Swallowing",           v:dispMap(swallowing,"Difficulty 🚨","Normal ✅"), w:swallowing==="yes" },
                      { l:"Weight Loss",          v:dispMap(weightLoss,"Present 🚨","None ✅"),w:weightLoss==="yes" },
                      { l:"Lymph Node Swelling",  v:dispMap(neckSwelling),                   w:neckSwelling==="yes" },
                    ].map(f => (
                      <div className={`rpt-f${f.w?" w":""}`} key={f.l}>
                        <div className="rpt-fl">{f.l}</div>
                        <div className={`rpt-fv${f.w?" w":" ok"}`}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Risk Assessment */}
                <div>
                  <div className="rpt-sec">
                    <div style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(180deg,var(--rose),var(--amber))" }} />
                    Final Risk Assessment
                  </div>
                  <div className="rpt-risk-banner">
                    <div>
                      <div style={{ fontSize:10, color:"var(--text3)", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"Space Mono, monospace", marginBottom:5 }}>Triage Decision</div>
                      <div style={{ fontSize:20, fontWeight:800, color:"var(--rose)", fontFamily:"Space Mono, monospace" }}>{triageLevel}</div>
                      <div style={{ fontSize:11, color:"var(--text3)", marginTop:5 }}>{recommendation}</div>
                    </div>
                    <div style={{ fontFamily:"Space Mono, monospace", fontSize:36, fontWeight:800, color:"var(--rose)" }}>{finalRisk}%</div>
                  </div>
                </div>

                {/* Clinical Recommendations */}
                <div>
                  <div className="rpt-sec">
                    <div style={{ width:3, height:14, borderRadius:2, background:"linear-gradient(180deg,var(--amber),var(--cyan))" }} />
                    Clinical Recommendations
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {[
                      { icon:"🚨", title:"Immediate Referral",       text:"Contact oncology specialist within 24–48 hours. Do not delay." },
                      { icon:"🧬", title:"Biopsy Required",          text:"Schedule tissue biopsy within 7 days for definitive histopathological diagnosis." },
                      { icon:"📋", title:"Document & Flag",          text:"Complete clinical documentation. Flag patient for priority follow-up tracking." },
                      { icon:"📞", title:"Patient Counselling",      text:"Inform patient carefully. Provide psychosocial support and a formal referral letter." },
                      { icon:"🏥", title:"Specialist Consultation",  text:"Coordinate with tertiary oncology centre for advanced imaging (MRI/CT) if indicated." },
                    ].map((r,i) => (
                      <motion.div key={i}
                        initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
                        transition={{ delay:0.04*i }}
                        style={{ display:"flex", gap:11, alignItems:"flex-start", padding:"11px 14px", background:"var(--card)", border:"1px solid var(--border)", borderRadius:10 }}>
                        <span style={{ fontSize:15, flexShrink:0, marginTop:1 }}>{r.icon}</span>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", marginBottom:2 }}>{r.title}</div>
                          <div style={{ fontSize:12, color:"var(--text2)", lineHeight:1.55 }}>{r.text}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Download Medical Report button */}
                <motion.button className="btn-dl"
                  disabled={pdfLoading}
                  onClick={async () => {
                    setPdfLoading(true);
                    try {
                      await downloadMedicalReport({ age, tobacco, alcohol, lesionDuration,
                        cancerProb, normalProb, lifestyleRisk, finalRisk, triageLevel, recommendation,
                        scanTime, fileName, pain, bleeding, swallowing, weightLoss, neckSwelling });
                    } finally { setPdfLoading(false); }
                  }}
                  whileHover={{ scale: pdfLoading ? 1 : 1.02 }} whileTap={{ scale: pdfLoading ? 1 : 0.97 }}
                  style={{ opacity: pdfLoading ? 0.7 : 1 }}>
                  {pdfLoading ? "⏳ Generating PDF..." : "⬇️ Download Medical Report (.pdf)"}
                </motion.button>

                <button className="btn-back-q" onClick={() => setStage("form")}>
                  ← Edit Symptom Answers
                </button>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

/* ─── DASHBOARD ─────────────────────────────────────────────────────────────── */
export default function Dashboard({ onBack }) {
  const [age, setAge]                       = useState("");
  const [tobacco, setTobacco]               = useState("no");
  const [alcohol, setAlcohol]               = useState("no");
  const [lesionDuration, setLesionDuration] = useState("");

  const [apiData, setApiData]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [preview, setPreview]   = useState(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError]       = useState("");
  const [history, setHistory]   = useState(MOCK_HISTORY);
  const [scanTime, setScanTime] = useState(null);
  const [scanCount]             = useState(1284);
  const [advancedDiagOpen, setAdvancedDiagOpen] = useState(false);
  const fileRef     = useRef();
  const currentFile = useRef(null);

  const processFile = useCallback((file) => {
    if (!file) return;
    currentFile.current = file;
    setError(""); setApiData(null); setScanTime(null);
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  }, []);

  const runAnalysis = useCallback(async () => {
    const file = currentFile.current;
    if (!file) { setError("Please upload an image first."); return; }
    if (!age || isNaN(parseInt(age))) { setError("Please enter a valid patient age."); return; }
    setError(""); setLoading(true);
    const t0 = Date.now();
    const fd = new FormData();
    fd.append("image", file);
    fd.append("age", parseInt(age));
    fd.append("tobacco", tobacco);
    fd.append("alcohol", alcohol);
    fd.append("lesion_duration", parseInt(lesionDuration) || 0);
    try {
      const res  = await fetch("http://127.0.0.1:5000/predict", { method: "POST", body: fd });
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message || "Server error");
      setApiData(data);
      setScanTime(((Date.now() - t0) / 1000).toFixed(1));
      const pos = data.final_risk_score >= 50 || ["URGENT REFERRAL","HIGH RISK"].includes(data.triage_level);
      setHistory(prev => [{
        id: Date.now(), name: file.name, time: "Just now",
        result: pos ? "positive" : "negative",
        triage: data.triage_level, finalRisk: data.final_risk_score,
        thumb: URL.createObjectURL(file),
      }, ...prev.slice(0, 9)]);
    } catch {
      setError("Cannot connect to Flask backend. Make sure it's running on port 5000.");
    } finally { setLoading(false); }
  }, [age, tobacco, alcohol, lesionDuration]);

  const handleUpload = (e) => processFile(e.target.files[0]);
  const handleDrop   = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) processFile(f);
  };

  const cancerProb    = apiData?.image_analysis?.cancer_probability ?? 0;
  const normalProb    = apiData?.image_analysis?.normal_probability ?? 0;
  const lifestyleRisk = apiData?.lifestyle_risk_score ?? 0;
  const finalRisk     = apiData?.final_risk_score ?? 0;
  const triageLevel   = apiData?.triage_level ?? "";
  const recommendation= apiData?.recommendation ?? "";
  const isPos = cancerProb > normalProb || ["URGENT REFERRAL","HIGH RISK"].includes(triageLevel);
  const resultClass = apiData ? (isPos ? "positive" : "negative") : "";

  const triageBarColor =
    triageLevel === "URGENT REFERRAL" ? "rose"   :
    triageLevel === "HIGH RISK"       ? "amber"  :
    triageLevel === "MODERATE RISK"   ? "violet" : "emerald";

  const flagged = history.filter(h => h.result === "positive").length;

  const STATS = [
    { color:"cyan",   icon:"🩺", val: scanCount.toLocaleString(),        label:"Total Screenings", delta:"+124 today",          up:true  },
    { color:"rose",   icon:"⚠️", val: String(flagged + 44),              label:"Flagged Cases",    delta:`+${flagged} session`, up:false },
    { color:"violet", icon:"✅", val: "96.2%",                           label:"Model Accuracy",   delta:"EfficientNet v2",     up:true  },
    { color:"amber",  icon:"⚡", val: scanTime ? `${scanTime}s` : "<8s", label:"Last Scan Time",   delta:"vs 45min manual",     up:true  },
  ];

  const statTextColor = { cyan:"var(--cyan)", rose:"var(--rose2)", violet:"var(--violet2)", amber:"var(--amber2)" };

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* ── Sidebar ── */}
        <motion.aside
          className="sidebar"
          initial={{ x: -260, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="logo">
            <div className="logo-mark">🧬</div>
            <div>
              <div className="logo-text">OralAI</div>
              <div className="logo-sub">Detection System</div>
            </div>
          </div>

          {/* Back to landing */}
          {onBack && (
            <motion.button
              className="back-btn"
              onClick={onBack}
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              ← Back to Home
            </motion.button>
          )}

          <div className="nav-group">
            <div className="nav-group-label">Main</div>
            {[
              { icon:"🏠", label:"Dashboard", active:true },
              { icon:"📷", label:"New Scan" },
              { icon:"📁", label:"Patient Records" },
              { icon:"📊", label:"Analytics" },
            ].map((n, i) => (
              <motion.div
                key={n.label}
                className={`nav-item ${n.active ? "active" : ""}`}
                initial={{ opacity:0, x:-16 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ x: 3 }}
              >
                <span className="nav-icon">{n.icon}</span> {n.label}
              </motion.div>
            ))}
          </div>

          <div className="nav-group">
            <div className="nav-group-label">Camp Ops</div>
            {[
              { icon:"🗺️", label:"Camp Locations" },
              { icon:"👥", label:"Screening Queue" },
              { icon:"📤", label:"Export Reports" },
            ].map((n, i) => (
              <motion.div
                key={n.label}
                className="nav-item"
                initial={{ opacity:0, x:-16 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ x: 3 }}
              >
                <span className="nav-icon">{n.icon}</span> {n.label}
              </motion.div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="online-pill">
              <div className="pulse-dot" />
              AI Model · Online
            </div>
          </div>
        </motion.aside>

        {/* ── Main ── */}
        <main className="main">
          <motion.div
            className="topbar"
            initial={{ opacity:0, y:-20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration: 0.45, ease:"easeOut" }}
          >
            <div>
              <div className="page-title">Screening Dashboard</div>
              <div className="page-sub">Rural Oral Cancer Screening · Camp Mode</div>
            </div>
            <div className="topbar-chips">
              <div className="chip chip-cyan">📍 Maharashtra</div>
              <div className="chip chip-violet">⚡ EfficientNet v2</div>
            </div>
          </motion.div>

          <div className="content">
            {/* Stats Row */}
            <motion.div className="stats-row" variants={stagger} initial="hidden" animate="visible">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  className={`stat-card ${s.color}-card`}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                >
                  <div className={`stat-icon-wrap chip-${s.color}`}>{s.icon}</div>
                  <div className="stat-value" style={{ color: statTextColor[s.color] }}>{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className={`stat-delta chip-${s.up ? s.color : "rose"}`}>↑ {s.delta}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Grid */}
            <div className="main-grid">
              {/* ── Left ── */}
              <motion.div className="upload-section" variants={stagger} initial="hidden" animate="visible">
                <motion.div className="section-head" variants={fadeUp}>Patient Information</motion.div>

                <motion.div className="card" variants={scaleIn}>
                  <div className="patient-form">
                    {[
                      { label:"Patient Age",            placeholder:"e.g. 52", val:age,           set:setAge,           type:"number" },
                      { label:"Lesion Duration (days)", placeholder:"e.g. 21", val:lesionDuration, set:setLesionDuration, type:"number" },
                    ].map(f => (
                      <div className="form-group" key={f.label}>
                        <label className="form-label">{f.label}</label>
                        <motion.input
                          className="form-input"
                          type={f.type}
                          placeholder={f.placeholder}
                          value={f.val}
                          onChange={e => f.set(e.target.value)}
                          whileFocus={{ scale: 1.01 }}
                        />
                      </div>
                    ))}
                    {[
                      { label:"Tobacco Use", val:tobacco, set:setTobacco },
                      { label:"Alcohol Use", val:alcohol, set:setAlcohol },
                    ].map(f => (
                      <div className="form-group" key={f.label}>
                        <label className="form-label">{f.label}</label>
                        <select className="form-select" value={f.val} onChange={e => f.set(e.target.value)}>
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="divider" />

                  {/* Drop Zone */}
                  <motion.div
                    className={`drop-zone ${dragging ? "dragging" : ""}`}
                    onClick={() => fileRef.current.click()}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    whileTap={{ scale: 0.99 }}
                  >
                    <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} />
                    <AnimatePresence mode="wait">
                      {!preview ? (
                        <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                          <div className="drop-icon">🩺</div>
                          <div className="drop-title">Drop oral mucosa image here</div>
                          <div className="drop-sub">JPG, PNG, HEIC · Max 10MB</div>
                          <button className="btn-upload" onClick={e => { e.stopPropagation(); fileRef.current.click(); }}>
                            📂 Choose Image
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div key="file" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                          style={{ fontSize:13, color:"var(--text2)" }}>
                          📎 {fileName} · <span style={{ color:"var(--cyan)" }}>Click to change</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.div className="error-box"
                        initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                        ⚠️ {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {preview && (
                      <motion.button
                        className="btn-analyze"
                        onClick={runAnalysis}
                        disabled={loading}
                        initial={{ opacity:0, y:10 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0 }}
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                      >
                        {loading
                          ? <><div className="spinner" style={{ width:20, height:20 }} /> Analyzing...</>
                          : <>🔬 Run AI Analysis</>
                        }
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {(preview || loading) && (
                      <motion.div
                        className="preview-area"
                        initial={{ opacity:0, y:16 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0 }}
                        transition={{ duration:0.4 }}
                      >
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          <div className="preview-img-wrap">
                            {preview && <img src={preview} alt="Scan" />}
                            {loading && <div className="scan-line" />}
                            <div className="corner tl"/><div className="corner tr"/>
                            <div className="corner bl"/><div className="corner br"/>
                          </div>

                          {/* Advanced Diagnosis — only for URGENT REFERRAL */}
                          <AnimatePresence>
                            {apiData && triageLevel === "URGENT REFERRAL" && (
                              <motion.button
                                className="btn-advanced-diag"
                                onClick={() => setAdvancedDiagOpen(true)}
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                                transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                <div className="btn-advanced-diag-pulse" />
                                🔬 Advanced Diagnosis
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="result-panel">
                          <AnimatePresence mode="wait">
                            {loading ? (
                              <motion.div key="loading"
                                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, padding:28 }}
                                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                                <div className="spinner" />
                                <div style={{ fontSize:13, color:"var(--text2)" }}>Analyzing...</div>
                                <div style={{ fontSize:11, color:"var(--text3)" }}>AI processing scan</div>
                              </motion.div>
                            ) : apiData ? (
                              <motion.div key="result"
                                initial={{ opacity:0, scale:0.95 }}
                                animate={{ opacity:1, scale:1 }}
                                exit={{ opacity:0 }}
                                transition={{ duration:0.4 }}
                              >
                                <div className={`result-box ${resultClass}`}>
                                  <div className="result-micro">Triage Decision</div>
                                  <motion.div
                                    className={`triage-badge ${TRIAGE_CLASS[triageLevel] || ""}`}
                                    initial={{ scale:0.8, opacity:0 }}
                                    animate={{ scale:1, opacity:1 }}
                                    transition={{ delay:0.2, type:"spring", stiffness:280 }}
                                  >
                                    {TRIAGE_ICON[triageLevel]} {triageLevel}
                                  </motion.div>
                                  <div className="rec-note">{recommendation}</div>
                                  <div className="bar-wrap">
                                    <div className="bar-labels">
                                      <span>Final Risk</span>
                                      <span style={{ fontFamily:"Space Mono,monospace", fontSize:11 }}>{finalRisk}%</span>
                                    </div>
                                    <div className="bar-track">
                                      <motion.div
                                        className={`bar-fill ${triageBarColor}`}
                                        initial={{ width:0 }}
                                        animate={{ width:`${finalRisk}%` }}
                                        transition={{ duration:1.2, delay:0.3, ease:[0.34,1.56,0.64,1] }}
                                        style={{ width:0 }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <motion.div className="info-mini" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }}>
                                  <div className="result-micro" style={{ marginBottom:8 }}>Image Analysis</div>
                                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:5 }}>
                                    <span style={{ color:"var(--rose2)" }}>Cancer {cancerProb}%</span>
                                    <span style={{ color:"var(--emerald2)" }}>Normal {normalProb}%</span>
                                  </div>
                                  <div className="split-bar">
                                    <motion.div className="split-cancer"
                                      initial={{ width:0 }} animate={{ width:`${cancerProb}%` }}
                                      transition={{ duration:1.2, delay:0.4, ease:[0.34,1.56,0.64,1] }} style={{ width:0 }} />
                                    <motion.div className="split-normal"
                                      initial={{ width:0 }} animate={{ width:`${normalProb}%` }}
                                      transition={{ duration:1.2, delay:0.4, ease:[0.34,1.56,0.64,1] }} style={{ width:0 }} />
                                  </div>
                                </motion.div>

                                <motion.div className="info-grid2" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45 }}>
                                  {[
                                    { label:"Age",         val:`${age} yrs` },
                                    { label:"Scan Time",   val:`${scanTime}s` },
                                    { label:"Tobacco", val:tobacco==="yes"?"Yes ⚠️":"No ✅", color:tobacco==="yes"?"var(--rose2)":"var(--emerald2)" },
                                    { label:"Alcohol",  val:alcohol==="yes"?"Yes ⚠️":"No ✅",  color:alcohol==="yes"?"var(--rose2)":"var(--emerald2)" },
                                  ].map(m => (
                                    <div className="info-mini" key={m.label}>
                                      <div className="info-mini-label">{m.label}</div>
                                      <div className="info-mini-val" style={m.color?{color:m.color}:{}}>{m.val}</div>
                                    </div>
                                  ))}
                                </motion.div>
                              </motion.div>
                            ) : (
                              <motion.div key="idle" className="empty-state"
                                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                                <div className="empty-icon">👁️</div>
                                <div className="empty-text">Fill patient details &amp; click <strong>Run AI Analysis</strong></div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Recs */}
                  <AnimatePresence>
                    {apiData && !loading && (
                      <motion.div
                        initial={{ opacity:0, y:12 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0 }}
                        transition={{ duration:0.4, delay:0.5 }}
                        style={{ display:"flex", flexDirection:"column", gap:8 }}
                      >
                        <div className="section-head" style={{ fontSize:10 }}>Clinical Recommendations</div>
                        {(RECS[resultClass] || []).map((r, i) => (
                          <motion.div
                            key={i}
                            className="rec-item"
                            initial={{ opacity:0, x:-12 }}
                            animate={{ opacity:1, x:0 }}
                            transition={{ delay: 0.55 + i * 0.08 }}
                          >
                            <span className="rec-icon">{r.icon}</span> {r.text}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* ── Right ── */}
              <motion.div className="right-panel" variants={stagger} initial="hidden" animate="visible">

                {/* Gauge */}
                <motion.div className="panel-card" variants={slideR}>
                  <div className="panel-title">
                    Final Risk Score
                    {apiData && (
                      <span className={`chip chip-${
                        triageLevel==="URGENT REFERRAL"?"rose":
                        triageLevel==="HIGH RISK"?"amber":
                        triageLevel==="MODERATE RISK"?"violet":"emerald"
                      }`}>
                        {TRIAGE_ICON[triageLevel]} {triageLevel || "—"}
                      </span>
                    )}
                  </div>
                  <Gauge score={finalRisk} triage={triageLevel} />
                  <div style={{ textAlign:"center", fontSize:11, color:"var(--text3)", marginTop:6 }}>
                    {apiData ? "Image × 0.7  +  Lifestyle × 0.3" : "Upload & analyze to begin"}
                  </div>
                </motion.div>

                {/* Score Breakdown */}
                <AnimatePresence>
                  {apiData && (
                    <motion.div className="panel-card"
                      initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0 }} transition={{ duration:0.4 }}>
                      <div className="panel-title">Score Breakdown</div>
                      {[
                        { label:"Image (Cancer %)",   val:cancerProb,    hex:"#f43f5e" },
                        { label:"Lifestyle Risk",      val:lifestyleRisk, hex:"#f59e0b" },
                        { label:"Final Risk (Fused)",  val:finalRisk,     hex:"#00e5ff" },
                      ].map((s, i) => (
                        <div className="score-row" key={s.label}>
                          <div className="score-lbl">{s.label}</div>
                          <div className="score-bar-track">
                            <motion.div
                              className="score-bar-fill"
                              style={{ background:`linear-gradient(90deg,${s.hex},${s.hex}88)`, width:0 }}
                              animate={{ width:`${s.val}%` }}
                              transition={{ duration:1.2, delay:0.1+i*0.1, ease:[0.34,1.56,0.64,1] }}
                            />
                          </div>
                          <div className="score-val" style={{ color:s.hex }}>{s.val}%</div>
                        </div>
                      ))}
                      <div style={{ marginTop:8, padding:"8px 10px", background:"var(--card)", borderRadius:8, fontSize:11, color:"var(--text3)", lineHeight:1.6, border:"1px solid var(--border)" }}>
                        Final = <strong style={{ color:"var(--cyan)" }}>60%</strong> × Image + <strong style={{ color:"var(--amber2)" }}>25%</strong> × Lifestyle + <strong style={{ color:"var(--violet2)" }}>15%</strong> × Symptoms
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Camp Stats */}
                <motion.div className="panel-card" variants={slideR} transition={{ duration:0.5, delay:0.1 }}>
                  <div className="panel-title">Today's Camp Stats</div>
                  {[
                    { label:"Screened", val:78, total:120, fill:"cyan",  labelColor:"var(--cyan)" },
                    { label:"Flagged",  val:6,  total:78,  fill:"rose",  labelColor:"var(--rose2)" },
                    { label:"Referred", val:4,  total:6,   fill:"amber", labelColor:"var(--amber2)" },
                  ].map((s, i) => (
                    <div className="camp-row" key={s.label}>
                      <div className="camp-row-top">
                        <span style={{ color:s.labelColor }}>{s.label}</span>
                        <span className="camp-row-count">{s.val} <span style={{ color:"var(--text3)" }}>/ {s.total}</span></span>
                      </div>
                      <div className="bar-track">
                        <motion.div
                          className={`bar-fill ${s.fill}`}
                          style={{ width:0 }}
                          animate={{ width:`${(s.val/s.total)*100}%` }}
                          transition={{ duration:1, delay:0.2+i*0.1, ease:"easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Recent Scans */}
                <motion.div className="panel-card" variants={slideR} transition={{ duration:0.55, delay:0.15 }}>
                  <div className="panel-title">
                    Recent Scans
                    <span style={{ fontSize:10, color:"var(--text3)", fontWeight:400 }}>{history.length} records</span>
                  </div>
                  <div className="scan-list">
                    <AnimatePresence initial={false}>
                      {history.slice(0,5).map((scan, i) => (
                        <motion.div
                          key={scan.id}
                          className="scan-item"
                          initial={{ opacity:0, x:20 }}
                          animate={{ opacity:1, x:0 }}
                          exit={{ opacity:0, x:-20 }}
                          transition={{ delay:i*0.05, duration:0.3 }}
                          layout
                        >
                          <div className="scan-thumb">
                            {scan.thumb ? <img src={scan.thumb} alt="" /> : "🩺"}
                          </div>
                          <div className="scan-info">
                            <div className="scan-name">{scan.name}</div>
                            <div className="scan-meta">{scan.time} · Risk {scan.finalRisk?.toFixed(1)}%</div>
                          </div>
                          <div className={`scan-pill ${scan.result==="positive"?"pos":"neg"}`}>
                            {scan.result==="positive"?"POS":"NEG"}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Advanced Diagnosis Modal ── */}
      <AnimatePresence>
        {advancedDiagOpen && (
          <AdvancedDiagModal
            apiData={apiData}
            age={age}
            tobacco={tobacco}
            alcohol={alcohol}
            lesionDuration={lesionDuration}
            scanTime={scanTime}
            fileName={fileName}
            onClose={() => setAdvancedDiagOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}