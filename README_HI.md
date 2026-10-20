# Small/Big Demo Server + API

यह एक स्वतंत्र demo project है। इसका Dhani Win से कोई कनेक्शन नहीं है, और यह उसके असली रिजल्ट/सर्वर को नहीं पढ़ता।

## ज़रूरत
- Node.js 18 या नया
- कंप्यूटर या ऐसा Android environment जिसमें Node.js चल सके

## चलाने का तरीका
1. ZIP को extract करें।
2. इस फ़ोल्डर में terminal खोलें।
3. चलाएँ: `node server.js`
4. ब्राउज़र में खोलें: `http://localhost:3000`

`public/index.html` को सीधे file की तरह खोलने के बजाय server से serve करना बेहतर है। इस starter में API server है; static dashboard serve करने के लिए नीचे दिया गया छोटा बदलाव करें या किसी static server से `public` folder serve करें.

### Dashboard खोलने का आसान तरीका
एक दूसरे terminal में उसी project folder से चलाएँ:
`npx --yes http-server public -p 8080`
फिर dashboard खोलें `http://localhost:8080`। API URL बदलने के लिए `public/index.html` में fetch paths के आगे `http://localhost:3000` लगाएँ और CORS पहले से enabled है।

## API
- `GET /` — API जानकारी
- `GET /api/result/latest` — नया demo result
- `GET /api/result/history?limit=20` — हाल के rounds
- `GET /api/stats` — demo history की गिनती
- `POST /api/demo/round` — नया random demo round बनाना

Small/Big नियम demo के लिए है: 0–4 = SMALL, 5–9 = BIG। ये केवल टेस्ट नियम हैं, असली गेम का नियम या अगला रिजल्ट बताने का तरीका नहीं।
