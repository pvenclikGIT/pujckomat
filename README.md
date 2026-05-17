# Půjčkomat — Srovnávač půjček v3

Srovnávač spotřebitelských půjček pro ČR a SR. Rychlé, transparentní srovnání od 10+ bank a nebankovních poskytovatelů s RPSN, indexem férovosti a AI doporučením.

## Technologie

- **React 18** (přes Babel Standalone — bez build stepu)
- Čistý HTML/CSS/JSX, žádná instalace závislostí
- Funguje přímo z prohlížeče nebo přes GitHub Pages

## Struktura projektu

```
pujckomat/
├── index.html              # Hlavní stránka (veškerý CSS inline)
├── colors_and_type.css     # Barevná paleta a typografie (volitelné)
├── js/
│   ├── data.jsx            # Data poskytovatelů, kalkulace
│   ├── components.jsx      # React komponenty UI
│   └── tweaks-panel.jsx    # Panel pro úpravu nastavení
├── assets/
│   └── favicon.svg
└── uploads/                # Screenshoty a obrázky
```

## Spuštění lokálně

Soubory **nelze** otevřít přímo jako `file://` — Babel Standalone potřebuje HTTP server kvůli načítání `.jsx` souborů.

```bash
# Python (doporučeno)
python3 -m http.server 8080

# Node.js
npx serve .

# VS Code
# Nainstaluj rozšíření "Live Server" a klikni na "Go Live"
```

Pak otevři: [http://localhost:8080](http://localhost:8080)

## Nasazení na GitHub Pages

1. Pushni repozitář na GitHub
2. Jdi do **Settings → Pages**
3. Source: `Deploy from a branch` → `main` → `/ (root)`
4. Za pár minut bude live na `https://<tvuj-username>.github.io/pujckomat/`

## Git — první setup

```bash
git init
git add .
git commit -m "Půjčkomat v3 — kompletní srovnávač půjček"
git remote add origin https://github.com/<tvuj-username>/pujckomat.git
git branch -M main
git push -u origin main
```

## Poznámky

- V produkci zvažte přechod na `react.production.min.js` (místo `development.js`)
- Canonical URL v `index.html` ukazuje na `pujckomat.cz` — upravte pokud nasazujete na jiné doméně
