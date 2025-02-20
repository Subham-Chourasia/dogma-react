import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Users from "./components/users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
