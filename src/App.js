import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import NavbarWrapper from './components/navbar/NavbarWrapper';
import { AuthProvider } from "./Auth"
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from "./components/Home"
import Dashboard from './components/dashboard/Dashboard';
import ChatWindow from './components/ChatWindow/ChatWindow';

function App() {
  return (
    <div className="App">
      <NavbarWrapper />
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          {/* <Login></Login> */}
          <Route path="/dashboard" component={ChatWindow} />
        </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
