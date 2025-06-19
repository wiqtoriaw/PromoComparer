import React from 'react';

function Header({ title }) {
  return (
    <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
