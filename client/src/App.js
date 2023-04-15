import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Login from "./pages/login";

import { refreshToken } from "./redux/actions/authActions";
import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import {} from "./redux/actions/authActions";

function App() {
  const { auth } = useSelector((state) => state);
  console.log("auth token in Login Component:", auth.token);
  const dispatch = useDispatch();
  console.log("AUTH TOKEN:" + auth.token);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Router>
            <Alert />
            <Routes>
              <Route
                exact
                path="/"
                element={auth.token ? <Home /> : <Login />}
              />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/:page" element={<PageRender />} />
              <Route exact path="/:page/:id" element={<PageRender />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}
export default App;
