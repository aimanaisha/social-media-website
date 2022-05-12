import AuthForm from './components/AuthForm';
import './App.css';
import { AuthContextProvider } from './store/AuthContext';

const App = () => {

  return (
    <AuthContextProvider>
      <AuthForm/>
    </AuthContextProvider>
  )
}

export default App;
