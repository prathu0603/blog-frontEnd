import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import PostInfo from "./Components/Posts/PostInfo";
import CreateBlog from "./Components/CreateBlog/CreateBlog";
import UpdateBlog from "./Components/UpdateBlog/UpdateBlog";
import Signin from "./Components/User/Signin";
import Signup from "./Components/User/Signup";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/postInfo/:id" component={PostInfo} />
          <Route exact path="/createBlog" component={CreateBlog} />
          <Route exact path="/updateBlog/:id" component={UpdateBlog} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
