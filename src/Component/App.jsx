import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './home'
import '../App.css'

function App() {


  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route exact path='/Weather' component={}/> */}
      </Switch>
    </Router>
  )
}

export default App
