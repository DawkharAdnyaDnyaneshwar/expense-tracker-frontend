import {Switch, Route} from "react-router-dom"

import Landing from "./components/Landing"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import AddExpense from "./components/AddExpense"
import Budgets from "./components/Budgets"
import Compare from "./components/Compare"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />

    <ProtectedRoute path="/dashboard" component={Dashboard} />
    <ProtectedRoute path="/expense" component={AddExpense} />
    <ProtectedRoute path="/budgets" component={Budgets} />
    <ProtectedRoute path="/compare" component={Compare} />
  </Switch>
)

export default App
