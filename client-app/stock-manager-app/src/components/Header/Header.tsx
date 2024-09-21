import * as React from 'react';
import { useUser } from '../UserContext/UserContext';
import { Link } from 'react-router-dom';

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {

    const [showPopup, setShowPopup] = React.useState(false);

    const {logout} = useUser();

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        logout();
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <div className="bg-white text-gray-900 shadow-md py-6"> 
            <div className="container mx-auto px-4 flex justify-between items-center">

                <div className="flex items-center space-x-2">
                    <Link to="/" className="text-3xl font-bold tracking-wide">Stock Portfolio Optimizer</Link>
                </div>
                
                <div className="flex items-center space-x-8"> 
                    <a href="" className="bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
                      Your Portfolio
                    </a>

                    <Link to="/login" className="text-lg font-medium hover:text-blue-600 transition-colors duration-200">Sign In</Link>
                    <Link to="/register" className="text-lg font-medium hover:text-blue-600 transition-colors duration-200">Register</Link>
                    <Link to="#" onClick={handleLogout} className="text-lg font-medium hover:text-blue-600 transition-colors duration-200">Logout</Link>
                </div>
            </div>

            {/* Popup code */}
            {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>

                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <h3 className='text-xl font-semibold mb-4'>You have been logged out.</h3>
                    <button className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-green-600' onClick={closePopup}>Close</button>
                </div>

        </div>
        )}

        </div>
    );
}

export default Header;





