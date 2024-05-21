import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/Homepage';
import YamsEvent from './components/YamsEvent';
import Layout from './components/Layout';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="register" element={<RegistrationForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="event" element={<YamsEvent />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
