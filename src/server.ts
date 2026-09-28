import "dotenv/config";
import cors from "cors";
import express from "express";
import { router } from "./routes.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:5173";

app.disable("x-powered-by");
app.use(cors({ origin: webOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use((req, _res, next) => {
  req.headers["x-request-id"] ??= crypto.randomUUID();
  next();
});
app.use("/api/v1", router);
app.use((_req, res) => res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } }));

app.listen(port, () => {
  console.log(`Property Portal API listening on http://localhost:${port}`);
});
