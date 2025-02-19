import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function User() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => setUser(res.data.data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  if (!user) {
    return <h2>Loading user details...</h2>;
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <Card
        style={{
          width: "300px",
          textAlign: "center",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Link to="/">Back</Link>
        <Card.Img
          variant="top"
          src={user.avatar}
          alt={user.first_name}
          style={{
            width: "150px",
            borderRadius: "10px",
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.5)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        <Card.Body>
          <Card.Title>{user.first_name + " " + user.last_name}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
