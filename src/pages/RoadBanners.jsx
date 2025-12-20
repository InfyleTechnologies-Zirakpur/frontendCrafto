// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Card,
//   Button,
//   Table,
//   Modal,
//   Form,
//   Row,
//   Col,
//   InputGroup
// } from "react-bootstrap";

// import axios from "axios";
// import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api/roadBanner";
// const CATEGORY_URL = "https://crafto-backend-zqcn.onrender.com/api/categories";

// const RoadBanners = () => {
//   const [banners, setBanners] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);

//   // Image sliders
//   const [zoom, setZoom] = useState(1);
//   const [posX, setPosX] = useState(0);
//   const [posY, setPosY] = useState(0);

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     bannerImage: null,
//   });


//   const fetchData = async () => {
//     try {
//       const ban = await axios.get(BASE_URL);
//       const cat = await axios.get(CATEGORY_URL);

//       setBanners(ban.data.banners || []);
//       setCategories(cat.data || []);
//     } catch (err) {
//       console.error("API Error:", err);
//       setBanners([]);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);


//   const handleShow = (b = null) => {
//     if (b) {
//       setEditId(b._id);
//       setForm({
//         title: b.title,
//         category: b.category?._id || "",
//         bannerImage: null
//       });
//       setFilePreview(b.bannerImage);
//     } else {
//       setEditId(null);
//       setForm({ title: "", category: "", bannerImage: null });
//       setFilePreview(null);
//     }

   
//     setZoom(1);
//     setPosX(0);
//     setPosY(0);

//     setShow(true);
//   };


//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       setForm(prev => ({ ...prev, [name]: file }));
//       setFilePreview(URL.createObjectURL(file));

//       setZoom(1);
//       setPosX(0);
//       setPosY(0);
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

 
//   const handleSubmit = async () => {
//     const fd = new FormData();
//     Object.entries(form).forEach(([k, v]) => fd.append(k, v));

//     if (editId) {
//       await axios.put(`${BASE_URL}/${editId}`, fd);
//     } else {
//       await axios.post(BASE_URL, fd);
//     }

//     setShow(false);
//     fetchData();
//   };


//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete banner?")) return;

//     await axios.delete(`${BASE_URL}/${id}`);
//     fetchData();
//   };

 
// const toggleStatus = async (b) => {
//   try {
//     const response = await axios.patch(`${BASE_URL}/${b._id}/status`);
    
//     if (response.data.success) {
//       fetchData(); // Refresh list
//     }
//   } catch (err) {
//     console.error("Toggle Error:", err);
//     alert("Status toggle failed. Check server logs.");
//   }
// };

//   return (
//     <Container fluid className="mt-3">
//       <Row className="align-items-center mb-3">
//         <Col><h3>Road Banners</h3></Col>

//         <Col md={4}>
//           <InputGroup>
//             <Form.Control placeholder="Search..." />
//             <Button><FaSearch /></Button>
//           </InputGroup>
//         </Col>

//         <Col className="text-end">
//           <Button onClick={() => handleShow()}>
//             <FaPlus /> Add Banner
//           </Button>
//         </Col>
//       </Row>

//       <Card>
//         <Card.Body>
//           <Table bordered hover>
//             <thead>
//               <tr>
//                 <th>Banner</th>
//                 <th>Title</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {(banners || []).length > 0 ? (
//                 banners.map(b => (
//                   <tr key={b._id}>
//                     <td>
//                       <img src={b.bannerImage} width="100" alt="banner" />
//                     </td>

//                     <td>{b.title}</td>
//                     <td>{b.category?.name || "—"}</td>

//                     <td>
//                       <Form.Check
//                         type="switch"
//                         checked={b.status === "active"}
//                         onChange={() => toggleStatus(b)}
//                       />
//                     </td>

//                     <td>
//                       <Button size="sm" className="me-2" onClick={() => handleShow(b)}>
//                         <FaEdit />
//                       </Button>

//                       <Button size="sm" variant="danger" onClick={() => handleDelete(b._id)}>
//                         <FaTrash />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center">No Banners Found</td>
//                 </tr>
//               )}
//             </tbody>

//           </Table>
//         </Card.Body>
//       </Card>

//       {/* Modal */}
//       <Modal show={show} onHide={() => setShow(false)} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit Banner" : "Add Banner"}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form>

//             {/* Title Input */}
//             <Form.Group>
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             {/* Category Dropdown */}
//             <Form.Group className="mt-3">
//               <Form.Label>Category</Form.Label>
//               <Form.Select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//               >
//                 <option value="">Select…</option>
//                 {categories.map(c => (
//                   <option key={c._id} value={c._id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {/* Image Upload + Zoom */}
//             <Form.Group className="mt-3">
//               <Form.Label>Banner Image</Form.Label>
//               <Form.Control type="file" name="bannerImage" onChange={handleChange} />

//               {filePreview && (
//                 <div className="mt-3 text-center">

//                   <div
//                     style={{
//                       width: "350px",
//                       height: "250px",
//                       overflow: "hidden",
//                       margin: "auto",
//                       border: "1px solid #aaa",
//                       position: "relative"
//                     }}
//                   >
//                     <img
//                       src={filePreview}
//                       alt="preview"
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         transform: `scale(${zoom}) translate(${posX}px, ${posY}px)`,
//                         transition: "transform 0.1s linear",
//                       }}
//                     />
//                   </div>

//                   {/* Zoom Slider */}
//                   <div className="mt-3">
//                     <label>Zoom: {zoom.toFixed(1)}x</label>
//                     <Form.Range
//                       min={1}
//                       max={5}
//                       step={0.1}
//                       value={zoom}
//                       onChange={(e) => setZoom(Number(e.target.value))}
//                     />
//                   </div>

//                   {/* Move Left / Right */}
//                   <div className="mt-3">
//                     <label>Move Left / Right</label>
//                     <Form.Range
//                       min={-100}
//                       max={100}
//                       value={posX}
//                       onChange={(e) => setPosX(Number(e.target.value))}
//                     />
//                   </div>

//                   {/* Move Up / Down */}
//                   <div className="mt-3">
//                     <label>Move Up / Down</label>
//                     <Form.Range
//                       min={-100}
//                       max={100}
//                       value={posY}
//                       onChange={(e) => setPosY(Number(e.target.value))}
//                     />
//                   </div>

//                 </div>
//               )}
//             </Form.Group>

//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
//           <Button variant="primary" onClick={handleSubmit}>Save</Button>
//         </Modal.Footer>
//       </Modal>

//     </Container>
//   );
// };

// export default RoadBanners;

// import React, { useEffect, useState } from "react";
// import {
//   Container, Card, Button, Table, Modal, Form, Row, Col, InputGroup
// } from "react-bootstrap";

// import axios from "axios";
// import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api/roadBanner";
// const CATEGORY_URL = "https://crafto-backend-zqcn.onrender.com/api/categories";

// const RoadBanners = () => {
//   const [banners, setBanners] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [filePreviews, setFilePreviews] = useState([]);
//   const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

//   const [logoPreview, setLogoPreview] = useState(null);

//   // Banner controls
//   const [zoom, setZoom] = useState(1);
//   const [posX, setPosX] = useState(0);
//   const [posY, setPosY] = useState(0);

//   // LOGO controls (NEW)
//   const [logoZoom, setLogoZoom] = useState(1);
//   const [logoX, setLogoX] = useState(0);
//   const [logoY, setLogoY] = useState(0);

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     bannerImages: [],
//     logoImage: null
//   });

//   const fetchData = async () => {
//     try {
//       const ban = await axios.get(BASE_URL);
//       const cat = await axios.get(CATEGORY_URL);

//       setBanners(ban.data.banners || []);
//       setCategories(cat.data || []);
//     } catch (err) {
//       console.error("API Error:", err);
//       setBanners([]);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleShow = (b = null) => {
//     if (b) {
//       setEditId(b._id);

//       setForm({
//         title: b.title || "",
//         category: b.category?._id || "",
//         bannerImages: [],
//         logoImage: null
//       });

//       const imgs = Array.isArray(b.bannerImage)
//         ? b.bannerImage
//         : b.bannerImage
//         ? [b.bannerImage]
//         : [];

//       setFilePreviews(imgs.map(url => ({ url })));
//       setSelectedPreviewIndex(0);

//       setLogoPreview(b.logoImage || null);
//     } else {
//       setEditId(null);
//       setForm({
//         title: "",
//         category: "",
//         bannerImages: [],
//         logoImage: null
//       });
//       setFilePreviews([]);
//       setLogoPreview(null);
//       setSelectedPreviewIndex(0);
//     }

//     // Reset controls
//     setZoom(1);
//     setPosX(0);
//     setPosY(0);

//     setLogoZoom(1);
//     setLogoX(0);
//     setLogoY(0);

//     setShow(true);
//   };

//   const handleChange = (e) => {
//     const { name, files, value } = e.target;

//     if (files) {
//       if (name === "bannerImages") {
//         const arr = Array.from(files);
//         const previews = arr.map(f => ({ url: URL.createObjectURL(f), file: f }));
//         setFilePreviews(previews);
//         setForm(prev => ({ ...prev, bannerImages: arr }));
//       }

//       if (name === "logoImage") {
//         const file = files[0];
//         setForm(prev => ({ ...prev, logoImage: file }));
//         setLogoPreview(URL.createObjectURL(file));
//       }

//       return;
//     }

//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const fd = new FormData();

//       fd.append("title", form.title);
//       fd.append("category", form.category);

//       form.bannerImages.forEach(file => fd.append("bannerImages", file));

//       if (form.logoImage) fd.append("logoImage", form.logoImage);

//       if (editId) {
//         await axios.put(`${BASE_URL}/${editId}`, fd);
//       } else {
//         await axios.post(BASE_URL, fd);
//       }

//       setShow(false);
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <Container fluid className="mt-3">
//       <Row className="align-items-center mb-3">
//         <Col><h3>Road Banners</h3></Col>

//         <Col md={4}>
//           <InputGroup>
//             <Form.Control placeholder="Search..." />
//             <Button><FaSearch /></Button>
//           </InputGroup>
//         </Col>

//         <Col className="text-end">
//           <Button onClick={() => handleShow()}><FaPlus /> Add Banner</Button>
//         </Col>
//       </Row>

//       <Card><Card.Body>
//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th>Banner</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {banners.map(b => (
//               <tr key={b._id}>
//                 <td>
//                   <div style={{ width: 150, height: 80, overflow: "hidden", position: "relative" }}>
//                     <img style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                       src={Array.isArray(b.bannerImage) ? b.bannerImage[0] : b.bannerImage} />

//                     {b.logoImage && (
//                       <img
//                         src={b.logoImage}
//                         style={{
//                           position: "absolute",
//                           bottom: 4,
//                           left: "50%",
//                           transform: "translateX(-50%)",
//                           width: 40
//                         }}
//                       />
//                     )}
//                   </div>
//                 </td>

//                 <td>{b.title}</td>
//                 <td>{b.category?.name || "–"}</td>

//                 <td>
//                   <Form.Check type="switch" checked={b.status === "active"} />
//                 </td>

//                 <td>
//                   <Button size="sm" onClick={() => handleShow(b)}><FaEdit /></Button>
//                   <Button size="sm" variant="danger"><FaTrash /></Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card.Body></Card>

//       {/* MODAL */}
//       <Modal show={show} onHide={() => setShow(false)} centered size="lg">
//         <Modal.Header closeButton><Modal.Title>{editId ? "Edit" : "Add"} Banner</Modal.Title></Modal.Header>

//         <Modal.Body>
//           <Form>

//             <Form.Group>
//               <Form.Label>Title</Form.Label>
//               <Form.Control name="title" value={form.title} onChange={handleChange} />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Category</Form.Label>
//               <Form.Select name="category" value={form.category} onChange={handleChange}>
//                 <option>Select…</option>
//                 {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
//               </Form.Select>
//             </Form.Group>

//             {/* BANNER IMAGES */}
//             <Form.Group className="mt-3">
//               <Form.Label>Banner Images</Form.Label>
//               <Form.Control type="file" multiple name="bannerImages" onChange={handleChange} />

//               {filePreviews.length > 0 && (
//                 <div className="mt-3 text-center">

//                   {/* MAIN PREVIEW */}
//                   <div style={{
//                     width: "100%", maxWidth: 700, height: 380,
//                     margin: "auto", position: "relative",
//                     overflow: "hidden", borderRadius: 8,
//                     border: "1px solid #ddd"
//                   }}>
//                     {/* BACKGROUND IMAGE */}
//                     <img
//                       src={filePreviews[selectedPreviewIndex].url}
//                       style={{
//                         position: "absolute",
//                         top: "50%", left: "50%",
//                         transform: `translate(-50%, -50%) scale(${zoom}) translate(${posX}px, ${posY}px)`,
//                         minWidth: "100%", minHeight: "100%", objectFit: "cover"
//                       }}
//                     />

//                     {/* TITLE OVERLAY */}
//                     <div style={{
//                       position: "absolute",
//                       top: 10, width: "100%", textAlign: "center"
//                     }}>
//                       <div style={{
//                         padding: "8px 15px",
//                         background: "rgba(0,0,0,0.45)",
//                         color: "#fff",
//                         borderRadius: 6,
//                         display: "inline-block",
//                         fontWeight: 700
//                       }}>
//                         {form.title}
//                       </div>
//                     </div>

//                     {/* LOGO OVERLAY (WITH ZOOM + MOVE) */}
//                     {logoPreview && (
//                       <img
//                         src={logoPreview}
//                         style={{
//                           position: "absolute",
//                           bottom: 20 + logoY,
//                           left: `calc(50% + ${logoX}px)`,
//                           transform: `translateX(-50%) scale(${logoZoom})`,
//                           width: 120,
//                           objectFit: "contain",
//                           transition: "0.1s linear"
//                         }}
//                       />
//                     )}
//                   </div>

//                   {/* THUMBNAILS */}
//                   <div className="mt-3 d-flex justify-content-center gap-2">
//                     {filePreviews.map((p, i) => (
//                       <img
//                         key={i}
//                         src={p.url}
//                         onClick={() => { setSelectedPreviewIndex(i); setZoom(1); }}
//                         style={{
//                           width: 80, height: 60, objectFit: "cover",
//                           border: selectedPreviewIndex === i ? "3px solid blue" : "1px solid #999",
//                           cursor: "pointer", borderRadius: 6
//                         }}
//                       />
//                     ))}
//                   </div>

//                   {/* IMAGE ZOOM */}
//                   <div className="mt-3">
//                     <label>Image Zoom</label>
//                     <Form.Range min={1} max={5} step={0.1}
//                       value={zoom} onChange={e => setZoom(Number(e.target.value))} />
//                   </div>

//                   {/* IMAGE MOVE */}
//                   <div className="mt-3">
//                     <label>Move Image Left/Right</label>
//                     <Form.Range min={-200} max={200}
//                       value={posX} onChange={e => setPosX(Number(e.target.value))} />
//                   </div>

//                   <div className="mt-3">
//                     <label>Move Image Up/Down</label>
//                     <Form.Range min={-200} max={200}
//                       value={posY} onChange={e => setPosY(Number(e.target.value))} />
//                   </div>

//                   {/* LOGO CONTROLS */}
//                   <h5 className="mt-4">Logo Position & Size</h5>

//                   <div className="mt-2">
//                     <label>Logo Zoom</label>
//                     <Form.Range min={0.3} max={3} step={0.1}
//                       value={logoZoom} onChange={e => setLogoZoom(Number(e.target.value))} />
//                   </div>

//                   <div className="mt-2">
//                     <label>Logo Move Left/Right</label>
//                     <Form.Range min={-200} max={200}
//                       value={logoX} onChange={e => setLogoX(Number(e.target.value))} />
//                   </div>

//                   <div className="mt-2">
//                     <label>Logo Move Up/Down</label>
//                     <Form.Range min={-150} max={150}
//                       value={logoY} onChange={e => setLogoY(Number(e.target.value))} />
//                   </div>

//                 </div>
//               )}
//             </Form.Group>

//             {/* LOGO UPLOAD */}
//             <Form.Group className="mt-4">
//               <Form.Label>Upload Logo</Form.Label>
//               <Form.Control type="file" name="logoImage" onChange={handleChange} />

//               {logoPreview && (
//                 <div className="text-center mt-2">
//                   <img src={logoPreview} style={{ width: 120 }} alt="" />
//                 </div>
//               )}
//             </Form.Group>

//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button onClick={() => setShow(false)}>Close</Button>
//           <Button onClick={handleSubmit} variant="primary">Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default RoadBanners;


// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Card,
//   Button,
//   Table,
//   Modal,
//   Form,
//   Row,
//   Col,
//   InputGroup,
// } from "react-bootstrap";

// import axios from "axios";
// import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api/roadBanner";
// const CATEGORY_URL = "https://crafto-backend-zqcn.onrender.com/api/categories";

// const RoadBanners = () => {
//     const [search, setSearch] = useState("");

//     const [page, setPage] = useState(1);
// const [limit, setLimit] = useState(10);
// const [totalPages, setTotalPages] = useState(1);

//     const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this banner?")) return;

//   try {
//     await axios.delete(`${BASE_URL}/${id}`);
//     fetchData(); // reload banners
//   } catch (err) {
//     console.error("DELETE ERROR:", err);
//     alert("Delete failed!");
//   }
// };
// const handleToggleStatus = async (id) => {
//   try {
//     const res = await axios.patch(`${BASE_URL}/${id}/status`);

//     // update UI without refresh
//     setBanners((prev) =>
//       prev.map((b) =>
//         b._id === id ? { ...b, status: res.data.status } : b
//       )
//     );
//   } catch (err) {
//     console.error("STATUS TOGGLE ERROR:", err);
//     alert("Status update failed!");
//   }
// };



//   const [banners, setBanners] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [filePreviews, setFilePreviews] = useState([]);
//   const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

//   const [logoPreview, setLogoPreview] = useState(null);

//   // Banner Controls
//   const [zoom, setZoom] = useState(1);
//   const [posX, setPosX] = useState(0);
//   const [posY, setPosY] = useState(0);

//   // Logo Controls
//   const [logoZoom, setLogoZoom] = useState(1);
//   const [logoX, setLogoX] = useState(0);
//   const [logoY, setLogoY] = useState(0);

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     bannerImages: [],
//     logoImage: null,
//   });

//   // Fetch Data
// //   const fetchData = async () => {
// //     try {
// //     //   const ban = await axios.get(BASE_URL);
// //       const cat = await axios.get(CATEGORY_URL);

// //       setBanners(ban.data.banners || []);
// //       setCategories(cat.data || []);
// //     } catch (err) {
// //       console.error("API Error:", err);
// //       setBanners([]);
// //     }
// //   };
// const fetchData = async () => {
//   try {
//     const ban = await axios.get(BASE_URL, {
//       params: {
//         page,
//         limit,
//         search
//       }
//     });

//     const cat = await axios.get(CATEGORY_URL);

//     setBanners(ban.data.banners || []);
//     setCategories(cat.data || []);
//     setTotalPages(ban.data.pages || 1);
//   } catch (err) {
//     console.error("API Error:", err);
//     setBanners([]);
//   }
// };


// //   useEffect(() => {
// //     fetchData();
// //   }, []);
// useEffect(() => {
//   fetchData();
// }, [page, limit, search]);

//   // Open Modal
//   const handleShow = (b = null) => {
//     if (b) {
//       setEditId(b._id);

//       setForm({
//         title: b.title || "",
//         category: b.category?._id || "",
//         bannerImages: [],
//         logoImage: null,
//       });

//       const imgs = Array.isArray(b.bannerImage)
//         ? b.bannerImage
//         : b.bannerImage
//         ? [b.bannerImage]
//         : [];

//       setFilePreviews(imgs.map((url) => ({ url })));
//       setLogoPreview(b.logoImage || null);

//       // Load saved transforms
//       setZoom(b.zoom || 1);
//       setPosX(b.posX || 0);
//       setPosY(b.posY || 0);

//       setLogoZoom(b.logoZoom || 1);
//       setLogoX(b.logoX || 0);
//       setLogoY(b.logoY || 0);
//     } else {
//       setEditId(null);
//       setForm({
//         title: "",
//         category: "",
//         bannerImages: [],
//         logoImage: null,
//       });

//       setFilePreviews([]);
//       setLogoPreview(null);

//       setZoom(1);
//       setPosX(0);
//       setPosY(0);

//       setLogoZoom(1);
//       setLogoX(0);
//       setLogoY(0);
//     }

//     setSelectedPreviewIndex(0);
//     setShow(true);
//   };

//   // Handle Inputs
//   const handleChange = (e) => {
//     const { name, files, value } = e.target;

//     if (files) {
//       if (name === "bannerImages") {
//         const arr = Array.from(files);
//         const previews = arr.map((f) => ({
//           url: URL.createObjectURL(f),
//           file: f,
//         }));
//         setFilePreviews(previews);
//         setForm((prev) => ({ ...prev, bannerImages: arr }));
//       }

//       if (name === "logoImage") {
//         const file = files[0];
//         setForm((prev) => ({ ...prev, logoImage: file }));
//         setLogoPreview(URL.createObjectURL(file));
//       }

//       return;
//     }

//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save Banner Data
//   const handleSubmit = async () => {
//     try {
//       const fd = new FormData();

//       fd.append("title", form.title);
//       fd.append("category", form.category);

//       form.bannerImages.forEach((file) => fd.append("bannerImage", file));
//       if (form.logoImage) fd.append("logoImage", form.logoImage);

//       // ⭐ Must send transforms
//       fd.append("zoom", zoom);
//       fd.append("posX", posX);
//       fd.append("posY", posY);

//       fd.append("logoZoom", logoZoom);
//       fd.append("logoX", logoX);
//       fd.append("logoY", logoY);

//       const url = editId ? `${BASE_URL}/${editId}` : BASE_URL;
//       const method = editId ? axios.put : axios.post;

//       await method(url, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setShow(false);
//       fetchData();
//     } catch (err) {
//       console.log("UPLOAD ERROR:", err);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <Container fluid className="mt-3">
//       <Row className="align-items-center mb-3">
//         <Col>
//           <h3>Road Banners</h3>
//         </Col>

//         <Col md={4}>
//           <InputGroup>
//            <Form.Control
//   placeholder="Search..."
//   value={search}
//   onChange={(e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   }}
// />

// <Button onClick={fetchData}>
//   <FaSearch />
// </Button>

//           </InputGroup>
//         </Col>
//          {/* SHOW DROPDOWN (MOVE HERE) */}
//   <Col md={2} className="text-end">
//     <div className="d-flex align-items-center justify-content-end">
//       <span className="me-2">Show:</span>
//       <Form.Select
//         style={{ width: "80px" }}
//         value={limit}
//         onChange={(e) => {
//           setLimit(Number(e.target.value));
//           setPage(1);
//         }}
//       >
//         <option value="5">5</option>
//         <option value="10">10</option>
//         <option value="20">20</option>
//         <option value="50">50</option>
//       </Form.Select>
//     </div>
//   </Col>

//         <Col className="text-end">
//           <Button onClick={() => handleShow()}>
//             <FaPlus /> Add Banner
//           </Button>
//         </Col>
//       </Row>

//       <Card>
//         <Card.Body>
//           <Table bordered hover>
//             <thead>
//               <tr>
//                 <th>Banner</th>
//                 <th>Title</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {banners.map((b) => (
//                 <tr key={b._id}>
//                   <td>
//                     <div
//                       style={{
//                         width: 150,
//                         height: 80,
//                         overflow: "hidden",
//                         position: "relative",
//                       }}
//                     >
//                       <img
//                         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                         src={
//                           Array.isArray(b.bannerImage)
//                             ? b.bannerImage[0]
//                             : b.bannerImage
//                         }
//                       />

//                       {b.logoImage && (
//                         <img
//                           src={b.logoImage}
//                           style={{
//                             position: "absolute",
//                             bottom: 4,
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             width: 40,
//                           }}
//                         />
//                       )}
//                     </div>
//                   </td>

//                   <td>{b.title}</td>
//                   <td>{b.category?.name || "–"}</td>

//                   <td>
//                     <Form.Check
//   type="switch"
//   checked={b.status === "active"}
//   onChange={() => handleToggleStatus(b._id)}
// />

//                   </td>

//                   <td>
//                     <Button size="sm" onClick={() => handleShow(b)} className="me-2">
//                       <FaEdit />
//                     </Button>
//                     <Button 
//   size="sm" 
//   variant="danger" 
//   onClick={() => handleDelete(b._id)}
// >
//   <FaTrash />
// </Button>

//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card.Body>
//       </Card>
//       {/* PAGINATION */}
// <div className="d-flex justify-content-between align-items-center mt-3">



//   {/* Page Navigation */}
//   <div>
//     <Button
//       disabled={page === 1}
//       onClick={() => setPage(page - 1)}
//       className="me-2"
//     >
//       Prev
//     </Button>

//     <span>
//       Page <strong>{page}</strong> / {totalPages}
//     </span>

//     <Button
//       disabled={page === totalPages}
//       onClick={() => setPage(page + 1)}
//       className="ms-2"
//     >
//       Next
//     </Button>
//   </div>

// </div>


//       {/* MODAL */}
//       <Modal show={show} onHide={() => setShow(false)} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit" : "Add"} Banner</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mt-3">
//               <Form.Label>Category</Form.Label>
//               <Form.Select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//               >
//                 <option>Select…</option>
//                 {categories.map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             {/* BANNER IMAGES */}
//             <Form.Group className="mt-3">
//               <Form.Label>Banner Images</Form.Label>
//               <Form.Control
//                 type="file"
//                 multiple
//                 name="bannerImages"
//                 onChange={handleChange}
//               />

//               {filePreviews.length > 0 && (
//                 <div className="mt-3 text-center">
//                   {/* MAIN PREVIEW */}
//                   <div
//                     style={{
//                       width: "100%",
//                       maxWidth: 700,
//                       height: 380,
//                       margin: "auto",
//                       position: "relative",
//                       overflow: "hidden",
//                       borderRadius: 8,
//                       border: "1px solid #ddd",
//                     }}
//                   >
//                     {/* Background Banner Image */}
//                     <img
//                       src={filePreviews[selectedPreviewIndex].url}
//                       style={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: `translate(-50%, -50%) scale(${zoom}) translate(${posX}px, ${posY}px)`,
//                         minWidth: "100%",
//                         minHeight: "100%",
//                         objectFit: "cover",
//                       }}
//                     />

//                     {/* TITLE OVERLAY */}
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: 10,
//                         width: "100%",
//                         textAlign: "center",
//                       }}
//                     >
//                       <div
//                         style={{
//                           padding: "8px 15px",
//                           background: "rgba(0,0,0,0.45)",
//                           color: "#fff",
//                           borderRadius: 6,
//                           display: "inline-block",
//                           fontWeight: 700,
//                         }}
//                       >
//                         {form.title}
//                       </div>
//                     </div>

//                     {/* LOGO OVERLAY */}
//                     {logoPreview && (
//                       <img
//                         src={logoPreview}
//                         style={{
//                           position: "absolute",
//                           bottom: 20 + logoY,
//                           left: `calc(50% + ${logoX}px)`,
//                           transform: `translateX(-50%) scale(${logoZoom})`,
//                           width: 120,
//                           objectFit: "contain",
//                           transition: "0.1s linear",
//                         }}
//                       />
//                     )}
//                   </div>

//                   {/* THUMBNAILS */}
//                   <div className="mt-3 d-flex justify-content-center gap-2">
//                     {filePreviews.map((p, i) => (
//                       <img
//                         key={i}
//                         src={p.url}
//                         onClick={() => {
//                           setSelectedPreviewIndex(i);
//                           setZoom(1);
//                         }}
//                         style={{
//                           width: 80,
//                           height: 60,
//                           objectFit: "cover",
//                           border:
//                             selectedPreviewIndex === i
//                               ? "3px solid blue"
//                               : "1px solid #999",
//                           cursor: "pointer",
//                           borderRadius: 6,
//                         }}
//                       />
//                     ))}
//                   </div>

//                   {/* BANNER CONTROLS */}
//                   <div className="mt-3">
//                     <label>Banner Zoom</label>
//                     <Form.Range
//                       min={1}
//                       max={5}
//                       step={0.1}
//                       value={zoom}
//                       onChange={(e) => setZoom(Number(e.target.value))}
//                     />
//                   </div>

//                   <div className="mt-3">
//                     <label>Banner Move Left/Right</label>
//                     <Form.Range
//                       min={-200}
//                       max={200}
//                       value={posX}
//                       onChange={(e) => setPosX(Number(e.target.value))}
//                     />
//                   </div>

//                   <div className="mt-3">
//                     <label>Banner Move Up/Down</label>
//                     <Form.Range
//                       min={-200}
//                       max={200}
//                       value={posY}
//                       onChange={(e) => setPosY(Number(e.target.value))}
//                     />
//                   </div>

//                   {/* LOGO CONTROLS */}
//                   <h5 className="mt-4">Logo Controls</h5>

//                   <div className="mt-2">
//                     <label>Logo Zoom</label>
//                     <Form.Range
//                       min={0.3}
//                       max={3}
//                       step={0.1}
//                       value={logoZoom}
//                       onChange={(e) => setLogoZoom(Number(e.target.value))}
//                     />
//                   </div>

//                   <div className="mt-2">
//                     <label>Logo Move Left/Right</label>
//                     <Form.Range
//                       min={-200}
//                       max={200}
//                       value={logoX}
//                       onChange={(e) => setLogoX(Number(e.target.value))}
//                     />
//                   </div>

//                   <div className="mt-2">
//                     <label>Logo Move Up/Down</label>
//                     <Form.Range
//                       min={-150}
//                       max={150}
//                       value={logoY}
//                       onChange={(e) => setLogoY(Number(e.target.value))}
//                     />
//                   </div>
//                 </div>
//               )}
//             </Form.Group>

//             {/* LOGO UPLOAD */}
//             <Form.Group className="mt-4">
//               <Form.Label>Upload Logo</Form.Label>
//               <Form.Control type="file" name="logoImage" onChange={handleChange} />

//               {logoPreview && (
//                 <div className="text-center mt-2">
//                   <img src={logoPreview} alt="logo" style={{ width: 120 }} />
//                 </div>
//               )}
//             </Form.Group>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button onClick={() => setShow(false)}>Close</Button>
//           <Button onClick={handleSubmit} variant="primary">
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default RoadBanners;

import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";

import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api/roadBanner";
const CATEGORY_URL = "https://crafto-backend-zqcn.onrender.com/api/categories";

const RoadBanners = () => {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [filePreviews, setFilePreviews] = useState([]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

  const [logoPreview, setLogoPreview] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [logoZoom, setLogoZoom] = useState(1);
  const [logoX, setLogoX] = useState(0);
  const [logoY, setLogoY] = useState(0);

  const [form, setForm] = useState({
    title: "",
    category: "",
    bannerImages: [],
    logoImage: null,
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchData();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed!");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await axios.patch(`${BASE_URL}/${id}/status`);

      setBanners((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: res.data.status } : b
        )
      );
    } catch (err) {
      console.error("STATUS TOGGLE ERROR:", err);
      alert("Status update failed!");
    }
  };

  const fetchData = async () => {
    try {
      const ban = await axios.get(BASE_URL, {
        params: { page, limit, search },
      });

      const cat = await axios.get(CATEGORY_URL);

      setBanners(ban.data.banners || []);
      setCategories(cat.data || []);
      setTotalPages(ban.data.pages || 1);
    } catch (err) {
      console.error("API Error:", err);
      setBanners([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, search]);

  const handleShow = (b = null) => {
    if (b) {
      setEditId(b._id);

      setForm({
        title: b.title ?? "",
        category: b.category?._id ?? "",
        bannerImages: [],
        logoImage: null,
      });

      const imgs = Array.isArray(b.bannerImage)
        ? b.bannerImage
        : b.bannerImage
        ? [b.bannerImage]
        : [];

      setFilePreviews(imgs.map((url) => ({ url })));
      setLogoPreview(b.logoImage || null);

      setZoom(b.zoom || 1);
      setPosX(b.posX || 0);
      setPosY(b.posY || 0);

      setLogoZoom(b.logoZoom || 1);
      setLogoX(b.logoX || 0);
      setLogoY(b.logoY || 0);
    } else {
      setEditId(null);
      setForm({
        title: "",
        category: "",
        bannerImages: [],
        logoImage: null,
      });

      setFilePreviews([]);
      setLogoPreview(null);

      setZoom(1);
      setPosX(0);
      setPosY(0);

      setLogoZoom(1);
      setLogoX(0);
      setLogoY(0);
    }

    setSelectedPreviewIndex(0);
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files) {
      if (name === "bannerImages") {
        const arr = Array.from(files);
        const previews = arr.map((f) => ({ url: URL.createObjectURL(f), file: f }));
        setFilePreviews(previews);
        setForm((prev) => ({ ...prev, bannerImages: arr }));
      }

      if (name === "logoImage") {
        const f = files[0];
        setLogoPreview(URL.createObjectURL(f));
        setForm((prev) => ({ ...prev, logoImage: f }));
      }

      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("category", form.category);

      form.bannerImages.forEach((file) => fd.append("bannerImage", file));
      if (form.logoImage) fd.append("logoImage", form.logoImage);

      fd.append("zoom", zoom);
      fd.append("posX", posX);
      fd.append("posY", posY);

      fd.append("logoZoom", logoZoom);
      fd.append("logoX", logoX);
      fd.append("logoY", logoY);

      const url = editId ? `${BASE_URL}/${editId}` : BASE_URL;
      const method = editId ? axios.put : axios.post;

      await method(url, fd);
      setShow(false);
      fetchData();
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      alert("Upload failed");
    }
  };

  return (
    <Container fluid className="mt-3">

      {/* Header Responsive */}
      <Row className="align-items-center mb-3 g-3">
        <Col xs={12} md={4}>
          <h3 className="text-center text-md-start">Road Banners</h3>
        </Col>

        <Col xs={12} md={4}>
          <InputGroup>
            <Form.Control
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Button onClick={fetchData}>
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>

        <Col xs={6} md={2}>
          <div className="d-flex justify-content-md-end justify-content-center">
            <span className="me-2">Show:</span>
            <Form.Select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Form.Select>
          </div>
        </Col>

        <Col xs={6} md={2} className="text-end">
          <Button onClick={() => handleShow()}>
            <FaPlus /> Add
          </Button>
        </Col>
      </Row>

      {/* TABLE SCROLL WRAPPER */}
      <Card>
        <Card.Body className="table-responsive">
          <Table bordered hover className="text-center">
            <thead>
              <tr>
                <th>Banner</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {banners.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div
                      style={{
                        width: 150,
                        height: 80,
                        overflow: "hidden",
                        position: "relative",
                        borderRadius: 8,
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        src={Array.isArray(b.bannerImage) ? b.bannerImage[0] : b.bannerImage}
                      />

                      {b.logoImage && (
                        <img
                          src={b.logoImage}
                          style={{
                            position: "absolute",
                            bottom: 4,
                            left: "50%",
                            width: 40,
                            transform: "translateX(-50%)",
                          }}
                        />
                      )}
                    </div>
                  </td>

                  <td>{b.title}</td>
                  <td>{b.category?.name || "–"}</td>

                  <td>
                    <Form.Check
                      type="switch"
                      checked={b.status === "active"}
                      onChange={() => handleToggleStatus(b._id)}
                    />
                  </td>

                  <td>
                    <Button size="sm" className="me-2" onClick={() => handleShow(b)}>
                      <FaEdit />
                    </Button>

                    <Button size="sm" variant="danger" onClick={() => handleDelete(b._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
        </Card.Body>
      </Card>

      {/* PAGINATION */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">

        <div>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)} className="me-2">
            Prev
          </Button>

          <span>Page <strong>{page}</strong> / {totalPages}</span>

          <Button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="ms-2">
            Next
          </Button>
        </div>

      </div>

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Banner" : "Add Banner"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={form.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={form.category} onChange={handleChange}>
                <option>Select…</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* IMAGE UPLOAD */}
            <Form.Group>
              <Form.Label>Banner Images</Form.Label>
              <Form.Control type="file" multiple name="bannerImages" onChange={handleChange} />
            </Form.Group>

            {/* PREVIEW RESPONSIVE */}
            {filePreviews.length > 0 && (
              <div className="text-center mt-3">

                <div
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "300px",
                    margin: "auto",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 10,
                    border: "1px solid #ccc",
                  }}
                >
                  <img
                    src={filePreviews[selectedPreviewIndex].url}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) scale(${zoom}) translate(${posX}px, ${posY}px)`,
                      minWidth: "100%",
                      minHeight: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {logoPreview && (
                    <img
                      src={logoPreview}
                      style={{
                        position: "absolute",
                        bottom: 20 + logoY,
                        left: `calc(50% + ${logoX}px)`,
                        width: 120,
                        transform: `translateX(-50%) scale(${logoZoom})`,
                      }}
                    />
                  )}
                </div>

                {/* THUMBNAILS Responsive */}
                <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                  {filePreviews.map((p, i) => (
                    <img
                      key={i}
                      src={p.url}
                      onClick={() => setSelectedPreviewIndex(i)}
                      style={{
                        width: 70,
                        height: 60,
                        border: selectedPreviewIndex === i ? "3px solid blue" : "1px solid #777",
                        objectFit: "cover",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="mt-3">
                  <label>Zoom</label>
                  <Form.Range min={1} max={5} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} />
                </div>

                <div className="mt-2">
                  <label>Move Left/Right</label>
                  <Form.Range min={-200} max={200} value={posX} onChange={(e) => setPosX(Number(e.target.value))} />
                </div>

                <div className="mt-2">
                  <label>Move Up/Down</label>
                  <Form.Range min={-200} max={200} value={posY} onChange={(e) => setPosY(Number(e.target.value))} />
                </div>

              </div>
            )}

            {/* LOGO UPLOAD */}
            <Form.Group className="mt-3">
              <Form.Label>Upload Logo</Form.Label>
              <Form.Control type="file" name="logoImage" onChange={handleChange} />

              {logoPreview && (
                <div className="text-center mt-2">
                  <img src={logoPreview} width={120} />
                </div>
              )}
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
          <Button onClick={handleSubmit} variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default RoadBanners;
