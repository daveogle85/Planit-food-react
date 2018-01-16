import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import CalendarPage from './components/calendar/Calendar';
import { AppRoute } from './models/Router';
import HomeContainer from './components/home/HomeContainer';

import './App.css';

const routes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: HomeContainer
  },
  {
    path: '/calendar',
    exact: true,
    component: CalendarPage
  }
];

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
