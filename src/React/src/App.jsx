import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogInPage from './pages/LogInPage.jsx';
function App() {
    return ( 
      <Router >
        <div className='App' style={{color: '#F6F6F6'}}>
          <div className='content'>
            <Routes>
              <Route path="/" element={<LogInPage />}></Route>
              <Route path="/home"></Route>
              <Route path="/session"></Route>
              <Route path= "/about"></Route>
              <Route path= "/analytics"></Route>

            </Routes>
          </div>
        </div>
      </Router>

           );
}

export default App;
