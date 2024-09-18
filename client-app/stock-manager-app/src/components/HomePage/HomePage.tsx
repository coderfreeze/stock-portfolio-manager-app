import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';

interface IHomePageProps {
}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {

  return (
    <div className='flex-grow'>
        <FormContainer/>
    </div>
  );
};

export default HomePage;
