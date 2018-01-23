import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { routes } from './Routes';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          {
              routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
            }
          </div>  
        </Router>
      </div>
    );
  }
}

export default App;
