import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AdminDashboard from "./components/admin/admindashboard";
import CreateEvent from "./components/admin/createevent";
import Login from "./components/login";
import Navbar from "./components/navbar";
import AdminNavbar from "./components/adminnavbar";
import Register from "./components/register";
import RegisterOrg from "./components/registerorg";
 
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/registerorg">
          <RegisterOrg/>
        </Route>
        <Route path="/dashboard">
          <Navbar/>
          <Dashboard/>
        </Route>
        <Route path="/admin/dashboard">
          <AdminNavbar/>
          <AdminDashboard/>
        </Route>
        <Route path="/admin/createevent">
          <AdminNavbar/>
          <CreateEvent/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
 
export default App;