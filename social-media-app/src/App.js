import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home'
import {Route, Switch, Redirect} from 'react-router-dom'
import { useAuth } from './store/AuthContext';




const App = () => {


  const currentUser = useAuth()

  return (
     
      <Switch>

        <Route path='/' exact>
          <Redirect to='/login'/>          
        </Route>
        {!currentUser && <Login/>}         
        {currentUser && <Route path='/profile'><Profile/></Route>}          
        {currentUser && <Route path='/home'><Home/></Route>}
        <Route path='*'>
          <Redirect to='/login'/>
        </Route>
        
      </Switch>
    
  )
}

export default App;
