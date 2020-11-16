import './App.css';
import MainGrid from './pages/mainGrid';
import DetailedView from './pages/detailedView'
import NotFound from './pages/notFound';
import { Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/pokemon" />
        </Route>
        <Route exact path='/pokemon' component={MainGrid} />
        {/* <Route exact path='/pokemon/:name' component={DetailedView}/> */}
        <Route exact path='/pokemon/:name' render={(props) => <DetailedView {...props}  />} />
        <Route component={NotFound}></Route>  {/* //Al no poner exact path, esta sera la ruta por defecto */}
      </Switch>
    </div>
  );
}

export default App;