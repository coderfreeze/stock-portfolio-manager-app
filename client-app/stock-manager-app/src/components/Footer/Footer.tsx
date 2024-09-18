import * as React from 'react';
import { logo1, logo2, logo3, logo4, logo5, logo6 } from '../../assets/index.ts';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <footer className="bg-white text-black py-6 mt-auto shadow-inner">
      <div className="container mx-auto px-6 flex flex-col items-center">
        
        <div className="mb-4 text-center">
          <span className="text-lg font-semibold">Financial Portfolio Optimizer | Vijay Sinha</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6">
          <img src={logo1} alt="Logo 1" className="h-8" />
          <img src={logo2} alt="Logo 2" className="h-8" />
          <img src={logo3} alt="Logo 3" className="h-8" />
          <img src={logo4} alt="Logo 4" className="h-8" />
          <img src={logo5} alt="Logo 5" className="h-8" />
          <img src={logo6} alt="Logo 6" className="h-8" />
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;

