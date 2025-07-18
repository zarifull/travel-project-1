import '../src/styles/App.css';
import React, { useState, useEffect } from 'react';
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';
import Main from '../src/routes/MainRoutes';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
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
