import express from "express";
const app = express();

app.get("/ads", (req, res) => {
  return res.json([
    {
      id: 1,
      name: "Anúncio 1",
    },
  ]);
});

app.listen(3333);
