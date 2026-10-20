const http = require("http");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 3000);
let period = 1000;
const history = [];

function makeRound() {
  const number = crypto.randomInt(0, 10);
  const result = number <= 4 ? "SMALL" : "BIG";
  const row = {
    period: String(period++),
    number,
    result,
    createdAt: new Date().toISOString()
  };
  history.unshift(row);
  if (history.length > 100) history.pop();
  return row;
}

for (let i = 0; i < 10; i++) makeRound();

function send(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/") {
    return send(res, 200, {
      name: "Small/Big Demo API",
      notice: "Independent demo only; not connected to Dhani Win.",
      endpoints: {
        latest: "GET /api/result/latest",
        history: "GET /api/result/history",
        stats: "GET /api/stats",
        newRound: "POST /api/demo/round"
      }
    });
  }

  if (req.method === "GET" && url.pathname === "/api/result/latest") {
    return send(res, 200, history[0] || null);
  }

  if (req.method === "GET" && url.pathname === "/api/result/history") {
    const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit") || 20)));
    return send(res, 200, { count: Math.min(limit, history.length), results: history.slice(0, limit) });
  }

  if (req.method === "GET" && url.pathname === "/api/stats") {
    const small = history.filter(x => x.result === "SMALL").length;
    const big = history.filter(x => x.result === "BIG").length;
    return send(res, 200, {
      rounds: history.length,
      small,
      big,
      smallPercent: history.length ? +(small / history.length * 100).toFixed(1) : 0,
      bigPercent: history.length ? +(big / history.length * 100).toFixed(1) : 0,
      note: "Historical frequencies only; they do not predict or guarantee the next result."
    });
  }

  if (req.method === "POST" && url.pathname === "/api/demo/round") {
    return send(res, 201, makeRound());
  }

  return send(res, 404, { error: "Not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Small/Big Demo API running at http://localhost:${PORT}`);
});