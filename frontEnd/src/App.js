import '../src/styles/App.css';
import React, { useState, useEffect } from 'react';
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';
import Main from '../src/routes/MainRoutes';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user" || null);
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null); // fallback
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      setUser(null);
    }
  }, []);
  

  return (
    <div className="App">
        <Header />
        <Main user={user} setUser={setUser} />
        <Footer />
    </div>
  );
}

export default App;
