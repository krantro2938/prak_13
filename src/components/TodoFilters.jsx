function TodoFilters({ filter, onFilterChange, activeCount, isDark, onToggleTheme }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: `2px solid ${isDark ? '#444' : '#eee'}`
    }}>
      <span style={{ color: isDark ? '#e0e0e0' : '#333' }}>
        Осталось задач: {activeCount}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {['all', 'active', 'completed'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => onFilterChange(filterType)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              background: filter === filterType ? '#007bff' : (isDark ? '#444' : '#f0f0f0'),
              color: filter === filterType ? 'white' : (isDark ? '#e0e0e0' : '#333'),
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {filterType === 'all' ? 'Все' :
              filterType === 'active' ? 'Активные' : 'Выполненные'}
          </button>
        ))}
        <button
          onClick={onToggleTheme}
          style={{
            padding: '5px 10px',
            background: isDark ? '#ff9800' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}

export default TodoFilters;
