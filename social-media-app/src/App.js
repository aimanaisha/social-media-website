import Login from './pages/Login';
import './App.css';
import { AuthContextProvider } from './store/AuthContext';
import Profile from './pages/Profile';
import Home from './pages/Home'
import {Route} from 'react-router-dom'

const App = () => {

  return (
    <AuthContextProvider> 
      <Route path='/login'><Login/></Route>     
      
      <Route path='/profile'> <Profile/> </Route>
      <Route path='/home'> <Home/> </Route>
    </AuthContextProvider>
  )
}

export default App;
