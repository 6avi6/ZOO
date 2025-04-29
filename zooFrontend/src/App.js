import React from 'react';
import AppRouter from './routes/AppRouter';
import TokenWatcher from "./pages/login/TokenWatcher";

function App() {
  return (
    <div className="App">
        <TokenWatcher />
        <AppRouter />
    </div>
  );
}

export default App;
