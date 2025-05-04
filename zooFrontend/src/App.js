import React from 'react';
import AppRouter from './routes/AppRouter';
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <AppRouter />
        </AuthProvider>

    </div>
  );
}

export default App;
