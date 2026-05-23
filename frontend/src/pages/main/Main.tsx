import s from './Main.module.scss'
import {useEffect, useState} from "react";

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export const Main = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>();

  const onAddBtnClick = async () => {
    try {
      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New TODO',
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP POST request error: ${response.status}`);
      } else await getTodos();
    } catch (err) {
      console.error(`Add TODO request error: ${err}`);
      throw err;
    }
  }

  const onRemoveBtnClick = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP DELETE request error: ${response.status}`);
      } else await getTodos();
    } catch (err) {
      console.log(`Delete TODO request error: ${err}`);
      throw err;
    }
  }

  const updateTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Updated TODO'
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP PATCH request error: ${response.status}`);
      } else await getTodos();
    } catch (err) {
      console.log(`Update TODO request error: ${err}`);
      throw err;
    }
  }

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:4000/todos');
      if (!response.ok) {
        console.log(`HTTP GET request error: ${response.status}`);
        throw new Error(`HTTP Error: ${response.status}`);
      } else {
        const data = await response.json();
        setTodos(data);
      }
    } catch (err) {
      console.log(`Get TODO request error: ${err}`);
      throw err;
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={s.todoApp}>
      <div className={s.todoApp__header}>
        <p className={s.todoApp__header__logo}>TODO app</p>
        <button onClick={onAddBtnClick} className={s.todoApp__header__btn}>Add TODO</button>
      </div>
      <div className={s.todoApp__content}>
        <h1 className={s.todoApp__content__title}>TODO Application</h1>
        <ul className={s.todoApp__content__list}>
          {todos?.map(e => (
            <li key={e.id}>{e.title}
              <button onClick={() => onRemoveBtnClick(e.id)} className={s.todoApp__content__list__btn}>Remove</button>
              <button onClick={() => updateTodo(e.id)} className={s.todoApp__content__list__updBtn}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
