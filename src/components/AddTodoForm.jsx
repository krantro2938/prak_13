import { useState } from 'react';

function AddTodoForm({ onAdd, isDark }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: '15px',
          borderRadius: '10px',
          border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
          backgroundColor: isDark ? '#252525' : '#fafafa',
          color: isDark ? '#e0e0e0' : '#333',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          boxSizing: 'border-box'
        }}
      />
    </form>
  );
}

export default AddTodoForm;
