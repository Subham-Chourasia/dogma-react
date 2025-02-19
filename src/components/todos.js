import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const lastIndex = currentPage * todosPerPage;
  const firstIndex = lastIndex - todosPerPage;
  const currentTodos = todos.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTodosPerPageChange = (event) => {
    setTodosPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (todos.length === 0) {
    return <h2>Loading To Do's ...</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="todosPerPage">Todos per page: </label>
        <select
          id="todosPerPage"
          value={todosPerPage}
          onChange={handleTodosPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>

      <ul
        style={{
          listStyle: "disc",
          padding: "20px",
          marginTop: "20px",
          textAlign: "left",
        }}
      >
        {currentTodos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: "5px",
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: currentPage === index + 1 ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
