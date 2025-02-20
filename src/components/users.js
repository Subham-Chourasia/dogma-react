import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [showAdminRights, setShowAdminRights] = useState(false);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        const updatedUsers = res.data.data.map((user) => ({
          ...user,
          address: `Unit ${user.id}, Iconic corenthum`,
          isAdmin: user.id % 2 === 0,
        }));
        console.log(updatedUsers, "updatedUsers");
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Handle edit button click
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedName( `${user.first_name} ${user.last_name}`);
    // setEditedName(user.full_name || `${user.first_name} ${user.last_name}`);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id ? { ...u, full_name: editedName } : u
      )
    );
    setSelectedUser(null);
  };

  // Handle delete with confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Handle Get Details
  const handleGetDetails = (user) => {
    setUserDetails(user);
    setShowAddress(false);
    setShowAdminRights(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User List</h2>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.full_name || `${user.first_name} ${user.last_name}`}</td>
              <td>
                <div
                  className="position-relative"
                  onMouseEnter={() => setHoveredUser(user.id)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                  {hoveredUser === user.id && (
                    <div
                      className="position-absolute"
                      style={{
                        top: "-70px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff",
                        padding: "5px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      <img
                        src={user.avatar}
                        alt={user.first_name}
                        width="100"
                        height="100"
                        className="rounded-circle"
                      />
                    </div>
                  )}
                </div>
              </td>
              <td>
                <button
                  className="btn btn-info m-1"
                  onClick={() => handleGetDetails(user)}
                  data-bs-toggle="modal"
                  data-bs-target="#detailsModal"
                >
                  Details
                </button>
                <button
                  className="btn btn-success m-1"
                  onClick={() => handleEditClick(user)}
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit User</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveChanges}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {userDetails && (
        <div className="modal fade show" id="detailsModal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  className="btn-close"
                  onClick={() => setUserDetails(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={userDetails.avatar}
                  alt={userDetails.first_name}
                  width="120"
                  height="120"
                  className="rounded-circle mb-3"
                />
                <h4>
                  {userDetails.full_name || `${userDetails.first_name} ${userDetails.last_name}`}
                </h4>
                <p>Email: {userDetails.email}</p>

                {/* Address Section */}
                {showAddress && <p><strong>Address:</strong> {userDetails.address}</p>}

                {/* Admin Rights Section */}
                {showAdminRights && (
                  <p><strong>Admin Rights:</strong> {userDetails.isAdmin ? "Yes" : "No"}</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAddress(!showAddress)}
                >
                  {showAddress ? "Hide Address" : "Show Address"}
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => setShowAdminRights(!showAdminRights)}
                >
                  {showAdminRights ? "Hide Admin Rights" : "Show Admin Rights"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setUserDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersTable;
