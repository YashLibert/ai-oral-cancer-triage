export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #07080f;
      --surface: #0e1120;
      --border: #1e2440;
      --cyan: #00e5ff;
      --violet: #a855f7;
      --rose: #f43f5e;
      --amber: #f59e0b;
      --emerald: #10b981;
      --text: #eef2ff;
      --text2: #94a3b8;
      --text3: #475569;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }

    ::selection {
      background: rgba(168, 85, 247, 0.3);
      color: #fff;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: #1e2440; border-radius: 3px; }
  `}</style>
);