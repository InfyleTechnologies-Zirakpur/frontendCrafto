
// import React, { useEffect, useState } from 'react';
// import { Container, Card, Table, Badge, Spinner } from 'react-bootstrap';
// import axios from 'axios';

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/users", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (res.data.success) setUsers(res.data.users);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//       if (err.response && err.response.status === 401) {
//         alert("Session expired. Please login again.");
//         window.location.href = "/authpage";
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   return (
//     <Container fluid>
//       <h2 className="mb-4">Users Management</h2>
//       <Card>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center"><Spinner animation="border" /></div>
//           ) : (
//             <Table responsive hover>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Subscription</th>
//                   <th>Status</th>
//                   <th>Joined</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map(u => (
//                   <tr key={u._id}>
//                     <td>{u.name || "-"}</td>
//                     <td>{u.email}</td>
//                     <td>
//                       <Badge bg={u.subscription?.type === "pro" ? "warning" :
//                                   u.subscription?.type === "premium" ? "info" : "secondary"}>
//                         {u.subscription?.type || "free"}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Badge bg={u.status === "active" ? "success" : "secondary"}>
//                         {u.status}
//                       </Badge>
//                     </td>
//                     <td>{new Date(u.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Badge,
  Button,
  Modal,
  Form,
  Spinner,
  Pagination
} from "react-bootstrap";
import axios from "axios";

const API = "https://crafto-backend-zqcn.onrender.com/api/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active"
  });

  const token = localStorage.getItem("token");

  // ---------------------------------------
  // FETCH USERS
  // ---------------------------------------
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------------------------------
  // FILTER + PAGINATE (Frontend Pagination)
  // ---------------------------------------
  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedUsers = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ---------------------------------------
  // SAVE USER (CREATE / UPDATE)
  // ---------------------------------------
  const handleSave = async () => {
    try {
      if (editingUser) {
        await axios.put(`${API}/${editingUser._id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(API, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      fetchUsers();
      setShowModal(false);
      setEditingUser(null);
      setForm({ name: "", email: "", role: "user", status: "active" });
    } catch (err) {
      console.error(err);
      alert("Error saving user");
    }
  };

  // ---------------------------------------
  // DELETE USER
  // ---------------------------------------
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchUsers();
  };

  // ---------------------------------------
  // EDIT USER
  // ---------------------------------------
  const editUser = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowModal(true);
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Users Management</h2>

      {/* SEARCH + PAGE SIZE */}
      <div className="d-flex mb-3 gap-3">
        <Form.Control
          placeholder="Search by name or email..."
          style={{ width: "250px" }}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Form.Select
          style={{ width: "120px" }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
          <option value="50">50 / page</option>
        </Form.Select>

        <Button className="ms-auto" onClick={() => setShowModal(true)}>
          + Add User
        </Button>
      </div>

      <Card>
        <Card.Body>
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : (
            <>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedUsers.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><Badge bg="info">{u.role}</Badge></td>
                      <td>
                        <Badge
                          bg={u.status === "active" ? "success" : "secondary"}
                        >
                          {u.status}
                        </Badge>
                      </td>
                      <td>
                        <Button size="sm" variant="warning" onClick={() => editUser(u)}>
                          Edit
                        </Button>{" "}
                        <Button size="sm" variant="danger" onClick={() => deleteUser(u._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* PAGINATION */}
              <Pagination className="mt-3">
                <Pagination.Prev onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />

                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </>
          )}
        </Card.Body>
      </Card>

      {/* ------------------ Modal ------------------ */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Edit User" : "Create User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Users;
