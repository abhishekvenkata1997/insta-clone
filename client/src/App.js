import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/privateRouter';
import Home from "./pages/home";
import Login from "./pages/login";
import Register from './pages/register'

import { refreshToken } from "./redux/actions/authActions";
import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import {} from "./redux/actions/authActions";

import Alert from './components/alert/Alert'
import Header from './components/header/header'

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
            {auth.token && <Header/>}
            <Routes>
              <Route exact path='/' element={auth.token ? <Home /> : <Login />} />
              <Route exact path='/register' element = {<Register/>} />
              <Route exact path='/Login' element={<Login />} />
              <Route exact path='/:page' element={<PrivateRouter><PageRender /></PrivateRouter>}/>
              <Route exact path='/:page/:id' element={<PrivateRouter><PageRender /></PrivateRouter>}/>
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}
export default App;
