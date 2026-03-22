function TodoFilters({ filter, onFilterChange, activeCount, isDark, onToggleTheme, onToggleThemeVisible = true }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${isDark ? '#333' : '#eee'}`
    }}>
      <span style={{ 
        color: isDark ? '#888' : '#888',
        fontSize: '13px'
      }}>
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
      </span>
      <div style={{ display: 'flex', gap: '4px' }}>
        {['all', 'active', 'completed'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => onFilterChange(filterType)}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              background: filter === filterType 
                ? (isDark ? '#3a3a3a' : '#333') 
                : 'transparent',
              color: filter === filterType 
                ? '#fff' 
                : (isDark ? '#888' : '#888'),
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {filterType === 'all' ? 'All' :
              filterType === 'active' ? 'Active' : 'Done'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilters;
