import React from 'react';
import AppRouter from './routes/AppRouter';
import AppToast from "./components/AppToast";

function App() {
  return (
    <div className="App">
            <AppRouter />
            <AppToast />
    </div>
  );
}

export default App;
