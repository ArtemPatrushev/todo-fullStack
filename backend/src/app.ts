import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

let todos: Todo[] = [
  { id: 1, title: "Learn Express", isCompleted: false },
  { id: 2, title: "Connect React", isCompleted: true },
  { id: 3, title: "Third point", isCompleted: true },
];

app.get('/health', (req, res) => {
  res.json({ status: 'Sergei loh' });
})

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo: Todo = {
    id: Date.now(),
    title: req.body.title,
    isCompleted: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, ...req.body } : todo
  );

  const updatedTodo = todos.find((todo) => todo.id === id);
  res.json(updatedTodo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter((todo) => todo.id !== id);

  res.status(204).send();
});

export default app;
