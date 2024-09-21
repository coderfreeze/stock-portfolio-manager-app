import * as React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';
import { UserProvider } from './components/UserContext/UserContext';

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {



  return (
    <UserProvider>

        <div className='flex flex-col min-h-screen'>
          <Header />

          <div className='flex-grow'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/register' element={<RegisterPage/ >} />
              <Route path='/login' element={<LoginPage/ >} />
            </Routes>
          </div>

          <Footer />
        </div>

    </UserProvider>
  )
};

export default App;

