import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../Helpers/Constants';
import { useUser } from '../UserContext/UserContext';
import axios from 'axios';

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = () => {

  const navigate = useNavigate();
  const {login} = useUser();
  
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");


  const loginUser = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${serverUrl}/users/login`, {
        email: email,
        password: password
      });

      if (response.data.token) {
        login(response.data.token);
        navigate('/');
      }

    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid Email or Password");
      } else {
        setErrorMessage("An error occured. Try again");
      }
    }
  };


  return (
    <div className="container mx-auto p-12 flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
        
        <form className="space-y-6" onSubmit={loginUser}>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input type="password"  value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" required />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300">Login</button>

        </form>

        {errorMessage && ( <p style={{color: 'red'}}>{errorMessage}</p>)}

      </div>
    </div>
  );
};

export default LoginPage;


