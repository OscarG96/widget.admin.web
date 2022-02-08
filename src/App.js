import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import NavbarWrapper from './components/navbar/NavbarWrapper';
import { AuthProvider } from "./Auth"
import { Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { SocketContext, socket } from './Socket.js'

function App() {
  return (
    <div className="App">
      
      <AuthProvider>
          <Router>
            <SocketContext.Provider value={socket} >
              <PrivateRoute exact path="/" component={ChatWindow} />
              <Route exact path="/login" component={Login} />
            </SocketContext.Provider>
          </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
