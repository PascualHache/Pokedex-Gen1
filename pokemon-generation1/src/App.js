import './App.css';
import MainGrid from './pages/mainGrid';
import DetailedView from './pages/detailedView'
import { Switch, Route, Redirect } from 'react-router-dom'


//Page routing and redirection
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/pokemon" />
        </Route>
        <Route exact path='/pokemon' component={MainGrid} />
        <Route exact path='/pokemon/:name' render={(props) => <DetailedView {...props}  />} />
        <Route path="*" component={MainGrid} />
      </Switch>
    </div>
  );
}

export default App;