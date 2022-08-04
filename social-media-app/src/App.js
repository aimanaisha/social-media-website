import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import ProfileSettings from "./components/settings/ProfileSettings";
import AccInfo from "./components/AccInfo";
// import { useHistory } from "react-router-dom";
// import { useEffect } from "react";

const App = () => {
  const currentUser = useAuth();
  // const history = useHistory();

  // {!currentUser && history.replace("/login")}

  // useEffect(() => {
  //   console.log(currentUser);
  //   if (!currentUser) {
  //     history.replace("/login");
  //   }
  // }, [currentUser]);
  return (
    <div>
      <Switch>
        {/* {!currentUser && (
          <Route path="/login" exact>
            <Login />
          </Route>
        )} */}

        {/* <Route path="/login">
        <Login />
      </Route> */}
        {/* {!currentUser && <Login/>} */}

        <Route path="/" exact>
        <Redirect to="/login" />
      </Route>

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
    </div>
  );
};

export default App;
