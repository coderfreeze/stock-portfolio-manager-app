import * as React from 'react';
import { Link } from 'react-router-dom';

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {


    return (
        <div className="bg-white text-gray-900 shadow-md py-6"> 
            <div className="container mx-auto px-4 flex justify-between items-center">

                <div className="flex items-center space-x-2">
                    <Link to="/" className="text-3xl font-bold tracking-wide">Stock Portfolio Optimizer</Link>
                </div>
                
                <div className="flex items-center space-x-8"> 
                    <a href="/dashboard" className="bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
                      Your Portfolio
                    </a>

                    <Link to="/login" className="text-lg font-medium hover:text-blue-600 transition-colors duration-200">Sign In</Link>
                    <Link to="/register" className="text-lg font-medium hover:text-blue-600 transition-colors duration-200">Register</Link>
                </div>
            </div>

        </div>
    );
}

export default Header;





