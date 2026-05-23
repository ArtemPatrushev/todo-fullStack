import { Request, Response } from "express";
import { prisma } from "../prisma";
import {createTodoSchema, updateTodoSchema} from "../schemas/todo.schema";
import { z } from "zod";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const validationResult = createTodoSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: z.treeifyError(validationResult.error),
    });
  }

  const todo = await prisma.todo.create({
    data: {
      title: validationResult.data.title,
    },
  });

  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const validationResult = updateTodoSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: z.treeifyError(validationResult.error),
    });
  }

  const { id } = req.params;

  if (id && Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }

  const todo = await prisma.todo.update({
    where: { id },
    data: validationResult.data,
  });

  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid todo id" });
  }

  await prisma.todo.delete({
    where: { id },
  });

  res.status(204).send();
};
