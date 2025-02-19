import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hidden, setHidden] = useState(true);
  const [adminStatus, setAdminStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => setUsers(res.data.data));
  }, []);

  // Open edit modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Save edited user
  const handleSave = () => {
    // Simulate saving edited data
    setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
    setShowEditModal(false);
  };

  // Open delete confirmation modal
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <Button
        variant="primary"
        onClick={() => setHidden(hidden ? false : true)}
      >
        Show Address
      </Button>
      &nbsp;
      <Button
        variant="primary"
        onClick={() => setAdminStatus(adminStatus ? false : true)}
      >
        Show Admin Rights
      </Button>
      <div
        className="my-4"
        style={{ textAlign: "center", fontSize: "50px", fontWeight: "bold" }}
      >
        User List
      </div>
      <Table
        striped
        bordered
        hover
        style={{
          width: "100%",
          textAlign: "center",
          border: "2px solid black",
        }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Avatar</th>
            <th hidden={hidden}>Address</th>
            <th hidden={adminStatus}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name + " " + user.last_name}</td>
              <td>
                <img
                  src={user.avatar}
                  alt=""
                  style={{ width: "50px", borderRadius: "50%" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.5)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </td>
              <td hidden={hidden}>
                {user.id + user.email + user.first_name + user.last_name}
              </td>
              <td hidden={adminStatus}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  Get Details
                </button>
                &nbsp;
                <button
                  className="btn btn-success"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.first_name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      first_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.last_name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      last_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedUser?.first_name}{" "}
          {selectedUser?.last_name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
