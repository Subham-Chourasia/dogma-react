import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Users from "./components/users";
import User from "./components/user";
import Todos from "./components/todos";

function App() {
  return (
    <BrowserRouter>
      <Link to="todos">To Do's</Link>
      <br />
      <Link to="/">Users</Link>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/users/:id" element={<User />}></Route>
        <Route path="/todos" element={<Todos />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
