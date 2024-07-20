import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('https://devops-todo.onrender.com:5000/todos')
      .then((response) => {
        setTodos(response.data);
      });
  }, []);

  const addTodo = () => {
    axios.post('https://devops-todo.onrender.com:5000/todos', { text })
      .then((response) => {
        setTodos([...todos, response.data]);
        setText('');
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`https://devops-todo.onrender.com:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      });
  };

  const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios.patch(`https://devops-todo.onrender.com:5000/todos/${id}`, { completed: !todo.completed })
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;



