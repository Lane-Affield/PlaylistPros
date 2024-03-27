import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogInPage from './pages/LogInPage.jsx';
import HomePage from './pages/HomePage.jsx';


function App() {
    return ( 
      <Router >
        <div className='App' style={{color: '#F6F6F6'}}>
          <div className='content'>
            <Routes>
              <Route path="/" element={<LogInPage />}></Route>
              <Route path="/home"element={<HomePage />}></Route>
              <Route path="/sessionSelection"></Route>
              <Route path="/idk"></Route>
              <Route path= "/about"></Route>
              <Route path= "/analytics"></Route>
            </Routes>
          </div>
        </div>
      </Router>

           );
}

export default App;
