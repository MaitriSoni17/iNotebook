import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import UserState from './context/user/UserState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';
import UserDetails from './components/UserDetails';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <UserState>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
              <Route path="/userdetails" element={<UserDetails showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      </UserState>
    </>
  );
}

export default App;
