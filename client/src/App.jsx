import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  let algorithm = antdTheme.defaultAlgorithm;
  if (theme === 'dark') algorithm = antdTheme.darkAlgorithm;
  if (theme === 'blue') algorithm = antdTheme.defaultAlgorithm;
  if (theme === 'light') algorithm = antdTheme.defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm,
      }}
    >
      <div className="min-h-screen bg-gray-800">
        <Outlet />
      </div>
    </ConfigProvider>
  );
}

export default App;