
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Homepage from './components/Homepage';
import YamsEvent from './components/YamsEvent';

const App = () => {
  return (
    <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='/event' element={<YamsEvent/>} />
          </Routes>
        </Router>
    </Provider>
  );
};

export default App;