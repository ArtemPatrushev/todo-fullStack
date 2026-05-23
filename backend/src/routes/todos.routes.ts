import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller";
import { asyncHandler } from "../utils/async-handler";

const router = Router();

router.get("/", asyncHandler(getTodos));
router.post("/", asyncHandler(createTodo));
router.patch("/:id", asyncHandler(updateTodo));
router.delete("/:id", asyncHandler(deleteTodo));

export default router;
