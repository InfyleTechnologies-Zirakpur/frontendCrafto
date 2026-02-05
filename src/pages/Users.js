// // import React, { useEffect, useState } from "react";
// // import {
// //   Container,
// //   Card,
// //   Table,
// //   Button,
// //   Modal,
// //   Form,
// //   Spinner,
// //   Pagination,
// //   Badge,
// //   Row,
// //   Col,
// //   Nav,
// //   Image,
// // } from "react-bootstrap";
// // import axios from "axios";

// // const API = "http://localhost:7000/api/users";
// // const PLAN_API = "http://localhost:7000/api/plans";

// // const Users = () => {
// //   const token = localStorage.getItem("token");
// //   const role = localStorage.getItem("role");

// //   // ==================== STATE MANAGEMENT ====================
// //   const [users, setUsers] = useState([]);
// //   const [plans, setPlans] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Search + Pagination
// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [pageSize, setPageSize] = useState(10);

// //   // Modals & Views
// //   const [showProfileView, setShowProfileView] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [activeTab, setActiveTab] = useState("profile");

// //   // Profile Form State
// //   const [profileForm, setProfileForm] = useState({
// //     name: "",
// //     designation: "",
// //     email: "",
// //     phoneNo: "",
// //     profileImage: null,
// //     dailyLimit: "",
// //     postsLimit: "",
// //     businessLimit: "",
// //     politicalLimit: "",
// //   });

// //   // Subscription Form
// //   const [subscriptionForm, setSubscriptionForm] = useState({
// //     planId: "",
// //     startDate: "",
// //     endDate: "",
// //   });

// //   // ==================== API CALLS ====================
  
// //   /* Fetch All Users */
// //   const fetchUsers = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(API, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUsers(res.data.users || []);
// //     } catch (err) {
// //       console.error("Failed to load users:", err);
// //       alert("Failed to load users");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* Fetch All Plans */
// //   const fetchPlans = async () => {
// //     try {
// //       const res = await axios.get(PLAN_API);
// //       setPlans(res.data.plans || []);
// //     } catch (err) {
// //       console.error("Failed to load plans:", err);
// //     }
// //   };

// //   /* Toggle User Status (Active/Inactive) */
// //   const toggleStatus = async (id) => {
// //     try {
// //       await axios.put(
// //         `${API}/toggle-status/${id}`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       fetchUsers();
      
// //       // Update selected user if viewing profile
// //       if (selectedUser && selectedUser._id === id) {
// //         setSelectedUser({
// //           ...selectedUser,
// //           status: selectedUser.status === "active" ? "inactive" : "active"
// //         });
// //       }
// //     } catch (err) {
// //       console.error("Failed to toggle status:", err);
// //       alert("Failed to update user status");
// //     }
// //   };

// //   /* Delete User */
// //   const deleteUser = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this user?")) return;
    
// //     try {
// //       await axios.delete(`${API}/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       alert("User deleted successfully");
      
// //       // Close profile view if viewing deleted user
// //       if (selectedUser && selectedUser._id === id) {
// //         setShowProfileView(false);
// //         setSelectedUser(null);
// //       }
      
// //       fetchUsers();
// //     } catch (err) {
// //       console.error("Failed to delete user:", err);
// //       alert("Failed to delete user");
// //     }
// //   };

// //   /* Update User Profile */
// //   const updateProfile = async () => {
// //     try {
// //       const formData = new FormData();
// //       formData.append("name", profileForm.name);
// //       formData.append("designation", profileForm.designation);
// //       formData.append("email", profileForm.email);
// //       formData.append("phoneNo", profileForm.phoneNo);
// //       formData.append("dailyLimit", profileForm.dailyLimit);
// //       formData.append("postsLimit", profileForm.postsLimit);
// //       formData.append("businessLimit", profileForm.businessLimit);
// //       formData.append("politicalLimit", profileForm.politicalLimit);
      
// //       if (profileForm.profileImage) {
// //         formData.append("profileImage", profileForm.profileImage);
// //       }

// //       // await axios.put(
// //       //   `${API}/profile/${selectedUser._id}`,
// //       //   formData,
// //       //   { 
// //       //     headers: { 
// //       //       Authorization: `Bearer ${token}`,
// //       //       "Content-Type": "multipart/form-data"
// //       //     } 
// //       //   }
// //       // );
// //       await axios.put(
// //   `${API}/admin/profile/${selectedUser._id}`,   // ✅ sahi
// //   formData,
// //   {
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //       "Content-Type": "multipart/form-data",
// //     },
// //   }
// // );

      
// //       alert("Profile updated successfully!");
// //       fetchUsers();
      
// //       // Refresh selected user data
// //       const updatedUsers = await axios.get(API, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const updatedUser = updatedUsers.data.users.find(u => u._id === selectedUser._id);
// //       setSelectedUser(updatedUser);
// //     } catch (err) {
// //       console.error("Failed to update profile:", err);
// //       alert("Failed to update profile");
// //     }
// //   };

// //   /* Update User Subscription */
// //   const updateSubscription = async () => {
// //     if (!subscriptionForm.planId || !subscriptionForm.startDate || !subscriptionForm.endDate) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       await axios.put(
// //         `${API}/subscription/${selectedUser._id}`,
// //         subscriptionForm,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       alert("Subscription updated successfully!");
// //       fetchUsers();
      
// //       // Refresh selected user data
// //       const updatedUsers = await axios.get(API, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const updatedUser = updatedUsers.data.users.find(u => u._id === selectedUser._id);
// //       setSelectedUser(updatedUser);
      
// //       // Reset form
// //       setSubscriptionForm({ planId: "", startDate: "", endDate: "" });
// //     } catch (err) {
// //       console.error("Failed to update subscription:", err);
// //       alert("Failed to update subscription");
// //     }
// //   };

// //   // ==================== LIFECYCLE ====================
// //   useEffect(() => {
// //     if (!token || role !== "admin") {
// //       alert("Admin access only");
// //       return;
// //     }
// //     fetchUsers();
// //     fetchPlans();
// //   }, []);

// //   // ==================== HELPER FUNCTIONS ====================
  
// //   /* Generate Random Gradient Color */
// //   const generateGradient = (name) => {
// //     if (!name) return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    
// //     const colors = [
// //       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
// //       "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
// //       "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
// //       "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
// //       "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
// //       "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
// //       "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
// //       "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
// //       "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
// //       "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
// //     ];
    
// //     const index = name.charCodeAt(0) % colors.length;
// //     return colors[index];
// //   };

// //   /* Format Date */
// //   const formatDate = (date) => {
// //     if (!date) return "N/A";
// //     const d = new Date(date);
// //     return d.toLocaleDateString("en-GB");
// //   };

// //   /* Format DateTime */
// //   const formatDateTime = (date) => {
// //     if (!date) return "N/A";
// //     const d = new Date(date);
// //     return d.toLocaleString("en-GB", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: true
// //     });
// //   };

// //   /* Open User Profile View */
// //   const openProfileView = (user) => {
// //     setSelectedUser(user);
// //     setActiveTab("profile");
    
// //     // Populate profile form
// //     setProfileForm({
// //       name: user.name || "",
// //       designation: user.designation || "",
// //       email: user.email || "",
// //       phoneNo: user.phoneNo || "",
// //       profileImage: null,
// //       dailyLimit: user.dailyLimit || 10,
// //       postsLimit: user.postsLimit || 5,
// //       businessLimit: user.businessLimit || 1,
// //       politicalLimit: user.politicalLimit || 1,
// //     });
    
// //     setShowProfileView(true);
// //   };

// //   /* Handle File Input */
// //   const handleFileChange = (e) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setProfileForm({
// //         ...profileForm,
// //         profileImage: e.target.files[0]
// //       });
// //     }
// //   };

// //   // ==================== FILTER & PAGINATION ====================
// //   const filtered = users.filter(
// //     (u) =>
// //       u.name?.toLowerCase().includes(search.toLowerCase()) ||
// //       u.email?.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const totalPages = Math.ceil(filtered.length / pageSize);
// //   const paginated = filtered.slice(
// //     (currentPage - 1) * pageSize,
// //     currentPage * pageSize
// //   );

// //   // ==================== RENDER ====================
// //   return (
// //     <Container fluid>
// //       {/* ==================== USERS LIST VIEW ==================== */}
// //       {!showProfileView && (
// //         <>
// //           <h3 className="mb-4">Users</h3>

// //           {/* Search & Page Size */}
// //           <div className="d-flex gap-2 mb-3">
// //             <Form.Control
// //               placeholder="Search..."
// //               style={{ width: 250 }}
// //               value={search}
// //               onChange={(e) => {
// //                 setSearch(e.target.value);
// //                 setCurrentPage(1);
// //               }}
// //             />
// //             <Form.Select
// //               style={{ width: 120 }}
// //               value={pageSize}
// //               onChange={(e) => {
// //                 setPageSize(+e.target.value);
// //                 setCurrentPage(1);
// //               }}
// //             >
// //               <option value={5}>5</option>
// //               <option value={10}>10</option>
// //               <option value={20}>20</option>
// //               <option value={50}>50</option>
// //             </Form.Select>
// //           </div>

// //           {/* Users Table */}
// //           <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
// //             <Card.Body>
// //               {loading ? (
// //                 <div className="text-center py-5">
// //                   <Spinner animation="border" variant="primary" />
// //                 </div>
// //               ) : (
// //                 <>
// //                   <Table hover responsive className="align-middle">
// //                     <thead style={{ background: "#f8f9fa" }}>
// //                       <tr>
// //                         <th style={{ fontWeight: "600", color: "#6c757d" }}>USER</th>
// //                         <th style={{ fontWeight: "600", color: "#6c757d" }}>SOCIAL</th>
// //                         <th style={{ fontWeight: "600", color: "#6c757d" }}>LOGIN</th>
// //                         <th style={{ fontWeight: "600", color: "#6c757d" }}>LAST ACTIVE</th>
// //                         <th style={{ fontWeight: "600", color: "#6c757d" }}>REGISTER</th>
// //                         <th style={{ fontWeight: "600", color: "#6c757d" }}>STATUS</th>
// //                         <th style={{ fontWeight: "600", color: "#6c757d" }}>ACTION</th>
// //                       </tr>
// //                     </thead>

// //                     <tbody>
// //                       {paginated.length > 0 ? (
// //                         paginated.map((u) => (
// //                           <tr key={u._id}>
// //                             {/* User Column */}
// //                             <td>
// //                               <div className="d-flex align-items-center gap-2">
// //                                 <div
// //                                   style={{
// //                                     width: 40,
// //                                     height: 40,
// //                                     borderRadius: "50%",
// //                                     background: generateGradient(u.name),
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     justifyContent: "center",
// //                                     color: "white",
// //                                     fontWeight: "bold",
// //                                     fontSize: "16px",
// //                                     boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
// //                                   }}
// //                                 >
// //                                   {u.name?.charAt(0).toUpperCase() || "U"}
// //                                 </div>
// //                                 <span style={{ fontWeight: "500" }}>{u.name || "Unknown"}</span>
// //                               </div>
// //                             </td>

// //                             {/* Social Column */}
// //                             <td>
// //                               <Badge bg="secondary" style={{ fontSize: "12px" }}>
// //                                 google
// //                               </Badge>
// //                             </td>

// //                             {/* Login Email */}
// //                             <td style={{ color: "#6c757d" }}>{u.email || "N/A"}</td>

// //                             {/* Last Active */}
// //                             <td style={{ color: "#6c757d" }}>
// //                               {u.lastActive ? formatDate(u.lastActive) : "N/A"}
// //                             </td>

// //                             {/* Register Date */}
// //                             <td style={{ color: "#6c757d" }}>
// //                               {formatDateTime(u.createdAt)}
// //                             </td>

// //                             {/* Status Toggle */}
// //                             <td>
// //                               <Form.Check
// //                                 type="switch"
// //                                 id={`status-switch-${u._id}`}
// //                                 checked={u.status === "active"}
// //                                 onChange={() => toggleStatus(u._id)}
// //                                 style={{ cursor: "pointer" }}
// //                               />
// //                             </td>

// //                             {/* Action Buttons */}
// //                             <td>
// //                               <div className="d-flex gap-2">
// //                                 {/* View Profile */}
// //                                 <Button
// //                                   size="sm"
// //                                   style={{
// //                                     background: "#FFC107",
// //                                     border: "none",
// //                                     borderRadius: "8px",
// //                                     width: "36px",
// //                                     height: "36px",
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     justifyContent: "center",
// //                                   }}
// //                                   onClick={() => openProfileView(u)}
// //                                   title="View Profile"
// //                                 >
// //                                   👁
// //                                 </Button>

// //                                 {/* Delete User */}
// //                                 <Button
// //                                   size="sm"
// //                                   style={{
// //                                     background: "#FF4D6D",
// //                                     border: "none",
// //                                     borderRadius: "8px",
// //                                     width: "36px",
// //                                     height: "36px",
// //                                     display: "flex",
// //                                     alignItems: "center",
// //                                     justifyContent: "center",
// //                                   }}
// //                                   onClick={() => deleteUser(u._id)}
// //                                   title="Delete User"
// //                                 >
// //                                   🗑
// //                                 </Button>
// //                               </div>
// //                             </td>
// //                           </tr>
// //                         ))
// //                       ) : (
// //                         <tr>
// //                           <td colSpan="7" className="text-center py-4">
// //                             <p className="text-muted mb-0">No users found</p>
// //                           </td>
// //                         </tr>
// //                       )}
// //                     </tbody>
// //                   </Table>

// //                   {/* Pagination */}
// //                   {totalPages > 1 && (
// //                     <div className="d-flex justify-content-center mt-3">
// //                       <Pagination>
// //                         <Pagination.First
// //                           onClick={() => setCurrentPage(1)}
// //                           disabled={currentPage === 1}
// //                         />
// //                         <Pagination.Prev
// //                           onClick={() => setCurrentPage(currentPage - 1)}
// //                           disabled={currentPage === 1}
// //                         />

// //                         {[...Array(totalPages)].map((_, i) => {
// //                           const pageNum = i + 1;
// //                           if (
// //                             pageNum === 1 ||
// //                             pageNum === totalPages ||
// //                             (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
// //                           ) {
// //                             return (
// //                               <Pagination.Item
// //                                 key={i}
// //                                 active={pageNum === currentPage}
// //                                 onClick={() => setCurrentPage(pageNum)}
// //                               >
// //                                 {pageNum}
// //                               </Pagination.Item>
// //                             );
// //                           } else if (
// //                             pageNum === currentPage - 2 ||
// //                             pageNum === currentPage + 2
// //                           ) {
// //                             return <Pagination.Ellipsis key={i} disabled />;
// //                           }
// //                           return null;
// //                         })}

// //                         <Pagination.Next
// //                           onClick={() => setCurrentPage(currentPage + 1)}
// //                           disabled={currentPage === totalPages}
// //                         />
// //                         <Pagination.Last
// //                           onClick={() => setCurrentPage(totalPages)}
// //                           disabled={currentPage === totalPages}
// //                         />
// //                       </Pagination>
// //                     </div>
// //                   )}
// //                 </>
// //               )}
// //             </Card.Body>
// //           </Card>
// //         </>
// //       )}

// //       {/* ==================== USER PROFILE VIEW ==================== */}
// //       {showProfileView && selectedUser && (
// //         <Container fluid className="py-4">
// //           {/* Back Button */}
// //           <Button
// //             variant="link"
// //             onClick={() => {
// //               setShowProfileView(false);
// //               setSelectedUser(null);
// //             }}
// //             className="mb-3 p-0"
// //             style={{ textDecoration: "none", color: "#00BCD4", fontWeight: "600" }}
// //           >
// //             ← Back to Users
// //           </Button>

// //           <Row>
// //             {/* ==================== LEFT SIDEBAR ==================== */}
// //             <Col lg={3} md={4} className="mb-4">
// //               <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
// //                 <Card.Body className="text-center">
// //                   {/* Profile Picture */}
// //                   <div
// //                     style={{
// //                       width: 150,
// //                       height: 150,
// //                       borderRadius: "50%",
// //                       background: generateGradient(selectedUser.name),
// //                       margin: "0 auto 20px",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       fontSize: "48px",
// //                       color: "white",
// //                       fontWeight: "bold",
// //                       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// //                     }}
// //                   >
// //                     {selectedUser.name?.charAt(0).toUpperCase() || "U"}
// //                   </div>

// //                   {/* User Name */}
// //                   <h4 style={{ fontWeight: "700", marginBottom: "5px" }}>
// //                     {selectedUser.name || "Unknown User"}
// //                   </h4>

// //                   {/* Email Icon */}
// //                   <div className="mb-2">
// //                     <span style={{ fontSize: "20px" }}>✉️</span>
// //                   </div>

// //                   {/* User ID */}
// //                   <div className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
// //                     <span>👤 {selectedUser._id?.slice(-6) || "N/A"}</span>
// //                   </div>

// //                   {/* Follower Count */}
// //                   <div className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
// //                     <span>👥 {selectedUser.followers || 0}</span>
// //                   </div>

// //                   {/* Registration Date */}
// //                   <div className="mb-3" style={{ fontSize: "14px", color: "#666" }}>
// //                     <span>
// //                       📅{" "}
// //                       {selectedUser.createdAt
// //                         ? new Date(selectedUser.createdAt).toLocaleDateString("en-GB", {
// //                             day: "2-digit",
// //                             month: "short",
// //                             year: "2-digit",
// //                           })
// //                         : "N/A"}
// //                     </span>
// //                   </div>

// //                   {/* Subscription Info */}
// //                   <div
// //                     className="mb-3 p-3"
// //                     style={{
// //                       background: "#f8f9fa",
// //                       borderRadius: "8px",
// //                       textAlign: "left",
// //                     }}
// //                   >
// //                     <h6 style={{ fontWeight: "600", marginBottom: "10px" }}>
// //                       SUBSCRIPTION
// //                     </h6>
// //                     <div style={{ fontSize: "14px", marginBottom: "5px" }}>
// //                       <strong>Plan -</strong>{" "}
// //                       {selectedUser.subscription?.plan?.name || "No Plan"}
// //                     </div>
// //                     <div style={{ fontSize: "14px", marginBottom: "5px" }}>
// //                       <strong>Start -</strong>{" "}
// //                       {selectedUser.subscription?.startDate
// //                         ? formatDate(selectedUser.subscription.startDate)
// //                         : "N/A"}
// //                     </div>
// //                     <div style={{ fontSize: "14px" }}>
// //                       <strong>End -</strong>{" "}
// //                       {selectedUser.subscription?.endDate
// //                         ? formatDate(selectedUser.subscription.endDate)
// //                         : "N/A"}
// //                     </div>
// //                   </div>

// //                   {/* Business & Frames Count */}
// //                   <Row className="mb-3">
// //                     <Col xs={6}>
// //                       <div style={{ textAlign: "center" }}>
// //                         <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
// //                           {selectedUser.businessCount || 0}
// //                         </h5>
// //                         <small style={{ color: "#666" }}>Business</small>
// //                       </div>
// //                     </Col>
// //                     <Col xs={6}>
// //                       <div style={{ textAlign: "center" }}>
// //                         <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
// //                           {selectedUser.framesCount || 0}
// //                         </h5>
// //                         <small style={{ color: "#666" }}>Frames</small>
// //                       </div>
// //                     </Col>
// //                   </Row>

// //                   {/* Action Buttons */}
// //                   <div className="d-flex gap-2">
// //                     <Button
// //                       variant="danger"
// //                       style={{
// //                         flex: 1,
// //                         borderRadius: "8px",
// //                         fontWeight: "600",
// //                       }}
// //                       onClick={() => deleteUser(selectedUser._id)}
// //                     >
// //                       🗑 Delete
// //                     </Button>
// //                     <Button
// //                       style={{
// //                         flex: 1,
// //                         background:
// //                           selectedUser.status === "active" ? "#dc3545" : "#28a745",
// //                         border: "none",
// //                         borderRadius: "8px",
// //                         fontWeight: "600",
// //                       }}
// //                       onClick={() => toggleStatus(selectedUser._id)}
// //                     >
// //                       {selectedUser.status === "active" ? "Block User" : "Unblock User"}
// //                     </Button>
// //                   </div>
// //                 </Card.Body>
// //               </Card>
// //             </Col>

// //             {/* ==================== RIGHT SIDE - TABS ==================== */}
// //             <Col lg={9} md={8}>
// //               <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
// //                 <Card.Header
// //                   style={{ background: "white", borderBottom: "2px solid #f0f0f0" }}
// //                 >
// //                   <h3
// //                     style={{
// //                       fontWeight: "700",
// //                       textTransform: "uppercase",
// //                       marginBottom: "20px",
// //                     }}
// //                   >
// //                     {selectedUser.name || "User Profile"}
// //                   </h3>

// //                   {/* Tabs */}
// //                   <Nav variant="tabs" activeKey={activeTab}>
// //                     <Nav.Item>
// //                       <Nav.Link
// //                         eventKey="profile"
// //                         onClick={() => setActiveTab("profile")}
// //                         style={{
// //                           color: activeTab === "profile" ? "#00BCD4" : "#666",
// //                           borderBottom:
// //                             activeTab === "profile" ? "3px solid #00BCD4" : "none",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Profile
// //                       </Nav.Link>
// //                     </Nav.Item>
// //                     <Nav.Item>
// //                       <Nav.Link
// //                         eventKey="subscription"
// //                         onClick={() => setActiveTab("subscription")}
// //                         style={{
// //                           color: activeTab === "subscription" ? "#00BCD4" : "#666",
// //                           borderBottom:
// //                             activeTab === "subscription" ? "3px solid #00BCD4" : "none",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Subscription
// //                       </Nav.Link>
// //                     </Nav.Item>
// //                     <Nav.Item>
// //                       <Nav.Link
// //                         eventKey="frames"
// //                         onClick={() => setActiveTab("frames")}
// //                         style={{
// //                           color: activeTab === "frames" ? "#00BCD4" : "#666",
// //                           borderBottom:
// //                             activeTab === "frames" ? "3px solid #00BCD4" : "none",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Frames
// //                       </Nav.Link>
// //                     </Nav.Item>
// //                     <Nav.Item>
// //                       <Nav.Link
// //                         eventKey="business"
// //                         onClick={() => setActiveTab("business")}
// //                         style={{
// //                           color: activeTab === "business" ? "#00BCD4" : "#666",
// //                           borderBottom:
// //                             activeTab === "business" ? "3px solid #00BCD4" : "none",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Business
// //                       </Nav.Link>
// //                     </Nav.Item>
// //                     <Nav.Item>
// //                       <Nav.Link
// //                         eventKey="wallets"
// //                         onClick={() => setActiveTab("wallets")}
// //                         style={{
// //                           color: activeTab === "wallets" ? "#00BCD4" : "#666",
// //                           borderBottom:
// //                             activeTab === "wallets" ? "3px solid #00BCD4" : "none",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Wallets
// //                       </Nav.Link>
// //                     </Nav.Item>
// //                     <Nav.Item>
// //                       <Nav.Link
// //                         eventKey="transaction"
// //                         onClick={() => setActiveTab("transaction")}
// //                         style={{
// //                           color: activeTab === "transaction" ? "#00BCD4" : "#666",
// //                           borderBottom:
// //                             activeTab === "transaction" ? "3px solid #00BCD4" : "none",
// //                           fontWeight: "600",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Transaction
// //                       </Nav.Link>
// //                     </Nav.Item>
// //                   </Nav>
// //                 </Card.Header>

// //                 <Card.Body className="p-4">
// //                   {/* ==================== PROFILE TAB ==================== */}
// //                   {activeTab === "profile" && (
// //                     <div>
// //                       <h5 style={{ fontWeight: "600", marginBottom: "20px" }}>
// //                         User Details
// //                       </h5>

// //                       <Form>
// //                         <Row>
// //                           {/* User Name */}
// //                           <Col md={6} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 User Name
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="text"
// //                                 value={profileForm.name}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     name: e.target.value,
// //                                   })
// //                                 }
// //                                 placeholder="Enter user name"
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Designation */}
// //                           <Col md={6} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 Designation
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="text"
// //                                 value={profileForm.designation}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     designation: e.target.value,
// //                                   })
// //                                 }
// //                                 placeholder="Enter designation"
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* User Email */}
// //                           <Col md={12} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 User Email
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="email"
// //                                 value={profileForm.email}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     email: e.target.value,
// //                                   })
// //                                 }
// //                                 placeholder="Enter email"
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Phone No */}
// //                           <Col md={12} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 Phone No
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="text"
// //                                 value={profileForm.phoneNo}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     phoneNo: e.target.value,
// //                                   })
// //                                 }
// //                                 placeholder="Enter phone number"
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Profile Image */}
// //                           <Col md={12} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 Profile
// //                               </Form.Label>
// //                               <div className="d-flex align-items-center gap-3">
// //                                 <Form.Control
// //                                   type="file"
// //                                   accept="image/*"
// //                                   onChange={handleFileChange}
// //                                 />
// //                                 {(selectedUser.profileImage || profileForm.profileImage) && (
// //                                   <div
// //                                     style={{
// //                                       width: 100,
// //                                       height: 100,
// //                                       borderRadius: "8px",
// //                                       overflow: "hidden",
// //                                       border: "2px solid #e0e0e0",
// //                                     }}
// //                                   >
// //                                     <img
// //                                       src={
// //                                         profileForm.profileImage
// //                                           ? URL.createObjectURL(profileForm.profileImage)
// //                                           : selectedUser.profileImage
// //                                       }
// //                                       alt="Profile Preview"
// //                                       style={{
// //                                         width: "100%",
// //                                         height: "100%",
// //                                         objectFit: "cover",
// //                                       }}
// //                                     />
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Limits Section */}
// //                           <Col xs={12}>
// //                             <hr className="my-4" />
// //                             <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>
// //                               User Limits
// //                             </h6>
// //                           </Col>

// //                           {/* Daily Limit */}
// //                           <Col md={3} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 Daily Limit
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="number"
// //                                 value={profileForm.dailyLimit}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     dailyLimit: e.target.value,
// //                                   })
// //                                 }
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Posts Limit */}
// //                           <Col md={3} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 Posts Limit
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="number"
// //                                 value={profileForm.postsLimit}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     postsLimit: e.target.value,
// //                                   })
// //                                 }
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Business Limit */}
// //                           <Col md={3} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 Business Limit
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="number"
// //                                 value={profileForm.businessLimit}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     businessLimit: e.target.value,
// //                                   })
// //                                 }
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Political Limit */}
// //                           <Col md={3} className="mb-3">
// //                             <Form.Group>
// //                               <Form.Label style={{ fontWeight: "500" }}>
// //                                 Political Limit
// //                               </Form.Label>
// //                               <Form.Control
// //                                 type="number"
// //                                 value={profileForm.politicalLimit}
// //                                 onChange={(e) =>
// //                                   setProfileForm({
// //                                     ...profileForm,
// //                                     politicalLimit: e.target.value,
// //                                   })
// //                                 }
// //                               />
// //                             </Form.Group>
// //                           </Col>

// //                           {/* Update Button */}
// //                           <Col md={12}>
// //                             <Button
// //                               style={{
// //                                 width: "100%",
// //                                 background: "#00BCD4",
// //                                 border: "none",
// //                                 padding: "12px",
// //                                 fontSize: "16px",
// //                                 fontWeight: "600",
// //                                 borderRadius: "8px",
// //                                 marginTop: "15px",
// //                               }}
// //                               onClick={updateProfile}
// //                             >
// //                               Update Profile
// //                             </Button>
// //                           </Col>
// //                         </Row>
// //                       </Form>
// //                     </div>
// //                   )}

// //                   {/* ==================== SUBSCRIPTION TAB ==================== */}
// //                   {activeTab === "subscription" && (
// //                     <div>
// //                       <h5 style={{ fontWeight: "600", marginBottom: "20px" }}>
// //                         User Subscription
// //                       </h5>

// //                       <Row>
// //                         <Col md={6}>
// //                           <Form.Group className="mb-3">
// //                             <Form.Label style={{ fontWeight: "500" }}>
// //                               Select Plan
// //                             </Form.Label>
// //                             <Form.Select
// //                               value={subscriptionForm.planId}
// //                               onChange={(e) =>
// //                                 setSubscriptionForm({
// //                                   ...subscriptionForm,
// //                                   planId: e.target.value,
// //                                 })
// //                               }
// //                             >
// //                               <option value="">Select Plan</option>
// //                               {plans.map((p) => (
// //                                 <option key={p._id} value={p._id}>
// //                                   {p.name}
// //                                 </option>
// //                               ))}
// //                             </Form.Select>
// //                           </Form.Group>
// //                         </Col>

// //                         <Col md={6}>
// //                           <Form.Group className="mb-3">
// //                             <Form.Label style={{ fontWeight: "500" }}>
// //                               Select Subscription
// //                             </Form.Label>
// //                             <Form.Select>
// //                               <option>Select Subscription</option>
// //                               <option>Monthly</option>
// //                               <option>Quarterly</option>
// //                               <option>Yearly</option>
// //                             </Form.Select>
// //                           </Form.Group>
// //                         </Col>

// //                         <Col md={12}>
// //                           <Form.Group className="mb-3">
// //                             <Form.Label style={{ fontWeight: "500" }}>
// //                               Start date
// //                             </Form.Label>
// //                             <Form.Control
// //                               type="date"
// //                               value={subscriptionForm.startDate}
// //                               onChange={(e) =>
// //                                 setSubscriptionForm({
// //                                   ...subscriptionForm,
// //                                   startDate: e.target.value,
// //                                 })
// //                               }
// //                               placeholder="dd-mm-yyyy"
// //                             />
// //                           </Form.Group>
// //                         </Col>

// //                         <Col md={12}>
// //                           <Form.Group className="mb-3">
// //                             <Form.Label style={{ fontWeight: "500" }}>
// //                               End date
// //                             </Form.Label>
// //                             <Form.Control
// //                               type="date"
// //                               value={subscriptionForm.endDate}
// //                               onChange={(e) =>
// //                                 setSubscriptionForm({
// //                                   ...subscriptionForm,
// //                                   endDate: e.target.value,
// //                                 })
// //                               }
// //                               placeholder="dd-mm-yyyy"
// //                             />
// //                           </Form.Group>
// //                         </Col>
// //                       </Row>

// //                       <Button
// //                         style={{
// //                           width: "100%",
// //                           background: "#00BCD4",
// //                           border: "none",
// //                           padding: "12px",
// //                           fontSize: "16px",
// //                           fontWeight: "600",
// //                           borderRadius: "8px",
// //                         }}
// //                         onClick={updateSubscription}
// //                       >
// //                         Update
// //                       </Button>
// //                     </div>
// //                   )}

// //                   {/* ==================== FRAMES TAB ==================== */}
// //                   {activeTab === "frames" && (
// //                     <div className="text-center py-5">
// //                       <p style={{ color: "#999", fontSize: "16px" }}>
// //                         Frames information will appear here
// //                       </p>
// //                       <small style={{ color: "#ccc" }}>
// //                         Feature coming soon...
// //                       </small>
// //                     </div>
// //                   )}

// //                   {/* ==================== BUSINESS TAB ==================== */}
// //                   {activeTab === "business" && (
// //                     <div className="text-center py-5">
// //                       <p style={{ color: "#999", fontSize: "16px" }}>
// //                         Business information will appear here
// //                       </p>
// //                       <small style={{ color: "#ccc" }}>
// //                         Feature coming soon...
// //                       </small>
// //                     </div>
// //                   )}

// //                   {/* ==================== WALLETS TAB ==================== */}
// //                   {activeTab === "wallets" && (
// //                     <div className="text-center py-5">
// //                       <p style={{ color: "#999", fontSize: "16px" }}>
// //                         Wallet information will appear here
// //                       </p>
// //                       <small style={{ color: "#ccc" }}>
// //                         Feature coming soon...
// //                       </small>
// //                     </div>
// //                   )}

// //                   {/* ==================== TRANSACTION TAB ==================== */}
// //                   {activeTab === "transaction" && (
// //                     <div className="text-center py-5">
// //                       <p style={{ color: "#999", fontSize: "16px" }}>
// //                         Transaction history will appear here
// //                       </p>
// //                       <small style={{ color: "#ccc" }}>
// //                         Feature coming soon...
// //                       </small>
// //                     </div>
// //                   )}
// //                 </Card.Body>
// //               </Card>

// //               {/* ADD NEW BUTTONS */}
// //               {/* <div className="mt-3 d-flex gap-2 justify-content-end">
// //                 <Button
// //                   style={{
// //                     background: "#00BCD4",
// //                     border: "none",
// //                     padding: "10px 20px",
// //                     fontWeight: "600",
// //                     borderRadius: "8px",
// //                   }}
// //                 >
// //                   ➕ Add New Business
// //                 </Button>
// //                 <Button
// //                   style={{
// //                     background: "#00BCD4",
// //                     border: "none",
// //                     padding: "10px 20px",
// //                     fontWeight: "600",
// //                     borderRadius: "8px",
// //                   }}
// //                 >
// //                   ➕ Add New Frame
// //                 </Button>
// //               </div> */}
// //             </Col>
// //           </Row>
// //         </Container>
// //       )}
// //     </Container>
// //   );
// // };

// // export default Users;


// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Spinner,
//   Pagination,
//   Badge,
//   Row,
//   Col,
//   Nav,
//   Image,
//   Alert,
// } from "react-bootstrap";
// import axios from "axios";

// const API = "http://localhost:7000/api/users";
// const PLAN_API = "http://localhost:7000/api/plans";

// const Users = () => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // ==================== STATE MANAGEMENT ====================
//   const [users, setUsers] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Search + Pagination
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   // Modals & Views
//   const [showProfileView, setShowProfileView] = useState(false);
//   const [showAddUserModal, setShowAddUserModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("profile");

//   // Alert State
//   const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

//   // Profile Form State
//   const [profileForm, setProfileForm] = useState({
//     name: "",
//     designation: "",
//     email: "",
//     phoneNo: "",
//     profileImage: null,
//     dailyLimit: "",
//     postsLimit: "",
//     businessLimit: "",
//     politicalLimit: "",
//   });

//   // Add User Form State
//   const [addUserForm, setAddUserForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     designation: "",
//     phoneNo: "",
//     profileImage: null,
//     dailyLimit: 10,
//     postsLimit: 5,
//     businessLimit: 1,
//     politicalLimit: 1,
//     status: "active",
//   });

//   // Subscription Form
//   const [subscriptionForm, setSubscriptionForm] = useState({
//     planId: "",
//     startDate: "",
//     endDate: "",
//   });

//   // ==================== HELPER FUNCTIONS ====================
  
//   // Show Alert
//   const showAlert = (message, variant = "success") => {
//     setAlert({ show: true, message, variant });
//     setTimeout(() => {
//       setAlert({ show: false, message: "", variant: "" });
//     }, 3000);
//   };

//   // Reset Add User Form
//   const resetAddUserForm = () => {
//     setAddUserForm({
//       name: "",
//       email: "",
//       password: "",
//       designation: "",
//       phoneNo: "",
//       profileImage: null,
//       dailyLimit: 10,
//       postsLimit: 5,
//       businessLimit: 1,
//       politicalLimit: 1,
//       status: "active",
//     });
//   };

//   // ==================== API CALLS ====================
  
//   /* Fetch All Users */
//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data.users || []);
//     } catch (err) {
//       console.error("Failed to load users:", err);
//       showAlert("Failed to load users", "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* Fetch All Plans */
//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get(PLAN_API);
//       setPlans(res.data.plans || []);
//     } catch (err) {
//       console.error("Failed to load plans:", err);
//     }
//   };

//   /* Add New User */
//   const addNewUser = async () => {
//     // Validation
//     if (!addUserForm.name || !addUserForm.email || !addUserForm.password) {
//       showAlert("Please fill in all required fields (Name, Email, Password)", "danger");
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(addUserForm.email)) {
//       showAlert("Please enter a valid email address", "danger");
//       return;
//     }

//     // Password validation
//     // if (addUserForm.password.length < 6) {
//     //   showAlert("Password must be at least 6 characters long", "danger");
//     //   return;
//     // }

//     try {
//       const formData = new FormData();
//       formData.append("name", addUserForm.name);
//       formData.append("email", addUserForm.email);
//       formData.append("password", addUserForm.password);
//       formData.append("designation", addUserForm.designation);
//       formData.append("phoneNo", addUserForm.phoneNo);
//       formData.append("dailyLimit", addUserForm.dailyLimit);
//       formData.append("postsLimit", addUserForm.postsLimit);
//       formData.append("businessLimit", addUserForm.businessLimit);
//       formData.append("politicalLimit", addUserForm.politicalLimit);
//       formData.append("status", addUserForm.status);
      
//       if (addUserForm.profileImage) {
//         formData.append("profileImage", addUserForm.profileImage);
//       }

//       await axios.post(`${API}/admin/add`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       showAlert("User added successfully!", "success");
//       setShowAddUserModal(false);
//       resetAddUserForm();
//       fetchUsers();
//     } catch (err) {
//       console.error("Failed to add user:", err);
//       const errorMessage = err.response?.data?.message || "Failed to add user";
//       showAlert(errorMessage, "danger");
//     }
//   };

//   /* Toggle User Status (Active/Inactive) */
//   const toggleStatus = async (id) => {
//     try {
//       await axios.put(
//         `${API}/toggle-status/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchUsers();
      
//       // Update selected user if viewing profile
//       if (selectedUser && selectedUser._id === id) {
//         setSelectedUser({
//           ...selectedUser,
//           status: selectedUser.status === "active" ? "inactive" : "active"
//         });
//       }
//     } catch (err) {
//       console.error("Failed to toggle status:", err);
//       showAlert("Failed to update user status", "danger");
//     }
//   };

//   /* Delete User */
//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
    
//     try {
//       await axios.delete(`${API}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       showAlert("User deleted successfully", "success");
      
//       // Close profile view if viewing deleted user
//       if (selectedUser && selectedUser._id === id) {
//         setShowProfileView(false);
//         setSelectedUser(null);
//       }
      
//       fetchUsers();
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//       showAlert("Failed to delete user", "danger");
//     }
//   };

//   /* Update User Profile */
//   const updateProfile = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", profileForm.name);
//       formData.append("designation", profileForm.designation);
//       formData.append("email", profileForm.email);
//       formData.append("phoneNo", profileForm.phoneNo);
//       formData.append("dailyLimit", profileForm.dailyLimit);
//       formData.append("postsLimit", profileForm.postsLimit);
//       formData.append("businessLimit", profileForm.businessLimit);
//       formData.append("politicalLimit", profileForm.politicalLimit);
      
//       if (profileForm.profileImage) {
//         formData.append("profileImage", profileForm.profileImage);
//       }

//       await axios.put(
//         `${API}/admin/profile/${selectedUser._id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       showAlert("Profile updated successfully!", "success");
//       fetchUsers();
      
//       // Refresh selected user data
//       const updatedUsers = await axios.get(API, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const updatedUser = updatedUsers.data.users.find(u => u._id === selectedUser._id);
//       setSelectedUser(updatedUser);
//     } catch (err) {
//       console.error("Failed to update profile:", err);
//       showAlert("Failed to update profile", "danger");
//     }
//   };

//   /* Update User Subscription */
//   const updateSubscription = async () => {
//     if (!subscriptionForm.planId || !subscriptionForm.startDate || !subscriptionForm.endDate) {
//       showAlert("Please fill all subscription fields", "danger");
//       return;
//     }

//     try {
//       await axios.put(
//         `${API}/subscription/${selectedUser._id}`,
//         subscriptionForm,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       showAlert("Subscription updated successfully!", "success");
//       fetchUsers();
      
//       // Refresh selected user data
//       const updatedUsers = await axios.get(API, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const updatedUser = updatedUsers.data.users.find(u => u._id === selectedUser._id);
//       setSelectedUser(updatedUser);
      
//       // Reset form
//       setSubscriptionForm({ planId: "", startDate: "", endDate: "" });
//     } catch (err) {
//       console.error("Failed to update subscription:", err);
//       showAlert("Failed to update subscription", "danger");
//     }
//   };

//   // ==================== LIFECYCLE ====================
//   useEffect(() => {
//     if (!token || role !== "admin") {
//       alert("Admin access only");
//       return;
//     }
//     fetchUsers();
//     fetchPlans();
//   }, []);

//   // ==================== HELPER FUNCTIONS ====================
  
//   /* Generate Random Gradient Color */
//   const generateGradient = (name) => {
//     if (!name) return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    
//     const colors = [
//       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//       "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//       "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
//       "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
//       "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
//       "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
//       "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
//       "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
//       "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
//     ];
    
//     const index = name.charCodeAt(0) % colors.length;
//     return colors[index];
//   };

//   /* Format Date */
//   const formatDate = (date) => {
//     if (!date) return "N/A";
//     const d = new Date(date);
//     return d.toLocaleDateString("en-GB");
//   };

//   /* Format DateTime */
//   const formatDateTime = (date) => {
//     if (!date) return "N/A";
//     const d = new Date(date);
//     return d.toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true
//     });
//   };

//   /* Open User Profile View */
//   const openProfileView = (user) => {
//     setSelectedUser(user);
//     setActiveTab("profile");
    
//     // Populate profile form
//     setProfileForm({
//       name: user.name || "",
//       designation: user.designation || "",
//       email: user.email || "",
//       phoneNo: user.phoneNo || "",
//       profileImage: null,
//       dailyLimit: user.dailyLimit || 10,
//       postsLimit: user.postsLimit || 5,
//       businessLimit: user.businessLimit || 1,
//       politicalLimit: user.politicalLimit || 1,
//     });
    
//     setShowProfileView(true);
//   };

//   /* Handle File Input for Profile Update */
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfileForm({
//         ...profileForm,
//         profileImage: e.target.files[0]
//       });
//     }
//   };

//   /* Handle File Input for Add User */
//   const handleAddUserFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setAddUserForm({
//         ...addUserForm,
//         profileImage: e.target.files[0]
//       });
//     }
//   };

//   // ==================== FILTER & PAGINATION ====================
//   const filtered = users.filter(
//     (u) =>
//       u.name?.toLowerCase().includes(search.toLowerCase()) ||
//       u.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / pageSize);
//   const paginated = filtered.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   // ==================== RENDER ====================
//   return (
//     <Container fluid>
//       {/* Alert Notification */}
//       {alert.show && (
//         <Alert 
//           variant={alert.variant} 
//           onClose={() => setAlert({ show: false, message: "", variant: "" })} 
//           dismissible
//           style={{
//             position: "fixed",
//             top: "20px",
//             right: "20px",
//             zIndex: 9999,
//             minWidth: "300px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
//           }}
//         >
//           {alert.message}
//         </Alert>
//       )}

//       {/* ==================== ADD USER MODAL ==================== */}
//       <Modal 
//         show={showAddUserModal} 
//         onHide={() => {
//           setShowAddUserModal(false);
//           resetAddUserForm();
//         }}
//         size="lg"
//         centered
//       >
//         <Modal.Header closeButton style={{ borderBottom: "2px solid #00BCD4" }}>
//           <Modal.Title style={{ color: "#00BCD4", fontWeight: "700" }}>
//             ➕ Add New User
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="p-4">
//           <Form>
//             <Row>
//               {/* User Name */}
//               <Col md={6} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>
//                     User Name <span style={{ color: "red" }}>*</span>
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={addUserForm.name}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, name: e.target.value })
//                     }
//                     placeholder="Enter full name"
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               {/* Email */}
//               <Col md={6} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>
//                     Email <span style={{ color: "red" }}>*</span>
//                   </Form.Label>
//                   <Form.Control
//                     type="email"
//                     value={addUserForm.email}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, email: e.target.value })
//                     }
//                     placeholder="Enter email address"
//                     required
//                   />
//                 </Form.Group>
//               </Col>

//               {/* Password */}
//               {/* <Col md={6} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>
//                     Password <span style={{ color: "red" }}>*</span>
//                   </Form.Label>
//                   <Form.Control
//                     type="password"
//                     value={addUserForm.password}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, password: e.target.value })
//                     }
//                     placeholder="Min 6 characters"
//                     required
//                   />
//                 </Form.Group>
//               </Col> */}

//               {/* Phone Number */}
//               <Col md={6} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Phone Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={addUserForm.phoneNo}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, phoneNo: e.target.value })
//                     }
//                     placeholder="Enter phone number"
//                   />
//                 </Form.Group>
//               </Col>

//               {/* Designation */}
//               <Col md={12} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Designation</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={addUserForm.designation}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, designation: e.target.value })
//                     }
//                     placeholder="e.g., Manager, Developer, etc."
//                   />
//                 </Form.Group>
//               </Col>

//               {/* Profile Image */}
//               <Col md={12} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Profile Image</Form.Label>
//                   <div className="d-flex align-items-center gap-3">
//                     <Form.Control
//                       type="file"
//                       accept="image/*"
//                       onChange={handleAddUserFileChange}
//                     />
//                     {addUserForm.profileImage && (
//                       <div
//                         style={{
//                           width: 60,
//                           height: 60,
//                           borderRadius: "8px",
//                           overflow: "hidden",
//                           border: "2px solid #e0e0e0",
//                         }}
//                       >
//                         <img
//                           src={URL.createObjectURL(addUserForm.profileImage)}
//                           alt="Preview"
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </Form.Group>
//               </Col>

//               {/* Status */}
//               <Col md={12} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Status</Form.Label>
//                   <Form.Select
//                     value={addUserForm.status}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, status: e.target.value })
//                     }
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               {/* Divider */}
//               <Col xs={12}>
//                 <hr className="my-3" />
//                 <h6 style={{ fontWeight: "600", color: "#00BCD4", marginBottom: "15px" }}>
//                   User Limits Configuration
//                 </h6>
//               </Col>

//               {/* Daily Limit */}
//               <Col md={3} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Daily Limit</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={addUserForm.dailyLimit}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, dailyLimit: e.target.value })
//                     }
//                     min="0"
//                   />
//                 </Form.Group>
//               </Col>

//               {/* Posts Limit */}
//               <Col md={3} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Posts Limit</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={addUserForm.postsLimit}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, postsLimit: e.target.value })
//                     }
//                     min="0"
//                   />
//                 </Form.Group>
//               </Col>

//               {/* Business Limit */}
//               <Col md={3} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Business Limit</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={addUserForm.businessLimit}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, businessLimit: e.target.value })
//                     }
//                     min="0"
//                   />
//                 </Form.Group>
//               </Col>

//               {/* Political Limit */}
//               <Col md={3} className="mb-3">
//                 <Form.Group>
//                   <Form.Label style={{ fontWeight: "600" }}>Political Limit</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={addUserForm.politicalLimit}
//                     onChange={(e) =>
//                       setAddUserForm({ ...addUserForm, politicalLimit: e.target.value })
//                     }
//                     min="0"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer style={{ borderTop: "1px solid #e0e0e0" }}>
//           <Button
//             variant="secondary"
//             onClick={() => {
//               setShowAddUserModal(false);
//               resetAddUserForm();
//             }}
//             style={{ borderRadius: "8px", padding: "10px 24px" }}
//           >
//             Cancel
//           </Button>
//           <Button
//             style={{
//               background: "#00BCD4",
//               border: "none",
//               borderRadius: "8px",
//               padding: "10px 24px",
//               fontWeight: "600",
//             }}
//             onClick={addNewUser}
//           >
//             ➕ Add User
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ==================== USERS LIST VIEW ==================== */}
//       {!showProfileView && (
//         <>
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h3 className="mb-0" style={{ fontWeight: "700" }}>Users Management</h3>
//             <Button
//               style={{
//                 background: "#00BCD4",
//                 border: "none",
//                 borderRadius: "8px",
//                 padding: "10px 20px",
//                 fontWeight: "600",
//                 boxShadow: "0 2px 8px rgba(0,188,212,0.3)",
//               }}
//               onClick={() => setShowAddUserModal(true)}
//             >
//               ➕ Add New User
//             </Button>
//           </div>

//           {/* Search & Page Size */}
//           <div className="d-flex gap-2 mb-3">
//             <Form.Control
//               placeholder="Search by name or email..."
//               style={{ width: 300 }}
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//             <Form.Select
//               style={{ width: 120 }}
//               value={pageSize}
//               onChange={(e) => {
//                 setPageSize(+e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </Form.Select>
//           </div>

//           {/* Users Table */}
//           <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//             <Card.Body>
//               {loading ? (
//                 <div className="text-center py-5">
//                   <Spinner animation="border" variant="primary" />
//                   <p className="mt-3 text-muted">Loading users...</p>
//                 </div>
//               ) : (
//                 <>
//                   <Table hover responsive className="align-middle">
//                     <thead style={{ background: "#f8f9fa" }}>
//                       <tr>
//                         <th style={{ fontWeight: "600", color: "#6c757d" }}>USER</th>
//                         <th style={{ fontWeight: "600", color: "#6c757d" }}>SOCIAL</th>
//                         <th style={{ fontWeight: "600", color: "#6c757d" }}>LOGIN</th>
//                         <th style={{ fontWeight: "600", color: "#6c757d" }}>LAST ACTIVE</th>
//                         <th style={{ fontWeight: "600", color: "#6c757d" }}>REGISTER</th>
//                         <th style={{ fontWeight: "600", color: "#6c757d" }}>STATUS</th>
//                         <th style={{ fontWeight: "600", color: "#6c757d" }}>ACTION</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {paginated.length > 0 ? (
//                         paginated.map((u) => (
//                           <tr key={u._id}>
//                             {/* User Column */}
//                             <td>
//                               <div className="d-flex align-items-center gap-2">
//                                 <div
//                                   style={{
//                                     width: 40,
//                                     height: 40,
//                                     borderRadius: "50%",
//                                     background: generateGradient(u.name),
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     color: "white",
//                                     fontWeight: "bold",
//                                     fontSize: "16px",
//                                     boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//                                   }}
//                                 >
//                                   {u.name?.charAt(0).toUpperCase() || "U"}
//                                 </div>
//                                 <span style={{ fontWeight: "500" }}>{u.name || "Unknown"}</span>
//                               </div>
//                             </td>

//                             {/* Social Column */}
//                             <td>
//                               <Badge bg="secondary" style={{ fontSize: "12px" }}>
//                                 google
//                               </Badge>
//                             </td>

//                             {/* Login Email */}
//                             <td style={{ color: "#6c757d" }}>{u.email || "N/A"}</td>

//                             {/* Last Active */}
//                             <td style={{ color: "#6c757d" }}>
//                               {u.lastActive ? formatDate(u.lastActive) : "N/A"}
//                             </td>

//                             {/* Register Date */}
//                             <td style={{ color: "#6c757d" }}>
//                               {formatDateTime(u.createdAt)}
//                             </td>

//                             {/* Status Toggle */}
//                             <td>
//                               <Form.Check
//                                 type="switch"
//                                 id={`status-switch-${u._id}`}
//                                 checked={u.status === "active"}
//                                 onChange={() => toggleStatus(u._id)}
//                                 style={{ cursor: "pointer" }}
//                               />
//                             </td>

//                             {/* Action Buttons */}
//                             <td>
//                               <div className="d-flex gap-2">
//                                 {/* View Profile */}
//                                 <Button
//                                   size="sm"
//                                   style={{
//                                     background: "#FFC107",
//                                     border: "none",
//                                     borderRadius: "8px",
//                                     width: "36px",
//                                     height: "36px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                   }}
//                                   onClick={() => openProfileView(u)}
//                                   title="View Profile"
//                                 >
//                                   👁
//                                 </Button>

//                                 {/* Delete User */}
//                                 <Button
//                                   size="sm"
//                                   style={{
//                                     background: "#FF4D6D",
//                                     border: "none",
//                                     borderRadius: "8px",
//                                     width: "36px",
//                                     height: "36px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                   }}
//                                   onClick={() => deleteUser(u._id)}
//                                   title="Delete User"
//                                 >
//                                   🗑
//                                 </Button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="7" className="text-center py-4">
//                             <p className="text-muted mb-0">No users found</p>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </Table>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="d-flex justify-content-center mt-3">
//                       <Pagination>
//                         <Pagination.First
//                           onClick={() => setCurrentPage(1)}
//                           disabled={currentPage === 1}
//                         />
//                         <Pagination.Prev
//                           onClick={() => setCurrentPage(currentPage - 1)}
//                           disabled={currentPage === 1}
//                         />

//                         {[...Array(totalPages)].map((_, i) => {
//                           const pageNum = i + 1;
//                           if (
//                             pageNum === 1 ||
//                             pageNum === totalPages ||
//                             (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
//                           ) {
//                             return (
//                               <Pagination.Item
//                                 key={i}
//                                 active={pageNum === currentPage}
//                                 onClick={() => setCurrentPage(pageNum)}
//                               >
//                                 {pageNum}
//                               </Pagination.Item>
//                             );
//                           } else if (
//                             pageNum === currentPage - 2 ||
//                             pageNum === currentPage + 2
//                           ) {
//                             return <Pagination.Ellipsis key={i} disabled />;
//                           }
//                           return null;
//                         })}

//                         <Pagination.Next
//                           onClick={() => setCurrentPage(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                         />
//                         <Pagination.Last
//                           onClick={() => setCurrentPage(totalPages)}
//                           disabled={currentPage === totalPages}
//                         />
//                       </Pagination>
//                     </div>
//                   )}
//                 </>
//               )}
//             </Card.Body>
//           </Card>
//         </>
//       )}

//       {/* ==================== USER PROFILE VIEW ==================== */}
//       {showProfileView && selectedUser && (
//         <Container fluid className="py-4">
//           {/* Back Button */}
//           <Button
//             variant="link"
//             onClick={() => {
//               setShowProfileView(false);
//               setSelectedUser(null);
//             }}
//             className="mb-3 p-0"
//             style={{ textDecoration: "none", color: "#00BCD4", fontWeight: "600" }}
//           >
//             ← Back to Users
//           </Button>

//           <Row>
//             {/* ==================== LEFT SIDEBAR ==================== */}
//             <Col lg={3} md={4} className="mb-4">
//               <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//                 <Card.Body className="text-center">
//                   {/* Profile Picture */}
//                   <div
//                     style={{
//                       width: 150,
//                       height: 150,
//                       borderRadius: "50%",
//                       background: generateGradient(selectedUser.name),
//                       margin: "0 auto 20px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "48px",
//                       color: "white",
//                       fontWeight: "bold",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     }}
//                   >
//                     {selectedUser.name?.charAt(0).toUpperCase() || "U"}
//                   </div>

//                   {/* User Name */}
//                   <h4 style={{ fontWeight: "700", marginBottom: "5px" }}>
//                     {selectedUser.name || "Unknown User"}
//                   </h4>

//                   {/* Email Icon */}
//                   <div className="mb-2">
//                     <span style={{ fontSize: "20px" }}>✉️</span>
//                   </div>

//                   {/* User ID */}
//                   <div className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
//                     <span>👤 {selectedUser._id?.slice(-6) || "N/A"}</span>
//                   </div>

//                   {/* Follower Count */}
//                   <div className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
//                     <span>👥 {selectedUser.followers || 0}</span>
//                   </div>

//                   {/* Registration Date */}
//                   <div className="mb-3" style={{ fontSize: "14px", color: "#666" }}>
//                     <span>
//                       📅{" "}
//                       {selectedUser.createdAt
//                         ? new Date(selectedUser.createdAt).toLocaleDateString("en-GB", {
//                             day: "2-digit",
//                             month: "short",
//                             year: "2-digit",
//                           })
//                         : "N/A"}
//                     </span>
//                   </div>

//                   {/* Subscription Info */}
//                   <div
//                     className="mb-3 p-3"
//                     style={{
//                       background: "#f8f9fa",
//                       borderRadius: "8px",
//                       textAlign: "left",
//                     }}
//                   >
//                     <h6 style={{ fontWeight: "600", marginBottom: "10px" }}>
//                       SUBSCRIPTION
//                     </h6>
//                     <div style={{ fontSize: "14px", marginBottom: "5px" }}>
//                       <strong>Plan -</strong>{" "}
//                       {selectedUser.subscription?.plan?.name || "No Plan"}
//                     </div>
//                     <div style={{ fontSize: "14px", marginBottom: "5px" }}>
//                       <strong>Start -</strong>{" "}
//                       {selectedUser.subscription?.startDate
//                         ? formatDate(selectedUser.subscription.startDate)
//                         : "N/A"}
//                     </div>
//                     <div style={{ fontSize: "14px" }}>
//                       <strong>End -</strong>{" "}
//                       {selectedUser.subscription?.endDate
//                         ? formatDate(selectedUser.subscription.endDate)
//                         : "N/A"}
//                     </div>
//                   </div>

//                   {/* Business & Frames Count */}
//                   <Row className="mb-3">
//                     <Col xs={6}>
//                       <div style={{ textAlign: "center" }}>
//                         <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
//                           {selectedUser.businessCount || 0}
//                         </h5>
//                         <small style={{ color: "#666" }}>Business</small>
//                       </div>
//                     </Col>
//                     <Col xs={6}>
//                       <div style={{ textAlign: "center" }}>
//                         <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
//                           {selectedUser.framesCount || 0}
//                         </h5>
//                         <small style={{ color: "#666" }}>Frames</small>
//                       </div>
//                     </Col>
//                   </Row>

//                   {/* Action Buttons */}
//                   <div className="d-flex gap-2">
//                     <Button
//                       variant="danger"
//                       style={{
//                         flex: 1,
//                         borderRadius: "8px",
//                         fontWeight: "600",
//                       }}
//                       onClick={() => deleteUser(selectedUser._id)}
//                     >
//                       🗑 Delete
//                     </Button>
//                     <Button
//                       style={{
//                         flex: 1,
//                         background:
//                           selectedUser.status === "active" ? "#dc3545" : "#28a745",
//                         border: "none",
//                         borderRadius: "8px",
//                         fontWeight: "600",
//                       }}
//                       onClick={() => toggleStatus(selectedUser._id)}
//                     >
//                       {selectedUser.status === "active" ? "Block User" : "Unblock User"}
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* ==================== RIGHT SIDE - TABS ==================== */}
//             <Col lg={9} md={8}>
//               <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//                 <Card.Header
//                   style={{ background: "white", borderBottom: "2px solid #f0f0f0" }}
//                 >
//                   <h3
//                     style={{
//                       fontWeight: "700",
//                       textTransform: "uppercase",
//                       marginBottom: "20px",
//                     }}
//                   >
//                     {selectedUser.name || "User Profile"}
//                   </h3>

//                   {/* Tabs */}
//                   <Nav variant="tabs" activeKey={activeTab}>
//                     <Nav.Item>
//                       <Nav.Link
//                         eventKey="profile"
//                         onClick={() => setActiveTab("profile")}
//                         style={{
//                           color: activeTab === "profile" ? "#00BCD4" : "#666",
//                           borderBottom:
//                             activeTab === "profile" ? "3px solid #00BCD4" : "none",
//                           fontWeight: "600",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Profile
//                       </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                       <Nav.Link
//                         eventKey="subscription"
//                         onClick={() => setActiveTab("subscription")}
//                         style={{
//                           color: activeTab === "subscription" ? "#00BCD4" : "#666",
//                           borderBottom:
//                             activeTab === "subscription" ? "3px solid #00BCD4" : "none",
//                           fontWeight: "600",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Subscription
//                       </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                       <Nav.Link
//                         eventKey="frames"
//                         onClick={() => setActiveTab("frames")}
//                         style={{
//                           color: activeTab === "frames" ? "#00BCD4" : "#666",
//                           borderBottom:
//                             activeTab === "frames" ? "3px solid #00BCD4" : "none",
//                           fontWeight: "600",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Frames
//                       </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                       <Nav.Link
//                         eventKey="business"
//                         onClick={() => setActiveTab("business")}
//                         style={{
//                           color: activeTab === "business" ? "#00BCD4" : "#666",
//                           borderBottom:
//                             activeTab === "business" ? "3px solid #00BCD4" : "none",
//                           fontWeight: "600",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Business
//                       </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                       <Nav.Link
//                         eventKey="wallets"
//                         onClick={() => setActiveTab("wallets")}
//                         style={{
//                           color: activeTab === "wallets" ? "#00BCD4" : "#666",
//                           borderBottom:
//                             activeTab === "wallets" ? "3px solid #00BCD4" : "none",
//                           fontWeight: "600",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Wallets
//                       </Nav.Link>
//                     </Nav.Item>
//                     <Nav.Item>
//                       <Nav.Link
//                         eventKey="transaction"
//                         onClick={() => setActiveTab("transaction")}
//                         style={{
//                           color: activeTab === "transaction" ? "#00BCD4" : "#666",
//                           borderBottom:
//                             activeTab === "transaction" ? "3px solid #00BCD4" : "none",
//                           fontWeight: "600",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Transaction
//                       </Nav.Link>
//                     </Nav.Item>
//                   </Nav>
//                 </Card.Header>

//                 <Card.Body className="p-4">
//                   {/* ==================== PROFILE TAB ==================== */}
//                   {activeTab === "profile" && (
//                     <div>
//                       <h5 style={{ fontWeight: "600", marginBottom: "20px" }}>
//                         User Details
//                       </h5>

//                       <Form>
//                         <Row>
//                           {/* User Name */}
//                           <Col md={6} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 User Name
//                               </Form.Label>
//                               <Form.Control
//                                 type="text"
//                                 value={profileForm.name}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     name: e.target.value,
//                                   })
//                                 }
//                                 placeholder="Enter user name"
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* Designation */}
//                           <Col md={6} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 Designation
//                               </Form.Label>
//                               <Form.Control
//                                 type="text"
//                                 value={profileForm.designation}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     designation: e.target.value,
//                                   })
//                                 }
//                                 placeholder="Enter designation"
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* User Email */}
//                           <Col md={12} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 User Email
//                               </Form.Label>
//                               <Form.Control
//                                 type="email"
//                                 value={profileForm.email}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     email: e.target.value,
//                                   })
//                                 }
//                                 placeholder="Enter email"
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* Phone No */}
//                           <Col md={12} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 Phone No
//                               </Form.Label>
//                               <Form.Control
//                                 type="text"
//                                 value={profileForm.phoneNo}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     phoneNo: e.target.value,
//                                   })
//                                 }
//                                 placeholder="Enter phone number"
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* Profile Image */}
//                           <Col md={12} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 Profile
//                               </Form.Label>
//                               <div className="d-flex align-items-center gap-3">
//                                 <Form.Control
//                                   type="file"
//                                   accept="image/*"
//                                   onChange={handleFileChange}
//                                 />
//                                 {(selectedUser.profileImage || profileForm.profileImage) && (
//                                   <div
//                                     style={{
//                                       width: 100,
//                                       height: 100,
//                                       borderRadius: "8px",
//                                       overflow: "hidden",
//                                       border: "2px solid #e0e0e0",
//                                     }}
//                                   >
//                                     <img
//                                       src={
//                                         profileForm.profileImage
//                                           ? URL.createObjectURL(profileForm.profileImage)
//                                           : selectedUser.profileImage
//                                       }
//                                       alt="Profile Preview"
//                                       style={{
//                                         width: "100%",
//                                         height: "100%",
//                                         objectFit: "cover",
//                                       }}
//                                     />
//                                   </div>
//                                 )}
//                               </div>
//                             </Form.Group>
//                           </Col>

//                           {/* Limits Section */}
//                           <Col xs={12}>
//                             <hr className="my-4" />
//                             <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>
//                               User Limits
//                             </h6>
//                           </Col>

//                           {/* Daily Limit */}
//                           <Col md={3} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 Daily Limit
//                               </Form.Label>
//                               <Form.Control
//                                 type="number"
//                                 value={profileForm.dailyLimit}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     dailyLimit: e.target.value,
//                                   })
//                                 }
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* Posts Limit */}
//                           <Col md={3} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 Posts Limit
//                               </Form.Label>
//                               <Form.Control
//                                 type="number"
//                                 value={profileForm.postsLimit}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     postsLimit: e.target.value,
//                                   })
//                                 }
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* Business Limit */}
//                           <Col md={3} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 Business Limit
//                               </Form.Label>
//                               <Form.Control
//                                 type="number"
//                                 value={profileForm.businessLimit}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     businessLimit: e.target.value,
//                                   })
//                                 }
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* Political Limit */}
//                           <Col md={3} className="mb-3">
//                             <Form.Group>
//                               <Form.Label style={{ fontWeight: "500" }}>
//                                 Political Limit
//                               </Form.Label>
//                               <Form.Control
//                                 type="number"
//                                 value={profileForm.politicalLimit}
//                                 onChange={(e) =>
//                                   setProfileForm({
//                                     ...profileForm,
//                                     politicalLimit: e.target.value,
//                                   })
//                                 }
//                               />
//                             </Form.Group>
//                           </Col>

//                           {/* Update Button */}
//                           <Col md={12}>
//                             <Button
//                               style={{
//                                 width: "100%",
//                                 background: "#00BCD4",
//                                 border: "none",
//                                 padding: "12px",
//                                 fontSize: "16px",
//                                 fontWeight: "600",
//                                 borderRadius: "8px",
//                                 marginTop: "15px",
//                               }}
//                               onClick={updateProfile}
//                             >
//                               Update Profile
//                             </Button>
//                           </Col>
//                         </Row>
//                       </Form>
//                     </div>
//                   )}

//                   {/* ==================== SUBSCRIPTION TAB ==================== */}
//                   {activeTab === "subscription" && (
//                     <div>
//                       <h5 style={{ fontWeight: "600", marginBottom: "20px" }}>
//                         User Subscription
//                       </h5>

//                       <Row>
//                         <Col md={6}>
//                           <Form.Group className="mb-3">
//                             <Form.Label style={{ fontWeight: "500" }}>
//                               Select Plan
//                             </Form.Label>
//                             <Form.Select
//                               value={subscriptionForm.planId}
//                               onChange={(e) =>
//                                 setSubscriptionForm({
//                                   ...subscriptionForm,
//                                   planId: e.target.value,
//                                 })
//                               }
//                             >
//                               <option value="">Select Plan</option>
//                               {plans.map((p) => (
//                                 <option key={p._id} value={p._id}>
//                                   {p.name}
//                                 </option>
//                               ))}
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>

//                         <Col md={6}>
//                           <Form.Group className="mb-3">
//                             <Form.Label style={{ fontWeight: "500" }}>
//                               Select Subscription
//                             </Form.Label>
//                             <Form.Select>
//                               <option>Select Subscription</option>
//                               <option>Monthly</option>
//                               <option>Quarterly</option>
//                               <option>Yearly</option>
//                             </Form.Select>
//                           </Form.Group>
//                         </Col>

//                         <Col md={12}>
//                           <Form.Group className="mb-3">
//                             <Form.Label style={{ fontWeight: "500" }}>
//                               Start date
//                             </Form.Label>
//                             <Form.Control
//                               type="date"
//                               value={subscriptionForm.startDate}
//                               onChange={(e) =>
//                                 setSubscriptionForm({
//                                   ...subscriptionForm,
//                                   startDate: e.target.value,
//                                 })
//                               }
//                               placeholder="dd-mm-yyyy"
//                             />
//                           </Form.Group>
//                         </Col>

//                         <Col md={12}>
//                           <Form.Group className="mb-3">
//                             <Form.Label style={{ fontWeight: "500" }}>
//                               End date
//                             </Form.Label>
//                             <Form.Control
//                               type="date"
//                               value={subscriptionForm.endDate}
//                               onChange={(e) =>
//                                 setSubscriptionForm({
//                                   ...subscriptionForm,
//                                   endDate: e.target.value,
//                                 })
//                               }
//                               placeholder="dd-mm-yyyy"
//                             />
//                           </Form.Group>
//                         </Col>
//                       </Row>

//                       <Button
//                         style={{
//                           width: "100%",
//                           background: "#00BCD4",
//                           border: "none",
//                           padding: "12px",
//                           fontSize: "16px",
//                           fontWeight: "600",
//                           borderRadius: "8px",
//                         }}
//                         onClick={updateSubscription}
//                       >
//                         Update
//                       </Button>
//                     </div>
//                   )}

//                   {/* ==================== FRAMES TAB ==================== */}
//                   {activeTab === "frames" && (
//                     <div className="text-center py-5">
//                       <p style={{ color: "#999", fontSize: "16px" }}>
//                         Frames information will appear here
//                       </p>
//                       <small style={{ color: "#ccc" }}>
//                         Feature coming soon...
//                       </small>
//                     </div>
//                   )}

//                   {/* ==================== BUSINESS TAB ==================== */}
//                   {activeTab === "business" && (
//                     <div className="text-center py-5">
//                       <p style={{ color: "#999", fontSize: "16px" }}>
//                         Business information will appear here
//                       </p>
//                       <small style={{ color: "#ccc" }}>
//                         Feature coming soon...
//                       </small>
//                     </div>
//                   )}

//                   {/* ==================== WALLETS TAB ==================== */}
//                   {activeTab === "wallets" && (
//                     <div className="text-center py-5">
//                       <p style={{ color: "#999", fontSize: "16px" }}>
//                         Wallet information will appear here
//                       </p>
//                       <small style={{ color: "#ccc" }}>
//                         Feature coming soon...
//                       </small>
//                     </div>
//                   )}

//                   {/* ==================== TRANSACTION TAB ==================== */}
//                   {activeTab === "transaction" && (
//                     <div className="text-center py-5">
//                       <p style={{ color: "#999", fontSize: "16px" }}>
//                         Transaction history will appear here
//                       </p>
//                       <small style={{ color: "#ccc" }}>
//                         Feature coming soon...
//                       </small>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       )}
//     </Container>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Pagination,
  Badge,
  Row,
  Col,
  Nav,
  Image,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const API = "http://localhost:7000/api/users";
const PLAN_API = "http://localhost:7000/api/plans";

const Users = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ==================== STATE MANAGEMENT ====================
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals & Views
  const [showProfileView, setShowProfileView] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Alert State
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: "",
    designation: "",
    email: "",
    phoneNo: "",
    profileImage: null,
    dailyLimit: "",
    postsLimit: "",
    businessLimit: "",
    politicalLimit: "",
  });

  // Add User Form State
  const [addUserForm, setAddUserForm] = useState({
    name: "",
    email: "",
    designation: "",
    phoneNo: "",
    profileImage: null,
    dailyLimit: 10,
    postsLimit: 5,
    businessLimit: 1,
    politicalLimit: 1,
    status: "active",
  });

  // Subscription Form
  const [subscriptionForm, setSubscriptionForm] = useState({
    planId: "",
    startDate: "",
    endDate: "",
  });

  // ==================== HELPER FUNCTIONS ====================
  
  // Show Alert
  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert({ show: false, message: "", variant: "" });
    }, 3000);
  };

  // Reset Add User Form
  const resetAddUserForm = () => {
    setAddUserForm({
      name: "",
      email: "",
      designation: "",
      phoneNo: "",
      profileImage: null,
      dailyLimit: 10,
      postsLimit: 5,
      businessLimit: 1,
      politicalLimit: 1,
      status: "active",
    });
  };

  // ==================== API CALLS ====================
  
  /* Fetch All Users */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to load users:", err);
      showAlert("Failed to load users", "danger");
    } finally {
      setLoading(false);
    }
  };

  /* Fetch All Plans */
  const fetchPlans = async () => {
    try {
      const res = await axios.get(PLAN_API);
      setPlans(res.data.plans || []);
    } catch (err) {
      console.error("Failed to load plans:", err);
    }
  };

  /* Add New User */
  const addNewUser = async () => {
    // Validation
    if (!addUserForm.name || !addUserForm.email) {
      showAlert("Please fill in all required fields (Name, Email)", "danger");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(addUserForm.email)) {
      showAlert("Please enter a valid email address", "danger");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", addUserForm.name);
      formData.append("email", addUserForm.email);
      formData.append("designation", addUserForm.designation);
      formData.append("phoneNo", addUserForm.phoneNo);
      formData.append("dailyLimit", addUserForm.dailyLimit);
      formData.append("postsLimit", addUserForm.postsLimit);
      formData.append("businessLimit", addUserForm.businessLimit);
      formData.append("politicalLimit", addUserForm.politicalLimit);
      formData.append("status", addUserForm.status);
      
      if (addUserForm.profileImage) {
        formData.append("profileImage", addUserForm.profileImage);
      }

      await axios.post(`${API}/admin/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showAlert("User added successfully!", "success");
      setShowAddUserModal(false);
      resetAddUserForm();
      fetchUsers();
    } catch (err) {
      console.error("Failed to add user:", err);
      const errorMessage = err.response?.data?.message || "Failed to add user";
      showAlert(errorMessage, "danger");
    }
  };

  /* Toggle User Status (Active/Inactive) */
  const toggleStatus = async (id) => {
    try {
      await axios.put(
        `${API}/toggle-status/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
      
      // Update selected user if viewing profile
      if (selectedUser && selectedUser._id === id) {
        setSelectedUser({
          ...selectedUser,
          status: selectedUser.status === "active" ? "inactive" : "active"
        });
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
      showAlert("Failed to update user status", "danger");
    }
  };

  /* Delete User */
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showAlert("User deleted successfully", "success");
      
      // Close profile view if viewing deleted user
      if (selectedUser && selectedUser._id === id) {
        setShowProfileView(false);
        setSelectedUser(null);
      }
      
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      showAlert("Failed to delete user", "danger");
    }
  };

  /* Update User Profile */
  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profileForm.name);
      formData.append("designation", profileForm.designation);
      formData.append("email", profileForm.email);
      formData.append("phoneNo", profileForm.phoneNo);
      formData.append("dailyLimit", profileForm.dailyLimit);
      formData.append("postsLimit", profileForm.postsLimit);
      formData.append("businessLimit", profileForm.businessLimit);
      formData.append("politicalLimit", profileForm.politicalLimit);
      
      if (profileForm.profileImage) {
        formData.append("profileImage", profileForm.profileImage);
      }

      await axios.put(
        `${API}/admin/profile/${selectedUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showAlert("Profile updated successfully!", "success");
      fetchUsers();
      
      // Refresh selected user data
      const updatedUsers = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUser = updatedUsers.data.users.find(u => u._id === selectedUser._id);
      setSelectedUser(updatedUser);
    } catch (err) {
      console.error("Failed to update profile:", err);
      showAlert("Failed to update profile", "danger");
    }
  };

  /* Update User Subscription */
  const updateSubscription = async () => {
    if (!subscriptionForm.planId || !subscriptionForm.startDate || !subscriptionForm.endDate) {
      showAlert("Please fill all subscription fields", "danger");
      return;
    }

    try {
      await axios.put(
        `${API}/subscription/${selectedUser._id}`,
        subscriptionForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showAlert("Subscription updated successfully!", "success");
      fetchUsers();
      
      // Refresh selected user data
      const updatedUsers = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUser = updatedUsers.data.users.find(u => u._id === selectedUser._id);
      setSelectedUser(updatedUser);
      
      // Reset form
      setSubscriptionForm({ planId: "", startDate: "", endDate: "" });
    } catch (err) {
      console.error("Failed to update subscription:", err);
      showAlert("Failed to update subscription", "danger");
    }
  };

  // ==================== LIFECYCLE ====================
  useEffect(() => {
    if (!token || role !== "admin") {
      alert("Admin access only");
      return;
    }
    fetchUsers();
    fetchPlans();
  }, []);

  // ==================== HELPER FUNCTIONS ====================
  
  /* Generate Random Gradient Color */
  const generateGradient = (name) => {
    if (!name) return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    
    const colors = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  /* Format Date */
  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
  };

  /* Format DateTime */
  const formatDateTime = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  /* Open User Profile View */
  const openProfileView = (user) => {
    setSelectedUser(user);
    setActiveTab("profile");
    
    // Populate profile form
    setProfileForm({
      name: user.name || "",
      designation: user.designation || "",
      email: user.email || "",
      phoneNo: user.phoneNo || "",
      profileImage: null,
      dailyLimit: user.dailyLimit || 10,
      postsLimit: user.postsLimit || 5,
      businessLimit: user.businessLimit || 1,
      politicalLimit: user.politicalLimit || 1,
    });
    
    setShowProfileView(true);
  };

  /* Handle File Input for Profile Update */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileForm({
        ...profileForm,
        profileImage: e.target.files[0]
      });
    }
  };

  /* Handle File Input for Add User */
  const handleAddUserFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAddUserForm({
        ...addUserForm,
        profileImage: e.target.files[0]
      });
    }
  };

  // ==================== FILTER & PAGINATION ====================
  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ==================== RENDER ====================
  return (
    <Container fluid>
      {/* Alert Notification */}
      {alert.show && (
        <Alert 
          variant={alert.variant} 
          onClose={() => setAlert({ show: false, message: "", variant: "" })} 
          dismissible
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            minWidth: "300px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}
        >
          {alert.message}
        </Alert>
      )}

      {/* ==================== ADD USER MODAL ==================== */}
      <Modal 
        show={showAddUserModal} 
        onHide={() => {
          setShowAddUserModal(false);
          resetAddUserForm();
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton style={{ borderBottom: "2px solid #00BCD4" }}>
          <Modal.Title style={{ color: "#00BCD4", fontWeight: "700" }}>
            ➕ Add New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Row>
              {/* User Name */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>
                    User Name <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={addUserForm.name}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    required
                  />
                </Form.Group>
              </Col>

              {/* Email */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={addUserForm.email}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, email: e.target.value })
                    }
                    placeholder="Enter email address"
                    required
                  />
                </Form.Group>
              </Col>

              {/* Phone Number */}
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={addUserForm.phoneNo}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, phoneNo: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Col>

              {/* Designation */}
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    value={addUserForm.designation}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, designation: e.target.value })
                    }
                    placeholder="e.g., Manager, Developer, etc."
                  />
                </Form.Group>
              </Col>

              {/* Profile Image */}
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Profile Image</Form.Label>
                  <div className="d-flex align-items-center gap-3">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleAddUserFileChange}
                    />
                    {addUserForm.profileImage && (
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "2px solid #e0e0e0",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(addUserForm.profileImage)}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>

              {/* Status */}
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Status</Form.Label>
                  <Form.Select
                    value={addUserForm.status}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, status: e.target.value })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Divider */}
              <Col xs={12}>
                <hr className="my-3" />
                <h6 style={{ fontWeight: "600", color: "#00BCD4", marginBottom: "15px" }}>
                  User Limits Configuration
                </h6>
              </Col>

              {/* Daily Limit */}
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Daily Limit</Form.Label>
                  <Form.Control
                    type="number"
                    value={addUserForm.dailyLimit}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, dailyLimit: e.target.value })
                    }
                    min="0"
                  />
                </Form.Group>
              </Col>

              {/* Posts Limit */}
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Posts Limit</Form.Label>
                  <Form.Control
                    type="number"
                    value={addUserForm.postsLimit}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, postsLimit: e.target.value })
                    }
                    min="0"
                  />
                </Form.Group>
              </Col>

              {/* Business Limit */}
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Business Limit</Form.Label>
                  <Form.Control
                    type="number"
                    value={addUserForm.businessLimit}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, businessLimit: e.target.value })
                    }
                    min="0"
                  />
                </Form.Group>
              </Col>

              {/* Political Limit */}
              <Col md={3} className="mb-3">
                <Form.Group>
                  <Form.Label style={{ fontWeight: "600" }}>Political Limit</Form.Label>
                  <Form.Control
                    type="number"
                    value={addUserForm.politicalLimit}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, politicalLimit: e.target.value })
                    }
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "1px solid #e0e0e0" }}>
          <Button
            variant="secondary"
            onClick={() => {
              setShowAddUserModal(false);
              resetAddUserForm();
            }}
            style={{ borderRadius: "8px", padding: "10px 24px" }}
          >
            Cancel
          </Button>
          <Button
            style={{
              background: "#00BCD4",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              fontWeight: "600",
            }}
            onClick={addNewUser}
          >
            ➕ Add User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ==================== USERS LIST VIEW ==================== */}
      {!showProfileView && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0" style={{ fontWeight: "700" }}>Users Management</h3>
            <Button
              style={{
                background: "#00BCD4",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "600",
                boxShadow: "0 2px 8px rgba(0,188,212,0.3)",
              }}
              onClick={() => setShowAddUserModal(true)}
            >
              ➕ Add New User
            </Button>
          </div>

          {/* Search & Page Size */}
          <div className="d-flex gap-2 mb-3">
            <Form.Control
              placeholder="Search by name or email..."
              style={{ width: 300 }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Form.Select
              style={{ width: 120 }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(+e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Form.Select>
          </div>

          {/* Users Table */}
          <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-3 text-muted">Loading users...</p>
                </div>
              ) : (
                <>
                  <Table hover responsive className="align-middle">
                    <thead style={{ background: "#f8f9fa" }}>
                      <tr>
                        <th style={{ fontWeight: "600", color: "#6c757d" }}>USER</th>
                        <th style={{ fontWeight: "600", color: "#6c757d" }}>SOCIAL</th>
                        <th style={{ fontWeight: "600", color: "#6c757d" }}>LOGIN</th>
                        <th style={{ fontWeight: "600", color: "#6c757d" }}>LAST ACTIVE</th>
                        <th style={{ fontWeight: "600", color: "#6c757d" }}>REGISTER</th>
                        <th style={{ fontWeight: "600", color: "#6c757d" }}>STATUS</th>
                        <th style={{ fontWeight: "600", color: "#6c757d" }}>ACTION</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginated.length > 0 ? (
                        paginated.map((u) => (
                          <tr key={u._id}>
                            {/* User Column */}
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    background: generateGradient(u.name),
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                  }}
                                >
                                  {u.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <span style={{ fontWeight: "500" }}>{u.name || "Unknown"}</span>
                              </div>
                            </td>

                            {/* Social Column */}
                            <td>
                              <Badge bg="secondary" style={{ fontSize: "12px" }}>
                                google
                              </Badge>
                            </td>

                            {/* Login Email */}
                            <td style={{ color: "#6c757d" }}>{u.email || "N/A"}</td>

                            {/* Last Active */}
                            <td style={{ color: "#6c757d" }}>
                              {u.lastActive ? formatDate(u.lastActive) : "N/A"}
                            </td>

                            {/* Register Date */}
                            <td style={{ color: "#6c757d" }}>
                              {formatDateTime(u.createdAt)}
                            </td>

                            {/* Status Toggle */}
                            <td>
                              <Form.Check
                                type="switch"
                                id={`status-switch-${u._id}`}
                                checked={u.status === "active"}
                                onChange={() => toggleStatus(u._id)}
                                style={{ cursor: "pointer" }}
                              />
                            </td>

                            {/* Action Buttons */}
                            <td>
                              <div className="d-flex gap-2">
                                {/* View Profile */}
                                <Button
                                  size="sm"
                                  style={{
                                    background: "#FFC107",
                                    border: "none",
                                    borderRadius: "8px",
                                    width: "36px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  onClick={() => openProfileView(u)}
                                  title="View Profile"
                                >
                                  👁
                                </Button>

                                {/* Delete User */}
                                <Button
                                  size="sm"
                                  style={{
                                    background: "#FF4D6D",
                                    border: "none",
                                    borderRadius: "8px",
                                    width: "36px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  onClick={() => deleteUser(u._id)}
                                  title="Delete User"
                                >
                                  🗑
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <p className="text-muted mb-0">No users found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-3">
                      <Pagination>
                        <Pagination.First
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        />

                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                          ) {
                            return (
                              <Pagination.Item
                                key={i}
                                active={pageNum === currentPage}
                                onClick={() => setCurrentPage(pageNum)}
                              >
                                {pageNum}
                              </Pagination.Item>
                            );
                          } else if (
                            pageNum === currentPage - 2 ||
                            pageNum === currentPage + 2
                          ) {
                            return <Pagination.Ellipsis key={i} disabled />;
                          }
                          return null;
                        })}

                        <Pagination.Next
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                        <Pagination.Last
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </>
      )}

      {/* ==================== USER PROFILE VIEW ==================== */}
      {showProfileView && selectedUser && (
        <Container fluid className="py-4">
          {/* Back Button */}
          <Button
            variant="link"
            onClick={() => {
              setShowProfileView(false);
              setSelectedUser(null);
            }}
            className="mb-3 p-0"
            style={{ textDecoration: "none", color: "#00BCD4", fontWeight: "600" }}
          >
            ← Back to Users
          </Button>

          <Row>
            {/* ==================== LEFT SIDEBAR ==================== */}
            <Col lg={3} md={4} className="mb-4">
              <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <Card.Body className="text-center">
                  {/* Profile Picture */}
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      background: generateGradient(selectedUser.name),
                      margin: "0 auto 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    {selectedUser.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  {/* User Name */}
                  <h4 style={{ fontWeight: "700", marginBottom: "5px" }}>
                    {selectedUser.name || "Unknown User"}
                  </h4>

                  {/* Email Icon */}
                  <div className="mb-2">
                    <span style={{ fontSize: "20px" }}>✉️</span>
                  </div>

                  {/* User ID */}
                  <div className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
                    <span>👤 {selectedUser._id?.slice(-6) || "N/A"}</span>
                  </div>

                  {/* Follower Count */}
                  <div className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
                    <span>👥 {selectedUser.followers || 0}</span>
                  </div>

                  {/* Registration Date */}
                  <div className="mb-3" style={{ fontSize: "14px", color: "#666" }}>
                    <span>
                      📅{" "}
                      {selectedUser.createdAt
                        ? new Date(selectedUser.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "2-digit",
                          })
                        : "N/A"}
                    </span>
                  </div>

                  {/* Subscription Info */}
                  <div
                    className="mb-3 p-3"
                    style={{
                      background: "#f8f9fa",
                      borderRadius: "8px",
                      textAlign: "left",
                    }}
                  >
                    <h6 style={{ fontWeight: "600", marginBottom: "10px" }}>
                      SUBSCRIPTION
                    </h6>
                    <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                      <strong>Plan -</strong>{" "}
                      {selectedUser.subscription?.plan?.name || "No Plan"}
                    </div>
                    <div style={{ fontSize: "14px", marginBottom: "5px" }}>
                      <strong>Start -</strong>{" "}
                      {selectedUser.subscription?.startDate
                        ? formatDate(selectedUser.subscription.startDate)
                        : "N/A"}
                    </div>
                    <div style={{ fontSize: "14px" }}>
                      <strong>End -</strong>{" "}
                      {selectedUser.subscription?.endDate
                        ? formatDate(selectedUser.subscription.endDate)
                        : "N/A"}
                    </div>
                  </div>

                  {/* Business & Frames Count */}
                  <Row className="mb-3">
                    <Col xs={6}>
                      <div style={{ textAlign: "center" }}>
                        <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
                          {selectedUser.businessCount || 0}
                        </h5>
                        <small style={{ color: "#666" }}>Business</small>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div style={{ textAlign: "center" }}>
                        <h5 style={{ fontWeight: "700", marginBottom: "0" }}>
                          {selectedUser.framesCount || 0}
                        </h5>
                        <small style={{ color: "#666" }}>Frames</small>
                      </div>
                    </Col>
                  </Row>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
                    <Button
                      variant="danger"
                      style={{
                        flex: 1,
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                      onClick={() => deleteUser(selectedUser._id)}
                    >
                      🗑 Delete
                    </Button>
                    <Button
                      style={{
                        flex: 1,
                        background:
                          selectedUser.status === "active" ? "#dc3545" : "#28a745",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                      onClick={() => toggleStatus(selectedUser._id)}
                    >
                      {selectedUser.status === "active" ? "Block User" : "Unblock User"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* ==================== RIGHT SIDE - TABS ==================== */}
            <Col lg={9} md={8}>
              <Card style={{ border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <Card.Header
                  style={{ background: "white", borderBottom: "2px solid #f0f0f0" }}
                >
                  <h3
                    style={{
                      fontWeight: "700",
                      textTransform: "uppercase",
                      marginBottom: "20px",
                    }}
                  >
                    {selectedUser.name || "User Profile"}
                  </h3>

                  {/* Tabs */}
                  <Nav variant="tabs" activeKey={activeTab}>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="profile"
                        onClick={() => setActiveTab("profile")}
                        style={{
                          color: activeTab === "profile" ? "#00BCD4" : "#666",
                          borderBottom:
                            activeTab === "profile" ? "3px solid #00BCD4" : "none",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="subscription"
                        onClick={() => setActiveTab("subscription")}
                        style={{
                          color: activeTab === "subscription" ? "#00BCD4" : "#666",
                          borderBottom:
                            activeTab === "subscription" ? "3px solid #00BCD4" : "none",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Subscription
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="frames"
                        onClick={() => setActiveTab("frames")}
                        style={{
                          color: activeTab === "frames" ? "#00BCD4" : "#666",
                          borderBottom:
                            activeTab === "frames" ? "3px solid #00BCD4" : "none",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Frames
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="business"
                        onClick={() => setActiveTab("business")}
                        style={{
                          color: activeTab === "business" ? "#00BCD4" : "#666",
                          borderBottom:
                            activeTab === "business" ? "3px solid #00BCD4" : "none",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Business
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="wallets"
                        onClick={() => setActiveTab("wallets")}
                        style={{
                          color: activeTab === "wallets" ? "#00BCD4" : "#666",
                          borderBottom:
                            activeTab === "wallets" ? "3px solid #00BCD4" : "none",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Wallets
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="transaction"
                        onClick={() => setActiveTab("transaction")}
                        style={{
                          color: activeTab === "transaction" ? "#00BCD4" : "#666",
                          borderBottom:
                            activeTab === "transaction" ? "3px solid #00BCD4" : "none",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Transaction
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>

                <Card.Body className="p-4">
                  {/* ==================== PROFILE TAB ==================== */}
                  {activeTab === "profile" && (
                    <div>
                      <h5 style={{ fontWeight: "600", marginBottom: "20px" }}>
                        User Details
                      </h5>

                      <Form>
                        <Row>
                          {/* User Name */}
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                User Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={profileForm.name}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="Enter user name"
                              />
                            </Form.Group>
                          </Col>

                          {/* Designation */}
                          <Col md={6} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                Designation
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={profileForm.designation}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    designation: e.target.value,
                                  })
                                }
                                placeholder="Enter designation"
                              />
                            </Form.Group>
                          </Col>

                          {/* User Email */}
                          <Col md={12} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                User Email
                              </Form.Label>
                              <Form.Control
                                type="email"
                                value={profileForm.email}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    email: e.target.value,
                                  })
                                }
                                placeholder="Enter email"
                              />
                            </Form.Group>
                          </Col>

                          {/* Phone No */}
                          <Col md={12} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                Phone No
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={profileForm.phoneNo}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    phoneNo: e.target.value,
                                  })
                                }
                                placeholder="Enter phone number"
                              />
                            </Form.Group>
                          </Col>

                          {/* Profile Image */}
                          <Col md={12} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                Profile
                              </Form.Label>
                              <div className="d-flex align-items-center gap-3">
                                <Form.Control
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                                {(selectedUser.profileImage || profileForm.profileImage) && (
                                  <div
                                    style={{
                                      width: 100,
                                      height: 100,
                                      borderRadius: "8px",
                                      overflow: "hidden",
                                      border: "2px solid #e0e0e0",
                                    }}
                                  >
                                    <img
                                      src={
                                        profileForm.profileImage
                                          ? URL.createObjectURL(profileForm.profileImage)
                                          : selectedUser.profileImage
                                      }
                                      alt="Profile Preview"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </Form.Group>
                          </Col>

                          {/* Limits Section */}
                          <Col xs={12}>
                            <hr className="my-4" />
                            <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>
                              User Limits
                            </h6>
                          </Col>

                          {/* Daily Limit */}
                          <Col md={3} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                Daily Limit
                              </Form.Label>
                              <Form.Control
                                type="number"
                                value={profileForm.dailyLimit}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    dailyLimit: e.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>

                          {/* Posts Limit */}
                          <Col md={3} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                Posts Limit
                              </Form.Label>
                              <Form.Control
                                type="number"
                                value={profileForm.postsLimit}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    postsLimit: e.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>

                          {/* Business Limit */}
                          <Col md={3} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                Business Limit
                              </Form.Label>
                              <Form.Control
                                type="number"
                                value={profileForm.businessLimit}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    businessLimit: e.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>

                          {/* Political Limit */}
                          <Col md={3} className="mb-3">
                            <Form.Group>
                              <Form.Label style={{ fontWeight: "500" }}>
                                Political Limit
                              </Form.Label>
                              <Form.Control
                                type="number"
                                value={profileForm.politicalLimit}
                                onChange={(e) =>
                                  setProfileForm({
                                    ...profileForm,
                                    politicalLimit: e.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                          </Col>

                          {/* Update Button */}
                          <Col md={12}>
                            <Button
                              style={{
                                width: "100%",
                                background: "#00BCD4",
                                border: "none",
                                padding: "12px",
                                fontSize: "16px",
                                fontWeight: "600",
                                borderRadius: "8px",
                                marginTop: "15px",
                              }}
                              onClick={updateProfile}
                            >
                              Update Profile
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  )}

                  {/* ==================== SUBSCRIPTION TAB ==================== */}
                  {activeTab === "subscription" && (
                    <div>
                      <h5 style={{ fontWeight: "600", marginBottom: "20px" }}>
                        User Subscription
                      </h5>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: "500" }}>
                              Select Plan
                            </Form.Label>
                            <Form.Select
                              value={subscriptionForm.planId}
                              onChange={(e) =>
                                setSubscriptionForm({
                                  ...subscriptionForm,
                                  planId: e.target.value,
                                })
                              }
                            >
                              <option value="">Select Plan</option>
                              {plans.map((p) => (
                                <option key={p._id} value={p._id}>
                                  {p.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: "500" }}>
                              Select Subscription
                            </Form.Label>
                            <Form.Select>
                              <option>Select Subscription</option>
                              <option>Monthly</option>
                              <option>Quarterly</option>
                              <option>Yearly</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: "500" }}>
                              Start date
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={subscriptionForm.startDate}
                              onChange={(e) =>
                                setSubscriptionForm({
                                  ...subscriptionForm,
                                  startDate: e.target.value,
                                })
                              }
                              placeholder="dd-mm-yyyy"
                            />
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: "500" }}>
                              End date
                            </Form.Label>
                            <Form.Control
                              type="date"
                              value={subscriptionForm.endDate}
                              onChange={(e) =>
                                setSubscriptionForm({
                                  ...subscriptionForm,
                                  endDate: e.target.value,
                                })
                              }
                              placeholder="dd-mm-yyyy"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        style={{
                          width: "100%",
                          background: "#00BCD4",
                          border: "none",
                          padding: "12px",
                          fontSize: "16px",
                          fontWeight: "600",
                          borderRadius: "8px",
                        }}
                        onClick={updateSubscription}
                      >
                        Update
                      </Button>
                    </div>
                  )}

                  {/* ==================== FRAMES TAB ==================== */}
                  {activeTab === "frames" && (
                    <div className="text-center py-5">
                      <p style={{ color: "#999", fontSize: "16px" }}>
                        Frames information will appear here
                      </p>
                      <small style={{ color: "#ccc" }}>
                        Feature coming soon...
                      </small>
                    </div>
                  )}

                  {/* ==================== BUSINESS TAB ==================== */}
                  {activeTab === "business" && (
                    <div className="text-center py-5">
                      <p style={{ color: "#999", fontSize: "16px" }}>
                        Business information will appear here
                      </p>
                      <small style={{ color: "#ccc" }}>
                        Feature coming soon...
                      </small>
                    </div>
                  )}

                  {/* ==================== WALLETS TAB ==================== */}
                  {activeTab === "wallets" && (
                    <div className="text-center py-5">
                      <p style={{ color: "#999", fontSize: "16px" }}>
                        Wallet information will appear here
                      </p>
                      <small style={{ color: "#ccc" }}>
                        Feature coming soon...
                      </small>
                    </div>
                  )}

                  {/* ==================== TRANSACTION TAB ==================== */}
                  {activeTab === "transaction" && (
                    <div className="text-center py-5">
                      <p style={{ color: "#999", fontSize: "16px" }}>
                        Transaction history will appear here
                      </p>
                      <small style={{ color: "#ccc" }}>
                        Feature coming soon...
                      </small>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Users;