import React from 'react';
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom'
import Novo from './pages/adicionar';
import List from './pages/listar';
import Detalhes from './pages/detalhes';
 
class App extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/">
            <List/>
          </Route>
          <Route exact path="/cadastro/:id">
            <Novo/>
          </Route>
          <Route exact path="/cadastro/">
            <Novo/>
          </Route>
          <Route exact path="/info/:id">
            <Detalhes/>
          </Route>
        </Switch>
      </Router>
    )
  }
}
export default App;