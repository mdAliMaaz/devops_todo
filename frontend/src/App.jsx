import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

const App = () => {
  return (
    <div className="todo-container">
      <TodoList />
    </div>
  );
};

export default App;
