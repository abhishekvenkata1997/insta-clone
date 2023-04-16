import {useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/privateRouter';
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import { refreshToken } from './redux/actions/authActions';
import {useSelector, useDispatch} from 'react-redux'
import { getPosts } from './redux/actions/postAction'

import Alert from './components/alert/Alert'
import Header from './components/header/header'
import StatusModal from './components/StatusModal'
function App() {

  const { auth, status, modal } = useSelector(state => state)
  console.log("auth token in Login Component:", auth.token)
  const dispatch = useDispatch()
 console.log("AUTH TOKEN:"+auth.token)

 
  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])

  useEffect(() => {
    if(auth.token) dispatch(getPosts(auth.token))
  },[dispatch, auth.token])


  return (
    <>
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          <Router>
            <Alert/>
            {auth.token && <Header/>}
            {status && <StatusModal/>}
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

//<PrivateRouter exact path='/:page/:id' element={<PageRender />} />
//<Route exact path='/:page/:id' element={<PrivateRouter {...props}><PageRender /> </PrivateRouter>} />
              