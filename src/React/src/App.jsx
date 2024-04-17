import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogInPage from './pages/LogInPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SessionPage from './pages/SessionPage.jsx';
import CurrentSessionPage from './pages/CurrentSessionPage.jsx';
import AboutPage from './pages/AboutPage.jsx';



function App() {
    return ( 
      <Router >
        <div className='App' style={{color: '#F6F6F6', height: '100vh',  width: '100%', overflowY: 'auto'}}>
          <div className='content'>
            <Routes>
              <Route path="/" element={<LogInPage />}></Route>
              <Route path="/home/:user"element={<HomePage />}></Route>
              <Route path="/session/:user" element ={<SessionPage />}></Route>
              <Route path="/current_session/:sessionname" element={<CurrentSessionPage />}></Route>
              <Route path="/idk"></Route>
              <Route path= "/about/" element={<AboutPage />}></Route>
              <Route path= "/analytics" ></Route>
            </Routes>
            </div>
          </div>
      </Router>

           );
}

export default App;
