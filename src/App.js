import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import NavbarWrapper from './components/navbar/NavbarWrapper';

function App() {
  return (
    <div className="App">
      <NavbarWrapper />
      
        <Login></Login>
    </div>
  );
}

export default App;
