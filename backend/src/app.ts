import express from "express";
import cors from "cors";
import todosRoutes from "./routes/todos.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/todos", todosRoutes);

// ERROR MIDDLEWARE ВСЕГДА ПОСЛЕ ROUTES
app.use(errorMiddleware);

export default app;
