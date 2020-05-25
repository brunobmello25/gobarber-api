import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ ok: true });
});

app.listen(3000, () => console.log("Listening on port 3000"));
