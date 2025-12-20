//  import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form, Table, Image, Spinner } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const API_URL = process.env.REACT_APP_API_URL || "https://crafto-backend-zqcn.onrender.com/api/festivals";
// const RENDER_API = process.env.REACT_APP_RENDER_API || "https://crafto-backend-zqcn.onrender.com/api/render";

// const FestivalManager = () => {
//   const [festivals, setFestivals] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 5;
//   const [totalPages, setTotalPages] = useState(1);

//   const [loadingList, setLoadingList] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // ⭐ TRANSITIONS STATE HERE
//   const [transitions, setTransitions] = useState([]);

//   const [formData, setFormData] = useState({
//     title: "",
//     template: "",
//     transition: "",
//     status: "active",
//     logo: null,
//     preview: "",
//   });

//   // ⭐ FETCH TRANSITIONS INSIDE SAME COMPONENT
//   const fetchTransitions = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/transitions");
//       setTransitions(res.data.transitions || []);
//     } catch (err) {
//       console.error("Failed to load transitions", err);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       setLoadingList(true);
//       const res = await axios.get(API_URL, { params: { search, page, limit } });
//       setFestivals(res.data.festivals || []);
//       setTotalPages(res.data.pages || 1);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load festivals");
//     } finally {
//       setLoadingList(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchTransitions();    // ⭐ TRANSITIONS LOADING
//   }, [page, search]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files.length) {
//       const file = files[0];
//       setFormData((prev) => ({
//         ...prev,
//         logo: file,
//         preview: URL.createObjectURL(file),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setSaving(true);
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("template", formData.template);
//       data.append("transition", formData.transition);
//       data.append("status", formData.status);
//       if (formData.logo) data.append("logo", formData.logo, formData.logo.name);

//       if (editing) {
//         await axios.put(`${API_URL}/${editing._id}`, data);
//       } else {
//         await axios.post(API_URL, data);
//       }

//       handleClose();
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditing(item);
//     setFormData({
//       title: item.title || "",
//       template: item.template || "",
//       transition: item.transition || "",
//       status: item.status || "active",
//       logo: null,
//       preview: item.logo || "",
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this festival?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   const handleClose = () => {
//     setEditing(null);
//     setFormData({
//       title: "",
//       template: "",
//       transition: "",
//       status: "active",
//       logo: null,
//       preview: "",
//     });
//     setShowModal(false);
//   };

//   const renderVideo = async (id) => {
//     try {
//       const res = await axios.post(RENDER_API, { id });
//       const url = res.data.videoUrl || res.data.video || res.data.videoUrl;
//       if (!url) return alert("No render URL returned");
//       window.open(url, "_blank");
//     } catch (err) {
//       console.error(err);
//       alert("Render failed");
//     }
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4>Festival Templates</h4>
//         <Button onClick={() => setShowModal(true)}>
//           <FaPlus /> Add Festival
//         </Button>
//       </div>

//       <div className="mb-3 d-flex gap-2">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search festival..."
//           value={search}
//           onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//         />
//       </div>

//       {loadingList ? (
//         <div className="text-center py-4"><Spinner animation="border" /></div>
//       ) : (
//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Logo</th>
//               <th>Title</th>
//               <th>Template</th>
//               <th>Transition</th>
//               <th>Status</th>
//               <th>Render</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {festivals.length ? festivals.map((f, i) => (
//               <tr key={f._id}>
//                 <td>{(page - 1) * limit + i + 1}</td>
//                 <td style={{ width: 90 }}>
//                   {f.logo ? <Image src={f.logo} width="60" height="60" rounded /> : "No Logo"}
//                 </td>
//                 <td>{f.title}</td>
//                 <td>{f.template}</td>
//                 <td>{f.transition}</td>
//                 <td>{f.status}</td>
//                 <td>
//                   <Button size="sm" onClick={() => renderVideo(f._id)}>Render</Button>
//                 </td>
//                 <td>
//                   <Button size="sm" variant="warning" onClick={() => handleEdit(f)}><FaEdit /></Button>{" "}
//                   <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}><FaTrash /></Button>
//                 </td>
//               </tr>
//             )) : (
//               <tr><td colSpan="8" className="text-center">No data found</td></tr>
//             )}
//           </tbody>
//         </Table>
//       )}

//       <div className="d-flex justify-content-center gap-2 my-3">
//         <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
//         <div className="px-3 py-1 border rounded">Page {page} / {totalPages}</div>
//         <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//       </div>

//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{editing ? "Edit Festival" : "Add Festival"}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-2">
//               <Form.Label>Title</Form.Label>
//               <Form.Control name="title" value={formData.title} onChange={handleChange} required />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Template</Form.Label>
//               <Form.Control name="template" value={formData.template} onChange={handleChange} placeholder="e.g. diwali, holi" />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Transition</Form.Label>

//               {/* ⭐⭐ DYNAMIC TRANSITION DROPDOWN ⭐⭐ */}
//               <Form.Select name="transition" value={formData.transition} onChange={handleChange} required>
//                 <option value="">Select Transition</option>
//                 {transitions.map((t, idx) => (
//                   <option key={idx} value={t}>
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </option>
//                 ))}
//               </Form.Select>

//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Status</Form.Label>
//               <Form.Select name="status" value={formData.status} onChange={handleChange}>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Logo</Form.Label>
//               <Form.Control type="file" name="logo" accept="image/*" onChange={handleChange} />
//               {formData.preview && (
//                 <div className="text-center mt-2">
//                   <Image src={formData.preview} width="100" height="100" rounded />
//                 </div>
//               )}
//             </Form.Group>

//             <Button type="submit" className="w-100" disabled={saving}>
//               {saving ? "Saving..." : (editing ? "Update" : "Save")}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default FestivalManager;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form, Table, Image, Spinner } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const API_URL = process.env.REACT_APP_API_URL || "https://crafto-backend-zqcn.onrender.com/api/festivals";
// const RENDER_API = process.env.REACT_APP_RENDER_API || "https://crafto-backend-zqcn.onrender.com/api/render";

// const FestivalManager = () => {
//   const [festivals, setFestivals] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 5;
//   const [totalPages, setTotalPages] = useState(1);

//   const [loadingList, setLoadingList] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [transitions, setTransitions] = useState([]);

//   // ⭐ Added: zoom & movement values
//   const [formData, setFormData] = useState({
//     title: "",
//     template: "",
//     transition: "",
//     status: "active",
//     logo: null,
//     preview: "",
//     zoom: 1,
//     x: 0,
//     y: 0,

//         banner: null,
//     bannerPreview: "",
//     bannerZoom: 1,
//     bannerX: 0,
//     bannerY: 0,

//   });

//   const fetchTransitions = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/transitions");
//       setTransitions(res.data.transitions || []);
//     } catch (err) {
//       console.error("Failed to load transitions", err);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       setLoadingList(true);
//       const res = await axios.get(API_URL, { params: { search, page, limit } });
//       setFestivals(res.data.festivals || []);
//       setTotalPages(res.data.pages || 1);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load festivals");
//     } finally {
//       setLoadingList(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchTransitions();
//   }, [page, search]);

//   // ⭐ Handle file/image + text inputs
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files && files.length) {
//       // ⭐ Banner Upload
// if (name === "banner" && files?.length) {
//   const file = files[0];
//   return setFormData((prev) => ({
//     ...prev,
//     banner: file,
//     bannerPreview: URL.createObjectURL(file),
//   }));
// }

//       const file = files[0];
//       setFormData((prev) => ({
//         ...prev,
//         logo: file,
//         preview: URL.createObjectURL(file),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // ⭐ SUBMIT WITH ZOOM + X + Y
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setSaving(true);
//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("template", formData.template);
//       data.append("transition", formData.transition);
//       data.append("status", formData.status);
//       data.append("zoom", formData.zoom);
//       data.append("offsetX", formData.x);
//       data.append("offsetY", formData.y);

//       if (formData.logo) data.append("logo", formData.logo, formData.logo.name);
//       if (formData.banner) data.append("banner", formData.banner, formData.banner.name);

// data.append("bannerZoom", formData.bannerZoom);
// data.append("bannerX", formData.bannerX);
// data.append("bannerY", formData.bannerY);


//       if (editing) {
//         await axios.put(`${API_URL}/${editing._id}`, data);
//       } else {
//         await axios.post(API_URL, data);
//       }

//       handleClose();
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ⭐ Edit existing festival (load previous logo + zoom offsets)
//   const handleEdit = (item) => {
//     setEditing(item);
//     setFormData({
//       title: item.title || "",
//       template: item.template || "",
//       transition: item.transition || "",
//       status: item.status || "active",
//       logo: null,
//       preview: item.logo || "",
//       zoom: item.zoom || 1,
//       x: item.offsetX || 0,
//       y: item.offsetY || 0,
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this festival?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   const handleClose = () => {
//     setEditing(null);
//     setFormData({
//       title: "",
//       template: "",
//       transition: "",
//       status: "active",
//       logo: null,
//       preview: "",
//       zoom: 1,
//       x: 0,
//       y: 0,
//     });
//     setShowModal(false);
//   };

//   const renderVideo = async (id) => {
//     try {
//       const res = await axios.post(RENDER_API, { id });
//       const url = res.data.videoUrl;
//       if (!url) return alert("No render URL returned");
//       window.open(url, "_blank");
//     } catch (err) {
//       console.error(err);
//       alert("Render failed");
//     }
//   };

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4>Festival Templates</h4>
//         <Button onClick={() => setShowModal(true)}>
//           <FaPlus /> Add Festival
//         </Button>
//       </div>

//       {/* SEARCH INPUT */}
//       <div className="mb-3 d-flex gap-2">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search festival..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />
//       </div>

//       {/* TABLE */}
//       {loadingList ? (
//         <div className="text-center py-4">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Logo</th>
//               <th>Title</th>
//               <th>Template</th>
//               <th>Transition</th>
//               <th>Status</th>
//               <th>Render</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {festivals.length ? (
//               festivals.map((f, i) => (
//                 <tr key={f._id}>
//                   <td>{(page - 1) * limit + i + 1}</td>

//                   <td style={{ width: 90 }}>
//                     {f.logo ? (
//                       <Image
//                         src={f.logo}
//                         width="60"
//                         height="60"
//                         rounded
//                         style={{
//                           objectFit: "cover",
//                           transform: `scale(${f.zoom || 1}) translate(${f.offsetX || 0}px, ${f.offsetY || 0}px)`,
//                         }}
//                       />
//                     ) : (
//                       "No Logo"
//                     )}
//                   </td>

//                   <td>{f.title}</td>
//                   <td>{f.template}</td>
//                   <td>{f.transition}</td>
//                   <td>{f.status}</td>

//                   <td>
//                     <Button size="sm" onClick={() => renderVideo(f._id)}>
//                       Render
//                     </Button>
//                   </td>

//                   <td>
//                     <Button size="sm" variant="warning" onClick={() => handleEdit(f)}>
//                       <FaEdit />
//                     </Button>{" "}
//                     <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}>
//                       <FaTrash />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center">
//                   No data found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       )}

//       {/* PAGINATION */}
//       <div className="d-flex justify-content-center gap-2 my-3">
//         <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </Button>
//         <div className="px-3 py-1 border rounded">Page {page} / {totalPages}</div>
//         <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
//           Next
//         </Button>
//       </div>

//       {/* MODAL */}
//       <Modal show={showModal} onHide={handleClose} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editing ? "Edit Festival" : "Add Festival"}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <div className="row">
//               {/* LEFT SIDE FORM */}
//               <div className="col-md-6">
                
//                 <Form.Group className="mb-2">
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control name="title" value={formData.title} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-2">
//                   <Form.Label>Template</Form.Label>
//                   <Form.Control name="template" value={formData.template} onChange={handleChange} />
//                 </Form.Group>

//                 <Form.Group className="mb-2">
//                   <Form.Label>Transition</Form.Label>
//                   <Form.Select name="transition" value={formData.transition} onChange={handleChange}>
//                     <option value="">Select Transition</option>
//                     {transitions.map((t, idx) => (
//                       <option key={idx} value={t}>{t}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-2">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Select name="status" value={formData.status} onChange={handleChange}>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Logo</Form.Label>
//                   <Form.Control type="file" name="logo" accept="image/*" onChange={handleChange} />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//   <Form.Label>Banner Image</Form.Label>
//   <Form.Control type="file" name="banner" accept="image/*" onChange={handleChange} />
// </Form.Group>

//               </div>

//               {/* RIGHT SIDE — IMAGE ADJUSTMENT */}
//               <div className="col-md-6">

//                 <div className="p-2 border rounded">
//                   <h6 className="text-center">Image Adjustment</h6>

//                   {/* ZOOM */}
//                   <label>Zoom</label>
//                   <input
//                     type="range"
//                     min="0.5"
//                     max="2"
//                     step="0.01"
//                     value={formData.zoom}
//                     onChange={(e) =>
//                       setFormData((p) => ({ ...p, zoom: parseFloat(e.target.value) }))
//                     }
//                     className="form-range"
//                   />

//                   {/* Left / Right */}
//                   <label>Move Left / Right</label>
//                   <input
//                     type="range"
//                     min="-100"
//                     max="100"
//                     value={formData.x}
//                     onChange={(e) =>
//                       setFormData((p) => ({ ...p, x: parseInt(e.target.value) }))
//                     }
//                     className="form-range"
//                   />

//                   {/* Up / Down */}
//                   <label>Move Up / Down</label>
//                   <input
//                     type="range"
//                     min="-100"
//                     max="100"
//                     value={formData.y}
//                     onChange={(e) =>
//                       setFormData((p) => ({ ...p, y: parseInt(e.target.value) }))
//                     }
//                     className="form-range"
//                   />
//                 </div>
//                 <div className="p-2 border rounded mt-3">
//   <h6 className="text-center">Banner Adjustment</h6>

//   <label>Zoom</label>
//   <input
//     type="range"
//     min="0.5"
//     max="2"
//     step="0.01"
//     value={formData.bannerZoom}
//     onChange={(e) => setFormData((p) => ({ ...p, bannerZoom: parseFloat(e.target.value) }))}
//     className="form-range"
//   />

//   <label>Move Left / Right</label>
//   <input
//     type="range"
//     min="-200"
//     max="200"
//     value={formData.bannerX}
//     onChange={(e) => setFormData((p) => ({ ...p, bannerX: parseInt(e.target.value) }))}
//     className="form-range"
//   />

//   <label>Move Up / Down</label>
//   <input
//     type="range"
//     min="-200"
//     max="200"
//     value={formData.bannerY}
//     onChange={(e) => setFormData((p) => ({ ...p, bannerY: parseInt(e.target.value) }))}
//     className="form-range"
//   />
// </div>


//                 {/* LIVE PREVIEW */}
//                 {formData.preview && (
//                   <div className="text-center mt-3">
//                     <div
//                       style={{
//                         width: 200,
//                         height: 200,
//                         border: "1px dashed #999",
//                         overflow: "hidden",
//                         margin: "auto",
//                       }}
//                     >
//                       <img
//                         src={formData.preview}
//                         alt="preview"
//                         style={{
//                           width: "200px",
//                           height: "200px",
//                           objectFit: "contain",
//                           transform: `scale(${formData.zoom}) translate(${formData.x}px, ${formData.y}px)`
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             {/* BANNER PREVIEW */}
// {formData.bannerPreview && (
//   <div className="text-center mt-3">
//     <div
//       style={{
//         width: 300,
//         height: 130,
//         border: "1px dashed #999",
//         overflow: "hidden",
//         margin: "auto",
//         borderRadius: "8px",
//       }}
//     >
//       <img
//         src={formData.bannerPreview}
//         alt="banner preview"
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`
//         }}
//       />
//     </div>
//     <small className="text-muted">Banner Preview</small>
//   </div>
// )}


//             <Button type="submit" className="w-100 mt-3" disabled={saving}>
//               {saving ? "Saving..." : editing ? "Update" : "Save"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default FestivalManager;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form, Table, Image, Spinner } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const API_URL = process.env.REACT_APP_API_URL || "https://crafto-backend-zqcn.onrender.com/api/festivals";
// const RENDER_API = process.env.REACT_APP_RENDER_API || "https://crafto-backend-zqcn.onrender.com/api/render";

// const FestivalManager = () => {
//   const [festivals, setFestivals] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 5;
//   const [totalPages, setTotalPages] = useState(1);

//   const [loadingList, setLoadingList] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [transitions, setTransitions] = useState([]);

//   // ⭐ FULL CRAFTO STYLE DATA
//   const [formData, setFormData] = useState({
//     title: "",
//     template: "",
//     transition: "",
//     status: "active",

//     // Logo
//     logo: null,
//     preview: "",
//     zoom: 1,
//     x: 0,
//     y: 0,

//     // Banner
//     banner: null,
//     bannerPreview: "",
//     bannerZoom: 1,
//     bannerX: 0,
//     bannerY: 0
//   });

//   const fetchTransitions = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/transitions");
//       setTransitions(res.data.transitions || []);
//     } catch (err) {
//       console.error("Failed to load transitions", err);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       setLoadingList(true);
//       const res = await axios.get(API_URL, { params: { search, page, limit } });
//       setFestivals(res.data.festivals || []);
//       setTotalPages(res.data.pages || 1);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load festivals");
//     } finally {
//       setLoadingList(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchTransitions();
//   }, [page, search]);

//   // ⭐ Handle Inputs
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files && files.length) {
//       const file = files[0];

//       // ⭐ Banner
//       if (name === "banner") {
//         return setFormData((prev) => ({
//           ...prev,
//           banner: file,
//           bannerPreview: URL.createObjectURL(file),
//         }));
//       }

//       // ⭐ Logo
//       return setFormData((prev) => ({
//         ...prev,
//         logo: file,
//         preview: URL.createObjectURL(file),
//       }));
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ⭐ SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setSaving(true);

//       const data = new FormData();
//       data.append("title", formData.title);
//       data.append("template", formData.template);
//       data.append("transition", formData.transition);
//       data.append("status", formData.status);

//       // logo transform
//       data.append("zoom", formData.zoom);
//       data.append("offsetX", formData.x);
//       data.append("offsetY", formData.y);

//       // banner transform
//       data.append("bannerZoom", formData.bannerZoom);
//       data.append("bannerX", formData.bannerX);
//       data.append("bannerY", formData.bannerY);

//       if (formData.logo) data.append("logo", formData.logo, formData.logo.name);
//       if (formData.banner) data.append("banner", formData.banner, formData.banner.name);

//       if (editing) await axios.put(`${API_URL}/${editing._id}`, data);
//       else await axios.post(API_URL, data);

//       handleClose();
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ⭐ HANDLE EDIT
//   const handleEdit = (item) => {
//     setEditing(item);

//     setFormData({
//       title: item.title || "",
//       template: item.template || "",
//       transition: item.transition || "",
//       status: item.status || "active",

//       // Logo
//       logo: null,
//       preview: item.logo || "",
//       zoom: item.zoom || 1,
//       x: item.offsetX || 0,
//       y: item.offsetY || 0,

//       // Banner
//       banner: null,
//       bannerPreview: item.banner || "",
//       bannerZoom: item.bannerZoom || 1,
//       bannerX: item.bannerX || 0,
//       bannerY: item.bannerY || 0
//     });

//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this festival?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   const handleClose = () => {
//     setEditing(null);
//     setFormData({
//       title: "",
//       template: "",
//       transition: "",
//       status: "active",

//       logo: null,
//       preview: "",
//       zoom: 1,
//       x: 0,
//       y: 0,

//       banner: null,
//       bannerPreview: "",
//       bannerZoom: 1,
//       bannerX: 0,
//       bannerY: 0
//     });
//     setShowModal(false);
//   };

//   const renderVideo = async (id) => {
//     try {
//       const res = await axios.post(RENDER_API, { id });
//       const url = res.data.videoUrl;
//       if (!url) return alert("No render URL returned");
//       window.open(url, "_blank");
//     } catch (err) {
//       console.error(err);
//       alert("Render failed");
//     }
//   };

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4>Festival Templates</h4>
//         <Button onClick={() => setShowModal(true)}>
//           <FaPlus /> Add Festival
//         </Button>
//       </div>

//       {/* SEARCH */}
//       <div className="mb-3 d-flex gap-2">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search festival..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />
//       </div>

//       {/* TABLE */}
//       {loadingList ? (
//         <div className="text-center py-4">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Logo</th>
//               <th>Banner</th>
//               <th>Title</th>
//               <th>Template</th>
//               <th>Transition</th>
//               <th>Status</th>
//               <th>Render</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {festivals.length ? (
//               festivals.map((f, i) => (
//                 <tr key={f._id}>
//                   <td>{(page - 1) * limit + i + 1}</td>

//                   {/* LOGO */}
//                   <td>
//                     {f.logo ? (
//                       <Image
//                         src={f.logo}
//                         width="60"
//                         height="60"
//                         rounded
//                         style={{
//                           objectFit: "cover",
//                           transform: `scale(${f.zoom}) translate(${f.offsetX}px, ${f.offsetY}px)`
//                         }}
//                       />
//                     ) : "No Logo"}
//                   </td>

//                   {/* BANNER */}
//                   <td>
//                     {f.banner ? (
//                       <Image
//                         src={f.banner}
//                         width="120"
//                         height="60"
//                         rounded
//                         style={{
//                           objectFit: "cover",
//                           transform: `scale(${f.bannerZoom}) translate(${f.bannerX}px, ${f.bannerY}px)`
//                         }}
//                       />
//                     ) : "No Banner"}
//                   </td>

//                   <td>{f.title}</td>
//                   <td>{f.template}</td>
//                   <td>{f.transition}</td>
//                   <td>{f.status}</td>

//                   <td>
//                     <Button size="sm" onClick={() => renderVideo(f._id)}>
//                       Render
//                     </Button>
//                   </td>

//                   <td>
//                     <Button size="sm" variant="warning" onClick={() => handleEdit(f)}>
//                       <FaEdit />
//                     </Button>{" "}
//                     <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}>
//                       <FaTrash />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center">
//                   No data found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       )}

//       {/* PAGINATION */}
//       <div className="d-flex justify-content-center gap-2 my-3">
//         <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </Button>

//         <div className="px-3 py-1 border rounded">
//           Page {page} / {totalPages}
//         </div>

//         <Button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </Button>
//       </div>

//       {/* MODAL */}
//       <Modal show={showModal} onHide={handleClose} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editing ? "Edit Festival" : "Add Festival"}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <div className="row">

//               {/* LEFT SIDE FORM */}
//               <div className="col-md-6">

//                 <Form.Group className="mb-2">
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-2">
//                   <Form.Label>Template</Form.Label>
//                   <Form.Control
//                     name="template"
//                     value={formData.template}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-2">
//                   <Form.Label>Transition</Form.Label>
//                   <Form.Select
//                     name="transition"
//                     value={formData.transition}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select</option>
//                     {transitions.map((t, id) => (
//                       <option key={id} value={t}>{t}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-2">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                   >
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </Form.Select>
//                 </Form.Group>

//                 {/* LOGO FILE */}
//                 <Form.Group className="mb-3">
//                   <Form.Label>Logo</Form.Label>
//                   <Form.Control type="file" name="logo" accept="image/*" onChange={handleChange} />
//                 </Form.Group>

//                 {/* BANNER FILE */}
//                 <Form.Group className="mb-3">
//                   <Form.Label>Banner Image</Form.Label>
//                   <Form.Control type="file" name="banner" accept="image/*" onChange={handleChange} />
//                 </Form.Group>

//               </div>

//               {/* RIGHT SIDE — CONTROLS */}
//               <div className="col-md-6">

//                 {/* LOGO SETTINGS */}
//                 <div className="p-2 border rounded mb-3">
//                   <h6 className="text-center">Logo Adjustment</h6>

//                   <label>Zoom</label>
//                   <input type="range" min="0.5" max="2" step="0.01"
//                     value={formData.zoom}
//                     onChange={(e) => setFormData((p) => ({ ...p, zoom: parseFloat(e.target.value) }))}
//                     className="form-range"
//                   />

//                   <label>Move Left / Right</label>
//                   <input type="range" min="-100" max="100"
//                     value={formData.x}
//                     onChange={(e) => setFormData((p) => ({ ...p, x: parseInt(e.target.value) }))}
//                     className="form-range"
//                   />

//                   <label>Move Up / Down</label>
//                   <input type="range" min="-100" max="100"
//                     value={formData.y}
//                     onChange={(e) => setFormData((p) => ({ ...p, y: parseInt(e.target.value) }))}
//                     className="form-range"
//                   />
//                 </div>

//                 {/* BANNER SETTINGS */}
//                 <div className="p-2 border rounded mb-3">
//                   <h6 className="text-center">Banner Adjustment</h6>

//                   <label>Zoom</label>
//                   <input type="range" min="0.5" max="2" step="0.01"
//                     value={formData.bannerZoom}
//                     onChange={(e) => setFormData((p) => ({ ...p, bannerZoom: parseFloat(e.target.value) }))}
//                     className="form-range"
//                   />

//                   <label>Move Left / Right</label>
//                   <input type="range" min="-200" max="200"
//                     value={formData.bannerX}
//                     onChange={(e) => setFormData((p) => ({ ...p, bannerX: parseInt(e.target.value) }))}
//                     className="form-range"
//                   />

//                   <label>Move Up / Down</label>
//                   <input type="range" min="-200" max="200"
//                     value={formData.bannerY}
//                     onChange={(e) => setFormData((p) => ({ ...p, bannerY: parseInt(e.target.value) }))}
//                     className="form-range"
//                   />
//                 </div>

//               </div>
//             </div>

//             {/* ⭐⭐ CRAFTO STYLE COMBINED PREVIEW ⭐⭐ */}
//             <div
//               style={{
//                 width: 300,
//                 height: 300,
//                 position: "relative",
//                 border: "1px dashed #999",
//                 overflow: "hidden",
//                 margin: "20px auto",
//                 borderRadius: "12px",
//                 background: "#f5f5f5",
//               }}
//             >
//               {/* BANNER */}
//               {formData.bannerPreview && (
//                 <img
//                   src={formData.bannerPreview}
//                   alt="banner"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`
//                   }}
//                 />
//               )}

//               {/* LOGO */}
//               {formData.preview && (
//                 <div
//                   style={{
//                     width: 120,
//                     height: 120,
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     border: "4px solid white",
//                     background: "white",
//                     boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//                   }}
//                 >
//                   <img
//                     src={formData.preview}
//                     alt="logo"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       transform: `scale(${formData.zoom}) translate(${formData.x}px, ${formData.y}px)`
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             <Button type="submit" className="w-100 mt-3" disabled={saving}>
//               {saving ? "Saving..." : editing ? "Update" : "Save"}
//             </Button>

//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default FestivalManager;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Image, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL || "https://crafto-backend-zqcn.onrender.com/api/festivals";
const RENDER_API = process.env.REACT_APP_RENDER_API || "https://crafto-backend-zqcn.onrender.com/api/render";

const FestivalManager = () => {
  const [festivals, setFestivals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);

  const [transitions, setTransitions] = useState([]);

  // ⭐ FULL CRAFTO STYLE DATA
  const [formData, setFormData] = useState({
    title: "",
    template: "",
    transition: "",
    status: "active",

    // Logo
    logo: null,
    preview: "",
    zoom: 1,
    x: 0,
    y: 0,

    // Banner
    banner: null,
    bannerPreview: "",
    bannerZoom: 1,
    bannerX: 0,
    bannerY: 0
  });

  // Load Transitions
  const fetchTransitions = async () => {
    try {
      const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/transitions");
      setTransitions(res.data.transitions || []);
    } catch (err) {
      console.error("Failed to load transitions", err);
    }
  };

  // Fetch Festival List
  const fetchData = async () => {
    try {
      setLoadingList(true);
      const res = await axios.get(API_URL, { params: { search, page, limit } });

      setFestivals(res.data.festivals || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      alert("Failed to load festivals");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTransitions();
  }, [page, search]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length) {
      const file = files[0];

      if (name === "banner") {
        return setFormData((prev) => ({
          ...prev,
          banner: file,
          bannerPreview: URL.createObjectURL(file),
        }));
      }

      return setFormData((prev) => ({
        ...prev,
        logo: file,
        preview: URL.createObjectURL(file),
      }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("template", formData.template);
      data.append("transition", formData.transition);
      data.append("status", formData.status);

      data.append("zoom", formData.zoom);
      data.append("offsetX", formData.x);
      data.append("offsetY", formData.y);

      data.append("bannerZoom", formData.bannerZoom);
      data.append("bannerX", formData.bannerX);
      data.append("bannerY", formData.bannerY);

      if (formData.logo) data.append("logo", formData.logo, formData.logo.name);
      if (formData.banner) data.append("banner", formData.banner, formData.banner.name);

      if (editing) await axios.put(`${API_URL}/${editing._id}`, data);
      else await axios.post(API_URL, data);

      handleClose();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // Edit Handler
  const handleEdit = (item) => {
    setEditing(item);

    setFormData({
      title: item.title || "",
      template: item.template || "",
      transition: item.transition || "",
      status: item.status || "active",

      logo: null,
      preview: item.logo || "",
      zoom: item.zoom || 1,
      x: item.offsetX || 0,
      y: item.offsetY || 0,

      banner: null,
      bannerPreview: item.banner?.url || item.banner || "",
      bannerZoom: item.bannerZoom || 1,
      bannerX: item.bannerX || 0,
      bannerY: item.bannerY || 0
    });

    setShowModal(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this festival?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Reset Form
  const handleClose = () => {
    setEditing(null);
    setFormData({
      title: "",
      template: "",
      transition: "",
      status: "active",
      logo: null,
      preview: "",
      zoom: 1,
      x: 0,
      y: 0,

      banner: null,
      bannerPreview: "",
      bannerZoom: 1,
      bannerX: 0,
      bannerY: 0
    });
    setShowModal(false);
  };

  // Render Video
  const renderVideo = async (id) => {
    try {
      const res = await axios.post(RENDER_API, { id });
      if (!res.data.videoUrl) return alert("No URL returned");
      window.open(res.data.videoUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("Render failed");
    }
  };

  return (
    <div>
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Festival Templates</h4>
        <Button onClick={() => setShowModal(true)}>
          <FaPlus /> Add Festival
        </Button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search festival..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* TABLE */}
      {loadingList ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Logo</th>
              <th>Banner</th>
              <th>Title</th>
              <th>Template</th>
              <th>Transition</th>
              <th>Status</th>
              <th>Render</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {festivals.length ? (
              festivals.map((f, i) => {
                
                // ⭐ Universal Banner Extractor
                const bannerURL =
                  f.banner?.url ||
                  f.banner ||
                  f.bannerImage ||
                  f.bannerUrl ||
                  f.banner_path ||
                  f.bannerImg ||
                  "";

                return (
                  <tr key={f._id}>
                    <td>{(page - 1) * limit + i + 1}</td>

                    {/* LOGO */}
                    <td>
                      {f.logo ? (
                        <Image
                          src={f.logo}
                          width="60"
                          height="60"
                          rounded
                          style={{
                            objectFit: "cover",
                            transform: `scale(${f.zoom}) translate(${f.offsetX}px, ${f.offsetY}px)`
                          }}
                        />
                      ) : "No Logo"}
                    </td>

                    {/* BANNER */}
                    <td>
                      {bannerURL ? (
                        <img
                          src={bannerURL}
                          alt="banner"
                          style={{
                            width: "120px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            border: "1px solid #ddd"
                          }}
                        />
                      ) : (
                        "No Banner"
                      )}
                    </td>

                    <td>{f.title}</td>
                    <td>{f.template}</td>
                    <td>{f.transition}</td>
                    <td>{f.status}</td>

                    <td>
                      <Button size="sm" onClick={() => renderVideo(f._id)}>
                        Render
                      </Button>
                    </td>

                    <td>
                      <Button size="sm" variant="warning" onClick={() => handleEdit(f)}>
                        <FaEdit />
                      </Button>{" "}
                      <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* PAGINATION */}
      <div className="d-flex justify-content-center gap-2 my-3">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>

        <div className="px-3 py-1 border rounded">
          Page {page} / {totalPages}
        </div>

        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit Festival" : "Add Festival"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">

              {/* LEFT FORM */}
              <div className="col-md-6">

                <Form.Group className="mb-2">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Template</Form.Label>
                  <Form.Control
                    name="template"
                    value={formData.template}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Transition</Form.Label>
                  <Form.Select
                    name="transition"
                    value={formData.transition}
                    onChange={handleChange}
                  >
                    <option value="">Select Transition</option>
                    {transitions.map((t, id) => (
                      <option key={id} value={t}>{t}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Logo Image</Form.Label>
                  <Form.Control type="file" name="logo" accept="image/*" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Banner Image</Form.Label>
                  <Form.Control type="file" name="banner" accept="image/*" onChange={handleChange} />
                </Form.Group>

              </div>

              {/* RIGHT FORM (CONTROLS) */}
              <div className="col-md-6">

                {/* Logo Controls */}
                <div className="p-2 border rounded mb-3">
                  <h6 className="text-center">Logo Adjustment</h6>

                  <label>Zoom</label>
                  <input type="range" min="0.5" max="2" step="0.01"
                    value={formData.zoom}
                    onChange={(e) => setFormData((p) => ({ ...p, zoom: parseFloat(e.target.value) }))} />

                  <label>Move Left / Right</label>
                  <input type="range" min="-100" max="100"
                    value={formData.x}
                    onChange={(e) => setFormData((p) => ({ ...p, x: parseInt(e.target.value) }))} />

                  <label>Move Up / Down</label>
                  <input type="range" min="-100" max="100"
                    value={formData.y}
                    onChange={(e) => setFormData((p) => ({ ...p, y: parseInt(e.target.value) }))} />
                </div>

                {/* Banner Controls */}
                <div className="p-2 border rounded mb-3">
                  <h6 className="text-center">Banner Adjustment</h6>

                  <label>Zoom</label>
                  <input type="range" min="0.5" max="2" step="0.01"
                    value={formData.bannerZoom}
                    onChange={(e) => setFormData((p) => ({ ...p, bannerZoom: parseFloat(e.target.value) }))} />

                  <label>Move Left / Right</label>
                  <input type="range" min="-200" max="200"
                    value={formData.bannerX}
                    onChange={(e) => setFormData((p) => ({ ...p, bannerX: parseInt(e.target.value) }))} />

                  <label>Move Up / Down</label>
                  <input type="range" min="-200" max="200"
                    value={formData.bannerY}
                    onChange={(e) => setFormData((p) => ({ ...p, bannerY: parseInt(e.target.value) }))} />
                </div>

              </div>
            </div>

            {/* PREVIEW */}
            <div
              style={{
                width: 300,
                height: 300,
                margin: "20px auto",
                border: "1px dashed #999",
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px"
              }}
            >
              {/* Banner Preview */}
              {formData.bannerPreview && (
                <img
                  src={formData.bannerPreview}
                  alt="banner"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`
                  }}
                />
              )}

              {/* Logo Preview */}
              {formData.preview && (
                <div
                  style={{
                    width: 120,
                    height: 120,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid white",
                    background: "white"
                  }}
                >
                  <img
                    src={formData.preview}
                    alt="logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transform: `scale(${formData.zoom}) translate(${formData.x}px, ${formData.y}px)`
                    }}
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-100" disabled={saving}>
              {saving ? "Saving..." : editing ? "Update" : "Save"}
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FestivalManager;
