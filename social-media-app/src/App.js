import Login from './pages/Login';
import './App.css';
import Profile from './pages/Profile';
import Home from './pages/Home'
import {Route, Switch, Redirect} from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from './store/AuthContext';




const App = () => {

  const ctx = useContext(AuthContext)

  return (
     
      <Switch>

        <Route path='/' exact>
          <Redirect to='/login'/>          
        </Route>
        {!ctx.isLoggedIn && <Route path='/login'>
          <Login/></Route>}         
        {ctx.isLoggedIn && <Route path='/profile'>
          <Profile/>
        </Route>}          
        {ctx.isLoggedIn && <Route path='/home'>
          <Home/>
        </Route>}
        <Route path='*'>
          <Redirect to='/login'/>
        </Route>
        
      </Switch>
    
  )
}

export default App;
