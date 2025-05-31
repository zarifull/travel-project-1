import Main from './Page/Main/Main';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../src/Components/Header/Header';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div className="App">
            <Header/>
                <Main /> 
            <Footer />
     
    </div>
  );
}

export default App;
