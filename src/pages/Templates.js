

// import React, { useEffect, useState } from "react";
// import {
//   Container, Card, Button, Table, Badge, Modal, Form, InputGroup, Row, Col
// } from "react-bootstrap";
// import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload } from "react-icons/fa";
// import axios from "axios";

// const profilePositions = [
//   "topLeft","topRight","bottomLeft","bottomRight","center",
//   "centerLeft","centerRight","topCenter","bottomCenter"
// ];
// const transitionTypes = [
//   "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//   "scale","rotation","bounce","ripple"
// ];
// const orientations = ["landscape","portrait"];
// const placements = ["above","below"];
// const profileShapes = ["circle","square","rectangle"];

// const Templates = () => {
//   const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";

//   const [templates, setTemplates] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [politicians, setPoliticians] = useState([]);
//   const [religiousList, setReligiousList] = useState([]);

//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [framePreview, setFramePreview] = useState(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   // CSV Modal
//   const [showCsvModal, setShowCsvModal] = useState(false);
//   const [csvFile, setCsvFile] = useState(null);
//   const [csvUploading, setCsvUploading] = useState(false);

//   // ---------- PAGINATION ----------
//   const [page, setPage] = useState(1);
//   const limit = 6;
//   const [totalPages, setTotalPages] = useState(1);

//   const [form, setForm] = useState({
//     title: "",
//     type: "video",
//     status: "active",
//     parentType: "Category",
//     parentId: "",
//     file: null,
//     transitionPlacement: "below",
//     profilePosition: "center",
//     transitionType: "fade",
//     orientation: "landscape",
//     profileSize: "",
//     profileShape: "circle",
//     frameFile: null,
//   });

//   // ===================== FETCH DATA =====================
//   const fetchData = async () => {
//     try {
//       const tplRes = await axios.get(`${BASE_URL}/templates`, {
//         params: { page, limit, search }
//       });

//       const [catRes, polRes, relRes] = await Promise.all([
//         axios.get(`${BASE_URL}/categories`),
//         axios.get(`${BASE_URL}/politicians`),
//         axios.get(`${BASE_URL}/religious`)
//       ]);

//       setTemplates(tplRes.data.templates || []);
//       setTotalPages(tplRes.data.pages || 1);

//       setCategories(catRes.data.categories || []);
//       setPoliticians(polRes.data.politicians || []);
//       setReligiousList(relRes.data.religious || []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => { fetchData(); }, [page, search]);

//   // ===================== FORM HANDLERS =====================
//   const handleShow = (tpl = null) => {
//     if (tpl) {
//       setEditId(tpl._id);
//       setForm({
//         title: tpl.title,
//         type: tpl.type,
//         status: tpl.status,
//         parentType: tpl.category ? "Category" : tpl.politician ? "Politician" : "Religious",
//         parentId: tpl.category?._id || tpl.politician?._id || tpl.religious?._id || "",
//         file: null,
//         transitionPlacement: tpl.transitionPlacement,
//         profilePosition: tpl.profilePosition,
//         transitionType: tpl.transitionType,
//         orientation: tpl.orientation,
//         profileSize: tpl.profileSize,
//         profileShape: tpl.profileShape,
//         frameFile: null,
//       });
//       setFilePreview(tpl.file);
//       setFramePreview(tpl.frameFile);
//     } else {
//       setEditId(null);
//       setForm({
//         title: "",
//         type: "video",
//         status: "active",
//         parentType: "Category",
//         parentId: "",
//         file: null,
//         transitionPlacement: "below",
//         profilePosition: "center",
//         transitionType: "fade",
//         orientation: "landscape",
//         profileSize: "",
//         profileShape: "circle",
//         frameFile: null,
        
//       });
//       setFilePreview(null);
//       setFramePreview(null);
//     }
//     setShow(true);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       const file = files[0];
//       setForm(prev => ({ ...prev, [name]: file }));
//       if (name === "file") setFilePreview(URL.createObjectURL(file));
//       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.title || !form.parentId) return alert("Please fill required fields");

//     setLoading(true);
//     try {
//       const fd = new FormData();
//       Object.entries(form).forEach(([key, value]) => {
//         if (value) fd.append(key, value);
//       });

//       if (editId)
//         await axios.put(`${BASE_URL}/templates/${editId}`, fd);
//       else
//         await axios.post(`${BASE_URL}/templates`, fd);

//       fetchData();
//       setShow(false);
//     } catch (err) {
//       alert("Save failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete template?")) return;
//     await axios.delete(`${BASE_URL}/templates/${id}`);
//     fetchData();
//   };

//   const parentOptions = form.parentType === "Category"
//     ? categories
//     : form.parentType === "Politician"
//     ? politicians
//     : religiousList;

//   // ===================== CSV EXPORT =====================
//   const handleExportCSV = () => {
//     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
//   };

//   // ===================== CSV IMPORT =====================
//   const handleImportCSV = async () => {
//     if (!csvFile) return alert("Please select CSV file!");

//     setCsvUploading(true);

//     const fd = new FormData();
//     fd.append("csv", csvFile);

//     try {
//       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
//       alert("CSV Imported Successfully!");
//       setShowCsvModal(false);
//       fetchData();
//     } catch (err) {
//       alert("CSV Import Failed");
//     } finally {
//       setCsvUploading(false);
//     }
//   };

//   return (
//     <Container fluid>
//       <Row className="align-items-center mb-3">
//         <Col><h3>Templates</h3></Col>

//         <Col md={4}>
//           <InputGroup>
//             <Form.Control
//               placeholder="Search by title..."
//               value={search}
//               onChange={e => { setSearch(e.target.value); setPage(1); }}
//             />
//             <Button><FaSearch /></Button>
//           </InputGroup>
//         </Col>

//         {/* CSV Buttons */}
//         <Col className="text-end">
//           <Button className="me-2" variant="success" onClick={() => setShowCsvModal(true)}>
//             <FaUpload /> Import CSV
//           </Button>
//           <Button className="me-2" variant="warning" onClick={handleExportCSV}>
//             <FaDownload /> Export CSV
//           </Button>

//           <Button onClick={() => handleShow()}>
//             <FaPlus className="me-2" /> Add Template
//           </Button>
//         </Col>
//       </Row>

//       {/* ================== TABLE ================== */}
//       <Card>
//         <Card.Body>
//           <Table bordered hover>
//             <thead>
//               <tr>
//                 <th>Thumbnail</th>
//                 <th>Title</th>
//                 <th>Type</th>
//                 <th>Parent</th>
//                 <th>Position</th>
//                 <th>Size</th>
//                 <th>Shape</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {templates.map((tpl) => (
//                 <tr key={tpl._id}>
//                   <td style={{ width: 120 }}>
//                     {tpl.type === "video" ? (
//                       <video src={tpl.file} width="100" height="70" />
//                     ) : (
//                       <img src={tpl.file} width="100" height="70" style={{ objectFit: "cover" }} />
//                     )}
//                   </td>
//                   <td>{tpl.title}</td>
//                   <td><Badge bg={tpl.type === "video" ? "primary" : "info"}>{tpl.type}</Badge></td>
//                   <td>
//                     {tpl.category?.title ||
//                     tpl.politician?.name ||
//                     tpl.religious?.name ||
//                     "-"}
//                   </td>
//                   <td>{tpl.profilePosition}</td>
//                   <td>{tpl.profileSize}</td>
//                   <td>{tpl.profileShape}</td>
//                   <td><Badge bg={tpl.status === "active" ? "success" : "secondary"}>{tpl.status}</Badge></td>

//                   <td>
//                     <Button size="sm" className="me-2" onClick={() => handleShow(tpl)}>
//                       <FaEdit />
//                     </Button>
//                     <Button size="sm" variant="danger" onClick={() => handleDelete(tpl._id)}>
//                       <FaTrash />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           {/* Pagination */}
//           <div className="d-flex justify-content-center mt-3">
//             <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
//             <span className="px-3 py-1 mx-2 border rounded">Page {page} / {totalPages}</span>
//             <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* ================== ADD/EDIT MODAL ================== */}
//       <Modal show={show} onHide={() => setShow(false)} size="lg">
//         <Modal.Header closeButton><Modal.Title>{editId ? "Edit" : "Add"} Template</Modal.Title></Modal.Header>

//         <Modal.Body>
//           <Form>

//             <Row>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control name="title" value={form.title} onChange={handleChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Type</Form.Label>
//                   <Form.Select name="type" value={form.type} onChange={handleChange}>
//                     <option value="video">Video</option>
//                     <option value="graphics">Graphics</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mt-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Parent Type</Form.Label>
//                   <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
//                     <option value="Category">Category</option>
//                     <option value="Politician">Politician</option>
//                     <option value="Religious">Religious</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Select Parent</Form.Label>
//                   <Form.Select name="parentId" value={form.parentId} onChange={handleChange}>
//                     <option value="">Choose...</option>
//                     {parentOptions.map((p) => (
//                       <option key={p._id} value={p._id}>{p.title || p.name}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mt-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Orientation</Form.Label>
//                   <Form.Select name="orientation" value={form.orientation} onChange={handleChange}>
//                     {orientations.map(o => <option key={o}>{o}</option>)}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Transition Type</Form.Label>
//                   <Form.Select name="transitionType" value={form.transitionType} onChange={handleChange}>
//                     {transitionTypes.map(t => <option key={t}>{t}</option>)}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mt-3">
//               <Form.Label>Template File</Form.Label>
//               <Form.Control type="file" name="file" onChange={handleChange} />
//               {filePreview && <img src={filePreview} className="mt-2" width="150" />}
//             </Form.Group>

//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
//           <Button variant="primary" disabled={loading} onClick={handleSubmit}>
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ================== CSV IMPORT MODAL ================== */}
//       <Modal show={showCsvModal} onHide={() => setShowCsvModal(false)}>
//         <Modal.Header closeButton><Modal.Title>Import Templates CSV</Modal.Title></Modal.Header>

//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Select CSV File</Form.Label>
//             <Form.Control type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} />
//           </Form.Group>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowCsvModal(false)}>Close</Button>
//           <Button variant="success" disabled={csvUploading} onClick={handleImportCSV}>
//             {csvUploading ? "Importing..." : "Import CSV"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Templates;


// import React, { useEffect, useState } from "react";
// import {
//   Container, Card, Button, Table, Badge, Modal, Form, InputGroup, Row, Col
// } from "react-bootstrap";
// import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload } from "react-icons/fa";
// import axios from "axios";

// const profilePositions = [
//   "topLeft","topRight","bottomLeft","bottomRight","center",
//   "centerLeft","centerRight","topCenter","bottomCenter"
// ];

// const transitionTypes = [
//   "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
//   "scale","rotation","bounce","ripple"
// ];

// const orientations = ["landscape","portrait"];

// const Templates = () => {
//   const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";
//   const [showCsvModal, setShowCsvModal] = useState(false);
// const [csvFile, setCsvFile] = useState(null);
// const [csvUploading, setCsvUploading] = useState(false);


//   const [templates, setTemplates] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [politicians, setPoliticians] = useState([]);
//   const [religiousList, setReligiousList] = useState([]);
//   const [birthdayList, setBirthdayList] = useState([]);
// const [anniversaryList, setAnniversaryList] = useState([]);
// const [festivalList, setFestivalList] = useState([]);


//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [filePreview, setFilePreview] = useState(null);
//   const [framePreview, setFramePreview] = useState(null);

//   // Pagination
//   const [page, setPage] = useState(1);
//   const limit = 6;
//   const [totalPages, setTotalPages] = useState(1);

//   // ⭐ NEW Controls added (Zoom + Move)
//   const defaultControls = {
//     fileZoom: 1,
//     fileX: 0,
//     fileY: 0,
//     frameZoom: 1,
//     frameX: 0,
//     frameY: 0
//   };

//   const [form, setForm] = useState({
//     title: "",
//     type: "video",
//     status: "active",
//     parentType: "Category",
//     parentId: "",
//     file: null,
//     frameFile: null,

//     transitionPlacement: "below",
//     profilePosition: "center",
//     transitionType: "fade",
//     orientation: "landscape",
//     profileSize: "",
//     profileShape: "circle",

//     ...defaultControls
//   });

//   const fetchData = async () => {
//     const tplRes = await axios.get(`${BASE_URL}/templates`, {
//       params: { page, limit, search }
//     });

//     // const [catRes, polRes, relRes] = await Promise.all([
//     //   axios.get(`${BASE_URL}/categories`),
//     //   axios.get(`${BASE_URL}/politicians`),
//     //   axios.get(`${BASE_URL}/religious`)
//     // ]);

//     const [catRes, polRes, relRes, birthRes, anniRes, festRes] = await Promise.all([
//   axios.get(`${BASE_URL}/categories`),
//   axios.get(`${BASE_URL}/politicians`),
//   axios.get(`${BASE_URL}/religious`),
//   axios.get(`${BASE_URL}/birthdays`),
//   axios.get(`${BASE_URL}/anniversaries`),
//   axios.get(`${BASE_URL}/festivals`)
// ]);


//     setTemplates(tplRes.data.templates || []);
//     setTotalPages(tplRes.data.pages || 1);

//     // setCategories(catRes.data.categories || []);
//     // setPoliticians(polRes.data.politicians || []);
//     // setReligiousList(relRes.data.religious || []);

//     setCategories(catRes.data.categories || []);
// setPoliticians(polRes.data.politicians || []);
// setReligiousList(relRes.data.religious || []);
// setBirthdayList(birthRes.data.birthdays || []);
// setAnniversaryList(anniRes.data.anniversaries || []);
// setFestivalList(festRes.data.festivals || []);

//   };

//   useEffect(() => { fetchData(); }, [page, search]);

//   // ========== Handle Show Add/Edit ==========
//   const handleShow = (tpl = null) => {
//     if (tpl) {
//       setEditId(tpl._id);

//       setForm({
//         title: tpl.title,
//         type: tpl.type,
//         status: tpl.status,

//         parentType: tpl.category ? "Category" : tpl.politician ? "Politician" : "Religious",
//         parentId: tpl.category?._id || tpl.politician?._id || tpl.religious?._id || "",

//         file: null,
//         frameFile: null,

//         transitionPlacement: tpl.transitionPlacement,
//         profilePosition: tpl.profilePosition,
//         transitionType: tpl.transitionType,
//         orientation: tpl.orientation,
//         profileSize: tpl.profileSize,
//         profileShape: tpl.profileShape,

//         fileZoom: tpl.fileZoom || 1,
//         fileX: tpl.fileX || 0,
//         fileY: tpl.fileY || 0,
//         frameZoom: tpl.frameZoom || 1,
//         frameX: tpl.frameX || 0,
//         frameY: tpl.frameY || 0
//       });

//       setFilePreview(tpl.file);
//       setFramePreview(tpl.frameFile);
//     } else {
//       setEditId(null);
//       setForm({
//         title: "",
//         type: "video",
//         status: "active",
//         parentType: "Category",
//         parentId: "",
//         file: null,
//         frameFile: null,
//         ...defaultControls
//       });

//       setFilePreview(null);
//       setFramePreview(null);
//     }

//     setShow(true);
//   };

//   // ========== Handle Input ==========
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       setForm(prev => ({ ...prev, [name]: file }));

//       if (name === "file") setFilePreview(URL.createObjectURL(file));
//       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // ========== Save Submit ==========
//   const handleSubmit = async () => {
//     if (!form.title || !form.parentId) return alert("Fill required fields");

//     setLoading(true);

//     const fd = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (value !== null) fd.append(key, value);
//     });

//       fd.append("parentType", form.parentType);
//   fd.append("parentId", form.parentId);

//     if (editId)
//       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
//     else
//       await axios.post(`${BASE_URL}/templates`, fd);

//     setShow(false);
//     fetchData();
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete Template?")) return;
//     await axios.delete(`${BASE_URL}/templates/${id}`);
//     fetchData();
//   };
//   // ===================== CSV EXPORT =====================
// const handleExportCSV = () => {
//   window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// };

// // ===================== CSV IMPORT =====================
// const handleImportCSV = async () => {
//   if (!csvFile) return alert("Please select CSV file!");

//   setCsvUploading(true);

//   const fd = new FormData();
//   fd.append("csv", csvFile);

//   try {
//     await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
//     alert("CSV Imported Successfully!");
//     setShowCsvModal(false);
//     fetchData();
//   } catch (err) {
//     alert("CSV Import Failed");
//   } finally {
//     setCsvUploading(false);
//   }
// };


//   // const parentOptions = form.parentType === "Category"
//   //   ? categories
//   //   : form.parentType === "Politician"
//   //   ? politicians
//   //   : religiousList;

//   let parentOptions = [];

// if (form.parentType === "Category") parentOptions = categories;
// if (form.parentType === "Politician") parentOptions = politicians;
// if (form.parentType === "Religious") parentOptions = religiousList;
// if (form.parentType === "Birthday") parentOptions = birthdayList;
// if (form.parentType === "Anniversary") parentOptions = anniversaryList;
// if (form.parentType === "Festival") parentOptions = festivalList;



//     // ========== Toggle Status ==========
// // const handleToggleStatus = async (tpl) => {
// //   try {
// //     await axios.patch(`${BASE_URL}/templates/${tpl._id}/status`);
// //     fetchData();
// //   } catch (err) {
// //     console.error("Status update failed:", err);
// //   }
// // };

// const handleToggleStatus = async (tpl) => {
//   try {
//     await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
//     fetchData();
//   } catch (err) {
//     console.error("Status update failed:", err);
//     alert("Toggle failed — check backend route!");
//   }
// };

//   return (
//     <Container fluid>
      

//       {/* HEADER */}
//       {/* <Row className="align-items-center mb-3">
//         <Col><h3>Templates</h3></Col>

//         <Col md={4}>
//           <InputGroup>
//             <Form.Control
//               placeholder="Search by title..."
//               value={search}
//               onChange={e => { setSearch(e.target.value); setPage(1); }}
//             />
//             <Button><FaSearch /></Button>
//           </InputGroup>
//         </Col>

//         <Col className="text-end">
//           <Button onClick={() => handleShow()}>
//             <FaPlus /> Add Template
//           </Button>
//         </Col>
//       </Row> */}
//        <Row className="align-items-center mb-3">
//   <Col><h3>Templates</h3></Col>

//   <Col md={4}>
//     <InputGroup>
//       <Form.Control
//         placeholder="Search by title..."
//         value={search}
//         onChange={e => { setSearch(e.target.value); setPage(1); }}
//       />
//       <Button><FaSearch /></Button>
//     </InputGroup>
//   </Col>

//   <Col className="text-end">

//     {/* ⬇⬇⬇  CSV Import Button (Add this)  */}
//     <Button className="me-2" variant="success" onClick={() => setShowCsvModal(true)}>
//       <FaUpload /> Import CSV
//     </Button>

//     {/* ⬇⬇⬇  CSV Export Button (Add this)  */}
//     <Button className="me-2" variant="warning" onClick={handleExportCSV}>
//       <FaDownload /> Export CSV
//     </Button>

//     {/* Already existing */}
//     <Button onClick={() => handleShow()}>
//       <FaPlus /> Add Template
//     </Button>

//   </Col>
// </Row>

//       {/* TABLE */}
//       <Card>
//         <Card.Body>
//           <Table bordered hover>
//             <thead>
//               <tr>
//                 <th>Thumbnail</th>
//                 <th>Frame</th>
//                 <th>Title</th>
//                 <th>Type</th>
//                 {/* <th>Parent</th> */}
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {templates.map((tpl) => (
//                 <tr key={tpl._id}>
//                   <td>
//                     <img src={tpl.file} width="100" height="70" style={{ objectFit: "cover" }} />
//                   </td>

//                   <td>
//                     {tpl.frameFile ? (
//                       <img src={tpl.frameFile} width="100" height="70" />
//                     ) : "—"}
//                   </td>

//                   <td>{tpl.title}</td>

//                   <td><Badge bg={tpl.type === "video" ? "primary" : "info"}>
//                     {tpl.type}
//                   </Badge></td>

//                   {/* <td>
//                     {tpl.category?.title ||
//                       tpl.politician?.name ||
//                       tpl.religious?.name ||
//                       "—"}
//                   </td> */}

//                   {/* <td>
//                     <Badge bg={tpl.status === "active" ? "success" : "secondary"}>
//                       {tpl.status}
//                     </Badge>
//                   </td> */}
//                    <td>
//   <Form.Check
//     type="switch"
//     id={`status-switch-${tpl._id}`}
//     checked={tpl.status === "active"}
//     onChange={() => handleToggleStatus(tpl)}
//     label={tpl.status === "active" ? "Active" : "Inactive"}
//   />
// </td>

//                   <td>
//                     <Button size="sm" className="me-2" onClick={() => handleShow(tpl)}>
//                       <FaEdit />
//                     </Button>
//                     <Button size="sm" variant="danger" onClick={() => handleDelete(tpl._id)}>
//                       <FaTrash />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           {/* Pagination */}
//           <div className="d-flex justify-content-center mt-3">
//             <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
//             <span className="px-3 py-1 mx-2 border rounded">Page {page} / {totalPages}</span>
//             <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//           </div>

//         </Card.Body>
//       </Card>

//       {/* ========== ADD/EDIT MODAL ========== */}
//       <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
          
//           <Form>
            

//             {/* Title + Type */}
//             <Row>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control name="title" value={form.title} onChange={handleChange} />
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Type</Form.Label>
//                   <Form.Select name="type" value={form.type} onChange={handleChange}>
//                     <option value="video">Video</option>
//                     <option value="graphics">Graphics</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* Parent Selection */}
//             <Row className="mt-3">
//               <Col md={6}>
//                 {/* <Form.Group>
//                   <Form.Label>Parent Type</Form.Label>
//                   <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
//                     <option value="Category">Category</option>
//                     <option value="Politician">Politician</option>
//                     <option value="Religious">Religious</option>
//                   </Form.Select>
//                 </Form.Group> */}

//                 <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
//   <option value="Category">Category</option>
//   <option value="Politician">Politician</option>
//   <option value="Religious">Religious</option>
//   <option value="Birthday">Birthday</option>
//   <option value="Anniversary">Anniversary</option>
//   <option value="Festival">Festival</option>
// </Form.Select>

//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Select Parent</Form.Label>
//                   <Form.Select name="parentId" value={form.parentId} onChange={handleChange}>
//                     <option value="">Choose...</option>
//                     {parentOptions.map((p) => (
//                       <option key={p._id} value={p._id}>{p.title || p.name}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* File Upload */}
//             <Row className="mt-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Thumbnail</Form.Label>
//                   <Form.Control type="file" name="file" accept="image/*,video/*" onChange={handleChange} />
//                   {filePreview && <img src={filePreview} width="150" className="mt-2" />}
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Frame</Form.Label>
//                   <Form.Control type="file" name="frameFile" accept="image/*" onChange={handleChange} />
//                   {framePreview && <img src={framePreview} width="150" className="mt-2" />}
//                 </Form.Group>
//               </Col>
//             </Row>

//             {/* LIVE PREVIEW BOX */}
//             <div
//               style={{
//                 width: 350,
//                 height: 350,
//                 margin: "20px auto",
//                 border: "2px dashed #999",
//                 borderRadius: 12,
//                 position: "relative",
//                 overflow: "hidden",
//                 background: "#eee"
//               }}
//             >

//               {/* Thumbnail */}
//               {filePreview && (
//                 <img
//                   src={filePreview}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                      zIndex: 2
//                   }}
//                 />
//               )}

//               {/* Frame Overlay */}
//               {framePreview && (
//                 <img
//                   src={framePreview}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     pointerEvents: "none",
//                     zIndex: 1
                
//                   }}
//                 />
//               )}
//             </div>

//             {/* Controls */}
//             <hr />
//             <h5>Thumbnail Controls</h5>

//             <Form.Label>Zoom: {form.fileZoom}</Form.Label>
//             <Form.Range name="fileZoom" min="0.5" max="3" step="0.1" value={form.fileZoom} onChange={handleChange} />

//             <Form.Label>Move X: {form.fileX}px</Form.Label>
//             <Form.Range name="fileX" min="-200" max="200" value={form.fileX} onChange={handleChange} />

//             <Form.Label>Move Y: {form.fileY}px</Form.Label>
//             <Form.Range name="fileY" min="-200" max="200" value={form.fileY} onChange={handleChange} />

//             <hr />
//             <h5>Frame Controls</h5>

//             <Form.Label>Zoom: {form.frameZoom}</Form.Label>
//             <Form.Range name="frameZoom" min="0.5" max="3" step="0.1" value={form.frameZoom} onChange={handleChange} />

//             <Form.Label>Move X: {form.frameX}px</Form.Label>
//             <Form.Range name="frameX" min="-200" max="200" value={form.frameX} onChange={handleChange} />

//             <Form.Label>Move Y: {form.frameY}px</Form.Label>
//             <Form.Range name="frameY" min="-200" max="200" value={form.frameY} onChange={handleChange} />

//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
//           <Button variant="primary" onClick={handleSubmit} disabled={loading}>
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {/* ================== CSV IMPORT MODAL ================== */}
// <Modal show={showCsvModal} onHide={() => setShowCsvModal(false)} centered>
//   <Modal.Header closeButton>
//     <Modal.Title>Import Templates CSV</Modal.Title>
//   </Modal.Header>

//   <Modal.Body>
//     <Form.Group>
//       <Form.Label>Select CSV File</Form.Label>
//       <Form.Control
//         type="file"
//         accept=".csv"
//         onChange={(e) => setCsvFile(e.target.files[0])}
//       />
//     </Form.Group>
//   </Modal.Body>

//   <Modal.Footer>
//     <Button variant="secondary" onClick={() => setShowCsvModal(false)}>
//       Close
//     </Button>

//     <Button
//       variant="success"
//       disabled={csvUploading}
//       onClick={handleImportCSV}
//     >
//       {csvUploading ? "Importing..." : "Import CSV"}
//     </Button>
//   </Modal.Footer>
// </Modal>


//     </Container>
//   );
// };

// export default Templates;

import React, { useEffect, useState } from "react";
import {
  Container, Card, Button, Table, Badge, Modal,
  Form, InputGroup, Row, Col
} from "react-bootstrap";
import {
  FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
} from "react-icons/fa";
import axios from "axios";

const Templates = () => {

  const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";

  // CSV Modal States
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csvUploading, setCsvUploading] = useState(false);

  // Data States
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [politicians, setPoliticians] = useState([]);
  const [religiousList, setReligiousList] = useState([]);
  const [birthdayList, setBirthdayList] = useState([]);
  const [anniversaryList, setAnniversaryList] = useState([]);
  const [festivalList, setFestivalList] = useState([]);

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [filePreview, setFilePreview] = useState(null);
  const [framePreview, setFramePreview] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  // Control Defaults
  const defaultControls = {
    fileZoom: 1,
    fileX: 0,
    fileY: 0,
    frameZoom: 1,
    frameX: 0,
    frameY: 0
  };

  // Main Form State
  const [form, setForm] = useState({
    title: "",
    type: "video",
    status: "active",
    parentType: "Category",
    parentId: "",
    file: null,
    frameFile: null,
    transitionPlacement: "below",
    profilePosition: "center",
    transitionType: "fade",
    orientation: "landscape",
    profileSize: "",
    profileShape: "circle",
    ...defaultControls
  });

  // =================== FETCH DATA ===================
  const fetchData = async () => {
    const tplRes = await axios.get(`${BASE_URL}/templates`, {
      params: { page, limit, search }
    });

    const [
      catRes, polRes, relRes, birthRes, anniRes, festRes
    ] = await Promise.all([
      axios.get(`${BASE_URL}/categories`),
      axios.get(`${BASE_URL}/politicians`),
      axios.get(`${BASE_URL}/religious`),
      axios.get(`${BASE_URL}/birthdays`),
      axios.get(`${BASE_URL}/anniversaries`),
      axios.get(`${BASE_URL}/festivals`)
    ]);

    setTemplates(tplRes.data.templates || []);
    setTotalPages(tplRes.data.pages || 1);

    setCategories(catRes.data.categories || []);
    setPoliticians(polRes.data.politicians || []);
    setReligiousList(relRes.data.religious || []);
    setBirthdayList(birthRes.data.birthdays || []);
    setAnniversaryList(anniRes.data.anniversaries || []);
    setFestivalList(festRes.data.festivals || []);
  };

  useEffect(() => { fetchData(); }, [page, search]);


  // =================== SHOW MODAL ===================
  const handleShow = (tpl = null) => {
    if (tpl) {
      setEditId(tpl._id);

      setForm({
        title: tpl.title,
        type: tpl.type,
        status: tpl.status,
        parentType:
          tpl.category ? "Category" :
            tpl.politician ? "Politician" :
              tpl.religious ? "Religious" :
                tpl.birthday ? "Birthday" :
                  tpl.anniversary ? "Anniversary" :
                    tpl.festival ? "Festival" : "",
        parentId:
          tpl.category?._id ||
          tpl.politician?._id ||
          tpl.religious?._id ||
          tpl.birthday?._id ||
          tpl.anniversary?._id ||
          tpl.festival?._id || "",

        file: null,
        frameFile: null,

        transitionPlacement: tpl.transitionPlacement,
        profilePosition: tpl.profilePosition,
        transitionType: tpl.transitionType,
        orientation: tpl.orientation,
        profileSize: tpl.profileSize,
        profileShape: tpl.profileShape,

        fileZoom: tpl.fileZoom || 1,
        fileX: tpl.fileX || 0,
        fileY: tpl.fileY || 0,
        frameZoom: tpl.frameZoom || 1,
        frameX: tpl.frameX || 0,
        frameY: tpl.frameY || 0
      });

      setFilePreview(tpl.file);
      setFramePreview(tpl.frameFile);

    } else {
      setEditId(null);
      setForm({
        title: "",
        type: "video",
        status: "active",
        parentType: "Category",
        parentId: "",
        file: null,
        frameFile: null,
        ...defaultControls
      });

      setFilePreview(null);
      setFramePreview(null);
    }

    setShow(true);
  };


  // =================== INPUT HANDLER ===================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      setForm(prev => ({ ...prev, [name]: file }));

      if (name === "file") setFilePreview(URL.createObjectURL(file));
      if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // =================== SUBMIT FORM ===================
  const handleSubmit = async () => {
    if (!form.title || !form.parentId) return alert("Fill required fields");

    setLoading(true);

    const fd = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) fd.append(key, value);
    });

    fd.append("parentType", form.parentType);
    fd.append("parentId", form.parentId);

    if (editId)
      await axios.put(`${BASE_URL}/templates/${editId}`, fd);
    else
      await axios.post(`${BASE_URL}/templates`, fd);

    setShow(false);
    fetchData();
    setLoading(false);
  };

  // =================== DELETE ===================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete Template?")) return;
    await axios.delete(`${BASE_URL}/templates/${id}`);
    fetchData();
  };

  // =================== STATUS TOGGLE ===================
  const handleToggleStatus = async (tpl) => {
    try {
      await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
      fetchData();
    } catch (e) {
      alert("Toggle failed — backend route error");
    }
  };

  // =================== CSV EXPORT ===================
  const handleExportCSV = () => {
    window.open(`${BASE_URL}/templates/export-csv`, "_blank");
  };

  // =================== CSV IMPORT ===================
  const handleImportCSV = async () => {
    if (!csvFile) return alert("Select a CSV file first!");

    setCsvUploading(true);

    const fd = new FormData();
    fd.append("csv", csvFile);

    try {
      await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
      alert("CSV Imported Successfully!");
      setShowCsvModal(false);
      fetchData();
    } catch {
      alert("CSV Import Failed");
    } finally {
      setCsvUploading(false);
    }
  };

  // =================== PARENT DROPDOWN LOGIC ===================
  let parentOptions = [];

  if (form.parentType === "Category") parentOptions = categories;
  if (form.parentType === "Politician") parentOptions = politicians;
  if (form.parentType === "Religious") parentOptions = religiousList;
  if (form.parentType === "Birthday") parentOptions = birthdayList;
  if (form.parentType === "Anniversary") parentOptions = anniversaryList;
  if (form.parentType === "Festival") parentOptions = festivalList;


  // =================== RENDER ===================
  return (
    <Container fluid className="py-3">

      {/* HEADER */}
      <Row className="align-items-center mb-3 g-2">
        <Col xs={12} md={4}>
          <h3 className="text-center text-md-start">Templates</h3>
        </Col>

        <Col xs={12} md={4}>
          <InputGroup className="mt-2 mt-md-0">
            <Form.Control
              placeholder="Search by title..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
            <Button><FaSearch /></Button>
          </InputGroup>
        </Col>

        <Col xs={12} md={4} className="text-md-end text-center mt-2 mt-md-0">

          <Button className="me-2 mb-2" size="sm"
            variant="success" onClick={() => setShowCsvModal(true)}>
            <FaUpload /> Import
          </Button>

          <Button className="me-2 mb-2" size="sm"
            variant="warning" onClick={handleExportCSV}>
            <FaDownload /> Export
          </Button>

          <Button size="sm" onClick={() => handleShow()}>
            <FaPlus /> Add
          </Button>

        </Col>
      </Row>

      {/* TABLE */}
      <Card>
        <Card.Body>

          <div className="table-responsive">
            <Table bordered hover className="align-middle text-center">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Frame</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {templates.map((tpl) => (
                  <tr key={tpl._id}>
                    <td>
                      <img
                        src={tpl.file}
                        width="90"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: 6 }}
                      />
                    </td>

                    <td>
                      {tpl.frameFile ? (
                        <img src={tpl.frameFile} width="90" height="60"
                          style={{ borderRadius: 6 }} />
                      ) : "—"}
                    </td>

                    <td>{tpl.title}</td>

                    <td>
                      <Badge bg={tpl.type === "video" ? "primary" : "info"}>
                        {tpl.type}
                      </Badge>
                    </td>

                    <td>
                      <Form.Check
                        type="switch"
                        checked={tpl.status === "active"}
                        onChange={() => handleToggleStatus(tpl)}
                        label={tpl.status === "active" ? "Active" : "Inactive"}
                      />
                    </td>

                    <td>
                      <Button size="sm" className="me-1"
                        onClick={() => handleShow(tpl)}>
                        <FaEdit />
                      </Button>

                      <Button size="sm" variant="danger"
                        onClick={() => handleDelete(tpl._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </Table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <Button size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}>Prev</Button>

            <span className="px-3 py-1 mx-2 border rounded">
              Page {page} / {totalPages}
            </span>

            <Button size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}>Next</Button>
          </div>

        </Card.Body>
      </Card>


      {/* ================= ADD / EDIT MODAL ================= */}
      <Modal show={show} onHide={() => setShow(false)}
        centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            {/* Title & Type */}
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="video">Video</option>
                  <option value="graphics">Graphics</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Parent */}
            <Row className="g-3 mt-1">
              <Col md={6}>
                <Form.Label>Parent Type</Form.Label>
                <Form.Select name="parentType"
                  value={form.parentType}
                  onChange={handleChange}
                >
                  <option value="Category">Category</option>
                  <option value="Politician">Politician</option>
                  <option value="Religious">Religious</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Festival">Festival</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Select Parent</Form.Label>
                <Form.Select
                  name="parentId"
                  value={form.parentId}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  {parentOptions.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title || p.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/* Files */}
            <Row className="g-3 mt-1">
              <Col md={6}>
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control type="file" name="file"
                  onChange={handleChange}
                  accept="image/*,video/*"
                />
                {filePreview && (
                  <img src={filePreview} width="140" className="mt-2"
                    style={{ borderRadius: 8 }} />
                )}
              </Col>

              <Col md={6}>
                <Form.Label>Frame</Form.Label>
                <Form.Control type="file" name="frameFile"
                  onChange={handleChange}
                  accept="image/*"
                />
                {framePreview && (
                  <img src={framePreview} width="140" className="mt-2"
                    style={{ borderRadius: 8 }} />
                )}
              </Col>
            </Row>

            {/* LIVE PREVIEW */}
            <div
              className="mt-3 mx-auto"
              style={{
                width: "100%",
                maxWidth: 330,
                height: 330,
                border: "2px dashed #aaa",
                borderRadius: 12,
                position: "relative",
                overflow: "hidden",
                background: "#eee"
              }}
            >
              {filePreview && (
                <img
                  src={filePreview}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${form.fileZoom})
                                translate(${form.fileX}px, ${form.fileY}px)`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 3
                  }}
                />
              )}

              {framePreview && (
                <img
                  src={framePreview}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transform: `scale(${form.frameZoom})
                                translate(${form.frameX}px, ${form.frameY}px)`,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    zIndex: 4
                  }}
                />
              )}
            </div>

            {/* CONTROLS */}
            <hr />

            <h6>Thumbnail Controls</h6>
            <Form.Label>Zoom</Form.Label>
            <Form.Range name="fileZoom" min="0.5" max="3"
              step="0.1" value={form.fileZoom}
              onChange={handleChange} />

            <Form.Label>Move X</Form.Label>
            <Form.Range name="fileX" min="-200" max="200"
              value={form.fileX}
              onChange={handleChange} />

            <Form.Label>Move Y</Form.Label>
            <Form.Range name="fileY" min="-200" max="200"
              value={form.fileY}
              onChange={handleChange} />

            <hr />

            <h6>Frame Controls</h6>
            <Form.Label>Zoom</Form.Label>
            <Form.Range name="frameZoom" min="0.5" max="3"
              step="0.1" value={form.frameZoom}
              onChange={handleChange} />

            <Form.Label>Move X</Form.Label>
            <Form.Range name="frameX" min="-200" max="200"
              value={form.frameX}
              onChange={handleChange} />

            <Form.Label>Move Y</Form.Label>
            <Form.Range name="frameY" min="-200" max="200"
              value={form.frameY}
              onChange={handleChange} />

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"
            onClick={() => setShow(false)}>Close</Button>

          <Button variant="primary" disabled={loading}
            onClick={handleSubmit}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ================= CSV IMPORT MODAL ================= */}
      <Modal show={showCsvModal}
        onHide={() => setShowCsvModal(false)}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Templates CSV</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Select CSV File</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"
            onClick={() => setShowCsvModal(false)}>Close</Button>

          <Button variant="success"
            disabled={csvUploading}
            onClick={handleImportCSV}>
            {csvUploading ? "Importing..." : "Import CSV"}
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Templates;
