
// // import React, { useState, useEffect } from "react";
// // import { Container, Card, Table, Button, Badge, Spinner } from "react-bootstrap";
// // import axios from "axios";

// // const Subscriptions = () => {
// //   const [subscriptions, setSubscriptions] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch all subscriptions
// //   const fetchSubscriptions = async () => {
// //     try {
// //       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/subscriptions");
// //       if (res.data.success) setSubscriptions(res.data.subscriptions);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSubscriptions();
// //   }, []);

// //   // Delete subscription
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure?")) return;
// //     try {
// //       await axios.delete(`https://crafto-backend-zqcn.onrender.com/api/subscriptions/${id}`);
// //       fetchSubscriptions();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Create Razorpay Order
// //   const handlePayment = async (sub) => {
// //     try {
// //       const res = await axios.post("https://crafto-backend-zqcn.onrender.com/api/subscriptions/create-order", {
// //         amount: sub.amount,
// //         currency: "INR",
// //       });
// //       const { order } = res.data;

// //       const options = {
// //         key: process.env.REACT_APP_RAZORPAY_KEY_ID, // frontend key
// //         amount: order.amount,
// //         currency: order.currency,
// //         name: "Crafto Subscriptions",
// //         order_id: order.id,
// //         handler: async function (response) {
// //           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
// //           // Update subscription with paymentId
// //           await axios.put(`https://crafto-backend-zqcn.onrender.com/api/subscriptions/${sub._id}`, {
// //             paymentId: response.razorpay_payment_id,
// //             status: "active",
// //           });
// //           fetchSubscriptions();
// //         },
// //         theme: { color: "#3399cc" },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <Container fluid>
// //       <h2 className="mb-4">Subscriptions Management</h2>
// //       <Card>
// //         <Card.Body>
// //           {loading ? (
// //             <Spinner animation="border" />
// //           ) : (
// //             <Table responsive hover>
// //               <thead>
// //                 <tr>
// //                   <th>User</th>
// //                   <th>Plan</th>
// //                   <th>Amount</th>
// //                   <th>Status</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {subscriptions.map((sub) => (
// //                   <tr key={sub._id}>
// //                     <td>{sub.user}</td>
// //                     <td>{sub.plan}</td>
// //                     <td>₹{sub.amount}</td>
// //                     <td>
// //                       <Badge bg={sub.status === "active" ? "success" : "secondary"}>
// //                         {sub.status}
// //                       </Badge>
// //                     </td>
// //                     <td>
// //                       <Button
// //                         size="sm"
// //                         variant="primary"
// //                         className="me-2"
// //                         onClick={() => handlePayment(sub)}
// //                       >
// //                         Pay
// //                       </Button>
// //                       <Button
// //                         size="sm"
// //                         variant="danger"
// //                         onClick={() => handleDelete(sub._id)}
// //                       >
// //                         Delete
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </Table>
// //           )}
// //         </Card.Body>
// //       </Card>
// //     </Container>
// //   );
// // };

// // export default Subscriptions;


// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Card,
//   Table,
//   Button,
//   Badge,
//   Spinner,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import axios from "axios";

// const Subscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [newSub, setNewSub] = useState({
//     user: "",
//     plan: "",
//     amount: "",
//   });

//   // Fetch all subscriptions
//   const fetchSubscriptions = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/subscriptions");
//       if (res.data.success) setSubscriptions(res.data.subscriptions);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscriptions();
//   }, []);

//   // Delete subscription
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await axios.delete(`https://crafto-backend-zqcn.onrender.com/api/subscriptions/${id}`);
//       fetchSubscriptions();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new subscription
//   const handleAddSubscription = async (e) => {
//     e.preventDefault();
//     if (!newSub.user || !newSub.plan || !newSub.amount) {
//       alert("Please fill all fields");
//       return;
//     }
//     try {
//       const res = await axios.post("https://crafto-backend-zqcn.onrender.com/api/subscriptions", newSub);
//       if (res.data.success) {
//         alert("Subscription added successfully!");
//         setShowModal(false);
//         setNewSub({ user: "", plan: "", amount: "" });
//         fetchSubscriptions();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error while adding subscription");
//     }
//   };

//   // Create Razorpay Order and open payment
//   const handlePayment = async (sub) => {
//     try {
//       const res = await axios.post("https://crafto-backend-zqcn.onrender.com/api/subscriptions/create-order", {
//         amount: sub.amount,
//         currency: "INR",
//       });
//       const { order } = res.data;

//       const options = {
//         key: "rzp_test_7m8iz2GqqZ6H9C", // frontend key (public)
//         amount: order.amount,
//         currency: order.currency,
//         name: "Crafto Subscriptions",
//         order_id: order.id,
//         handler: async function (response) {
//           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//           await axios.put(`https://crafto-backend-zqcn.onrender.com/api/subscriptions/${sub._id}`, {
//             paymentId: response.razorpay_payment_id,
//             status: "active",
//           });
//           fetchSubscriptions();
//         },
//         prefill: {
//           name: sub.user,
//           email: "demo@gmail.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Subscriptions Management</h2>
//         <Button variant="success" onClick={() => setShowModal(true)}>
//           + Add Subscription
//         </Button>
//       </div>

//       <Card>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : (
//             <Table responsive hover>
//               <thead>
//                 <tr>
//                   <th>User</th>
//                   <th>Plan</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subscriptions.map((sub) => (
//                   <tr key={sub._id}>
//                     <td>{sub.user}</td>
//                     <td>{sub.plan}</td>
//                     <td>₹{sub.amount}</td>
//                     <td>
//                       <Badge bg={sub.status === "active" ? "success" : "secondary"}>
//                         {sub.status}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Button
//                         size="sm"
//                         variant="primary"
//                         className="me-2"
//                         onClick={() => handlePayment(sub)}
//                       >
//                         Pay
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="danger"
//                         onClick={() => handleDelete(sub._id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>

//       {/* 🔹 Add Subscription Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Subscription</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleAddSubscription}>
//             <Form.Group className="mb-3">
//               <Form.Label>User Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter user name"
//                 value={newSub.user}
//                 onChange={(e) => setNewSub({ ...newSub, user: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Plan</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter plan name"
//                 value={newSub.plan}
//                 onChange={(e) => setNewSub({ ...newSub, plan: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Amount (₹)</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter amount"
//                 value={newSub.amount}
//                 onChange={(e) => setNewSub({ ...newSub, amount: e.target.value })}
//               />
//             </Form.Group>
//             <div className="text-end">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="primary" className="ms-2">
//                 Save
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Subscriptions;


// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Card,
//   Table,
//   Button,
//   Badge,
//   Spinner,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import axios from "axios";

// const Subscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [newSub, setNewSub] = useState({
//     user: "",
//     plan: "",
//     amount: "",
//   });

//   // --------------------------------------------------
//   // Load Razorpay script + fetch subscriptions
//   // --------------------------------------------------
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     fetchSubscriptions();
//   }, []);

//   // --------------------------------------------------
//   // Fetch Subscriptions
//   // --------------------------------------------------
//   const fetchSubscriptions = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/subscriptions");
//       if (res.data.success) setSubscriptions(res.data.subscriptions);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Delete Subscription
//   // --------------------------------------------------
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await axios.delete(`https://crafto-backend-zqcn.onrender.com/api/subscriptions/${id}`);
//       fetchSubscriptions();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // --------------------------------------------------
//   // Add Subscription
//   // --------------------------------------------------
//   const handleAddSubscription = async (e) => {
//     e.preventDefault();
//     if (!newSub.user || !newSub.plan || !newSub.amount) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "https://crafto-backend-zqcn.onrender.com/api/subscriptions",
//         newSub
//       );

//       if (res.data.success) {
//         alert("Subscription added!");
//         setShowModal(false);
//         setNewSub({ user: "", plan: "", amount: "" });
//         fetchSubscriptions();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error while adding subscription");
//     }
//   };

//   // --------------------------------------------------
//   // Razorpay Payment integration
//   // --------------------------------------------------
//   const handlePayment = async (sub) => {
//     try {
//       // 1️⃣ Create order from backend
//       const res = await axios.post(
//         "https://crafto-backend-zqcn.onrender.com/api/subscriptions/create-order",
//         {
//           amount: sub.amount,
//           currency: "INR",
//         }
//       );

//       const { order } = res.data;

//       // 2️⃣ Razorpay Options
//       const options = {
//         key: "rzp_test_RXG1QPP8Jk082R", // frontend public key
//         amount: order.amount,
//         currency: order.currency,
//         name: "Crafto Subscription",
//         description: `Payment for ${sub.plan}`,
//         order_id: order.id,

//         handler: async function (response) {
//           alert("Payment Successful!");

//           // 3️⃣ Update subscription
//           await axios.put(
//             `https://crafto-backend-zqcn.onrender.com/api/subscriptions/${sub._id}`,
//             {
//               paymentId: response.razorpay_payment_id,
//               status: "active",
//             }
//           );

//           fetchSubscriptions();
//         },

//         prefill: {
//           name: sub.user,
//           email: "demo@gmail.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       // 4️⃣ Open Razorpay
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (err) {
//       console.error("Payment Error:", err);
//       alert("Payment Failed!");
//     }
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Subscriptions Management</h2>
//         <Button variant="success" onClick={() => setShowModal(true)}>
//           + Add Subscription
//         </Button>
//       </div>

//       <Card>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : (
//             <Table responsive hover>
//               <thead>
//                 <tr>
//                   <th>User</th>
//                   <th>Plan</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {subscriptions.map((sub) => (
//                   <tr key={sub._id}>
//                     <td>{sub.user}</td>
//                     <td>{sub.plan}</td>
//                     <td>₹{sub.amount}</td>
//                     <td>
//                       <Badge
//                         bg={sub.status === "active" ? "success" : "secondary"}
//                       >
//                         {sub.status}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Button
//                         size="sm"
//                         variant="primary"
//                         className="me-2"
//                         onClick={() => handlePayment(sub)}
//                       >
//                         Pay
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="danger"
//                         onClick={() => handleDelete(sub._id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>

//       {/* ------------------ Add Subscription Modal ------------------ */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Subscription</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleAddSubscription}>
//             <Form.Group className="mb-3">
//               <Form.Label>User Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newSub.user}
//                 placeholder="Enter user name"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, user: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Plan</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newSub.plan}
//                 placeholder="Enter plan name"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, plan: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newSub.amount}
//                 placeholder="Enter price"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, amount: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <div className="text-end">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="primary" className="ms-2">
//                 Save
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Subscriptions;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Card,
//   Table,
//   Button,
//   Badge,
//   Spinner,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import axios from "axios";

// const Subscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [newSub, setNewSub] = useState({
//     user: "",
//     plan: "",
//     amount: "",
//     gstPercent: "0",
//   });

//   const [finalAmount, setFinalAmount] = useState(0);

//   // ---------------- Fetch Subscriptions ----------------
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     fetchSubscriptions();
//   }, []);

//   const fetchSubscriptions = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/subscriptions");
//       if (res.data.success) setSubscriptions(res.data.subscriptions);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------------------------------
//   // Auto Calculate GST + Final Amount
//   // ------------------------------------------------------
//   useEffect(() => {
//     const baseAmount = Number(newSub.amount) || 0;
//     const gst = Number(newSub.gstPercent) || 0;

//     const gstAmount = (baseAmount * gst) / 100;
//     const total = baseAmount + gstAmount;

//     setFinalAmount(total);
//   }, [newSub.amount, newSub.gstPercent]);

//   // ---------------- Delete Subscription ----------------
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await axios.delete(`https://crafto-backend-zqcn.onrender.com/api/subscriptions/${id}`);
//       fetchSubscriptions();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------- Add Subscription ----------------
//   const handleAddSubscription = async (e) => {
//     e.preventDefault();

//     if (!newSub.user || !newSub.plan || !newSub.amount) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post("https://crafto-backend-zqcn.onrender.com/api/subscriptions", {
//         ...newSub,
//         gstPercent: Number(newSub.gstPercent),
//       });

//       if (res.data.success) {
//         alert("Subscription added!");
//         setShowModal(false);

//         setNewSub({ user: "", plan: "", amount: "", gstPercent: "0" });
//         setFinalAmount(0);

//         fetchSubscriptions();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error while adding subscription");
//     }
//   };

//   // ---------------- Payment ----------------
//   const handlePayment = async (sub) => {
//     try {
//       const res = await axios.post(
//         "https://crafto-backend-zqcn.onrender.com/api/subscriptions/create-order",
//         {
//           finalAmount: sub.finalAmount, // ✔ Now finalAmount is used
//           currency: "INR",
//         }
//       );

//       const { order } = res.data;

//       const options = {
//         key: "rzp_test_RXG1QPP8Jk082R",
//         amount: order.amount,
//         currency: order.currency,
//         name: "Crafto Subscription",
//         description: `Payment for ${sub.plan}`,
//         order_id: order.id,

//         handler: async function (response) {
//           alert("Payment Successful!");

//           await axios.put(
//             `https://crafto-backend-zqcn.onrender.com/api/subscriptions/${sub._id}`,
//             {
//               paymentId: response.razorpay_payment_id,
//               status: "active",
//             }
//           );

//           fetchSubscriptions();
//         },

//         prefill: {
//           name: sub.user,
//           email: "demo@gmail.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (err) {
//       console.error("Payment Error:", err);
//       alert("Payment Failed!");
//     }
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Subscriptions Management</h2>
//         <Button variant="success" onClick={() => setShowModal(true)}>
//           + Add Subscription
//         </Button>
//       </div>

//       {/* Table */}
//       <Card>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : (
//             <Table responsive hover>
//               <thead>
//                 <tr>
//                   <th>User</th>
//                   <th>Plan</th>
//                   <th>Amount</th>
//                   <th>GST %</th>
//                   <th>Final Amount</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {subscriptions.map((sub) => (
//                   <tr key={sub._id}>
//                     <td>{sub.user}</td>
//                     <td>{sub.plan}</td>
//                     <td>₹{sub.amount}</td>
//                     <td>{sub.gstPercent}%</td>
//                     <td>
//                       <b>₹{sub.finalAmount}</b>
//                     </td>

//                     <td>
//                       <Badge
//                         bg={sub.status === "active" ? "success" : "secondary"}
//                       >
//                         {sub.status}
//                       </Badge>
//                     </td>

//                     <td>
//                       <Button
//                         size="sm"
//                         variant="primary"
//                         className="me-2"
//                         onClick={() => handlePayment(sub)}
//                       >
//                         Pay
//                       </Button>

//                       <Button
//                         size="sm"
//                         variant="danger"
//                         onClick={() => handleDelete(sub._id)}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>

//       {/* ---------------- Add Subscription Modal ---------------- */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Subscription</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleAddSubscription}>
//             <Form.Group className="mb-3">
//               <Form.Label>User Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newSub.user}
//                 placeholder="Enter user name"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, user: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Plan</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newSub.plan}
//                 placeholder="Enter plan name"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, plan: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newSub.amount}
//                 placeholder="Enter price"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, amount: e.target.value })
//                 }
//               />
//             </Form.Group>

//             {/* GST % Dropdown */}
//             {/* <Form.Group className="mb-3">
//               <Form.Label>GST Percentage</Form.Label>
//               <Form.Select
//                 value={newSub.gstPercent}
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, gstPercent: e.target.value })
//                 }
//               >
//                 <option value="0">0% (No GST)</option>
//                 <option value="5">5%</option>
//                 <option value="12">12%</option>
//                 <option value="18">18%</option>
//                 <option value="28">28%</option>
//               </Form.Select>
//             </Form.Group> */}


//             <Form.Group className="mb-3">
//   <Form.Label>GST Percentage</Form.Label>
//   <Form.Control
//     type="number"
//     value={newSub.gstPercent}
//     placeholder="Enter GST % (e.g. 5, 12, 18)"
//     onChange={(e) =>
//       setNewSub({ ...newSub, gstPercent: e.target.value })
//     }
//   />
// </Form.Group>


//             {/* Final amount live preview */}
//             <b>Final Amount: ₹{finalAmount}</b>

//             <div className="text-end mt-3">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="primary" className="ms-2">
//                 Save
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Subscriptions;

// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Card,
//   Table,
//   Button,
//   Badge,
//   Spinner,
//   Modal,
//   Form,
//   Pagination,
// } from "react-bootstrap";
// import axios from "axios";

// const Subscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);
//   const [newSub, setNewSub] = useState({
//     user: "",
//     plan: "",
//     amount: "",
//     gstPercent: "0",
//   });

//   const [finalAmount, setFinalAmount] = useState(0);

//   // ⭐ Pagination States
//   const [search, setSearch] = useState("");
//   const [pageSize, setPageSize] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ---------------- Fetch Subscriptions ----------------
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     fetchSubscriptions();
//   }, []);

//   const fetchSubscriptions = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/subscriptions");
//       if (res.data.success) setSubscriptions(res.data.subscriptions);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ------------------------------------------------------
//   // Auto Calculate GST + Final Amount
//   // ------------------------------------------------------
//   useEffect(() => {
//     const baseAmount = Number(newSub.amount) || 0;
//     const gst = Number(newSub.gstPercent) || 0;

//     const gstAmount = (baseAmount * gst) / 100;
//     const total = baseAmount + gstAmount;

//     setFinalAmount(total);
//   }, [newSub.amount, newSub.gstPercent]);

//   // ---------------- Delete Subscription ----------------
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await axios.delete(`https://crafto-backend-zqcn.onrender.com/api/subscriptions/${id}`);
//       fetchSubscriptions();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------- Add Subscription ----------------
//   const handleAddSubscription = async (e) => {
//     e.preventDefault();

//     if (!newSub.user || !newSub.plan || !newSub.amount) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post("https://crafto-backend-zqcn.onrender.com/api/subscriptions", {
//         ...newSub,
//         gstPercent: Number(newSub.gstPercent),
//       });

//       if (res.data.success) {
//         alert("Subscription added!");
//         setShowModal(false);

//         setNewSub({ user: "", plan: "", amount: "", gstPercent: "0" });
//         setFinalAmount(0);

//         fetchSubscriptions();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error while adding subscription");
//     }
//   };

//   // ---------------- Payment ----------------
//   const handlePayment = async (sub) => {
//     try {
//       const res = await axios.post(
//         "https://crafto-backend-zqcn.onrender.com/api/subscriptions/create-order",
//         {
//           finalAmount: sub.finalAmount,
//           currency: "INR",
//         }
//       );

//       const { order } = res.data;

//       const options = {
//         key: "rzp_test_RXG1QPP8Jk082R",
//         amount: order.amount,
//         currency: order.currency,
//         name: "Crafto Subscription",
//         description: `Payment for ${sub.plan}`,
//         order_id: order.id,

//         handler: async function (response) {
//           alert("Payment Successful!");

//           await axios.put(
//             `https://crafto-backend-zqcn.onrender.com/api/subscriptions/${sub._id}`,
//             {
//               paymentId: response.razorpay_payment_id,
//               status: "active",
//             }
//           );

//           fetchSubscriptions();
//         },

//         prefill: {
//           name: sub.user,
//           email: "demo@gmail.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (err) {
//       console.error("Payment Error:", err);
//       alert("Payment Failed!");
//     }
//   };

//   // ⭐ FILTER + PAGINATION LOGIC
//   const filtered = subscriptions.filter(
//     (s) =>
//       s.user?.toLowerCase().includes(search.toLowerCase()) ||
//       s.plan?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filtered.length / pageSize);

//   const paginatedSubscriptions = filtered.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Subscriptions Management</h2>

//         <Button variant="success" onClick={() => setShowModal(true)}>
//           + Add Subscription
//         </Button>
//       </div>

//       {/* ⭐ Search + Page Size */}
//       <div className="d-flex gap-3 mb-3">
//         <Form.Control
//           placeholder="Search by user or plan..."
//           style={{ maxWidth: "260px" }}
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />

//         <Form.Select
//           style={{ width: "140px" }}
//           value={pageSize}
//           onChange={(e) => {
//             setPageSize(Number(e.target.value));
//             setCurrentPage(1);
//           }}
//         >
//           <option value="5">5 / page</option>
//           <option value="10">10 / page</option>
//           <option value="20">20 / page</option>
//           <option value="50">50 / page</option>
//         </Form.Select>
//       </div>

//       {/* Table */}
//       <Card>
//         <Card.Body>
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : (
//             <>
//               <Table responsive hover>
//                 <thead>
//                   <tr>
//                     <th>User</th>
//                     <th>Plan</th>
//                     <th>Amount</th>
//                     <th>GST %</th>
//                     <th>Final Amount</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {paginatedSubscriptions.map((sub) => (
//                     <tr key={sub._id}>
//                       <td>{sub.user}</td>
//                       <td>{sub.plan}</td>
//                       <td>₹{sub.amount}</td>
//                       <td>{sub.gstPercent}%</td>
//                       <td>
//                         <b>₹{sub.finalAmount}</b>
//                       </td>
//                       <td>
//                         <Badge
//                           bg={sub.status === "active" ? "success" : "secondary"}
//                         >
//                           {sub.status}
//                         </Badge>
//                       </td>

//                       <td>
//                         <Button
//                           size="sm"
//                           variant="primary"
//                           className="me-2"
//                           onClick={() => handlePayment(sub)}
//                         >
//                           Pay
//                         </Button>

//                         <Button
//                           size="sm"
//                           variant="danger"
//                           onClick={() => handleDelete(sub._id)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>

//               {/* ⭐ Pagination */}
//               <Pagination className="mt-3">
//                 <Pagination.Prev
//                   onClick={() => goToPage(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 />

//                 {[...Array(totalPages)].map((_, i) => (
//                   <Pagination.Item
//                     key={i}
//                     active={i + 1 === currentPage}
//                     onClick={() => goToPage(i + 1)}
//                   >
//                     {i + 1}
//                   </Pagination.Item>
//                 ))}

//                 <Pagination.Next
//                   onClick={() => goToPage(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 />
//               </Pagination>
//             </>
//           )}
//         </Card.Body>
//       </Card>

//       {/* ------------ Add Subscription Modal ------------ */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Subscription</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleAddSubscription}>
//             <Form.Group className="mb-3">
//               <Form.Label>User Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newSub.user}
//                 placeholder="Enter user name"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, user: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Plan</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newSub.plan}
//                 placeholder="Enter plan name"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, plan: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newSub.amount}
//                 placeholder="Enter price"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, amount: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>GST Percentage</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newSub.gstPercent}
//                 placeholder="Enter GST % (e.g. 5, 12, 18)"
//                 onChange={(e) =>
//                   setNewSub({ ...newSub, gstPercent: e.target.value })
//                 }
//               />
//             </Form.Group>

//             <b>Final Amount: ₹{finalAmount}</b>

//             <div className="text-end mt-3">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit" variant="primary" className="ms-2">
//                 Save
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Subscriptions;

import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Badge,
  Spinner,
  Modal,
  Form,
  Pagination,
} from "react-bootstrap";
import axios from "axios";

const API_BASE = "https://crafto-backend-zqcn.onrender.com/api/subscriptions";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [newSub, setNewSub] = useState({
    user: "",
    plan: "",
    amount: "",
    gstPercent: "0",
  });

  const [finalAmount, setFinalAmount] = useState(0);

  // Pagination
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ----------------------------------
  // Load Razorpay Script + Fetch Data
  // ----------------------------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get(API_BASE);
      if (res.data.success) setSubscriptions(res.data.subscriptions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------
  // Auto GST Calculation
  // ----------------------------------
  useEffect(() => {
    const base = Number(newSub.amount) || 0;
    const gst = Number(newSub.gstPercent) || 0;
    const gstAmount = (base * gst) / 100;
    setFinalAmount(base + gstAmount);
  }, [newSub.amount, newSub.gstPercent]);

  // ----------------------------------
  // Add Subscription
  // ----------------------------------
  const handleAddSubscription = async (e) => {
    e.preventDefault();

    if (!newSub.user || !newSub.plan || !newSub.amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(API_BASE, {
        ...newSub,
        gstPercent: Number(newSub.gstPercent),
      });

      if (res.data.success) {
        alert("Subscription added!");
        setShowModal(false);
        setNewSub({ user: "", plan: "", amount: "", gstPercent: "0" });
        setFinalAmount(0);
        fetchSubscriptions();
      }
    } catch (err) {
      alert("Error while adding subscription");
    }
  };

  // ----------------------------------
  // Delete Subscription
  // ----------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchSubscriptions();
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------
  // ✅ PAYMENT (CREATE + VERIFY) — FINAL
  // ----------------------------------
  const handlePayment = async (sub) => {
    try {
      // 1️⃣ Create Razorpay Order
      const res = await axios.post(`${API_BASE}/create-order`, {
        subscriptionId: sub._id,
      });

      const { order, key } = res.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Crafto Subscription",
        description: `Payment for ${sub.plan}`,
        order_id: order.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${API_BASE}/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              alert("Payment Verified & Subscription Activated!");
              fetchSubscriptions();
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            alert("Payment verification error");
          }
        },

        prefill: {
          name: sub.user,
          email: "demo@gmail.com",
          contact: "9999999999",
        },

        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    }
  };

  // ----------------------------------
  // Filter + Pagination
  // ----------------------------------
  const filtered = subscriptions.filter(
    (s) =>
      s.user?.toLowerCase().includes(search.toLowerCase()) ||
      s.plan?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    <Container fluid>
      {/* <div className="d-flex justify-content-between mb-4">
        <h2>Subscriptions Management</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Add Subscription
        </Button>
      </div> */}

      {/* Search */}
      <div className="d-flex gap-3 mb-3">
        <Form.Control
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{ maxWidth: 260 }}
        />
        <Form.Select
          style={{ width: 140 }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
        </Form.Select>
      </div>

      {/* Table */}
      <Card>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>GST %</th>
                    <th>Final</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((sub) => (
                    <tr key={sub._id}>
                      <td>{sub.user}</td>
                      <td>{sub.plan}</td>
                      <td>₹{sub.amount}</td>
                      <td>{sub.gstPercent}%</td>
                      <td>
                        <b>₹{sub.finalAmount}</b>
                      </td>
                      <td>
                        <Badge bg={sub.status === "active" ? "success" : "secondary"}>
                          {sub.status}
                        </Badge>
                      </td>
                      <td>
                        {/* {sub.status !== "active" && (
                          <Button
                            size="sm"
                            className="me-2"
                            onClick={() => handlePayment(sub)}
                          >
                            Pay
                          </Button>
                        )} */}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(sub._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                />
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
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                />
              </Pagination>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Add Modal */}
      {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubscription}>
            <Form.Control
              className="mb-2"
              placeholder="User"
              value={newSub.user}
              onChange={(e) => setNewSub({ ...newSub, user: e.target.value })}
            />
            <Form.Control
              className="mb-2"
              placeholder="Plan"
              value={newSub.plan}
              onChange={(e) => setNewSub({ ...newSub, plan: e.target.value })}
            />
            <Form.Control
              className="mb-2"
              type="number"
              placeholder="Amount"
              value={newSub.amount}
              onChange={(e) => setNewSub({ ...newSub, amount: e.target.value })}
            />
            <Form.Control
              className="mb-2"
              type="number"
              placeholder="GST %"
              value={newSub.gstPercent}
              onChange={(e) =>
                setNewSub({ ...newSub, gstPercent: e.target.value })
              }
            />
            <b>Final Amount: ₹{finalAmount}</b>
            <div className="text-end mt-3">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="ms-2">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
};

export default Subscriptions;
