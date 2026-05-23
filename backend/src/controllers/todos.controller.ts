import { Request, Response } from "express";
import { prisma } from "../prisma";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const todo = await prisma.todo.create({
    data: {
      title,
    },
  });

  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid todo id" });
  }

  const { title, completed } = req.body;

  const todo = await prisma.todo.update({
    where: { id },
    data: {
      title,
      completed,
    },
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
