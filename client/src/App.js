import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './pages/register'
import PageRender from './PageRender'
import Home from './pages/home'
import Login from './pages/login'

function App() {
  return (
    <>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Router>
          <Routes>
            <Route exact path ='/' element={<Login/>}/>
            <Route exact path ='/:page' element={<PageRender/>}/>
            <Route exact path = "/:page/:id" element={<PageRender/>}/>
          </Routes>
          </Router>
        </div>
      </div>

      </>
  );
}

export default App;
