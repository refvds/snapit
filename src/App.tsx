import { Route, Routes } from 'react-router-dom';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { Home } from './_root/pages';
import './globals.css';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;
