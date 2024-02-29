import {Button} from '@rneui/base';
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false);
  const handleToggle = () => setToggleRegister(!toggleRegister);
  return (
    <>
      {!toggleRegister ? (
        <LoginForm />
      ) : (
        <RegisterForm handleToggle={handleToggle} />
      )}
      <Button
        onPress={handleToggle}
        title={
          !toggleRegister ? 'No account yet? Register here!' : 'Back to Login.'
        }
      />
    </>
  );
};

export default Login;
