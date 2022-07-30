import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import ProfileSettings from "./components/settings/ProfileSettings";
import AccInfo from "./components/AccInfo";


const App = () => {
  const currentUser = useAuth();

  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>

      {/* <Route path="/login">
        <Login />
      </Route> */}
      {!currentUser && <Login/>}

      {currentUser && (
        <Route path="/profile">
          <Profile />
        </Route>
      )}
      {currentUser && (
        <Route path="/home">
          <Home />
        </Route>
      )}
      {currentUser && (
        <Route path="/settings">
          <ProfileSettings />
        </Route>
      )}
      {currentUser && (
        <Route path="/AccInfo">
          <AccInfo />
        </Route>
      )}

      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default App;
