import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit, isDark }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text);
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 0',
      borderBottom: `1px solid ${isDark ? '#2a2a2a' : '#f0f0f0'}`
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        style={{ 
          width: '20px', 
          height: '20px',
          cursor: 'pointer',
          accentColor: '#333'
        }}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '15px',
            borderRadius: '6px',
            border: '1px solid #333',
            backgroundColor: isDark ? '#252525' : '#fff',
            color: isDark ? '#e0e0e0' : '#333',
            outline: 'none'
          }}
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          style={{
            flex: 1,
            fontSize: '15px',
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed 
              ? (isDark ? '#555' : '#aaa') 
              : (isDark ? '#e0e0e0' : '#333'),
            cursor: 'text'
          }}
        >
          {task.text}
        </span>
      )}
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: 'transparent',
          color: isDark ? '#666' : '#ccc',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px 8px',
          borderRadius: '4px',
          transition: 'all 0.15s ease'
        }}
        title="Delete"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
