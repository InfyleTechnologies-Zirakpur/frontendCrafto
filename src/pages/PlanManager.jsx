
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Form,
//   Button,
//   Table,
//   Card,
//   Modal,
//   Row,
//   Col
// } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const API = "http://localhost:7000/api/plans";

// const emptyForm = {
//   name: "",
//   price: 0,
//   discountPrice: 0,
//   durationValue: 0,
//   durationUnit: "days",
//   image: null,
//   banner: null,
// };

// const PlanManager = () => {
//   const [plans, setPlans] = useState([]);
//   const [form, setForm] = useState(emptyForm);
//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [loading, setLoading] = useState(false);

//   /* ================= FETCH ================= */
//   const fetchPlans = async () => {
//     const res = await axios.get(API);
//     setPlans(res.data.plans || []);
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const fd = new FormData();

//       Object.entries(form).forEach(([k, v]) => {
//         if (v !== null) fd.append(k, v);
//       });

//       if (editing) {
//         await axios.put(`${API}/${editing._id}`, fd);
//       } else {
//         await axios.post(API, fd);
//       }

//       handleClose();
//       fetchPlans();
//     } catch (err) {
//       alert("Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (plan) => {
//     setEditing(plan);
//     setForm({
//       name: plan.name,
//       price: plan.price,
//       discountPrice: plan.discountPrice,
//       durationValue: plan.duration?.value || 0,
//       durationUnit: plan.duration?.unit || "days",
//       image: null,
//       banner: null,
//     });
//     setShowModal(true);
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this plan?")) return;
//     await axios.delete(`${API}/${id}`);
//     fetchPlans();
//   };

//   /* ================= CLOSE ================= */
//   const handleClose = () => {
//     setShowModal(false);
//     setEditing(null);
//     setForm(emptyForm);
//   };

//   return (
//     <Card className="p-4">
//       {/* HEADER */}
//       <div className="d-flex justify-content-between mb-3">
//         <h4>Plans</h4>
//         <Button onClick={() => setShowModal(true)}>
//           <FaPlus /> Add Plan
//         </Button>
//       </div>

//       {/* TABLE */}
//       <Table bordered hover responsive>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Discount</th>
//             <th>Duration</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {plans.map((p, i) => (
//             <tr key={p._id}>
//               <td>{i + 1}</td>
//               <td>{p.name}</td>
//               <td>₹{p.price}</td>
//               <td>₹{p.discountPrice}</td>
//               <td>
//                 {p.duration?.value} {p.duration?.unit}
//               </td>
//               <td>
//                 {p.image && (
//                   <img
//                     src={p.image}
//                     alt=""
//                     width="50"
//                     style={{ borderRadius: 6 }}
//                   />
//                 )}
//               </td>
//               <td>
//                 <Button
//                   size="sm"
//                   className="me-1"
//                   onClick={() => handleEdit(p)}
//                 >
//                   <FaEdit />
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => handleDelete(p._id)}
//                 >
//                   <FaTrash />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* ================= MODAL ================= */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editing ? "Edit Plan" : "Add Plan"}
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Row className="g-2">
//             <Col md={12}>
//               <Form.Label>Plan Name</Form.Label>
//               <Form.Control
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({ ...form, name: e.target.value })
//                 }
//               />
//             </Col>

//             <Col md={6}>
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={form.price}
//                 onChange={(e) =>
//                   setForm({ ...form, price: e.target.value })
//                 }
//               />
//             </Col>

//             <Col md={6}>
//               <Form.Label>Discount Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={form.discountPrice}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     discountPrice: e.target.value,
//                   })
//                 }
//               />
//             </Col>

//             <Col md={6}>
//               <Form.Label>Duration</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={form.durationValue}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     durationValue: e.target.value,
//                   })
//                 }
//               />
//             </Col>

//             <Col md={6}>
//               <Form.Label>Unit</Form.Label>
//               <Form.Select
//                 value={form.durationUnit}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     durationUnit: e.target.value,
//                   })
//                 }
//               >
//                 <option value="days">Days</option>
//                 <option value="months">Months</option>
//                 <option value="years">Years</option>
//               </Form.Select>
//             </Col>

//             <Col md={12}>
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={(e) =>
//                   setForm({ ...form, image: e.target.files[0] })
//                 }
//               />
//             </Col>

//             <Col md={12}>
//               <Form.Label>Banner</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={(e) =>
//                   setForm({ ...form, banner: e.target.files[0] })
//                 }
//               />
//             </Col>
//           </Row>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             disabled={loading}
//             onClick={handleSubmit}
//           >
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Card>
//   );
// };

// export default PlanManager;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Table,
  Card,
  Modal,
  Row,
  Col
} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const API = "http://localhost:7000/api/plans";

const emptyForm = {
  name: "",
  price: 0,
  discountPrice: 0,
  durationValue: 0,
  durationUnit: "days",
  image: null,
  banner: null,
};

const PlanManager = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchPlans = async () => {
    const res = await axios.get(API);
    setPlans(res.data.plans || []);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== "") fd.append(k, v);
      });

      if (editing) {
        await axios.put(`${API}/${editing._id}`, fd);
      } else {
        await axios.post(API, fd);
      }

      handleClose();
      fetchPlans();
    } catch (err) {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (plan) => {
    setEditing(plan);
    setForm({
      name: plan.name,
      price: plan.price,
      discountPrice: plan.discountPrice,
      durationValue: plan.duration?.value || 0,
      durationUnit: plan.duration?.unit || "days",
      image: null,
      banner: null,
    });
    setShowModal(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    await axios.delete(`${API}/${id}`);
    fetchPlans();
  };

  /* ================= STATUS TOGGLE ================= */
  const handleToggleStatus = async (plan) => {
    try {
      await axios.put(
        `${API}/toggle-status/${plan._id}`,
        {}
      );
      fetchPlans();
    } catch {
      alert("Status toggle failed");
    }
  };

  /* ================= CLOSE ================= */
  const handleClose = () => {
    setShowModal(false);
    setEditing(null);
    setForm(emptyForm);
  };

  return (
    <Card className="p-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h4>Plans</h4>
        <Button onClick={() => setShowModal(true)}>
          <FaPlus /> Add Plan
        </Button>
      </div>

      {/* TABLE */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((p, i) => (
            <tr key={p._id}>
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>₹{p.discountPrice}</td>
              <td>
                {p.duration?.value} {p.duration?.unit}
              </td>

              {/* 🔥 STATUS TOGGLE */}
              <td>
                <Form.Check
                  type="switch"
                  checked={p.status === "active"}
                  label={p.status}
                  onChange={() => handleToggleStatus(p)}
                />
              </td>

              <td>
                {p.image && (
                  <img
                    src={p.image}
                    alt=""
                    width="50"
                    style={{ borderRadius: 6 }}
                  />
                )}
              </td>

              <td>
                <Button
                  size="sm"
                  className="me-1"
                  onClick={() => handleEdit(p)}
                >
                  <FaEdit />
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(p._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ================= MODAL ================= */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Edit Plan" : "Add Plan"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-2">
            <Col md={12}>
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </Col>

            <Col md={6}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </Col>

            <Col md={6}>
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                type="number"
                value={form.discountPrice}
                onChange={(e) =>
                  setForm({ ...form, discountPrice: e.target.value })
                }
              />
            </Col>

            <Col md={6}>
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                value={form.durationValue}
                onChange={(e) =>
                  setForm({ ...form, durationValue: e.target.value })
                }
              />
            </Col>

            <Col md={6}>
              <Form.Label>Unit</Form.Label>
              <Form.Select
                value={form.durationUnit}
                onChange={(e) =>
                  setForm({ ...form, durationUnit: e.target.value })
                }
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </Form.Select>
            </Col>

            <Col md={12}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />
            </Col>

            <Col md={12}>
              <Form.Label>Banner</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setForm({ ...form, banner: e.target.files[0] })
                }
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default PlanManager;
