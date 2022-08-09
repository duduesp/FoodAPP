import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from './components/Home';
import RecipeCreate from "./components/CreateRecipe";
import SearchBar from './components/SearchBar';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component={LandingPage}/>
        <div>
        <Route path= "/" component={SearchBar}/>
        <Route path= "/home" component={Home}/>
        <Route path= "/recipe" component={RecipeCreate}/>
        <Route path= "/recipes/:id" component={Detail}/>
        </div>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
