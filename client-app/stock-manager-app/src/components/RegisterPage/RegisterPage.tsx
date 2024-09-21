import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../../Helpers/Constants';
import { Link } from 'react-router-dom';

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = () => {
  
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [showPopup, setShowPopup] = React.useState(false);


  const registerUser = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/users/register`, {
        username: username,
        email: email,
        password: password
      });

      if (response.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        openPopup();
      }

    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User already exists");
      } else {
        setErrorMessage("An error occured. Try again");
      }
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  }
  const closePopup = () => {
    setShowPopup(false);
  }
  


  return (
    <div className="container mx-auto p-12 flex flex-col items-center">

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mt-20">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>
        
        <form className="space-y-6" onSubmit={registerUser}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input type="text" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} placeholder="Username" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300" required />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300" required/>
          </div>

          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg text-lg hover:bg-green-600 transition-colors duration-300">Register</button>
        </form>

        {errorMessage && ( <p style={{color: 'red'}}>{errorMessage}</p>)}

        {/* Popup code */}
        {showPopup && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>

            <div className='bg-white p-6 rounded-lg shadow-lg'>
              <h3 className='text-xl font-semibold mb-4'>Account has been created</h3>
              <p>Login to get started</p>

              <div className='flex justify-between mt-4 space-x-4'>
                <Link to="/login"><button className='mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600'>Login</button></Link>
                <button className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-green-600' onClick={closePopup}>Close</button>
              </div>

            </div>
          </div>
        )}


      </div>

    </div>
  );
};

export default RegisterPage;





