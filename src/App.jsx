import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
  // Состояние для списка задач
  const [todos, setTodos] = useState(() => {
    // Загружаем сохраненные задачи из localStorage
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // Состояние для текущего фильтра
  const [filter, setFilter] = useState('all');

  // Состояние для темы
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('isDark');
    return saved ? JSON.parse(saved) : false;
  });

  // Сохраняем задачи в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Сохраняем тему в localStorage и применяем к body
  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
    document.body.style.backgroundColor = isDark ? '#121212' : '#f5f5f5';
    document.body.style.color = isDark ? '#e0e0e0' : '#333';
  }, [isDark]);

  // Переключение темы
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Добавление новой задачи
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Переключение статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Удаление задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Редактирование задачи
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Фильтрация задач
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Подсчет активных задач
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div style={{
      maxWidth: '500px',
      margin: '60px auto',
      padding: '32px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      borderRadius: '16px',
      boxShadow: isDark 
        ? '0 4px 24px rgba(0, 0, 0, 0.4)' 
        : '0 2px 16px rgba(0, 0, 0, 0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '28px', 
          fontWeight: '600',
          color: isDark ? '#fff' : '#1a1a1a' 
        }}>Tasks</h1>
        <button
          onClick={toggleTheme}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: isDark ? '#333' : '#f0f0f0',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
      
      <AddTodoForm onAdd={addTodo} isDark={isDark} />
      
      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleThemeVisible={false}
      />
      
      {filteredTodos.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: isDark ? '#666' : '#999',
          padding: '32px 0',
          fontSize: '14px'
        }}>
          {filter === 'all' ? 'No tasks yet' :
            filter === 'active' ? 'No active tasks' : 'No completed tasks'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              isDark={isDark}
            />
          ))}
        </ul>
      )}
      
      {todos.length > 0 && (
        <button
          onClick={() => setTodos([])}
          style={{
            marginTop: '24px',
            padding: '10px 16px',
            background: 'transparent',
            color: isDark ? '#ff6b6b' : '#e74c3c',
            border: `1px solid ${isDark ? '#ff6b6b' : '#e74c3c'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            width: '100%',
            transition: 'all 0.2s ease'
          }}
        >
          Clear all
        </button>
      )}
    </div>
  );
}

export default App;
