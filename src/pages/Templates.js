

// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import {
// // // // // //   Container, Card, Button, Table, Badge, Modal, Form, InputGroup, Row, Col
// // // // // // } from "react-bootstrap";
// // // // // // import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload } from "react-icons/fa";
// // // // // // import axios from "axios";

// // // // // // const profilePositions = [
// // // // // //   "topLeft","topRight","bottomLeft","bottomRight","center",
// // // // // //   "centerLeft","centerRight","topCenter","bottomCenter"
// // // // // // ];
// // // // // // const transitionTypes = [
// // // // // //   "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// // // // // //   "scale","rotation","bounce","ripple"
// // // // // // ];
// // // // // // const orientations = ["landscape","portrait"];
// // // // // // const placements = ["above","below"];
// // // // // // const profileShapes = ["circle","square","rectangle"];

// // // // // // const Templates = () => {
// // // // // //   const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";

// // // // // //   const [templates, setTemplates] = useState([]);
// // // // // //   const [categories, setCategories] = useState([]);
// // // // // //   const [politicians, setPoliticians] = useState([]);
// // // // // //   const [religiousList, setReligiousList] = useState([]);

// // // // // //   const [show, setShow] = useState(false);
// // // // // //   const [editId, setEditId] = useState(null);
// // // // // //   const [filePreview, setFilePreview] = useState(null);
// // // // // //   const [framePreview, setFramePreview] = useState(null);
// // // // // //   const [search, setSearch] = useState("");
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // CSV Modal
// // // // // //   const [showCsvModal, setShowCsvModal] = useState(false);
// // // // // //   const [csvFile, setCsvFile] = useState(null);
// // // // // //   const [csvUploading, setCsvUploading] = useState(false);

// // // // // //   // ---------- PAGINATION ----------
// // // // // //   const [page, setPage] = useState(1);
// // // // // //   const limit = 6;
// // // // // //   const [totalPages, setTotalPages] = useState(1);

// // // // // //   const [form, setForm] = useState({
// // // // // //     title: "",
// // // // // //     type: "video",
// // // // // //     status: "active",
// // // // // //     parentType: "Category",
// // // // // //     parentId: "",
// // // // // //     file: null,
// // // // // //     transitionPlacement: "below",
// // // // // //     profilePosition: "center",
// // // // // //     transitionType: "fade",
// // // // // //     orientation: "landscape",
// // // // // //     profileSize: "",
// // // // // //     profileShape: "circle",
// // // // // //     frameFile: null,
// // // // // //   });

// // // // // //   // ===================== FETCH DATA =====================
// // // // // //   const fetchData = async () => {
// // // // // //     try {
// // // // // //       const tplRes = await axios.get(`${BASE_URL}/templates`, {
// // // // // //         params: { page, limit, search }
// // // // // //       });

// // // // // //       const [catRes, polRes, relRes] = await Promise.all([
// // // // // //         axios.get(`${BASE_URL}/categories`),
// // // // // //         axios.get(`${BASE_URL}/politicians`),
// // // // // //         axios.get(`${BASE_URL}/religious`)
// // // // // //       ]);

// // // // // //       setTemplates(tplRes.data.templates || []);
// // // // // //       setTotalPages(tplRes.data.pages || 1);

// // // // // //       setCategories(catRes.data.categories || []);
// // // // // //       setPoliticians(polRes.data.politicians || []);
// // // // // //       setReligiousList(relRes.data.religious || []);
// // // // // //     } catch (err) {
// // // // // //       console.error("Fetch error:", err);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => { fetchData(); }, [page, search]);

// // // // // //   // ===================== FORM HANDLERS =====================
// // // // // //   const handleShow = (tpl = null) => {
// // // // // //     if (tpl) {
// // // // // //       setEditId(tpl._id);
// // // // // //       setForm({
// // // // // //         title: tpl.title,
// // // // // //         type: tpl.type,
// // // // // //         status: tpl.status,
// // // // // //         parentType: tpl.category ? "Category" : tpl.politician ? "Politician" : "Religious",
// // // // // //         parentId: tpl.category?._id || tpl.politician?._id || tpl.religious?._id || "",
// // // // // //         file: null,
// // // // // //         transitionPlacement: tpl.transitionPlacement,
// // // // // //         profilePosition: tpl.profilePosition,
// // // // // //         transitionType: tpl.transitionType,
// // // // // //         orientation: tpl.orientation,
// // // // // //         profileSize: tpl.profileSize,
// // // // // //         profileShape: tpl.profileShape,
// // // // // //         frameFile: null,
// // // // // //       });
// // // // // //       setFilePreview(tpl.file);
// // // // // //       setFramePreview(tpl.frameFile);
// // // // // //     } else {
// // // // // //       setEditId(null);
// // // // // //       setForm({
// // // // // //         title: "",
// // // // // //         type: "video",
// // // // // //         status: "active",
// // // // // //         parentType: "Category",
// // // // // //         parentId: "",
// // // // // //         file: null,
// // // // // //         transitionPlacement: "below",
// // // // // //         profilePosition: "center",
// // // // // //         transitionType: "fade",
// // // // // //         orientation: "landscape",
// // // // // //         profileSize: "",
// // // // // //         profileShape: "circle",
// // // // // //         frameFile: null,
        
// // // // // //       });
// // // // // //       setFilePreview(null);
// // // // // //       setFramePreview(null);
// // // // // //     }
// // // // // //     setShow(true);
// // // // // //   };

// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value, files } = e.target;
// // // // // //     if (files) {
// // // // // //       const file = files[0];
// // // // // //       setForm(prev => ({ ...prev, [name]: file }));
// // // // // //       if (name === "file") setFilePreview(URL.createObjectURL(file));
// // // // // //       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));
// // // // // //     } else {
// // // // // //       setForm(prev => ({ ...prev, [name]: value }));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async () => {
// // // // // //     if (!form.title || !form.parentId) return alert("Please fill required fields");

// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const fd = new FormData();
// // // // // //       Object.entries(form).forEach(([key, value]) => {
// // // // // //         if (value) fd.append(key, value);
// // // // // //       });

// // // // // //       if (editId)
// // // // // //         await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// // // // // //       else
// // // // // //         await axios.post(`${BASE_URL}/templates`, fd);

// // // // // //       fetchData();
// // // // // //       setShow(false);
// // // // // //     } catch (err) {
// // // // // //       alert("Save failed");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleDelete = async (id) => {
// // // // // //     if (!window.confirm("Delete template?")) return;
// // // // // //     await axios.delete(`${BASE_URL}/templates/${id}`);
// // // // // //     fetchData();
// // // // // //   };

// // // // // //   const parentOptions = form.parentType === "Category"
// // // // // //     ? categories
// // // // // //     : form.parentType === "Politician"
// // // // // //     ? politicians
// // // // // //     : religiousList;

// // // // // //   // ===================== CSV EXPORT =====================
// // // // // //   const handleExportCSV = () => {
// // // // // //     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// // // // // //   };

// // // // // //   // ===================== CSV IMPORT =====================
// // // // // //   const handleImportCSV = async () => {
// // // // // //     if (!csvFile) return alert("Please select CSV file!");

// // // // // //     setCsvUploading(true);

// // // // // //     const fd = new FormData();
// // // // // //     fd.append("csv", csvFile);

// // // // // //     try {
// // // // // //       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
// // // // // //       alert("CSV Imported Successfully!");
// // // // // //       setShowCsvModal(false);
// // // // // //       fetchData();
// // // // // //     } catch (err) {
// // // // // //       alert("CSV Import Failed");
// // // // // //     } finally {
// // // // // //       setCsvUploading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <Container fluid>
// // // // // //       <Row className="align-items-center mb-3">
// // // // // //         <Col><h3>Templates</h3></Col>

// // // // // //         <Col md={4}>
// // // // // //           <InputGroup>
// // // // // //             <Form.Control
// // // // // //               placeholder="Search by title..."
// // // // // //               value={search}
// // // // // //               onChange={e => { setSearch(e.target.value); setPage(1); }}
// // // // // //             />
// // // // // //             <Button><FaSearch /></Button>
// // // // // //           </InputGroup>
// // // // // //         </Col>

// // // // // //         {/* CSV Buttons */}
// // // // // //         <Col className="text-end">
// // // // // //           <Button className="me-2" variant="success" onClick={() => setShowCsvModal(true)}>
// // // // // //             <FaUpload /> Import CSV
// // // // // //           </Button>
// // // // // //           <Button className="me-2" variant="warning" onClick={handleExportCSV}>
// // // // // //             <FaDownload /> Export CSV
// // // // // //           </Button>

// // // // // //           <Button onClick={() => handleShow()}>
// // // // // //             <FaPlus className="me-2" /> Add Template
// // // // // //           </Button>
// // // // // //         </Col>
// // // // // //       </Row>

// // // // // //       {/* ================== TABLE ================== */}
// // // // // //       <Card>
// // // // // //         <Card.Body>
// // // // // //           <Table bordered hover>
// // // // // //             <thead>
// // // // // //               <tr>
// // // // // //                 <th>Thumbnail</th>
// // // // // //                 <th>Title</th>
// // // // // //                 <th>Type</th>
// // // // // //                 <th>Parent</th>
// // // // // //                 <th>Position</th>
// // // // // //                 <th>Size</th>
// // // // // //                 <th>Shape</th>
// // // // // //                 <th>Status</th>
// // // // // //                 <th>Actions</th>
// // // // // //               </tr>
// // // // // //             </thead>

// // // // // //             <tbody>
// // // // // //               {templates.map((tpl) => (
// // // // // //                 <tr key={tpl._id}>
// // // // // //                   <td style={{ width: 120 }}>
// // // // // //                     {tpl.type === "video" ? (
// // // // // //                       <video src={tpl.file} width="100" height="70" />
// // // // // //                     ) : (
// // // // // //                       <img src={tpl.file} width="100" height="70" style={{ objectFit: "cover" }} />
// // // // // //                     )}
// // // // // //                   </td>
// // // // // //                   <td>{tpl.title}</td>
// // // // // //                   <td><Badge bg={tpl.type === "video" ? "primary" : "info"}>{tpl.type}</Badge></td>
// // // // // //                   <td>
// // // // // //                     {tpl.category?.title ||
// // // // // //                     tpl.politician?.name ||
// // // // // //                     tpl.religious?.name ||
// // // // // //                     "-"}
// // // // // //                   </td>
// // // // // //                   <td>{tpl.profilePosition}</td>
// // // // // //                   <td>{tpl.profileSize}</td>
// // // // // //                   <td>{tpl.profileShape}</td>
// // // // // //                   <td><Badge bg={tpl.status === "active" ? "success" : "secondary"}>{tpl.status}</Badge></td>

// // // // // //                   <td>
// // // // // //                     <Button size="sm" className="me-2" onClick={() => handleShow(tpl)}>
// // // // // //                       <FaEdit />
// // // // // //                     </Button>
// // // // // //                     <Button size="sm" variant="danger" onClick={() => handleDelete(tpl._id)}>
// // // // // //                       <FaTrash />
// // // // // //                     </Button>
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //             </tbody>
// // // // // //           </Table>

// // // // // //           {/* Pagination */}
// // // // // //           <div className="d-flex justify-content-center mt-3">
// // // // // //             <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
// // // // // //             <span className="px-3 py-1 mx-2 border rounded">Page {page} / {totalPages}</span>
// // // // // //             <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
// // // // // //           </div>
// // // // // //         </Card.Body>
// // // // // //       </Card>

// // // // // //       {/* ================== ADD/EDIT MODAL ================== */}
// // // // // //       <Modal show={show} onHide={() => setShow(false)} size="lg">
// // // // // //         <Modal.Header closeButton><Modal.Title>{editId ? "Edit" : "Add"} Template</Modal.Title></Modal.Header>

// // // // // //         <Modal.Body>
// // // // // //           <Form>

// // // // // //             <Row>
// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Title</Form.Label>
// // // // // //                   <Form.Control name="title" value={form.title} onChange={handleChange} />
// // // // // //                 </Form.Group>
// // // // // //               </Col>

// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Type</Form.Label>
// // // // // //                   <Form.Select name="type" value={form.type} onChange={handleChange}>
// // // // // //                     <option value="video">Video</option>
// // // // // //                     <option value="graphics">Graphics</option>
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group>
// // // // // //               </Col>
// // // // // //             </Row>

// // // // // //             <Row className="mt-3">
// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Parent Type</Form.Label>
// // // // // //                   <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
// // // // // //                     <option value="Category">Category</option>
// // // // // //                     <option value="Politician">Politician</option>
// // // // // //                     <option value="Religious">Religious</option>
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group>
// // // // // //               </Col>

// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Select Parent</Form.Label>
// // // // // //                   <Form.Select name="parentId" value={form.parentId} onChange={handleChange}>
// // // // // //                     <option value="">Choose...</option>
// // // // // //                     {parentOptions.map((p) => (
// // // // // //                       <option key={p._id} value={p._id}>{p.title || p.name}</option>
// // // // // //                     ))}
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group>
// // // // // //               </Col>
// // // // // //             </Row>

// // // // // //             <Row className="mt-3">
// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Orientation</Form.Label>
// // // // // //                   <Form.Select name="orientation" value={form.orientation} onChange={handleChange}>
// // // // // //                     {orientations.map(o => <option key={o}>{o}</option>)}
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group>
// // // // // //               </Col>

// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Transition Type</Form.Label>
// // // // // //                   <Form.Select name="transitionType" value={form.transitionType} onChange={handleChange}>
// // // // // //                     {transitionTypes.map(t => <option key={t}>{t}</option>)}
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group>
// // // // // //               </Col>
// // // // // //             </Row>

// // // // // //             <Form.Group className="mt-3">
// // // // // //               <Form.Label>Template File</Form.Label>
// // // // // //               <Form.Control type="file" name="file" onChange={handleChange} />
// // // // // //               {filePreview && <img src={filePreview} className="mt-2" width="150" />}
// // // // // //             </Form.Group>

// // // // // //           </Form>
// // // // // //         </Modal.Body>

// // // // // //         <Modal.Footer>
// // // // // //           <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
// // // // // //           <Button variant="primary" disabled={loading} onClick={handleSubmit}>
// // // // // //             {loading ? "Saving..." : "Save"}
// // // // // //           </Button>
// // // // // //         </Modal.Footer>
// // // // // //       </Modal>

// // // // // //       {/* ================== CSV IMPORT MODAL ================== */}
// // // // // //       <Modal show={showCsvModal} onHide={() => setShowCsvModal(false)}>
// // // // // //         <Modal.Header closeButton><Modal.Title>Import Templates CSV</Modal.Title></Modal.Header>

// // // // // //         <Modal.Body>
// // // // // //           <Form.Group>
// // // // // //             <Form.Label>Select CSV File</Form.Label>
// // // // // //             <Form.Control type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} />
// // // // // //           </Form.Group>
// // // // // //         </Modal.Body>

// // // // // //         <Modal.Footer>
// // // // // //           <Button variant="secondary" onClick={() => setShowCsvModal(false)}>Close</Button>
// // // // // //           <Button variant="success" disabled={csvUploading} onClick={handleImportCSV}>
// // // // // //             {csvUploading ? "Importing..." : "Import CSV"}
// // // // // //           </Button>
// // // // // //         </Modal.Footer>
// // // // // //       </Modal>
// // // // // //     </Container>
// // // // // //   );
// // // // // // };

// // // // // // export default Templates;


// // // // // // import React, { useEffect, useState } from "react";
// // // // // // import {
// // // // // //   Container, Card, Button, Table, Badge, Modal, Form, InputGroup, Row, Col
// // // // // // } from "react-bootstrap";
// // // // // // import { FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload } from "react-icons/fa";
// // // // // // import axios from "axios";

// // // // // // const profilePositions = [
// // // // // //   "topLeft","topRight","bottomLeft","bottomRight","center",
// // // // // //   "centerLeft","centerRight","topCenter","bottomCenter"
// // // // // // ];

// // // // // // const transitionTypes = [
// // // // // //   "fade","slideFromBottom","slideFromTop","slideFromLeft","slideFromRight",
// // // // // //   "scale","rotation","bounce","ripple"
// // // // // // ];

// // // // // // const orientations = ["landscape","portrait"];

// // // // // // const Templates = () => {
// // // // // //   const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";
// // // // // //   const [showCsvModal, setShowCsvModal] = useState(false);
// // // // // // const [csvFile, setCsvFile] = useState(null);
// // // // // // const [csvUploading, setCsvUploading] = useState(false);


// // // // // //   const [templates, setTemplates] = useState([]);
// // // // // //   const [categories, setCategories] = useState([]);
// // // // // //   const [politicians, setPoliticians] = useState([]);
// // // // // //   const [religiousList, setReligiousList] = useState([]);
// // // // // //   const [birthdayList, setBirthdayList] = useState([]);
// // // // // // const [anniversaryList, setAnniversaryList] = useState([]);
// // // // // // const [festivalList, setFestivalList] = useState([]);


// // // // // //   const [show, setShow] = useState(false);
// // // // // //   const [editId, setEditId] = useState(null);

// // // // // //   const [search, setSearch] = useState("");
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   const [filePreview, setFilePreview] = useState(null);
// // // // // //   const [framePreview, setFramePreview] = useState(null);

// // // // // //   // Pagination
// // // // // //   const [page, setPage] = useState(1);
// // // // // //   const limit = 6;
// // // // // //   const [totalPages, setTotalPages] = useState(1);

// // // // // //   // ⭐ NEW Controls added (Zoom + Move)
// // // // // //   const defaultControls = {
// // // // // //     fileZoom: 1,
// // // // // //     fileX: 0,
// // // // // //     fileY: 0,
// // // // // //     frameZoom: 1,
// // // // // //     frameX: 0,
// // // // // //     frameY: 0
// // // // // //   };

// // // // // //   const [form, setForm] = useState({
// // // // // //     title: "",
// // // // // //     type: "video",
// // // // // //     status: "active",
// // // // // //     parentType: "Category",
// // // // // //     parentId: "",
// // // // // //     file: null,
// // // // // //     frameFile: null,

// // // // // //     transitionPlacement: "below",
// // // // // //     profilePosition: "center",
// // // // // //     transitionType: "fade",
// // // // // //     orientation: "landscape",
// // // // // //     profileSize: "",
// // // // // //     profileShape: "circle",

// // // // // //     ...defaultControls
// // // // // //   });

// // // // // //   const fetchData = async () => {
// // // // // //     const tplRes = await axios.get(`${BASE_URL}/templates`, {
// // // // // //       params: { page, limit, search }
// // // // // //     });

// // // // // //     // const [catRes, polRes, relRes] = await Promise.all([
// // // // // //     //   axios.get(`${BASE_URL}/categories`),
// // // // // //     //   axios.get(`${BASE_URL}/politicians`),
// // // // // //     //   axios.get(`${BASE_URL}/religious`)
// // // // // //     // ]);

// // // // // //     const [catRes, polRes, relRes, birthRes, anniRes, festRes] = await Promise.all([
// // // // // //   axios.get(`${BASE_URL}/categories`),
// // // // // //   axios.get(`${BASE_URL}/politicians`),
// // // // // //   axios.get(`${BASE_URL}/religious`),
// // // // // //   axios.get(`${BASE_URL}/birthdays`),
// // // // // //   axios.get(`${BASE_URL}/anniversaries`),
// // // // // //   axios.get(`${BASE_URL}/festivals`)
// // // // // // ]);


// // // // // //     setTemplates(tplRes.data.templates || []);
// // // // // //     setTotalPages(tplRes.data.pages || 1);

// // // // // //     // setCategories(catRes.data.categories || []);
// // // // // //     // setPoliticians(polRes.data.politicians || []);
// // // // // //     // setReligiousList(relRes.data.religious || []);

// // // // // //     setCategories(catRes.data.categories || []);
// // // // // // setPoliticians(polRes.data.politicians || []);
// // // // // // setReligiousList(relRes.data.religious || []);
// // // // // // setBirthdayList(birthRes.data.birthdays || []);
// // // // // // setAnniversaryList(anniRes.data.anniversaries || []);
// // // // // // setFestivalList(festRes.data.festivals || []);

// // // // // //   };

// // // // // //   useEffect(() => { fetchData(); }, [page, search]);

// // // // // //   // ========== Handle Show Add/Edit ==========
// // // // // //   const handleShow = (tpl = null) => {
// // // // // //     if (tpl) {
// // // // // //       setEditId(tpl._id);

// // // // // //       setForm({
// // // // // //         title: tpl.title,
// // // // // //         type: tpl.type,
// // // // // //         status: tpl.status,

// // // // // //         parentType: tpl.category ? "Category" : tpl.politician ? "Politician" : "Religious",
// // // // // //         parentId: tpl.category?._id || tpl.politician?._id || tpl.religious?._id || "",

// // // // // //         file: null,
// // // // // //         frameFile: null,

// // // // // //         transitionPlacement: tpl.transitionPlacement,
// // // // // //         profilePosition: tpl.profilePosition,
// // // // // //         transitionType: tpl.transitionType,
// // // // // //         orientation: tpl.orientation,
// // // // // //         profileSize: tpl.profileSize,
// // // // // //         profileShape: tpl.profileShape,

// // // // // //         fileZoom: tpl.fileZoom || 1,
// // // // // //         fileX: tpl.fileX || 0,
// // // // // //         fileY: tpl.fileY || 0,
// // // // // //         frameZoom: tpl.frameZoom || 1,
// // // // // //         frameX: tpl.frameX || 0,
// // // // // //         frameY: tpl.frameY || 0
// // // // // //       });

// // // // // //       setFilePreview(tpl.file);
// // // // // //       setFramePreview(tpl.frameFile);
// // // // // //     } else {
// // // // // //       setEditId(null);
// // // // // //       setForm({
// // // // // //         title: "",
// // // // // //         type: "video",
// // // // // //         status: "active",
// // // // // //         parentType: "Category",
// // // // // //         parentId: "",
// // // // // //         file: null,
// // // // // //         frameFile: null,
// // // // // //         ...defaultControls
// // // // // //       });

// // // // // //       setFilePreview(null);
// // // // // //       setFramePreview(null);
// // // // // //     }

// // // // // //     setShow(true);
// // // // // //   };

// // // // // //   // ========== Handle Input ==========
// // // // // //   const handleChange = (e) => {
// // // // // //     const { name, value, files } = e.target;

// // // // // //     if (files) {
// // // // // //       const file = files[0];
// // // // // //       setForm(prev => ({ ...prev, [name]: file }));

// // // // // //       if (name === "file") setFilePreview(URL.createObjectURL(file));
// // // // // //       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

// // // // // //     } else {
// // // // // //       setForm(prev => ({ ...prev, [name]: value }));
// // // // // //     }
// // // // // //   };

// // // // // //   // ========== Save Submit ==========
// // // // // //   const handleSubmit = async () => {
// // // // // //     if (!form.title || !form.parentId) return alert("Fill required fields");

// // // // // //     setLoading(true);

// // // // // //     const fd = new FormData();
// // // // // //     Object.entries(form).forEach(([key, value]) => {
// // // // // //       if (value !== null) fd.append(key, value);
// // // // // //     });

// // // // // //       fd.append("parentType", form.parentType);
// // // // // //   fd.append("parentId", form.parentId);

// // // // // //     if (editId)
// // // // // //       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// // // // // //     else
// // // // // //       await axios.post(`${BASE_URL}/templates`, fd);

// // // // // //     setShow(false);
// // // // // //     fetchData();
// // // // // //     setLoading(false);
// // // // // //   };

// // // // // //   const handleDelete = async (id) => {
// // // // // //     if (!window.confirm("Delete Template?")) return;
// // // // // //     await axios.delete(`${BASE_URL}/templates/${id}`);
// // // // // //     fetchData();
// // // // // //   };
// // // // // //   // ===================== CSV EXPORT =====================
// // // // // // const handleExportCSV = () => {
// // // // // //   window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// // // // // // };

// // // // // // // ===================== CSV IMPORT =====================
// // // // // // const handleImportCSV = async () => {
// // // // // //   if (!csvFile) return alert("Please select CSV file!");

// // // // // //   setCsvUploading(true);

// // // // // //   const fd = new FormData();
// // // // // //   fd.append("csv", csvFile);

// // // // // //   try {
// // // // // //     await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
// // // // // //     alert("CSV Imported Successfully!");
// // // // // //     setShowCsvModal(false);
// // // // // //     fetchData();
// // // // // //   } catch (err) {
// // // // // //     alert("CSV Import Failed");
// // // // // //   } finally {
// // // // // //     setCsvUploading(false);
// // // // // //   }
// // // // // // };


// // // // // //   // const parentOptions = form.parentType === "Category"
// // // // // //   //   ? categories
// // // // // //   //   : form.parentType === "Politician"
// // // // // //   //   ? politicians
// // // // // //   //   : religiousList;

// // // // // //   let parentOptions = [];

// // // // // // if (form.parentType === "Category") parentOptions = categories;
// // // // // // if (form.parentType === "Politician") parentOptions = politicians;
// // // // // // if (form.parentType === "Religious") parentOptions = religiousList;
// // // // // // if (form.parentType === "Birthday") parentOptions = birthdayList;
// // // // // // if (form.parentType === "Anniversary") parentOptions = anniversaryList;
// // // // // // if (form.parentType === "Festival") parentOptions = festivalList;



// // // // // //     // ========== Toggle Status ==========
// // // // // // // const handleToggleStatus = async (tpl) => {
// // // // // // //   try {
// // // // // // //     await axios.patch(`${BASE_URL}/templates/${tpl._id}/status`);
// // // // // // //     fetchData();
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Status update failed:", err);
// // // // // // //   }
// // // // // // // };

// // // // // // const handleToggleStatus = async (tpl) => {
// // // // // //   try {
// // // // // //     await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
// // // // // //     fetchData();
// // // // // //   } catch (err) {
// // // // // //     console.error("Status update failed:", err);
// // // // // //     alert("Toggle failed — check backend route!");
// // // // // //   }
// // // // // // };

// // // // // //   return (
// // // // // //     <Container fluid>
      

// // // // // //       {/* HEADER */}
// // // // // //       {/* <Row className="align-items-center mb-3">
// // // // // //         <Col><h3>Templates</h3></Col>

// // // // // //         <Col md={4}>
// // // // // //           <InputGroup>
// // // // // //             <Form.Control
// // // // // //               placeholder="Search by title..."
// // // // // //               value={search}
// // // // // //               onChange={e => { setSearch(e.target.value); setPage(1); }}
// // // // // //             />
// // // // // //             <Button><FaSearch /></Button>
// // // // // //           </InputGroup>
// // // // // //         </Col>

// // // // // //         <Col className="text-end">
// // // // // //           <Button onClick={() => handleShow()}>
// // // // // //             <FaPlus /> Add Template
// // // // // //           </Button>
// // // // // //         </Col>
// // // // // //       </Row> */}
// // // // // //        <Row className="align-items-center mb-3">
// // // // // //   <Col><h3>Templates</h3></Col>

// // // // // //   <Col md={4}>
// // // // // //     <InputGroup>
// // // // // //       <Form.Control
// // // // // //         placeholder="Search by title..."
// // // // // //         value={search}
// // // // // //         onChange={e => { setSearch(e.target.value); setPage(1); }}
// // // // // //       />
// // // // // //       <Button><FaSearch /></Button>
// // // // // //     </InputGroup>
// // // // // //   </Col>

// // // // // //   <Col className="text-end">

// // // // // //     {/* ⬇⬇⬇  CSV Import Button (Add this)  */}
// // // // // //     <Button className="me-2" variant="success" onClick={() => setShowCsvModal(true)}>
// // // // // //       <FaUpload /> Import CSV
// // // // // //     </Button>

// // // // // //     {/* ⬇⬇⬇  CSV Export Button (Add this)  */}
// // // // // //     <Button className="me-2" variant="warning" onClick={handleExportCSV}>
// // // // // //       <FaDownload /> Export CSV
// // // // // //     </Button>

// // // // // //     {/* Already existing */}
// // // // // //     <Button onClick={() => handleShow()}>
// // // // // //       <FaPlus /> Add Template
// // // // // //     </Button>

// // // // // //   </Col>
// // // // // // </Row>

// // // // // //       {/* TABLE */}
// // // // // //       <Card>
// // // // // //         <Card.Body>
// // // // // //           <Table bordered hover>
// // // // // //             <thead>
// // // // // //               <tr>
// // // // // //                 <th>Thumbnail</th>
// // // // // //                 <th>Frame</th>
// // // // // //                 <th>Title</th>
// // // // // //                 <th>Type</th>
// // // // // //                 {/* <th>Parent</th> */}
// // // // // //                 <th>Status</th>
// // // // // //                 <th>Actions</th>
// // // // // //               </tr>
// // // // // //             </thead>

// // // // // //             <tbody>
// // // // // //               {templates.map((tpl) => (
// // // // // //                 <tr key={tpl._id}>
// // // // // //                   <td>
// // // // // //                     <img src={tpl.file} width="100" height="70" style={{ objectFit: "cover" }} />
// // // // // //                   </td>

// // // // // //                   <td>
// // // // // //                     {tpl.frameFile ? (
// // // // // //                       <img src={tpl.frameFile} width="100" height="70" />
// // // // // //                     ) : "—"}
// // // // // //                   </td>

// // // // // //                   <td>{tpl.title}</td>

// // // // // //                   <td><Badge bg={tpl.type === "video" ? "primary" : "info"}>
// // // // // //                     {tpl.type}
// // // // // //                   </Badge></td>

// // // // // //                   {/* <td>
// // // // // //                     {tpl.category?.title ||
// // // // // //                       tpl.politician?.name ||
// // // // // //                       tpl.religious?.name ||
// // // // // //                       "—"}
// // // // // //                   </td> */}

// // // // // //                   {/* <td>
// // // // // //                     <Badge bg={tpl.status === "active" ? "success" : "secondary"}>
// // // // // //                       {tpl.status}
// // // // // //                     </Badge>
// // // // // //                   </td> */}
// // // // // //                    <td>
// // // // // //   <Form.Check
// // // // // //     type="switch"
// // // // // //     id={`status-switch-${tpl._id}`}
// // // // // //     checked={tpl.status === "active"}
// // // // // //     onChange={() => handleToggleStatus(tpl)}
// // // // // //     label={tpl.status === "active" ? "Active" : "Inactive"}
// // // // // //   />
// // // // // // </td>

// // // // // //                   <td>
// // // // // //                     <Button size="sm" className="me-2" onClick={() => handleShow(tpl)}>
// // // // // //                       <FaEdit />
// // // // // //                     </Button>
// // // // // //                     <Button size="sm" variant="danger" onClick={() => handleDelete(tpl._id)}>
// // // // // //                       <FaTrash />
// // // // // //                     </Button>
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               ))}
// // // // // //             </tbody>
// // // // // //           </Table>

// // // // // //           {/* Pagination */}
// // // // // //           <div className="d-flex justify-content-center mt-3">
// // // // // //             <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
// // // // // //             <span className="px-3 py-1 mx-2 border rounded">Page {page} / {totalPages}</span>
// // // // // //             <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
// // // // // //           </div>

// // // // // //         </Card.Body>
// // // // // //       </Card>

// // // // // //       {/* ========== ADD/EDIT MODAL ========== */}
// // // // // //       <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
// // // // // //         <Modal.Header closeButton>
// // // // // //           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
// // // // // //         </Modal.Header>
// // // // // //         <Modal.Body>
          
// // // // // //           <Form>
            

// // // // // //             {/* Title + Type */}
// // // // // //             <Row>
// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Title</Form.Label>
// // // // // //                   <Form.Control name="title" value={form.title} onChange={handleChange} />
// // // // // //                 </Form.Group>
// // // // // //               </Col>

// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Type</Form.Label>
// // // // // //                   <Form.Select name="type" value={form.type} onChange={handleChange}>
// // // // // //                     <option value="video">Video</option>
// // // // // //                     <option value="graphics">Graphics</option>
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group>
// // // // // //               </Col>
// // // // // //             </Row>

// // // // // //             {/* Parent Selection */}
// // // // // //             <Row className="mt-3">
// // // // // //               <Col md={6}>
// // // // // //                 {/* <Form.Group>
// // // // // //                   <Form.Label>Parent Type</Form.Label>
// // // // // //                   <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
// // // // // //                     <option value="Category">Category</option>
// // // // // //                     <option value="Politician">Politician</option>
// // // // // //                     <option value="Religious">Religious</option>
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group> */}

// // // // // //                 <Form.Select name="parentType" value={form.parentType} onChange={handleChange}>
// // // // // //   <option value="Category">Category</option>
// // // // // //   <option value="Politician">Politician</option>
// // // // // //   <option value="Religious">Religious</option>
// // // // // //   <option value="Birthday">Birthday</option>
// // // // // //   <option value="Anniversary">Anniversary</option>
// // // // // //   <option value="Festival">Festival</option>
// // // // // // </Form.Select>

// // // // // //               </Col>

// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Select Parent</Form.Label>
// // // // // //                   <Form.Select name="parentId" value={form.parentId} onChange={handleChange}>
// // // // // //                     <option value="">Choose...</option>
// // // // // //                     {parentOptions.map((p) => (
// // // // // //                       <option key={p._id} value={p._id}>{p.title || p.name}</option>
// // // // // //                     ))}
// // // // // //                   </Form.Select>
// // // // // //                 </Form.Group>
// // // // // //               </Col>
// // // // // //             </Row>

// // // // // //             {/* File Upload */}
// // // // // //             <Row className="mt-3">
// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Thumbnail</Form.Label>
// // // // // //                   <Form.Control type="file" name="file" accept="image/*,video/*" onChange={handleChange} />
// // // // // //                   {filePreview && <img src={filePreview} width="150" className="mt-2" />}
// // // // // //                 </Form.Group>
// // // // // //               </Col>

// // // // // //               <Col md={6}>
// // // // // //                 <Form.Group>
// // // // // //                   <Form.Label>Frame</Form.Label>
// // // // // //                   <Form.Control type="file" name="frameFile" accept="image/*" onChange={handleChange} />
// // // // // //                   {framePreview && <img src={framePreview} width="150" className="mt-2" />}
// // // // // //                 </Form.Group>
// // // // // //               </Col>
// // // // // //             </Row>

// // // // // //             {/* LIVE PREVIEW BOX */}
// // // // // //             <div
// // // // // //               style={{
// // // // // //                 width: 350,
// // // // // //                 height: 350,
// // // // // //                 margin: "20px auto",
// // // // // //                 border: "2px dashed #999",
// // // // // //                 borderRadius: 12,
// // // // // //                 position: "relative",
// // // // // //                 overflow: "hidden",
// // // // // //                 background: "#eee"
// // // // // //               }}
// // // // // //             >

// // // // // //               {/* Thumbnail */}
// // // // // //               {filePreview && (
// // // // // //                 <img
// // // // // //                   src={filePreview}
// // // // // //                   style={{
// // // // // //                     width: "100%",
// // // // // //                     height: "100%",
// // // // // //                     objectFit: "cover",
// // // // // //                     transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// // // // // //                     position: "absolute",
// // // // // //                     top: 0,
// // // // // //                     left: 0,
// // // // // //                      zIndex: 2
// // // // // //                   }}
// // // // // //                 />
// // // // // //               )}

// // // // // //               {/* Frame Overlay */}
// // // // // //               {framePreview && (
// // // // // //                 <img
// // // // // //                   src={framePreview}
// // // // // //                   style={{
// // // // // //                     width: "100%",
// // // // // //                     height: "100%",
// // // // // //                     objectFit: "contain",
// // // // // //                     transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
// // // // // //                     position: "absolute",
// // // // // //                     top: 0,
// // // // // //                     left: 0,
// // // // // //                     pointerEvents: "none",
// // // // // //                     zIndex: 1
                
// // // // // //                   }}
// // // // // //                 />
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* Controls */}
// // // // // //             <hr />
// // // // // //             <h5>Thumbnail Controls</h5>

// // // // // //             <Form.Label>Zoom: {form.fileZoom}</Form.Label>
// // // // // //             <Form.Range name="fileZoom" min="0.5" max="3" step="0.1" value={form.fileZoom} onChange={handleChange} />

// // // // // //             <Form.Label>Move X: {form.fileX}px</Form.Label>
// // // // // //             <Form.Range name="fileX" min="-200" max="200" value={form.fileX} onChange={handleChange} />

// // // // // //             <Form.Label>Move Y: {form.fileY}px</Form.Label>
// // // // // //             <Form.Range name="fileY" min="-200" max="200" value={form.fileY} onChange={handleChange} />

// // // // // //             <hr />
// // // // // //             <h5>Frame Controls</h5>

// // // // // //             <Form.Label>Zoom: {form.frameZoom}</Form.Label>
// // // // // //             <Form.Range name="frameZoom" min="0.5" max="3" step="0.1" value={form.frameZoom} onChange={handleChange} />

// // // // // //             <Form.Label>Move X: {form.frameX}px</Form.Label>
// // // // // //             <Form.Range name="frameX" min="-200" max="200" value={form.frameX} onChange={handleChange} />

// // // // // //             <Form.Label>Move Y: {form.frameY}px</Form.Label>
// // // // // //             <Form.Range name="frameY" min="-200" max="200" value={form.frameY} onChange={handleChange} />

// // // // // //           </Form>
// // // // // //         </Modal.Body>

// // // // // //         <Modal.Footer>
// // // // // //           <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
// // // // // //           <Button variant="primary" onClick={handleSubmit} disabled={loading}>
// // // // // //             {loading ? "Saving..." : "Save"}
// // // // // //           </Button>
// // // // // //         </Modal.Footer>
// // // // // //       </Modal>
// // // // // //       {/* ================== CSV IMPORT MODAL ================== */}
// // // // // // <Modal show={showCsvModal} onHide={() => setShowCsvModal(false)} centered>
// // // // // //   <Modal.Header closeButton>
// // // // // //     <Modal.Title>Import Templates CSV</Modal.Title>
// // // // // //   </Modal.Header>

// // // // // //   <Modal.Body>
// // // // // //     <Form.Group>
// // // // // //       <Form.Label>Select CSV File</Form.Label>
// // // // // //       <Form.Control
// // // // // //         type="file"
// // // // // //         accept=".csv"
// // // // // //         onChange={(e) => setCsvFile(e.target.files[0])}
// // // // // //       />
// // // // // //     </Form.Group>
// // // // // //   </Modal.Body>

// // // // // //   <Modal.Footer>
// // // // // //     <Button variant="secondary" onClick={() => setShowCsvModal(false)}>
// // // // // //       Close
// // // // // //     </Button>

// // // // // //     <Button
// // // // // //       variant="success"
// // // // // //       disabled={csvUploading}
// // // // // //       onClick={handleImportCSV}
// // // // // //     >
// // // // // //       {csvUploading ? "Importing..." : "Import CSV"}
// // // // // //     </Button>
// // // // // //   </Modal.Footer>
// // // // // // </Modal>


// // // // // //     </Container>
// // // // // //   );
// // // // // // };

// // // // // // export default Templates;

// // // // // import React, { useEffect, useState } from "react";
// // // // // import {
// // // // //   Container, Card, Button, Table, Badge, Modal,
// // // // //   Form, InputGroup, Row, Col
// // // // // } from "react-bootstrap";
// // // // // import {
// // // // //   FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
// // // // // } from "react-icons/fa";
// // // // // import axios from "axios";

// // // // // const Templates = () => {

// // // // //   const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";

// // // // //   // CSV Modal States
// // // // //   const [showCsvModal, setShowCsvModal] = useState(false);
// // // // //   const [csvFile, setCsvFile] = useState(null);
// // // // //   const [csvUploading, setCsvUploading] = useState(false);

// // // // //   // Data States
// // // // //   const [templates, setTemplates] = useState([]);
// // // // //   const [categories, setCategories] = useState([]);
// // // // //   const [politicians, setPoliticians] = useState([]);
// // // // //   const [religiousList, setReligiousList] = useState([]);
// // // // //   const [birthdayList, setBirthdayList] = useState([]);
// // // // //   const [anniversaryList, setAnniversaryList] = useState([]);
// // // // //   const [festivalList, setFestivalList] = useState([]);

// // // // //   const [show, setShow] = useState(false);
// // // // //   const [editId, setEditId] = useState(null);

// // // // //   const [search, setSearch] = useState("");
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const [filePreview, setFilePreview] = useState(null);
// // // // //   const [framePreview, setFramePreview] = useState(null);

// // // // //   // Pagination
// // // // //   const [page, setPage] = useState(1);
// // // // //   const limit = 6;
// // // // //   const [totalPages, setTotalPages] = useState(1);

// // // // //   // Control Defaults
// // // // //   const defaultControls = {
// // // // //     fileZoom: 1,
// // // // //     fileX: 0,
// // // // //     fileY: 0,
// // // // //     frameZoom: 1,
// // // // //     frameX: 0,
// // // // //     frameY: 0
// // // // //   };

// // // // //   // Main Form State
// // // // //   const [form, setForm] = useState({
// // // // //     title: "",
// // // // //       contentOwnerName: "",
// // // // //     type: "video",
// // // // //     status: "active",
// // // // //     parentType: "Category",
// // // // //     parentId: "",
// // // // //     file: null,
// // // // //     frameFile: null,
// // // // //     transitionPlacement: "below",
// // // // //     profilePosition: "center",
// // // // //     transitionType: "fade",
// // // // //     orientation: "landscape",
// // // // //     profileSize: "",
// // // // //     profileShape: "circle",
// // // // //     ...defaultControls
// // // // //   });

// // // // //   // =================== FETCH DATA ===================
// // // // //   const fetchData = async () => {
// // // // //     const tplRes = await axios.get(`${BASE_URL}/templates`, {
// // // // //       params: { page, limit, search }
// // // // //     });

// // // // //     const [
// // // // //       catRes, polRes, relRes, birthRes, anniRes, festRes
// // // // //     ] = await Promise.all([
// // // // //       axios.get(`${BASE_URL}/categories`),
// // // // //       axios.get(`${BASE_URL}/politicians`),
// // // // //       axios.get(`${BASE_URL}/religious`),
// // // // //       axios.get(`${BASE_URL}/birthdays`),
// // // // //       axios.get(`${BASE_URL}/anniversaries`),
// // // // //       axios.get(`${BASE_URL}/festivals`)
// // // // //     ]);

// // // // //     setTemplates(tplRes.data.templates || []);
// // // // //     setTotalPages(tplRes.data.pages || 1);

// // // // //     // setCategories(catRes.data.categories || []);
// // // // //     // setCategories(Array.isArray(catRes.data) ? catRes.data : []);
// // // // //     setCategories(
// // // // //   Array.isArray(catRes.data)
// // // // //     ? catRes.data
// // // // //     : catRes.data.categories || catRes.data.data || []
// // // // // );


// // // // //     setPoliticians(polRes.data.politicians || []);
// // // // //     setReligiousList(relRes.data.religious || []);
// // // // //     setBirthdayList(birthRes.data.birthdays || []);
// // // // //     setAnniversaryList(anniRes.data.anniversaries || []);
// // // // //     setFestivalList(festRes.data.festivals || []);
// // // // //   };

// // // // //   useEffect(() => { fetchData(); }, [page, search]);


// // // // //   // =================== SHOW MODAL ===================
// // // // //   const handleShow = (tpl = null) => {
// // // // //     if (tpl) {
// // // // //       setEditId(tpl._id);

// // // // //       setForm({
// // // // //         title: tpl.title,
// // // // //         contentOwnerName: tpl.contentOwnerName || "",
// // // // //         type: tpl.type,
// // // // //         status: tpl.status,
// // // // //         parentType:
// // // // //           tpl.category ? "Category" :
// // // // //             tpl.politician ? "Politician" :
// // // // //               tpl.religious ? "Religious" :
// // // // //                 tpl.birthday ? "Birthday" :
// // // // //                   tpl.anniversary ? "Anniversary" :
// // // // //                     tpl.festival ? "Festival" : "",
// // // // //         parentId:
// // // // //           tpl.category?._id ||
// // // // //           tpl.politician?._id ||
// // // // //           tpl.religious?._id ||
// // // // //           tpl.birthday?._id ||
// // // // //           tpl.anniversary?._id ||
// // // // //           tpl.festival?._id || "",

// // // // //         file: null,
// // // // //         frameFile: null,

// // // // //         transitionPlacement: tpl.transitionPlacement,
// // // // //         profilePosition: tpl.profilePosition,
// // // // //         transitionType: tpl.transitionType,
// // // // //         orientation: tpl.orientation,
// // // // //         profileSize: tpl.profileSize,
// // // // //         profileShape: tpl.profileShape,

// // // // //         fileZoom: tpl.fileZoom || 1,
// // // // //         fileX: tpl.fileX || 0,
// // // // //         fileY: tpl.fileY || 0,
// // // // //         frameZoom: tpl.frameZoom || 1,
// // // // //         frameX: tpl.frameX || 0,
// // // // //         frameY: tpl.frameY || 0
// // // // //       });

// // // // //       setFilePreview(tpl.file);
// // // // //       setFramePreview(tpl.frameFile);

// // // // //     } else {
// // // // //       setEditId(null);
// // // // //       setForm({
// // // // //         title: "",
// // // // //           contentOwnerName: "", 
// // // // //         type: "video",
// // // // //         status: "active",
// // // // //         parentType: "Category",
// // // // //         parentId: "",
// // // // //         file: null,
// // // // //         frameFile: null,
// // // // //         ...defaultControls
// // // // //       });

// // // // //       setFilePreview(null);
// // // // //       setFramePreview(null);
// // // // //     }

// // // // //     setShow(true);
// // // // //   };


// // // // //   // =================== INPUT HANDLER ===================
// // // // //   // const handleChange = (e) => {
// // // // //   //   const { name, value, files } = e.target;

// // // // //   //   if (files) {
// // // // //   //     const file = files[0];

// // // // //   //     setForm(prev => ({ ...prev, [name]: file }));

// // // // //   //     if (name === "file") setFilePreview(URL.createObjectURL(file));
// // // // //   //     if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

// // // // //   //   } else {
// // // // //   //     // setForm(prev => ({ ...prev, [name]: value }));
      
// // // // //   //   }
// // // // //   // };
// // // // //   const handleChange = (e) => {
// // // // //   const { name, value, files } = e.target;

// // // // //   if (files) {
// // // // //     const file = files[0];

// // // // //     setForm(prev => ({ ...prev, [name]: file }));

// // // // //     if (name === "file") setFilePreview(URL.createObjectURL(file));
// // // // //     if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

// // // // //   } else {
// // // // //     // 🔥 parentType change → parentId reset
// // // // //     if (name === "parentType") {
// // // // //       setForm(prev => ({
// // // // //         ...prev,
// // // // //         parentType: value,
// // // // //         parentId: ""
// // // // //       }));
// // // // //     } else {
// // // // //       setForm(prev => ({ ...prev, [name]: value }));
// // // // //     }
// // // // //   }
// // // // // };


// // // // //   // =================== SUBMIT FORM ===================
// // // // // //   const handleSubmit = async () => {
// // // // // //     // if (!form.title || !form.parentId) return alert("Fill required fields");
// // // // // //     if (!form.title || !form.parentId || !form.contentOwnerName.trim()) {
// // // // // //   return alert("Title, Parent & Content Owner Name required");
// // // // // // }


// // // // // //     setLoading(true);

// // // // // //     const fd = new FormData();

// // // // // //     Object.entries(form).forEach(([key, value]) => {
// // // // // //       if (value !== null) fd.append(key, value);
// // // // // //     });

// // // // // //     fd.append("parentType", form.parentType);
// // // // // //     fd.append("parentId", form.parentId);

// // // // // //     if (editId)
// // // // // //       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// // // // // //     else
// // // // // //       await axios.post(`${BASE_URL}/templates`, fd);

// // // // // //     setShow(false);
// // // // // //     fetchData();
// // // // // //     setLoading(false);
// // // // // //   };


// // // // // const handleSubmit = async () => {
// // // // //   if (!form.title || !form.parentId || !form.contentOwnerName.trim()) {
// // // // //     return alert("Title, Parent & Content Owner Name required");
// // // // //   }

// // // // //   setLoading(true);

// // // // //   const fd = new FormData();

// // // // //   // TEXT FIELDS
// // // // //   fd.append("title", form.title);
// // // // //   fd.append("contentOwnerName", form.contentOwnerName);
// // // // //   fd.append("type", form.type);
// // // // //   fd.append("status", form.status);
// // // // //   fd.append("parentType", form.parentType);
// // // // //   fd.append("parentId", form.parentId);
// // // // //   fd.append("transitionPlacement", form.transitionPlacement);
// // // // //   fd.append("profilePosition", form.profilePosition);
// // // // //   fd.append("transitionType", form.transitionType);
// // // // //   fd.append("orientation", form.orientation);
// // // // //   fd.append("profileSize", form.profileSize);
// // // // //   fd.append("profileShape", form.profileShape);

// // // // //   // FILES
// // // // //   if (form.file) fd.append("file", form.file);
// // // // //   if (form.frameFile) fd.append("frameFile", form.frameFile);

// // // // //   if (editId)
// // // // //     await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// // // // //   else
// // // // //     await axios.post(`${BASE_URL}/templates`, fd);

// // // // //   setShow(false);
// // // // //   fetchData();
// // // // //   setLoading(false);
// // // // // };

// // // // //   // =================== DELETE ===================
// // // // //   const handleDelete = async (id) => {
// // // // //     if (!window.confirm("Delete Template?")) return;
// // // // //     await axios.delete(`${BASE_URL}/templates/${id}`);
// // // // //     fetchData();
// // // // //   };

// // // // //   // =================== STATUS TOGGLE ===================
// // // // //   const handleToggleStatus = async (tpl) => {
// // // // //     try {
// // // // //       await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
// // // // //       fetchData();
// // // // //     } catch (e) {
// // // // //       alert("Toggle failed — backend route error");
// // // // //     }
// // // // //   };

// // // // //   // =================== CSV EXPORT ===================
// // // // //   const handleExportCSV = () => {
// // // // //     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// // // // //   };

// // // // //   // =================== CSV IMPORT ===================
// // // // //   const handleImportCSV = async () => {
// // // // //     if (!csvFile) return alert("Select a CSV file first!");

// // // // //     setCsvUploading(true);

// // // // //     const fd = new FormData();
// // // // //     fd.append("csv", csvFile);

// // // // //     try {
// // // // //       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
// // // // //       alert("CSV Imported Successfully!");
// // // // //       setShowCsvModal(false);
// // // // //       fetchData();
// // // // //     } catch {
// // // // //       alert("CSV Import Failed");
// // // // //     } finally {
// // // // //       setCsvUploading(false);
// // // // //     }
// // // // //   };

// // // // //   // =================== PARENT DROPDOWN LOGIC ===================
// // // // //   let parentOptions = [];

// // // // //   if (form.parentType === "Category") parentOptions = categories;
// // // // //   if (form.parentType === "Politician") parentOptions = politicians;
// // // // //   if (form.parentType === "Religious") parentOptions = religiousList;
// // // // //   if (form.parentType === "Birthday") parentOptions = birthdayList;
// // // // //   if (form.parentType === "Anniversary") parentOptions = anniversaryList;
// // // // //   if (form.parentType === "Festival") parentOptions = festivalList;


// // // // //   // =================== RENDER ===================
// // // // //   return (
// // // // //     <Container fluid className="py-3">

// // // // //       {/* HEADER */}
// // // // //       <Row className="align-items-center mb-3 g-2">
// // // // //         <Col xs={12} md={4}>
// // // // //           <h3 className="text-center text-md-start">Templates</h3>
// // // // //         </Col>

// // // // //         <Col xs={12} md={4}>
// // // // //           <InputGroup className="mt-2 mt-md-0">
// // // // //             <Form.Control
// // // // //               placeholder="Search by title..."
// // // // //               value={search}
// // // // //               onChange={e => { setSearch(e.target.value); setPage(1); }}
// // // // //             />
// // // // //             <Button><FaSearch /></Button>
// // // // //           </InputGroup>
// // // // //         </Col>

// // // // //         <Col xs={12} md={4} className="text-md-end text-center mt-2 mt-md-0">

// // // // //           <Button className="me-2 mb-2" size="sm"
// // // // //             variant="success" onClick={() => setShowCsvModal(true)}>
// // // // //             <FaUpload /> Import
// // // // //           </Button>

// // // // //           <Button className="me-2 mb-2" size="sm"
// // // // //             variant="warning" onClick={handleExportCSV}>
// // // // //             <FaDownload /> Export
// // // // //           </Button>

// // // // //           <Button size="sm" onClick={() => handleShow()}>
// // // // //             <FaPlus /> Add
// // // // //           </Button>

// // // // //         </Col>
// // // // //       </Row>

// // // // //       {/* TABLE */}
// // // // //       <Card>
// // // // //         <Card.Body>

// // // // //           <div className="table-responsive">
// // // // //             <Table bordered hover className="align-middle text-center">
// // // // //               <thead>
// // // // //                 <tr>
// // // // //                   <th>Thumbnail</th>
// // // // //                   <th>Frame</th>
// // // // //                   <th>Title</th>
// // // // //                   <th>Owner</th>
// // // // //                   <th>Type</th>
// // // // //                   <th>Status</th>
// // // // //                   <th>Actions</th>
// // // // //                 </tr>
// // // // //               </thead>

// // // // //               <tbody>
// // // // //                 {templates.map((tpl) => (
// // // // //                   <tr key={tpl._id}>
// // // // //                     {/* <td>
// // // // //                       <img
// // // // //                         src={tpl.file}
// // // // //                         width="90"
// // // // //                         height="60"
// // // // //                         style={{ objectFit: "cover", borderRadius: 6 }}
// // // // //                       />
// // // // //                     </td> */}
// // // // //                     <td>
// // // // //   {tpl.type === "video" ? (
// // // // //     <video
// // // // //       src={tpl.file}
// // // // //       width="90"
// // // // //       height="60"
// // // // //       controls
// // // // //       muted
// // // // //       style={{ borderRadius: 6, objectFit: "cover" }}
// // // // //     />
// // // // //   ) : (
// // // // //     <img
// // // // //       src={tpl.file}
// // // // //       width="90"
// // // // //       height="60"
// // // // //       style={{ objectFit: "cover", borderRadius: 6 }}
// // // // //     />
// // // // //   )}
// // // // // </td>


// // // // //                     <td>
// // // // //                       {tpl.frameFile ? (
// // // // //                         <img src={tpl.frameFile} width="90" height="60"
// // // // //                           style={{ borderRadius: 6 }} />
// // // // //                       ) : "—"}
// // // // //                     </td>

// // // // //                     <td>{tpl.title}</td>
// // // // //                     <td>{tpl.contentOwnerName || "—"}</td>


// // // // //                     <td>
// // // // //                       <Badge bg={tpl.type === "video" ? "primary" : "info"}>
// // // // //                         {tpl.type}
// // // // //                       </Badge>
// // // // //                     </td>

// // // // //                     <td>
// // // // //                       <Form.Check
// // // // //                         type="switch"
// // // // //                         checked={tpl.status === "active"}
// // // // //                         onChange={() => handleToggleStatus(tpl)}
// // // // //                         label={tpl.status === "active" ? "Active" : "Inactive"}
// // // // //                       />
// // // // //                     </td>

// // // // //                     <td>
// // // // //                       <Button size="sm" className="me-1"
// // // // //                         onClick={() => handleShow(tpl)}>
// // // // //                         <FaEdit />
// // // // //                       </Button>

// // // // //                       <Button size="sm" variant="danger"
// // // // //                         onClick={() => handleDelete(tpl._id)}>
// // // // //                         <FaTrash />
// // // // //                       </Button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>

// // // // //             </Table>
// // // // //           </div>

// // // // //           {/* Pagination */}
// // // // //           <div className="d-flex justify-content-center mt-3">
// // // // //             <Button size="sm"
// // // // //               disabled={page === 1}
// // // // //               onClick={() => setPage(page - 1)}>Prev</Button>

// // // // //             <span className="px-3 py-1 mx-2 border rounded">
// // // // //               Page {page} / {totalPages}
// // // // //             </span>

// // // // //             <Button size="sm"
// // // // //               disabled={page === totalPages}
// // // // //               onClick={() => setPage(page + 1)}>Next</Button>
// // // // //           </div>

// // // // //         </Card.Body>
// // // // //       </Card>


// // // // //       {/* ================= ADD / EDIT MODAL ================= */}
// // // // //       <Modal show={show} onHide={() => setShow(false)}
// // // // //         centered size="lg">
// // // // //         <Modal.Header closeButton>
// // // // //           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
// // // // //         </Modal.Header>

// // // // //         <Modal.Body>
// // // // //           <Form>

// // // // //             {/* Title & Type */}
// // // // //             <Row className="g-3">
// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Title</Form.Label>
// // // // //                 <Form.Control
// // // // //                   name="title"
// // // // //                   value={form.title}
// // // // //                   onChange={handleChange}
// // // // //                 />
// // // // //               </Col>
// // // // //               <Col md={6}>
// // // // //   <Form.Label>Content Owner Name</Form.Label>
// // // // //   <Form.Control
// // // // //     name="contentOwnerName"
// // // // //     value={form.contentOwnerName}
// // // // //     onChange={handleChange}
// // // // //     placeholder="e.g. Rinku Sheoran"
// // // // //   />
// // // // // </Col>


// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Type</Form.Label>
// // // // //                 <Form.Select
// // // // //                   name="type"
// // // // //                   value={form.type}
// // // // //                   onChange={handleChange}
// // // // //                 >
// // // // //                   <option value="video">Video</option>
// // // // //                   <option value="graphics">Graphics</option>
// // // // //                 </Form.Select>
// // // // //               </Col>
// // // // //             </Row>

// // // // //             {/* Parent */}
// // // // //             <Row className="g-3 mt-1">
// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Parent Type</Form.Label>
// // // // //                 <Form.Select name="parentType"
// // // // //                   value={form.parentType}
// // // // //                   onChange={handleChange}
// // // // //                 >
// // // // //                   <option value="Category">Category</option>
// // // // //                   <option value="Politician">Politician</option>
// // // // //                   <option value="Religious">Religious</option>
// // // // //                   <option value="Birthday">Birthday</option>
// // // // //                   <option value="Anniversary">Anniversary</option>
// // // // //                   <option value="Festival">Festival</option>
// // // // //                 </Form.Select>
// // // // //               </Col>

// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Select Parent</Form.Label>
// // // // //                 <Form.Select
// // // // //                   name="parentId"
// // // // //                   value={form.parentId}
// // // // //                   onChange={handleChange}
// // // // //                 >
// // // // //                   <option value="">Choose...</option>
// // // // //                   {parentOptions.map((p) => (
// // // // //                     <option key={p._id} value={p._id}>
// // // // //                       {p.title || p.name}
// // // // //                     </option>
// // // // //                   ))}
// // // // //                 </Form.Select>
// // // // //               </Col>
// // // // //             </Row>

// // // // //             {/* Files */}
// // // // //             <Row className="g-3 mt-1">
// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Thumbnail</Form.Label>
// // // // //                 <Form.Control type="file" name="file"
// // // // //                   onChange={handleChange}
// // // // //                   accept="image/*,video/*"
// // // // //                 />
// // // // //                 {/* {filePreview && (
// // // // //                   <img src={filePreview} width="140" className="mt-2"
// // // // //                     style={{ borderRadius: 8 }} />
// // // // //                 )} */}
// // // // //                 {filePreview && (
// // // // //   form.type === "video" ? (
// // // // //     <video
// // // // //       src={filePreview}
// // // // //       width="140"
// // // // //       controls
// // // // //       muted
// // // // //       className="mt-2"
// // // // //       style={{ borderRadius: 8 }}
// // // // //     />
// // // // //   ) : (
// // // // //     <img
// // // // //       src={filePreview}
// // // // //       width="140"
// // // // //       className="mt-2"
// // // // //       style={{ borderRadius: 8 }}
// // // // //     />
// // // // //   )
// // // // // )}

// // // // //               </Col>

// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Frame</Form.Label>
// // // // //                 <Form.Control type="file" name="frameFile"
// // // // //                   onChange={handleChange}
// // // // //                   accept="image/*"
// // // // //                 />
// // // // //                 {framePreview && (
// // // // //                   <img src={framePreview} width="140" className="mt-2"
// // // // //                     style={{ borderRadius: 8 }} />
// // // // //                 )}
// // // // //               </Col>
// // // // //             </Row>

// // // // //             {/* LIVE PREVIEW */}
// // // // //             <div
// // // // //               className="mt-3 mx-auto"
// // // // //               style={{
// // // // //                 width: "100%",
// // // // //                 maxWidth: 330,
// // // // //                 height: 330,
// // // // //                 border: "2px dashed #aaa",
// // // // //                 borderRadius: 12,
// // // // //                 position: "relative",
// // // // //                 overflow: "hidden",
// // // // //                 background: "#eee"
// // // // //               }}
// // // // //             >
// // // // //               {/* {filePreview && (
// // // // //                 <img
// // // // //                   src={filePreview}
// // // // //                   style={{
// // // // //                     width: "100%",
// // // // //                     height: "100%",
// // // // //                     objectFit: "cover",
// // // // //                     transform: `scale(${form.fileZoom})
// // // // //                                 translate(${form.fileX}px, ${form.fileY}px)`,
// // // // //                     position: "absolute",
// // // // //                     top: 0,
// // // // //                     left: 0,
// // // // //                     zIndex: 3
// // // // //                   }}
// // // // //                 />
// // // // //               )}

// // // // //               {framePreview && (
// // // // //                 <img
// // // // //                   src={framePreview}
// // // // //                   style={{
// // // // //                     width: "100%",
// // // // //                     height: "100%",
// // // // //                     objectFit: "contain",
// // // // //                     transform: `scale(${form.frameZoom})
// // // // //                                 translate(${form.frameX}px, ${form.frameY}px)`,
// // // // //                     position: "absolute",
// // // // //                     top: 0,
// // // // //                     left: 0,
// // // // //                     pointerEvents: "none",
// // // // //                     zIndex: 4
// // // // //                   }}
// // // // //                 />
// // // // //               )} */}
// // // // //               {filePreview && (
// // // // //   form.type === "video" ? (
// // // // //     <video
// // // // //       src={filePreview}
// // // // //       autoPlay
// // // // //       muted
// // // // //       loop
// // // // //       style={{
// // // // //         width: "100%",
// // // // //         height: "100%",
// // // // //         objectFit: "cover",
// // // // //         transform: `scale(${form.fileZoom})
// // // // //                     translate(${form.fileX}px, ${form.fileY}px)`,
// // // // //         position: "absolute",
// // // // //         top: 0,
// // // // //         left: 0,
// // // // //         zIndex: 3
// // // // //       }}
// // // // //     />
// // // // //   ) : (
// // // // //     <img
// // // // //       src={filePreview}
// // // // //       style={{
// // // // //         width: "100%",
// // // // //         height: "100%",
// // // // //         objectFit: "cover",
// // // // //         transform: `scale(${form.fileZoom})
// // // // //                     translate(${form.fileX}px, ${form.fileY}px)`,
// // // // //         position: "absolute",
// // // // //         top: 0,
// // // // //         left: 0,
// // // // //         zIndex: 3
// // // // //       }}
// // // // //     />
// // // // //   )
// // // // // )}

// // // // //             </div>

// // // // //             {/* CONTROLS */}
// // // // //             <hr />

// // // // //             <h6>Thumbnail Controls</h6>
// // // // //             <Form.Label>Zoom</Form.Label>
// // // // //             <Form.Range name="fileZoom" min="0.5" max="3"
// // // // //               step="0.1" value={form.fileZoom}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move X</Form.Label>
// // // // //             <Form.Range name="fileX" min="-200" max="200"
// // // // //               value={form.fileX}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move Y</Form.Label>
// // // // //             <Form.Range name="fileY" min="-200" max="200"
// // // // //               value={form.fileY}
// // // // //               onChange={handleChange} />

// // // // //             <hr />

// // // // //             <h6>Frame Controls</h6>
// // // // //             <Form.Label>Zoom</Form.Label>
// // // // //             <Form.Range name="frameZoom" min="0.5" max="3"
// // // // //               step="0.1" value={form.frameZoom}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move X</Form.Label>
// // // // //             <Form.Range name="frameX" min="-200" max="200"
// // // // //               value={form.frameX}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move Y</Form.Label>
// // // // //             <Form.Range name="frameY" min="-200" max="200"
// // // // //               value={form.frameY}
// // // // //               onChange={handleChange} />

// // // // //           </Form>
// // // // //         </Modal.Body>

// // // // //         <Modal.Footer>
// // // // //           <Button variant="secondary"
// // // // //             onClick={() => setShow(false)}>Close</Button>

// // // // //           <Button variant="primary" disabled={loading}
// // // // //             onClick={handleSubmit}>
// // // // //             {loading ? "Saving..." : "Save"}
// // // // //           </Button>
// // // // //         </Modal.Footer>
// // // // //       </Modal>

// // // // //       {/* ================= CSV IMPORT MODAL ================= */}
// // // // //       <Modal show={showCsvModal}
// // // // //         onHide={() => setShowCsvModal(false)}
// // // // //         centered>
// // // // //         <Modal.Header closeButton>
// // // // //           <Modal.Title>Import Templates CSV</Modal.Title>
// // // // //         </Modal.Header>

// // // // //         <Modal.Body>
// // // // //           <Form.Group>
// // // // //             <Form.Label>Select CSV File</Form.Label>
// // // // //             <Form.Control
// // // // //               type="file"
// // // // //               accept=".csv"
// // // // //               onChange={(e) => setCsvFile(e.target.files[0])}
// // // // //             />
// // // // //           </Form.Group>
// // // // //         </Modal.Body>

// // // // //         <Modal.Footer>
// // // // //           <Button variant="secondary"
// // // // //             onClick={() => setShowCsvModal(false)}>Close</Button>

// // // // //           <Button variant="success"
// // // // //             disabled={csvUploading}
// // // // //             onClick={handleImportCSV}>
// // // // //             {csvUploading ? "Importing..." : "Import CSV"}
// // // // //           </Button>
// // // // //         </Modal.Footer>
// // // // //       </Modal>

// // // // //     </Container>
// // // // //   );
// // // // // };

// // // // // export default Templates;


// // // // // import React, { useEffect, useState } from "react";
// // // // // import {
// // // // //   Container, Card, Button, Table, Badge, Modal,
// // // // //   Form, InputGroup, Row, Col
// // // // // } from "react-bootstrap";
// // // // // import {
// // // // //   FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
// // // // // } from "react-icons/fa";
// // // // // import axios from "axios";

// // // // // const Templates = () => {
// // // // //   // 🔥 PROFILE POSITION MAP (FOR LIVE PREVIEW)
// // // // // const positionMap = {
// // // // //   topLeft: { top: 10, left: 10 },
// // // // //   topCenter: { top: 10, left: "50%", transform: "translateX(-50%)" },
// // // // //   topRight: { top: 10, right: 10 },

// // // // //   centerLeft: { top: "50%", left: 10, transform: "translateY(-50%)" },
// // // // //   center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
// // // // //   centerRight: { top: "50%", right: 10, transform: "translateY(-50%)" },

// // // // //   bottomLeft: { bottom: 10, left: 10 },
// // // // //   bottomCenter: { bottom: 10, left: "50%", transform: "translateX(-50%)" },
// // // // //   bottomRight: { bottom: 10, right: 10 },
// // // // // };


// // // // //   const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";

// // // // //   // CSV Modal States
// // // // //   const [showCsvModal, setShowCsvModal] = useState(false);
// // // // //   const [csvFile, setCsvFile] = useState(null);
// // // // //   const [csvUploading, setCsvUploading] = useState(false);

// // // // //   // Data States
// // // // //   const [templates, setTemplates] = useState([]);
// // // // //   const [categories, setCategories] = useState([]);
// // // // //   const [politicians, setPoliticians] = useState([]);
// // // // //   const [religiousList, setReligiousList] = useState([]);
// // // // //   const [birthdayList, setBirthdayList] = useState([]);
// // // // //   const [anniversaryList, setAnniversaryList] = useState([]);
// // // // //   const [festivalList, setFestivalList] = useState([]);

// // // // //   const [show, setShow] = useState(false);
// // // // //   const [editId, setEditId] = useState(null);

// // // // //   const [search, setSearch] = useState("");
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const [filePreview, setFilePreview] = useState(null);
// // // // //   const [framePreview, setFramePreview] = useState(null);

// // // // //   // Pagination
// // // // //   const [page, setPage] = useState(1);
// // // // //   const limit = 6;
// // // // //   const [totalPages, setTotalPages] = useState(1);

// // // // //   // Control Defaults
// // // // //   const defaultControls = {
// // // // //     fileZoom: 1,
// // // // //     fileX: 0,
// // // // //     fileY: 0,
// // // // //     frameZoom: 1,
// // // // //     frameX: 0,
// // // // //     frameY: 0
// // // // //   };

// // // // //   // Main Form State
// // // // //   // const [form, setForm] = useState({
// // // // //   //   title: "",
// // // // //   //   type: "video",
// // // // //   //   status: "active",
// // // // //   //   parentType: "Category",
// // // // //   //   parentId: "",
// // // // //   //   file: null,
// // // // //   //   frameFile: null,
// // // // //   //   transitionPlacement: "below",
// // // // //   //   profilePosition: "center",
// // // // //   //   transitionType: "fade",
// // // // //   //   orientation: "landscape",
// // // // //   //   profileSize: "",
// // // // //   //   profileShape: "circle",
// // // // //   //   ...defaultControls
// // // // //   // });

// // // // //   const [form, setForm] = useState({
// // // // //   title: "",
// // // // //   type: "video",
// // // // //   status: "active",

// // // // //   parentType: "Category",
// // // // //   parentId: "",

// // // // //   file: null,
// // // // //   frameFile: null,

// // // // //   // ===== TRANSITION =====
// // // // //   transitionPlacement: "below",
// // // // //   transitionType: "fade",
// // // // //   transitionDuration: 0.8,

// // // // //   // ===== PROFILE ANIMATION =====
// // // // //   profileAnimation: "none",
// // // // //   profileDelay: 2,
// // // // //   profileDuration: 0.6,

// // // // //   // ===== TEXT ANIMATION =====
// // // // //   textAnimation: "none",
// // // // //   textDelay: 0,
// // // // //   textDuration: 0.5,

// // // // //   // ===== PROFILE =====
// // // // //   // profilePosition: "center",
// // // // //   // profileSize: "120px",
// // // // //   // profileShape: "circle",

// // // // //   profileX: 50,
// // // // // profileY: 50,
// // // // // profileSize: 120,
// // // // // profileRadius: 50,


// // // // //   ...defaultControls
// // // // // });


// // // // //   // =================== FETCH DATA ===================
// // // // //   const fetchData = async () => {
// // // // //     const tplRes = await axios.get(`${BASE_URL}/templates`, {
// // // // //       params: { page, limit, search }
// // // // //     });

// // // // //     const [
// // // // //       catRes, polRes, relRes, birthRes, anniRes, festRes
// // // // //     ] = await Promise.all([
// // // // //       axios.get(`${BASE_URL}/categories`),
// // // // //       axios.get(`${BASE_URL}/politicians`),
// // // // //       axios.get(`${BASE_URL}/religious`),
// // // // //       axios.get(`${BASE_URL}/birthdays`),
// // // // //       axios.get(`${BASE_URL}/anniversaries`),
// // // // //       axios.get(`${BASE_URL}/festivals`)
// // // // //     ]);

// // // // //     setTemplates(tplRes.data.templates || []);
// // // // //     setTotalPages(tplRes.data.pages || 1);

// // // // //     // setCategories(catRes.data.categories || []);
// // // // //     setCategories(Array.isArray(catRes.data) ? catRes.data : []);

// // // // //     setPoliticians(polRes.data.politicians || []);
// // // // //     setReligiousList(relRes.data.religious || []);
// // // // //     setBirthdayList(birthRes.data.birthdays || []);
// // // // //     setAnniversaryList(anniRes.data.anniversaries || []);
// // // // //     setFestivalList(festRes.data.festivals || []);
// // // // //   };

// // // // //   useEffect(() => { fetchData(); }, [page, search]);


// // // // //   // =================== SHOW MODAL ===================
// // // // //   const handleShow = (tpl = null) => {
// // // // //     if (tpl) {
// // // // //       setEditId(tpl._id);

// // // // //       setForm({
// // // // //         title: tpl.title,
// // // // //         type: tpl.type,
// // // // //         status: tpl.status,
// // // // //         parentType:
// // // // //           tpl.category ? "Category" :
// // // // //             tpl.politician ? "Politician" :
// // // // //               tpl.religious ? "Religious" :
// // // // //                 tpl.birthday ? "Birthday" :
// // // // //                   tpl.anniversary ? "Anniversary" :
// // // // //                     tpl.festival ? "Festival" : "",
// // // // //         parentId:
// // // // //           tpl.category?._id ||
// // // // //           tpl.politician?._id ||
// // // // //           tpl.religious?._id ||
// // // // //           tpl.birthday?._id ||
// // // // //           tpl.anniversary?._id ||
// // // // //           tpl.festival?._id || "",

// // // // //         file: null,
// // // // //         frameFile: null,

// // // // //         // transitionPlacement: tpl.transitionPlacement,
// // // // //         // profilePosition: tpl.profilePosition,
// // // // //         // transitionType: tpl.transitionType,
// // // // //         // orientation: tpl.orientation,
// // // // //         // profileSize: tpl.profileSize,
// // // // //         // profileShape: tpl.profileShape,
// // // // //         transitionPlacement: tpl.transition?.placement || "below",
// // // // // transitionType: tpl.transition?.type || "fade",
// // // // // transitionDuration: tpl.transition?.duration || 0.8,

// // // // // profileAnimation: tpl.animation?.profile?.effect || "none",
// // // // // profileDelay: tpl.animation?.profile?.delay || 2,
// // // // // profileDuration: tpl.animation?.profile?.duration || 0.6,

// // // // // textAnimation: tpl.animation?.text?.effect || "none",
// // // // // textDelay: tpl.animation?.text?.delay || 0,
// // // // // textDuration: tpl.animation?.text?.duration || 0.5,

// // // // // profilePosition: tpl.profile?.position || "center",
// // // // // profileSize: tpl.profile?.size || "120px",
// // // // // profileShape: tpl.profile?.shape || "circle",


// // // // //         fileZoom: tpl.fileZoom || 1,
// // // // //         fileX: tpl.fileX || 0,
// // // // //         fileY: tpl.fileY || 0,
// // // // //         frameZoom: tpl.frameZoom || 1,
// // // // //         frameX: tpl.frameX || 0,
// // // // //         frameY: tpl.frameY || 0
// // // // //       });

// // // // //       setFilePreview(tpl.file);
// // // // //       setFramePreview(tpl.frameFile);

// // // // //     } else {
// // // // //       setEditId(null);
// // // // //       setForm({
// // // // //         title: "",
// // // // //         type: "video",
// // // // //         status: "active",
// // // // //         parentType: "Category",
// // // // //         parentId: "",
// // // // //         file: null,
// // // // //         frameFile: null,
// // // // //         ...defaultControls
// // // // //       });

// // // // //       setFilePreview(null);
// // // // //       setFramePreview(null);
// // // // //     }

// // // // //     setShow(true);
// // // // //   };


// // // // //   const handleChange = (e) => {
// // // // //   const { name, value, files } = e.target;

// // // // //   if (files) {
// // // // //     const file = files[0];

// // // // //     setForm(prev => ({ ...prev, [name]: file }));

// // // // //     if (name === "file") setFilePreview(URL.createObjectURL(file));
// // // // //     if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

// // // // //   } else {
// // // // //     // 🔥 parentType change → parentId reset
// // // // //     if (name === "parentType") {
// // // // //       setForm(prev => ({
// // // // //         ...prev,
// // // // //         parentType: value,
// // // // //         parentId: ""
// // // // //       }));
// // // // //     } else {
// // // // //       setForm(prev => ({ ...prev, [name]: value }));
// // // // //     }
// // // // //   }
// // // // // };


// // // // //   // =================== SUBMIT FORM ===================
// // // // //   const handleSubmit = async () => {
// // // // //     if (!form.title || !form.parentId) return alert("Fill required fields");

// // // // //     setLoading(true);

// // // // //     const fd = new FormData();

// // // // //     Object.entries(form).forEach(([key, value]) => {
// // // // //       if (value !== null) fd.append(key, value);
// // // // //     });

// // // // //     fd.append("parentType", form.parentType);
// // // // //     fd.append("parentId", form.parentId);

// // // // //     if (editId)
// // // // //       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// // // // //     else
// // // // //       await axios.post(`${BASE_URL}/templates`, fd);

// // // // //     setShow(false);
// // // // //     fetchData();
// // // // //     setLoading(false);
// // // // //   };

// // // // //   // =================== DELETE ===================
// // // // //   const handleDelete = async (id) => {
// // // // //     if (!window.confirm("Delete Template?")) return;
// // // // //     await axios.delete(`${BASE_URL}/templates/${id}`);
// // // // //     fetchData();
// // // // //   };

// // // // //   // =================== STATUS TOGGLE ===================
// // // // //   const handleToggleStatus = async (tpl) => {
// // // // //     try {
// // // // //       await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
// // // // //       fetchData();
// // // // //     } catch (e) {
// // // // //       alert("Toggle failed — backend route error");
// // // // //     }
// // // // //   };

// // // // //   // =================== CSV EXPORT ===================
// // // // //   const handleExportCSV = () => {
// // // // //     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// // // // //   };

// // // // //   // =================== CSV IMPORT ===================
// // // // //   const handleImportCSV = async () => {
// // // // //     if (!csvFile) return alert("Select a CSV file first!");

// // // // //     setCsvUploading(true);

// // // // //     const fd = new FormData();
// // // // //     fd.append("csv", csvFile);

// // // // //     try {
// // // // //       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
// // // // //       alert("CSV Imported Successfully!");
// // // // //       setShowCsvModal(false);
// // // // //       fetchData();
// // // // //     } catch {
// // // // //       alert("CSV Import Failed");
// // // // //     } finally {
// // // // //       setCsvUploading(false);
// // // // //     }
// // // // //   };

// // // // //   // =================== PARENT DROPDOWN LOGIC ===================
// // // // //   let parentOptions = [];

// // // // //   if (form.parentType === "Category") parentOptions = categories;
// // // // //   // if (form.parentType === "Politician") parentOptions = politicians;
// // // // //   // if (form.parentType === "Religious") parentOptions = religiousList;
// // // // //   if (form.parentType === "Birthday") parentOptions = birthdayList;
// // // // //   if (form.parentType === "Anniversary") parentOptions = anniversaryList;
// // // // //   if (form.parentType === "Festival") parentOptions = festivalList;


// // // // //   // =================== RENDER ===================
// // // // //   return (
// // // // //     <Container fluid className="py-3">

// // // // //       {/* HEADER */}
// // // // //       <Row className="align-items-center mb-3 g-2">
// // // // //         <Col xs={12} md={4}>
// // // // //           <h3 className="text-center text-md-start">Templates</h3>
// // // // //         </Col>

// // // // //         <Col xs={12} md={4}>
// // // // //           <InputGroup className="mt-2 mt-md-0">
// // // // //             <Form.Control
// // // // //               placeholder="Search by title..."
// // // // //               value={search}
// // // // //               onChange={e => { setSearch(e.target.value); setPage(1); }}
// // // // //             />
// // // // //             <Button><FaSearch /></Button>
// // // // //           </InputGroup>
// // // // //         </Col>

// // // // //         <Col xs={12} md={4} className="text-md-end text-center mt-2 mt-md-0">

// // // // //           <Button className="me-2 mb-2" size="sm"
// // // // //             variant="success" onClick={() => setShowCsvModal(true)}>
// // // // //             <FaUpload /> Import
// // // // //           </Button>

// // // // //           <Button className="me-2 mb-2" size="sm"
// // // // //             variant="warning" onClick={handleExportCSV}>
// // // // //             <FaDownload /> Export
// // // // //           </Button>

// // // // //           <Button size="sm" onClick={() => handleShow()}>
// // // // //             <FaPlus /> Add
// // // // //           </Button>

// // // // //         </Col>
// // // // //       </Row>

// // // // //       {/* TABLE */}
// // // // //       <Card>
// // // // //         <Card.Body>

// // // // //           <div className="table-responsive">
// // // // //             <Table bordered hover className="align-middle text-center">
// // // // //               <thead>
// // // // //                 <tr>
// // // // //                   <th>Thumbnail</th>
// // // // //                   <th>Frame</th>
// // // // //                   <th>Title</th>
// // // // //                   <th>Type</th>
// // // // //                   <th>Status</th>
// // // // //                   <th>Actions</th>
// // // // //                 </tr>
// // // // //               </thead>

// // // // //               <tbody>
// // // // //                 {templates.map((tpl) => (
// // // // //                   <tr key={tpl._id}>
// // // // //                     {/* <td>
// // // // //                       <img
// // // // //                         src={tpl.file}
// // // // //                         width="90"
// // // // //                         height="60"
// // // // //                         style={{ objectFit: "cover", borderRadius: 6 }}
// // // // //                       />
// // // // //                     </td> */}
// // // // //                     <td>
// // // // //   {tpl.type === "video" ? (
// // // // //     <video
// // // // //       src={tpl.file}
// // // // //       width="90"
// // // // //       height="60"
// // // // //       controls
// // // // //       muted
// // // // //       style={{ borderRadius: 6, objectFit: "cover" }}
// // // // //     />
// // // // //   ) : (
// // // // //     <img
// // // // //       src={tpl.file}
// // // // //       width="90"
// // // // //       height="60"
// // // // //       style={{ objectFit: "cover", borderRadius: 6 }}
// // // // //     />
// // // // //   )}
// // // // // </td>


// // // // //                     <td>
// // // // //                       {tpl.frameFile ? (
// // // // //                         <img src={tpl.frameFile} width="90" height="60"
// // // // //                           style={{ borderRadius: 6 }} />
// // // // //                       ) : "—"}
// // // // //                     </td>

// // // // //                     <td>{tpl.title}</td>

// // // // //                     <td>
// // // // //                       <Badge bg={tpl.type === "video" ? "primary" : "info"}>
// // // // //                         {tpl.type}
// // // // //                       </Badge>
// // // // //                     </td>

// // // // //                     <td>
// // // // //                       <Form.Check
// // // // //                         type="switch"
// // // // //                         checked={tpl.status === "active"}
// // // // //                         onChange={() => handleToggleStatus(tpl)}
// // // // //                         label={tpl.status === "active" ? "Active" : "Inactive"}
// // // // //                       />
// // // // //                     </td>

// // // // //                     <td>
// // // // //                       <Button size="sm" className="me-1"
// // // // //                         onClick={() => handleShow(tpl)}>
// // // // //                         <FaEdit />
// // // // //                       </Button>

// // // // //                       <Button size="sm" variant="danger"
// // // // //                         onClick={() => handleDelete(tpl._id)}>
// // // // //                         <FaTrash />
// // // // //                       </Button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>

// // // // //             </Table>
// // // // //           </div>

// // // // //           {/* Pagination */}
// // // // //           <div className="d-flex justify-content-center mt-3">
// // // // //             <Button size="sm"
// // // // //               disabled={page === 1}
// // // // //               onClick={() => setPage(page - 1)}>Prev</Button>

// // // // //             <span className="px-3 py-1 mx-2 border rounded">
// // // // //               Page {page} / {totalPages}
// // // // //             </span>

// // // // //             <Button size="sm"
// // // // //               disabled={page === totalPages}
// // // // //               onClick={() => setPage(page + 1)}>Next</Button>
// // // // //           </div>

// // // // //         </Card.Body>
// // // // //       </Card>


// // // // //       {/* ================= ADD / EDIT MODAL ================= */}
// // // // //       <Modal show={show} onHide={() => setShow(false)}
// // // // //         centered size="lg">
// // // // //         <Modal.Header closeButton>
// // // // //           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
// // // // //         </Modal.Header>

// // // // //         <Modal.Body>
// // // // //           <Form>

// // // // //             {/* Title & Type */}
// // // // //             <Row className="g-3">
// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Title</Form.Label>
// // // // //                 <Form.Control
// // // // //                   name="title"
// // // // //                   value={form.title}
// // // // //                   onChange={handleChange}
// // // // //                 />
// // // // //               </Col>

// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Type</Form.Label>
// // // // //                 <Form.Select
// // // // //                   name="type"
// // // // //                   value={form.type}
// // // // //                   onChange={handleChange}
// // // // //                 >
// // // // //                   <option value="video">Video</option>
// // // // //                   <option value="graphics">Graphics</option>
// // // // //                 </Form.Select>
// // // // //               </Col>
// // // // //             </Row>

// // // // //             {/* Parent */}
// // // // //             <Row className="g-3 mt-1">
// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Parent Type</Form.Label>
// // // // //                 <Form.Select name="parentType"
// // // // //                   value={form.parentType}
// // // // //                   onChange={handleChange}
// // // // //                 >
                
// // // // //                   <option value="Category">Category</option>
// // // // //                   {/* <option value="Politician">Politician</option>
// // // // //                   <option value="Religious">Religious</option> */}
// // // // //                   <option value="Birthday">Birthday</option>
// // // // //                   <option value="Anniversary">Anniversary</option>
// // // // //                   <option value="Festival">Festival</option>
// // // // //                 </Form.Select>
// // // // //               </Col>

// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Select Parent</Form.Label>
// // // // //                 <Form.Select
// // // // //                   name="parentId"
// // // // //                   value={form.parentId}
// // // // //                   onChange={handleChange}
// // // // //                 >
// // // // //                   <option value="">Choose...</option>
// // // // //                   {/* {parentOptions.map((p) => (
// // // // //                     <option key={p._id} value={p._id}>
// // // // //                       {p.title || p.name}
// // // // //                     </option>
// // // // //                   ))} */}
// // // // //                   {parentOptions.map((p) => (
// // // // //   <option key={p._id} value={p._id}>
// // // // //     {form.parentType === "Category" && p.categoryName}
// // // // //     {form.parentType === "Politician" && p.title}
// // // // //     {form.parentType === "Religious" && p.title}
// // // // //     {form.parentType === "Birthday" && p.name}
// // // // //     {form.parentType === "Anniversary" && p.name}
// // // // //     {form.parentType === "Festival" && p.title}
// // // // //   </option>
// // // // // ))}

// // // // //                 </Form.Select>
// // // // //               </Col>
// // // // //             </Row>

// // // // //             {/* Files */}
// // // // //             <Row className="g-3 mt-1">
// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Thumbnail</Form.Label>
// // // // //                 <Form.Control type="file" name="file"
// // // // //                   onChange={handleChange}
// // // // //                   accept="image/*,video/*"
// // // // //                 />
// // // // //                 {/* {filePreview && (
// // // // //                   <img src={filePreview} width="140" className="mt-2"
// // // // //                     style={{ borderRadius: 8 }} />
// // // // //                 )} */}
// // // // //                 {filePreview && (
// // // // //   form.type === "video" ? (
// // // // //     <video
// // // // //       src={filePreview}
// // // // //       width="140"
// // // // //       controls
// // // // //       muted
// // // // //       className="mt-2"
// // // // //       style={{ borderRadius: 8 }}
// // // // //     />
// // // // //   ) : (
// // // // //     <img
// // // // //       src={filePreview}
// // // // //       width="140"
// // // // //       className="mt-2"
// // // // //       style={{ borderRadius: 8 }}
// // // // //     />
// // // // //   )
// // // // // )}

// // // // //               </Col>

// // // // //               <Col md={6}>
// // // // //                 <Form.Label>Frame</Form.Label>
// // // // //                 <Form.Control type="file" name="frameFile"
// // // // //                   onChange={handleChange}
// // // // //                   accept="image/*"
// // // // //                 />
// // // // //                 {framePreview && (
// // // // //                   <img src={framePreview} width="140" className="mt-2"
// // // // //                     style={{ borderRadius: 8 }} />
// // // // //                 )}
// // // // //               </Col>
// // // // //             </Row>

// // // // //             {/* LIVE PREVIEW */}
// // // // //             {/* <div
// // // // //               className="mt-3 mx-auto"
// // // // //               style={{
// // // // //                 width: "100%",
// // // // //                 maxWidth: 330,
// // // // //                 height: 330,
// // // // //                 border: "2px dashed #aaa",
// // // // //                 borderRadius: 12,
// // // // //                 position: "relative",
// // // // //                 overflow: "hidden",
// // // // //                 background: "#eee"
// // // // //               }}
// // // // //             >
              
// // // // //               {filePreview && (
// // // // //   form.type === "video" ? (
// // // // //     <video
// // // // //       src={filePreview}
// // // // //       autoPlay
// // // // //       muted
// // // // //       loop
// // // // //       style={{
// // // // //         width: "100%",
// // // // //         height: "100%",
// // // // //         objectFit: "cover",
// // // // //         transform: `scale(${form.fileZoom})
// // // // //                     translate(${form.fileX}px, ${form.fileY}px)`,
// // // // //         position: "absolute",
// // // // //         top: 0,
// // // // //         left: 0,
// // // // //         zIndex: 3
// // // // //       }}
// // // // //     />
// // // // //   ) : (
// // // // //     <img
// // // // //       src={filePreview}
// // // // //       style={{
// // // // //         width: "100%",
// // // // //         height: "100%",
// // // // //         objectFit: "cover",
// // // // //         transform: `scale(${form.fileZoom})
// // // // //                     translate(${form.fileX}px, ${form.fileY}px)`,
// // // // //         position: "absolute",
// // // // //         top: 0,
// // // // //         left: 0,
// // // // //         zIndex: 3
// // // // //       }}
// // // // //     />
// // // // //   )
// // // // // )}

// // // // //             </div> */}

// // // // //             {/* ================= LIVE PREVIEW ================= */}
// // // // // <div
// // // // //   className="mt-3 mx-auto"
// // // // //   style={{
// // // // //     width: 330,
// // // // //     height: 330,
// // // // //     borderRadius: 16,
// // // // //     position: "relative",
// // // // //     overflow: "hidden",
// // // // //     background: "#111",
// // // // //     boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
// // // // //   }}
// // // // // >

// // // // //   {/* BACKGROUND */}
// // // // //   {filePreview && (
// // // // //     form.type === "video" ? (
// // // // //       <video
// // // // //         src={filePreview}
// // // // //         autoPlay
// // // // //         muted
// // // // //         loop
// // // // //         style={{
// // // // //           width: "100%",
// // // // //           height: "100%",
// // // // //           objectFit: "cover",
// // // // //           position: "absolute",
// // // // //           inset: 0,
// // // // //           transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// // // // //           zIndex: 1,
// // // // //         }}
// // // // //       />
// // // // //     ) : (
// // // // //       <img
// // // // //         src={filePreview}
// // // // //         alt=""
// // // // //         style={{
// // // // //           width: "100%",
// // // // //           height: "100%",
// // // // //           objectFit: "cover",
// // // // //           position: "absolute",
// // // // //           inset: 0,
// // // // //           transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// // // // //           zIndex: 1,
// // // // //         }}
// // // // //       />
// // // // //     )
// // // // //   )}

// // // // //   {/* PROFILE PREVIEW */}
// // // // //   <div
// // // // //     // style={{
// // // // //     //   ...positionMap[form.profilePosition],
// // // // //     //   width: form.profileSize,
// // // // //     //   height: form.profileSize,
// // // // //     //   background: "#fff",
// // // // //     //   color: "#000",
// // // // //     //   position: "absolute",
// // // // //     //   zIndex: 3,
// // // // //     //   borderRadius: form.profileShape === "circle" ? "50%" : "8px",
// // // // //     //   display: "flex",
// // // // //     //   alignItems: "center",
// // // // //     //   justifyContent: "center",
// // // // //     //   fontSize: 12,
// // // // //     //   fontWeight: 600,
// // // // //     // }}
// // // // //     style={{
// // // // //   position: "absolute",

// // // // //   top: `${form.profileY}%`,
// // // // //   left: `${form.profileX}%`,
// // // // //   transform: "translate(-50%, -50%)",

// // // // //   width: `${form.profileSize}px`,
// // // // //   height: `${form.profileSize}px`,

// // // // //   background: "#fff",
// // // // //   color: "#000",

// // // // //   zIndex: 3,

// // // // //   borderRadius: `${form.profileRadius}%`,

// // // // //   display: "flex",
// // // // //   alignItems: "center",
// // // // //   justifyContent: "center",

// // // // //   fontSize: 12,
// // // // //   fontWeight: 600,

// // // // //   boxShadow: "0 6px 18px rgba(0,0,0,0.25)",

// // // // //   transition: "all 0.25s ease"
// // // // // }}

// // // // //   >
// // // // //     Profile
// // // // //   </div>

// // // // //   {/* FRAME */}
// // // // //   {framePreview && (
// // // // //     <img
// // // // //       src={framePreview}
// // // // //       alt=""
// // // // //       style={{
// // // // //         width: "100%",
// // // // //         height: "100%",
// // // // //         objectFit: "contain",
// // // // //         position: "absolute",
// // // // //         inset: 0,
// // // // //         transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
// // // // //         zIndex: 4,
// // // // //         pointerEvents: "none",
// // // // //       }}
// // // // //     />
// // // // //   )}

// // // // // </div>


// // // // //             {/* CONTROLS */}
// // // // //             <hr />

// // // // //             <h6>Transition Settings</h6>

// // // // // <Form.Label>Transition Type</Form.Label>
// // // // // <Form.Select
// // // // //   name="transitionType"
// // // // //   value={form.transitionType}
// // // // //   onChange={handleChange}
// // // // // >
// // // // //   <option value="fade">Fade</option>
// // // // //   <option value="slideFromBottom">Slide Bottom</option>
// // // // //   <option value="slideFromTop">Slide Top</option>
// // // // //   <option value="slideFromLeft">Slide Left</option>
// // // // //   <option value="slideFromRight">Slide Right</option>
// // // // //   <option value="zoomIn">Zoom In</option>
// // // // //   <option value="rotate">Rotate</option>
// // // // // </Form.Select>

// // // // // <Form.Label className="mt-2">Transition Duration (sec)</Form.Label>
// // // // // <Form.Control
// // // // //   type="number"
// // // // //   step="0.1"
// // // // //   name="transitionDuration"
// // // // //   value={form.transitionDuration}
// // // // //   onChange={handleChange}
// // // // // />

// // // // // <hr />
// // // // // <h6>Profile Animation</h6>

// // // // // <Form.Label>Animation</Form.Label>
// // // // // <Form.Select
// // // // //   name="profileAnimation"
// // // // //   value={form.profileAnimation}
// // // // //   onChange={handleChange}
// // // // // >
// // // // //   <option value="none">None</option>
// // // // //   <option value="fadeIn">Fade In</option>
// // // // //   <option value="popIn">Pop In</option>
// // // // //   <option value="bounce">Bounce</option>
// // // // //   <option value="scaleUp">Scale Up</option>
// // // // //   <option value="rotateIn">Rotate</option>
// // // // // </Form.Select>

// // // // // <Form.Label className="mt-2">Delay (sec)</Form.Label>
// // // // // <Form.Control
// // // // //   type="number"
// // // // //   step="0.1"
// // // // //   name="profileDelay"
// // // // //   value={form.profileDelay}
// // // // //   onChange={handleChange}
// // // // // />

// // // // // <Form.Label className="mt-2">Duration (sec)</Form.Label>
// // // // // <Form.Control
// // // // //   type="number"
// // // // //   step="0.1"
// // // // //   name="profileDuration"
// // // // //   value={form.profileDuration}
// // // // //   onChange={handleChange}
// // // // // />

// // // // //             <h6>Thumbnail Controls</h6>
// // // // //             <Form.Label>Zoom</Form.Label>
// // // // //             <Form.Range name="fileZoom" min="0.5" max="3"
// // // // //               step="0.1" value={form.fileZoom}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move X</Form.Label>
// // // // //             <Form.Range name="fileX" min="-200" max="200"
// // // // //               value={form.fileX}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move Y</Form.Label>
// // // // //             <Form.Range name="fileY" min="-200" max="200"
// // // // //               value={form.fileY}
// // // // //               onChange={handleChange} />

// // // // //             <hr />
// // // // //             <h6>Profile Settings</h6>

// // // // //             <Form.Label className="mt-2">Profile Position</Form.Label>
// // // // // <Form.Select
// // // // //   name="profilePosition"
// // // // //   value={form.profilePosition}
// // // // //   onChange={handleChange}
// // // // // >
// // // // //   <option value="topLeft">Top Left</option>
// // // // //   <option value="topCenter">Top Center</option>
// // // // //   <option value="topRight">Top Right</option>

// // // // //   <option value="centerLeft">Center Left</option>
// // // // //   <option value="center">Center</option>
// // // // //   <option value="centerRight">Center Right</option>

// // // // //   <option value="bottomLeft">Bottom Left</option>
// // // // //   <option value="bottomCenter">Bottom Center</option>
// // // // //   <option value="bottomRight">Bottom Right</option>
// // // // // </Form.Select>


// // // // // <Form.Label>Profile Shape</Form.Label>
// // // // // <Form.Select
// // // // //   name="profileShape"
// // // // //   value={form.profileShape}
// // // // //   onChange={handleChange}
// // // // // >
// // // // //   <option value="circle">Circle</option>
// // // // //   <option value="square">Square</option>
// // // // //   <option value="rectangle">Rectangle</option>
// // // // // </Form.Select>

// // // // // <Form.Label className="mt-2">Profile Size</Form.Label>
// // // // // <Form.Control
// // // // //   type="text"
// // // // //   placeholder="e.g. 120px"
// // // // //   name="profileSize"
// // // // //   value={form.profileSize}
// // // // //   onChange={handleChange}
// // // // // />

// // // // //             <h6>Frame Controls</h6>
// // // // //             <Form.Label>Zoom</Form.Label>
// // // // //             <Form.Range name="frameZoom" min="0.5" max="3"
// // // // //               step="0.1" value={form.frameZoom}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move X</Form.Label>
// // // // //             <Form.Range name="frameX" min="-200" max="200"
// // // // //               value={form.frameX}
// // // // //               onChange={handleChange} />

// // // // //             <Form.Label>Move Y</Form.Label>
// // // // //             <Form.Range name="frameY" min="-200" max="200"
// // // // //               value={form.frameY}
// // // // //               onChange={handleChange} />

// // // // //           </Form>
// // // // //         </Modal.Body>

// // // // //         <Modal.Footer>
// // // // //           <Button variant="secondary"
// // // // //             onClick={() => setShow(false)}>Close</Button>

// // // // //           <Button variant="primary" disabled={loading}
// // // // //             onClick={handleSubmit}>
// // // // //             {loading ? "Saving..." : "Save"}
// // // // //           </Button>
// // // // //         </Modal.Footer>
// // // // //       </Modal>

// // // // //       {/* ================= CSV IMPORT MODAL ================= */}
// // // // //       <Modal show={showCsvModal}
// // // // //         onHide={() => setShowCsvModal(false)}
// // // // //         centered>
// // // // //         <Modal.Header closeButton>
// // // // //           <Modal.Title>Import Templates CSV</Modal.Title>
// // // // //         </Modal.Header>

// // // // //         <Modal.Body>
// // // // //           <Form.Group>
// // // // //             <Form.Label>Select CSV File</Form.Label>
// // // // //             <Form.Control
// // // // //               type="file"
// // // // //               accept=".csv"
// // // // //               onChange={(e) => setCsvFile(e.target.files[0])}
// // // // //             />
// // // // //           </Form.Group>
// // // // //         </Modal.Body>

// // // // //         <Modal.Footer>
// // // // //           <Button variant="secondary"
// // // // //             onClick={() => setShowCsvModal(false)}>Close</Button>

// // // // //           <Button variant="success"
// // // // //             disabled={csvUploading}
// // // // //             onClick={handleImportCSV}>
// // // // //             {csvUploading ? "Importing..." : "Import CSV"}
// // // // //           </Button>
// // // // //         </Modal.Footer>
// // // // //       </Modal>

// // // // //     </Container>
// // // // //   );
// // // // // };

// // // // // export default Templates;


// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import {
// // // //   Container, Card, Button, Table, Badge, Modal,
// // // //   Form, InputGroup, Row, Col
// // // // } from "react-bootstrap";
// // // // import {
// // // //   FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
// // // // } from "react-icons/fa";
// // // // import axios from "axios";

// // // // const Templates = () => {
// // // //   const BASE_URL = "https://crafto-backend-zqcn.onrender.com/api";

// // // //   // CSV Modal States
// // // //   const [showCsvModal, setShowCsvModal] = useState(false);
// // // //   const [csvFile, setCsvFile] = useState(null);
// // // //   const [csvUploading, setCsvUploading] = useState(false);

// // // //   // Data States
// // // //   const [templates, setTemplates] = useState([]);
// // // //   const [categories, setCategories] = useState([]);
// // // //   const [politicians, setPoliticians] = useState([]);
// // // //   const [religiousList, setReligiousList] = useState([]);
// // // //   const [birthdayList, setBirthdayList] = useState([]);
// // // //   const [anniversaryList, setAnniversaryList] = useState([]);
// // // //   const [festivalList, setFestivalList] = useState([]);

// // // //   const [show, setShow] = useState(false);
// // // //   const [editId, setEditId] = useState(null);

// // // //   const [search, setSearch] = useState("");
// // // //   const [loading, setLoading] = useState(false);

// // // //   const [filePreview, setFilePreview] = useState(null);
// // // //   const [framePreview, setFramePreview] = useState(null);

// // // //   // Profile positioning states
// // // //   const [isPositioning, setIsPositioning] = useState(false);
// // // //   const [isDragging, setIsDragging] = useState(false);
// // // //   const [isResizing, setIsResizing] = useState(false);
// // // //   const [resizeCorner, setResizeCorner] = useState(null);
  
// // // //   const previewRef = useRef(null);
// // // //   const profileRef = useRef(null);

// // // //   // Pagination
// // // //   const [page, setPage] = useState(1);
// // // //   const limit = 6;
// // // //   const [totalPages, setTotalPages] = useState(1);

// // // //   // Control Defaults
// // // //   const defaultControls = {
// // // //     fileZoom: 1,
// // // //     fileX: 0,
// // // //     fileY: 0,
// // // //     frameZoom: 1,
// // // //     frameX: 0,
// // // //     frameY: 0
// // // //   };

// // // //   // Main Form State
// // // //   const [form, setForm] = useState({
// // // //     title: "",
// // // //     type: "video",
// // // //     status: "active",

// // // //     parentType: "Category",
// // // //     parentId: "",

// // // //     file: null,
// // // //     frameFile: null,

// // // //     transitionPlacement: "below",
// // // //     transitionType: "fade",
// // // //     transitionDuration: 0.8,

// // // //     profileAnimation: "none",
// // // //     profileDelay: 2,
// // // //     profileDuration: 0.6,

// // // //     textAnimation: "none",
// // // //     textDelay: 0,
// // // //     textDuration: 0.5,

// // // //     profileX: 50,
// // // //     profileY: 50,
// // // //     profileSize: 120,
// // // //     profileRadius: 50,

// // // //     ...defaultControls
// // // //   });

// // // //   // =================== FETCH DATA ===================
// // // //   const fetchData = async () => {
// // // //     const tplRes = await axios.get(`${BASE_URL}/templates`, {
// // // //       params: { page, limit, search }
// // // //     });

// // // //     const [
// // // //       catRes, polRes, relRes, birthRes, anniRes, festRes
// // // //     ] = await Promise.all([
// // // //       axios.get(`${BASE_URL}/categories`),
// // // //       axios.get(`${BASE_URL}/politicians`),
// // // //       axios.get(`${BASE_URL}/religious`),
// // // //       axios.get(`${BASE_URL}/birthdays`),
// // // //       axios.get(`${BASE_URL}/anniversaries`),
// // // //       axios.get(`${BASE_URL}/festivals`)
// // // //     ]);

// // // //     setTemplates(tplRes.data.templates || []);
// // // //     setTotalPages(tplRes.data.pages || 1);

// // // //     setCategories(Array.isArray(catRes.data) ? catRes.data : []);

// // // //     setPoliticians(polRes.data.politicians || []);
// // // //     setReligiousList(relRes.data.religious || []);
// // // //     setBirthdayList(birthRes.data.birthdays || []);
// // // //     setAnniversaryList(anniRes.data.anniversaries || []);
// // // //     setFestivalList(festRes.data.festivals || []);
// // // //   };

// // // //   useEffect(() => { fetchData(); }, [page, search]);

// // // //   // =================== SHOW MODAL ===================
// // // //   const handleShow = (tpl = null) => {
// // // //     if (tpl) {
// // // //       setEditId(tpl._id);

// // // //       setForm({
// // // //         title: tpl.title,
// // // //         type: tpl.type,
// // // //         status: tpl.status,
// // // //         parentType:
// // // //           tpl.category ? "Category" :
// // // //             tpl.politician ? "Politician" :
// // // //               tpl.religious ? "Religious" :
// // // //                 tpl.birthday ? "Birthday" :
// // // //                   tpl.anniversary ? "Anniversary" :
// // // //                     tpl.festival ? "Festival" : "",
// // // //         parentId:
// // // //           tpl.category?._id ||
// // // //           tpl.politician?._id ||
// // // //           tpl.religious?._id ||
// // // //           tpl.birthday?._id ||
// // // //           tpl.anniversary?._id ||
// // // //           tpl.festival?._id || "",

// // // //         file: null,
// // // //         frameFile: null,

// // // //         transitionPlacement: tpl.transition?.placement || "below",
// // // //         transitionType: tpl.transition?.type || "fade",
// // // //         transitionDuration: tpl.transition?.duration || 0.8,

// // // //         profileAnimation: tpl.animation?.profile?.effect || "none",
// // // //         profileDelay: tpl.animation?.profile?.delay || 2,
// // // //         profileDuration: tpl.animation?.profile?.duration || 0.6,

// // // //         textAnimation: tpl.animation?.text?.effect || "none",
// // // //         textDelay: tpl.animation?.text?.delay || 0,
// // // //         textDuration: tpl.animation?.text?.duration || 0.5,

// // // //         profileX: tpl.profile?.x || 50,
// // // //         profileY: tpl.profile?.y || 50,
// // // //         profileSize: tpl.profile?.size || 120,
// // // //         profileRadius: tpl.profile?.radius || 50,

// // // //         fileZoom: tpl.fileZoom || 1,
// // // //         fileX: tpl.fileX || 0,
// // // //         fileY: tpl.fileY || 0,
// // // //         frameZoom: tpl.frameZoom || 1,
// // // //         frameX: tpl.frameX || 0,
// // // //         frameY: tpl.frameY || 0
// // // //       });

// // // //       setFilePreview(tpl.file);
// // // //       setFramePreview(tpl.frameFile);

// // // //     } else {
// // // //       setEditId(null);
// // // //       setForm({
// // // //         title: "",
// // // //         type: "video",
// // // //         status: "active",
// // // //         parentType: "Category",
// // // //         parentId: "",
// // // //         file: null,
// // // //         frameFile: null,
// // // //         transitionPlacement: "below",
// // // //         transitionType: "fade",
// // // //         transitionDuration: 0.8,
// // // //         profileAnimation: "none",
// // // //         profileDelay: 2,
// // // //         profileDuration: 0.6,
// // // //         textAnimation: "none",
// // // //         textDelay: 0,
// // // //         textDuration: 0.5,
// // // //         profileX: 50,
// // // //         profileY: 50,
// // // //         profileSize: 120,
// // // //         profileRadius: 50,
// // // //         ...defaultControls
// // // //       });

// // // //       setFilePreview(null);
// // // //       setFramePreview(null);
// // // //     }

// // // //     setShow(true);
// // // //     setIsPositioning(false);
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     const { name, value, files } = e.target;

// // // //     if (files) {
// // // //       const file = files[0];

// // // //       setForm(prev => ({ ...prev, [name]: file }));

// // // //       if (name === "file") setFilePreview(URL.createObjectURL(file));
// // // //       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

// // // //     } else {
// // // //       if (name === "parentType") {
// // // //         setForm(prev => ({
// // // //           ...prev,
// // // //           parentType: value,
// // // //           parentId: ""
// // // //         }));
// // // //       } else {
// // // //         setForm(prev => ({ ...prev, [name]: value }));
// // // //       }
// // // //     }
// // // //   };

// // // //   // =================== DRAG & RESIZE HANDLERS ===================
// // // //   const handleProfileMouseDown = (e) => {
// // // //     if (e.target.classList.contains('resize-handle')) return;
// // // //     e.preventDefault();
// // // //     e.stopPropagation();
// // // //     setIsDragging(true);
// // // //   };

// // // //   const handleResizeMouseDown = (e, corner) => {
// // // //     e.preventDefault();
// // // //     e.stopPropagation();
// // // //     setIsResizing(true);
// // // //     setResizeCorner(corner);
// // // //   };

// // // //   const handleMouseMove = (e) => {
// // // //     if (!previewRef.current) return;

// // // //     const rect = previewRef.current.getBoundingClientRect();
// // // //     const x = ((e.clientX - rect.left) / rect.width) * 100;
// // // //     const y = ((e.clientY - rect.top) / rect.height) * 100;

// // // //     if (isDragging) {
// // // //       setForm(prev => ({
// // // //         ...prev,
// // // //         profileX: Math.max(0, Math.min(100, x)),
// // // //         profileY: Math.max(0, Math.min(100, y))
// // // //       }));
// // // //     }

// // // //     if (isResizing && profileRef.current) {
// // // //       const profileRect = profileRef.current.getBoundingClientRect();
// // // //       const centerX = (form.profileX / 100) * rect.width + rect.left;
// // // //       const centerY = (form.profileY / 100) * rect.height + rect.top;

// // // //       const distX = Math.abs(e.clientX - centerX);
// // // //       const distY = Math.abs(e.clientY - centerY);
      
// // // //       const newSize = Math.max(50, Math.min(250, Math.max(distX, distY) * 2));
      
// // // //       setForm(prev => ({
// // // //         ...prev,
// // // //         profileSize: Math.round(newSize)
// // // //       }));
// // // //     }
// // // //   };

// // // //   const handleMouseUp = () => {
// // // //     setIsDragging(false);
// // // //     setIsResizing(false);
// // // //     setResizeCorner(null);
// // // //   };

// // // //   useEffect(() => {
// // // //     if (isDragging || isResizing) {
// // // //       window.addEventListener('mousemove', handleMouseMove);
// // // //       window.addEventListener('mouseup', handleMouseUp);
// // // //     }

// // // //     return () => {
// // // //       window.removeEventListener('mousemove', handleMouseMove);
// // // //       window.removeEventListener('mouseup', handleMouseUp);
// // // //     };
// // // //   }, [isDragging, isResizing, form.profileX, form.profileY]);

// // // //   // =================== SUBMIT FORM ===================
// // // //   const handleSubmit = async () => {
// // // //     if (!form.title || !form.parentId) return alert("Fill required fields");

// // // //     setLoading(true);

// // // //     const fd = new FormData();

// // // //     Object.entries(form).forEach(([key, value]) => {
// // // //       if (value !== null) fd.append(key, value);
// // // //     });

// // // //     fd.append("parentType", form.parentType);
// // // //     fd.append("parentId", form.parentId);

// // // //     if (editId)
// // // //       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// // // //     else
// // // //       await axios.post(`${BASE_URL}/templates`, fd);

// // // //     setShow(false);
// // // //     fetchData();
// // // //     setLoading(false);
// // // //   };

// // // //   // =================== DELETE ===================
// // // //   const handleDelete = async (id) => {
// // // //     if (!window.confirm("Delete Template?")) return;
// // // //     await axios.delete(`${BASE_URL}/templates/${id}`);
// // // //     fetchData();
// // // //   };

// // // //   // =================== STATUS TOGGLE ===================
// // // //   const handleToggleStatus = async (tpl) => {
// // // //     try {
// // // //       await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
// // // //       fetchData();
// // // //     } catch (e) {
// // // //       alert("Toggle failed — backend route error");
// // // //     }
// // // //   };

// // // //   // =================== CSV EXPORT ===================
// // // //   const handleExportCSV = () => {
// // // //     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// // // //   };

// // // //   // =================== CSV IMPORT ===================
// // // //   const handleImportCSV = async () => {
// // // //     if (!csvFile) return alert("Select a CSV file first!");

// // // //     setCsvUploading(true);

// // // //     const fd = new FormData();
// // // //     fd.append("csv", csvFile);

// // // //     try {
// // // //       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
// // // //       alert("CSV Imported Successfully!");
// // // //       setShowCsvModal(false);
// // // //       fetchData();
// // // //     } catch {
// // // //       alert("CSV Import Failed");
// // // //     } finally {
// // // //       setCsvUploading(false);
// // // //     }
// // // //   };

// // // //   // =================== PARENT DROPDOWN LOGIC ===================
// // // //   let parentOptions = [];

// // // //   if (form.parentType === "Category") parentOptions = categories;
// // // //   if (form.parentType === "Birthday") parentOptions = birthdayList;
// // // //   if (form.parentType === "Anniversary") parentOptions = anniversaryList;
// // // //   if (form.parentType === "Festival") parentOptions = festivalList;

// // // //   // =================== RENDER ===================
// // // //   return (
// // // //     <Container fluid className="py-3">

// // // //       {/* HEADER */}
// // // //       <Row className="align-items-center mb-3 g-2">
// // // //         <Col xs={12} md={4}>
// // // //           <h3 className="text-center text-md-start">Templates</h3>
// // // //         </Col>

// // // //         <Col xs={12} md={4}>
// // // //           <InputGroup className="mt-2 mt-md-0">
// // // //             <Form.Control
// // // //               placeholder="Search by title..."
// // // //               value={search}
// // // //               onChange={e => { setSearch(e.target.value); setPage(1); }}
// // // //             />
// // // //             <Button><FaSearch /></Button>
// // // //           </InputGroup>
// // // //         </Col>

// // // //         <Col xs={12} md={4} className="text-md-end text-center mt-2 mt-md-0">

// // // //           <Button className="me-2 mb-2" size="sm"
// // // //             variant="success" onClick={() => setShowCsvModal(true)}>
// // // //             <FaUpload /> Import
// // // //           </Button>

// // // //           <Button className="me-2 mb-2" size="sm"
// // // //             variant="warning" onClick={handleExportCSV}>
// // // //             <FaDownload /> Export
// // // //           </Button>

// // // //           <Button size="sm" onClick={() => handleShow()}>
// // // //             <FaPlus /> Add
// // // //           </Button>

// // // //         </Col>
// // // //       </Row>

// // // //       {/* TABLE */}
// // // //       <Card>
// // // //         <Card.Body>

// // // //           <div className="table-responsive">
// // // //             <Table bordered hover className="align-middle text-center">
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th>Thumbnail</th>
// // // //                   <th>Frame</th>
// // // //                   <th>Title</th>
// // // //                   <th>Type</th>
// // // //                   <th>Status</th>
// // // //                   <th>Actions</th>
// // // //                 </tr>
// // // //               </thead>

// // // //               <tbody>
// // // //                 {templates.map((tpl) => (
// // // //                   <tr key={tpl._id}>
// // // //                     <td>
// // // //                       {tpl.type === "video" ? (
// // // //                         <video
// // // //                           src={tpl.file}
// // // //                           width="90"
// // // //                           height="60"
// // // //                           controls
// // // //                           muted
// // // //                           style={{ borderRadius: 6, objectFit: "cover" }}
// // // //                         />
// // // //                       ) : (
// // // //                         <img
// // // //                           src={tpl.file}
// // // //                           width="90"
// // // //                           height="60"
// // // //                           style={{ objectFit: "cover", borderRadius: 6 }}
// // // //                         />
// // // //                       )}
// // // //                     </td>

// // // //                     <td>
// // // //                       {tpl.frameFile ? (
// // // //                         <img src={tpl.frameFile} width="90" height="60"
// // // //                           style={{ borderRadius: 6 }} />
// // // //                       ) : "—"}
// // // //                     </td>

// // // //                     <td>{tpl.title}</td>

// // // //                     <td>
// // // //                       <Badge bg={tpl.type === "video" ? "primary" : "info"}>
// // // //                         {tpl.type}
// // // //                       </Badge>
// // // //                     </td>

// // // //                     <td>
// // // //                       <Form.Check
// // // //                         type="switch"
// // // //                         checked={tpl.status === "active"}
// // // //                         onChange={() => handleToggleStatus(tpl)}
// // // //                         label={tpl.status === "active" ? "Active" : "Inactive"}
// // // //                       />
// // // //                     </td>

// // // //                     <td>
// // // //                       <Button size="sm" className="me-1"
// // // //                         onClick={() => handleShow(tpl)}>
// // // //                         <FaEdit />
// // // //                       </Button>

// // // //                       <Button size="sm" variant="danger"
// // // //                         onClick={() => handleDelete(tpl._id)}>
// // // //                         <FaTrash />
// // // //                       </Button>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>

// // // //             </Table>
// // // //           </div>

// // // //           {/* Pagination */}
// // // //           <div className="d-flex justify-content-center mt-3">
// // // //             <Button size="sm"
// // // //               disabled={page === 1}
// // // //               onClick={() => setPage(page - 1)}>Prev</Button>

// // // //             <span className="px-3 py-1 mx-2 border rounded">
// // // //               Page {page} / {totalPages}
// // // //             </span>

// // // //             <Button size="sm"
// // // //               disabled={page === totalPages}
// // // //               onClick={() => setPage(page + 1)}>Next</Button>
// // // //           </div>

// // // //         </Card.Body>
// // // //       </Card>

// // // //       {/* ================= ADD / EDIT MODAL ================= */}
// // // //       <Modal show={show} onHide={() => setShow(false)}
// // // //         centered size="lg">
// // // //         <Modal.Header closeButton>
// // // //           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
// // // //         </Modal.Header>

// // // //         <Modal.Body>
// // // //           <Form>

// // // //             {/* Title & Type */}
// // // //             <Row className="g-3">
// // // //               <Col md={6}>
// // // //                 <Form.Label>Title</Form.Label>
// // // //                 <Form.Control
// // // //                   name="title"
// // // //                   value={form.title}
// // // //                   onChange={handleChange}
// // // //                 />
// // // //               </Col>

// // // //               <Col md={6}>
// // // //                 <Form.Label>Type</Form.Label>
// // // //                 <Form.Select
// // // //                   name="type"
// // // //                   value={form.type}
// // // //                   onChange={handleChange}
// // // //                 >
// // // //                   <option value="video">Video</option>
// // // //                   <option value="graphics">Graphics</option>
// // // //                 </Form.Select>
// // // //               </Col>
// // // //             </Row>

// // // //             {/* Parent */}
// // // //             <Row className="g-3 mt-1">
// // // //               <Col md={6}>
// // // //                 <Form.Label>Parent Type</Form.Label>
// // // //                 <Form.Select name="parentType"
// // // //                   value={form.parentType}
// // // //                   onChange={handleChange}
// // // //                 >
// // // //                   <option value="Category">Category</option>
// // // //                   <option value="Birthday">Birthday</option>
// // // //                   <option value="Anniversary">Anniversary</option>
// // // //                   <option value="Festival">Festival</option>
// // // //                 </Form.Select>
// // // //               </Col>

// // // //               <Col md={6}>
// // // //                 <Form.Label>Select Parent</Form.Label>
// // // //                 <Form.Select
// // // //                   name="parentId"
// // // //                   value={form.parentId}
// // // //                   onChange={handleChange}
// // // //                 >
// // // //                   <option value="">Choose...</option>
// // // //                   {parentOptions.map((p) => (
// // // //                     <option key={p._id} value={p._id}>
// // // //                       {form.parentType === "Category" && p.categoryName}
// // // //                       {form.parentType === "Politician" && p.title}
// // // //                       {form.parentType === "Religious" && p.title}
// // // //                       {form.parentType === "Birthday" && p.name}
// // // //                       {form.parentType === "Anniversary" && p.name}
// // // //                       {form.parentType === "Festival" && p.title}
// // // //                     </option>
// // // //                   ))}
// // // //                 </Form.Select>
// // // //               </Col>
// // // //             </Row>

// // // //             {/* Files */}
// // // //             <Row className="g-3 mt-1">
// // // //               <Col md={6}>
// // // //                 <Form.Label>Thumbnail</Form.Label>
// // // //                 <Form.Control type="file" name="file"
// // // //                   onChange={handleChange}
// // // //                   accept="image/*,video/*"
// // // //                 />
// // // //                 {filePreview && (
// // // //                   form.type === "video" ? (
// // // //                     <video
// // // //                       src={filePreview}
// // // //                       width="140"
// // // //                       controls
// // // //                       muted
// // // //                       className="mt-2"
// // // //                       style={{ borderRadius: 8 }}
// // // //                     />
// // // //                   ) : (
// // // //                     <img
// // // //                       src={filePreview}
// // // //                       width="140"
// // // //                       className="mt-2"
// // // //                       style={{ borderRadius: 8 }}
// // // //                     />
// // // //                   )
// // // //                 )}
// // // //               </Col>

// // // //               <Col md={6}>
// // // //                 <Form.Label>Frame</Form.Label>
// // // //                 <Form.Control type="file" name="frameFile"
// // // //                   onChange={handleChange}
// // // //                   accept="image/*"
// // // //                 />
// // // //                 {framePreview && (
// // // //                   <img src={framePreview} width="140" className="mt-2"
// // // //                     style={{ borderRadius: 8 }} />
// // // //                 )}
// // // //               </Col>
// // // //             </Row>

// // // //             {/* ================= MAKE PERSONAL POSITION BUTTON ================= */}
// // // //             <div className="text-center mt-3">
// // // //               <Button 
// // // //                 variant={isPositioning ? "success" : "info"}
// // // //                 onClick={() => setIsPositioning(!isPositioning)}
// // // //               >
// // // //                 {isPositioning ? "✓ Positioning Active" : "Make Personal Position"}
// // // //               </Button>
// // // //             </div>

// // // //             {/* ================= LIVE PREVIEW ================= */}
// // // //             <div
// // // //               ref={previewRef}
// // // //               className="mt-3 mx-auto"
// // // //               style={{
// // // //                 width: 330,
// // // //                 height: 330,
// // // //                 borderRadius: 16,
// // // //                 position: "relative",
// // // //                 overflow: "hidden",
// // // //                 background: "#111",
// // // //                 boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
// // // //                 cursor: isPositioning ? "default" : "not-allowed"
// // // //               }}
// // // //             >

// // // //               {/* BACKGROUND */}
// // // //               {filePreview && (
// // // //                 form.type === "video" ? (
// // // //                   <video
// // // //                     src={filePreview}
// // // //                     autoPlay
// // // //                     muted
// // // //                     loop
// // // //                     style={{
// // // //                       width: "100%",
// // // //                       height: "100%",
// // // //                       objectFit: "cover",
// // // //                       position: "absolute",
// // // //                       inset: 0,
// // // //                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// // // //                       zIndex: 1,
// // // //                     }}
// // // //                   />
// // // //                 ) : (
// // // //                   <img
// // // //                     src={filePreview}
// // // //                     alt=""
// // // //                     style={{
// // // //                       width: "100%",
// // // //                       height: "100%",
// // // //                       objectFit: "cover",
// // // //                       position: "absolute",
// // // //                       inset: 0,
// // // //                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// // // //                       zIndex: 1,
// // // //                     }}
// // // //                   />
// // // //                 )
// // // //               )}

// // // //               {/* PROFILE WITH HANDLES (Only visible when positioning) */}
// // // //               {isPositioning && (
// // // //                 <div
// // // //                   ref={profileRef}
// // // //                   onMouseDown={handleProfileMouseDown}
// // // //                   style={{
// // // //                     position: "absolute",
// // // //                     top: `${form.profileY}%`,
// // // //                     left: `${form.profileX}%`,
// // // //                     transform: "translate(-50%, -50%)",
// // // //                     width: `${form.profileSize}px`,
// // // //                     height: `${form.profileSize}px`,
// // // //                     background: "rgba(255, 255, 255, 0.9)",
// // // //                     color: "#000",
// // // //                     zIndex: 10,
// // // //                     borderRadius: `${form.profileRadius}%`,
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     justifyContent: "center",
// // // //                     fontSize: 12,
// // // //                     fontWeight: 600,
// // // //                     boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
// // // //                     cursor: isDragging ? "grabbing" : "grab",
// // // //                     userSelect: "none",
// // // //                     border: "3px solid #17a2b8"
// // // //                   }}
// // // //                 >
// // // //                   <FaPlus style={{ fontSize: 24, color: "#17a2b8" }} />

// // // //                   {/* 4 CORNER RESIZE HANDLES */}
// // // //                   {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(corner => (
// // // //                     <div
// // // //                       key={corner}
// // // //                       className="resize-handle"
// // // //                       onMouseDown={(e) => handleResizeMouseDown(e, corner)}
// // // //                       style={{
// // // //                         position: "absolute",
// // // //                         width: 12,
// // // //                         height: 12,
// // // //                         background: "#fff",
// // // //                         border: "2px solid #17a2b8",
// // // //                         borderRadius: "50%",
// // // //                         cursor: corner.includes('top') && corner.includes('Left') ? "nw-resize" :
// // // //                                corner.includes('top') && corner.includes('Right') ? "ne-resize" :
// // // //                                corner.includes('bottom') && corner.includes('Left') ? "sw-resize" : "se-resize",
// // // //                         zIndex: 11,
// // // //                         ...(corner === 'topLeft' && { top: -6, left: -6 }),
// // // //                         ...(corner === 'topRight' && { top: -6, right: -6 }),
// // // //                         ...(corner === 'bottomLeft' && { bottom: -6, left: -6 }),
// // // //                         ...(corner === 'bottomRight' && { bottom: -6, right: -6 })
// // // //                       }}
// // // //                     />
// // // //                   ))}
// // // //                 </div>
// // // //               )}

// // // //               {/* FRAME */}
// // // //               {framePreview && (
// // // //                 <img
// // // //                   src={framePreview}
// // // //                   alt=""
// // // //                   style={{
// // // //                     width: "100%",
// // // //                     height: "100%",
// // // //                     objectFit: "contain",
// // // //                     position: "absolute",
// // // //                     inset: 0,
// // // //                     transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
// // // //                     zIndex: 4,
// // // //                     pointerEvents: "none",
// // // //                   }}
// // // //                 />
// // // //               )}

// // // //             </div>

// // // //             {/* Position Display */}
// // // //             {isPositioning && (
// // // //               <div className="text-center mt-2">
// // // //                 <Badge bg="secondary">
// // // //                   X: {form.profileX.toFixed(0)}% | Y: {form.profileY.toFixed(0)}% | Size: {form.profileSize}px
// // // //                 </Badge>
// // // //               </div>
// // // //             )}

// // // //             {/* CONTROLS */}
// // // //             <hr />

// // // //             <h6>Transition Settings</h6>

// // // //             <Form.Label>Transition Type</Form.Label>
// // // //             <Form.Select
// // // //               name="transitionType"
// // // //               value={form.transitionType}
// // // //               onChange={handleChange}
// // // //             >
// // // //               <option value="fade">Fade</option>
// // // //               <option value="slideFromBottom">Slide Bottom</option>
// // // //               <option value="slideFromTop">Slide Top</option>
// // // //               <option value="slideFromLeft">Slide Left</option>
// // // //               <option value="slideFromRight">Slide Right</option>
// // // //               <option value="zoomIn">Zoom In</option>
// // // //               <option value="rotate">Rotate</option>
// // // //             </Form.Select>

// // // //             <Form.Label className="mt-2">Transition Duration (sec)</Form.Label>
// // // //             <Form.Control
// // // //               type="number"
// // // //               step="0.1"
// // // //               name="transitionDuration"
// // // //               value={form.transitionDuration}
// // // //               onChange={handleChange}
// // // //             />

// // // //             <hr />
// // // //             <h6>Profile Animation</h6>

// // // //             <Form.Label>Animation</Form.Label>
// // // //             <Form.Select
// // // //               name="profileAnimation"
// // // //               value={form.profileAnimation}
// // // //               onChange={handleChange}
// // // //             >
// // // //               <option value="none">None</option>
// // // //               <option value="fadeIn">Fade In</option>
// // // //               <option value="popIn">Pop In</option>
// // // //               <option value="bounce">Bounce</option>
// // // //               <option value="scaleUp">Scale Up</option>
// // // //               <option value="rotateIn">Rotate</option>
// // // //             </Form.Select>

// // // //             <Form.Label className="mt-2">Delay (sec)</Form.Label>
// // // //             <Form.Control
// // // //               type="number"
// // // //               step="0.1"
// // // //               name="profileDelay"
// // // //               value={form.profileDelay}
// // // //               onChange={handleChange}
// // // //             />

// // // //             <Form.Label className="mt-2">Duration (sec)</Form.Label>
// // // //             <Form.Control
// // // //               type="number"
// // // //               step="0.1"
// // // //               name="profileDuration"
// // // //               value={form.profileDuration}
// // // //               onChange={handleChange}
// // // //             />

// // // //             <hr />
// // // //             <h6>Thumbnail Controls</h6>
// // // //             <Form.Label>Zoom: {form.fileZoom}x</Form.Label>
// // // //             <Form.Range name="fileZoom" min="0.5" max="3"
// // // //               step="0.1" value={form.fileZoom}
// // // //               onChange={handleChange} />

// // // //             <Form.Label>Move X: {form.fileX}px</Form.Label>
// // // //             <Form.Range name="fileX" min="-200" max="200"
// // // //               value={form.fileX}
// // // //               onChange={handleChange} />

// // // //             <Form.Label>Move Y: {form.fileY}px</Form.Label>
// // // //             <Form.Range name="fileY" min="-200" max="200"
// // // //               value={form.fileY}
// // // //               onChange={handleChange} />

// // // //             <hr />
// // // //             <h6>🎯 Profile Shape</h6>

// // // //             <Form.Label>Border Radius (%): {form.profileRadius}%</Form.Label>
// // // //             <Form.Range
// // // //               name="profileRadius"
// // // //               min="0"
// // // //               max="50"
// // // //               step="1"
// // // //               value={form.profileRadius}
// // // //               onChange={handleChange}
// // // //             />

// // // //             <hr />
// // // //             <h6>Frame Controls</h6>
// // // //             <Form.Label>Zoom: {form.frameZoom}x</Form.Label>
// // // //             <Form.Range name="frameZoom" min="0.5" max="3"
// // // //               step="0.1" value={form.frameZoom}
// // // //               onChange={handleChange} />

// // // //             <Form.Label>Move X: {form.frameX}px</Form.Label>
// // // //             <Form.Range name="frameX" min="-200" max="200"
// // // //               value={form.frameX}
// // // //               onChange={handleChange} />

// // // //             <Form.Label>Move Y: {form.frameY}px</Form.Label>
// // // //             <Form.Range name="frameY" min="-200" max="200"
// // // //               value={form.frameY}
// // // //               onChange={handleChange} />

// // // //           </Form>
// // // //         </Modal.Body>

// // // //         <Modal.Footer>
// // // //           <Button variant="secondary"
// // // //             onClick={() => setShow(false)}>Close</Button>

// // // //           <Button variant="primary" disabled={loading}
// // // //             onClick={handleSubmit}>
// // // //             {loading ? "Saving..." : "Save"}
// // // //           </Button>
// // // //         </Modal.Footer>
// // // //       </Modal>

// // // //       {/* ================= CSV IMPORT MODAL ================= */}
// // // //       <Modal show={showCsvModal}
// // // //         onHide={() => setShowCsvModal(false)}
// // // //         centered>
// // // //         <Modal.Header closeButton>
// // // //           <Modal.Title>Import Templates CSV</Modal.Title>
// // // //         </Modal.Header>

// // // //         <Modal.Body>
// // // //           <Form.Group>
// // // //             <Form.Label>Select CSV File</Form.Label>
// // // //             <Form.Control
// // // //               type="file"
// // // //               accept=".csv"
// // // //               onChange={(e) => setCsvFile(e.target.files[0])}
// // // //             />
// // // //           </Form.Group>
// // // //         </Modal.Body>

// // // //         <Modal.Footer>
// // // //           <Button variant="secondary"
// // // //             onClick={() => setShowCsvModal(false)}>Close</Button>

// // // //           <Button variant="success"
// // // //             disabled={csvUploading}
// // // //             onClick={handleImportCSV}>
// // // //             {csvUploading ? "Importing..." : "Import CSV"}
// // // //           </Button>
// // // //         </Modal.Footer>
// // // //       </Modal>

// // // //     </Container>
// // // //   );
// // // // };

// // // // export default Templates;

// // // import React, { useEffect, useState, useRef } from "react";
// // // import {
// // //   Container, Card, Button, Table, Badge, Modal,
// // //   Form, InputGroup, Row, Col
// // // } from "react-bootstrap";
// // // import {
// // //   FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
// // // } from "react-icons/fa";
// // // import axios from "axios";
// // // // ✅ RESIZE HANDLE COMPONENT
// // // const ResizeHandle = ({ corner, handleResizeMouseDown }) => {

// // //   const positions = {
// // //     tl: { top: -8, left: -8, cursor: "nwse-resize" },
// // //     tr: { top: -8, right: -8, cursor: "nesw-resize" },
// // //     bl: { bottom: -8, left: -8, cursor: "nesw-resize" },
// // //     br: { bottom: -8, right: -8, cursor: "nwse-resize" }
// // //   };

// // //   return (
// // //     <div
// // //       onMouseDown={(e) => handleResizeMouseDown(e, corner)}
// // //       style={{
// // //         position: "absolute",
// // //         width: 16,
// // //         height: 16,
// // //         background: "#fff",
// // //         border: "2px solid #17a2b8",
// // //         borderRadius: 4,
// // //         zIndex: 999,
// // //         ...positions[corner]
// // //       }}
// // //     />
// // //   );
// // // };

// // // const Templates = () => {
// // //   const BASE_URL = "http://localhost:7000/api";

// // //   // CSV Modal States
// // //   const [showCsvModal, setShowCsvModal] = useState(false);
// // //   const [csvFile, setCsvFile] = useState(null);
// // //   const [csvUploading, setCsvUploading] = useState(false);

// // //   // Data States
// // //   const [templates, setTemplates] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [politicians, setPoliticians] = useState([]);
// // //   const [religiousList, setReligiousList] = useState([]);
// // //   const [birthdayList, setBirthdayList] = useState([]);
// // //   const [anniversaryList, setAnniversaryList] = useState([]);
// // //   const [festivalList, setFestivalList] = useState([]);
// // //   const [isResizingText, setIsResizingText] = useState(false);
// // // const textRef = useRef(null);

// // //   const [show, setShow] = useState(false);
// // //   const [editId, setEditId] = useState(null);

// // //   const [search, setSearch] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const [filePreview, setFilePreview] = useState(null);
// // //   const [framePreview, setFramePreview] = useState(null);

// // // const [text, setText] = useState({
// // //   value: "",
// // //   x: 50,
// // //   y: 50,
// // //   size: 24,
// // //   show: false,
// // //   width: 150   // ✅ ADD THIS
// // // });


// // // const [isDraggingText, setIsDraggingText] = useState(false);


// // //   // Profile positioning states
// // //   const [isPositioning, setIsPositioning] = useState(false);
// // //   const [isDragging, setIsDragging] = useState(false);
// // //   const [isResizing, setIsResizing] = useState(false);
// // //   const [resizeCorner, setResizeCorner] = useState(null);
  
// // //   const previewRef = useRef(null);
// // //   const profileRef = useRef(null);

// // //   // Pagination
// // //   const [page, setPage] = useState(1);
// // //   const limit = 6;
// // //   const [totalPages, setTotalPages] = useState(1);

// // //   // Control Defaults
// // //   const defaultControls = {
// // //     fileZoom: 1,
// // //     fileX: 0,
// // //     fileY: 0,
// // //     frameZoom: 1,
// // //     frameX: 0,
// // //     frameY: 0
// // //   };

// // //   // Main Form State
// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     type: "video",
// // //     status: "active",

// // //     parentType: "Category",
// // //     parentId: "",

// // //     file: null,
// // //     frameFile: null,

// // //     transitionPlacement: "below",
// // //     transitionType: "fade",
// // //     transitionDuration: 0.8,

// // //     profileAnimation: "none",
// // //     profileDelay: 2,
// // //     profileDuration: 0.6,

// // //     textAnimation: "none",
// // //     textDelay: 0,
// // //     textDuration: 0.5,

// // //     profileX: 50,
// // //     profileY: 50,
// // //     profileSize: 120,
// // //     profileRadius: 50,

// // //     ...defaultControls
// // //   });

// // //   // =================== FETCH DATA ===================
// // //   const fetchData = async () => {
// // //     const tplRes = await axios.get(`${BASE_URL}/templates`, {
// // //       params: { page, limit, search }
// // //     });

// // //     const [
// // //       catRes, polRes, relRes, birthRes, anniRes, festRes
// // //     ] = await Promise.all([
// // //       axios.get(`${BASE_URL}/categories`),
// // //       axios.get(`${BASE_URL}/politicians`),
// // //       axios.get(`${BASE_URL}/religious`),
// // //       axios.get(`${BASE_URL}/birthdays`),
// // //       axios.get(`${BASE_URL}/anniversaries`),
// // //       axios.get(`${BASE_URL}/festivals`)
// // //     ]);

// // //     setTemplates(tplRes.data.templates || []);
// // //     setTotalPages(tplRes.data.pages || 1);

// // //     setCategories(Array.isArray(catRes.data) ? catRes.data : []);

// // //     setPoliticians(polRes.data.politicians || []);
// // //     setReligiousList(relRes.data.religious || []);
// // //     setBirthdayList(birthRes.data.birthdays || []);
// // //     setAnniversaryList(anniRes.data.anniversaries || []);
// // //     setFestivalList(festRes.data.festivals || []);
// // //   };

// // //   useEffect(() => { fetchData(); }, [page, search]);

// // //   // =================== SHOW MODAL ===================
// // //   const handleShow = (tpl = null) => {
// // //     if (tpl) {
// // //       setEditId(tpl._id);

// // //       setForm({
// // //         title: tpl.title,
// // //         type: tpl.type,
// // //         status: tpl.status,
// // //         parentType:
// // //           tpl.category ? "Category" :
// // //             tpl.politician ? "Politician" :
// // //               tpl.religious ? "Religious" :
// // //                 tpl.birthday ? "Birthday" :
// // //                   tpl.anniversary ? "Anniversary" :
// // //                     tpl.festival ? "Festival" : "",
// // //         parentId:
// // //           tpl.category?._id ||
// // //           tpl.politician?._id ||
// // //           tpl.religious?._id ||
// // //           tpl.birthday?._id ||
// // //           tpl.anniversary?._id ||
// // //           tpl.festival?._id || "",

// // //         file: null,
// // //         frameFile: null,

// // //         transitionPlacement: tpl.transition?.placement || "below",
// // //         transitionType: tpl.transition?.type || "fade",
// // //         transitionDuration: tpl.transition?.duration || 0.8,

// // //         profileAnimation: tpl.animation?.profile?.effect || "none",
// // //         profileDelay: tpl.animation?.profile?.delay || 2,
// // //         profileDuration: tpl.animation?.profile?.duration || 0.6,

// // //         textAnimation: tpl.animation?.text?.effect || "none",
// // //         textDelay: tpl.animation?.text?.delay || 0,
// // //         textDuration: tpl.animation?.text?.duration || 0.5,

// // //         profileX: tpl.profile?.x || 50,
// // //         profileY: tpl.profile?.y || 50,
// // //         // profileSize: tpl.profile?.size || 120,
// // //         profileSize: tpl.profile?.size || 0,

// // //         profileRadius: tpl.profile?.radius || 50,

// // //         fileZoom: tpl.fileZoom || 1,
// // //         fileX: tpl.fileX || 0,
// // //         fileY: tpl.fileY || 0,
// // //         frameZoom: tpl.frameZoom || 1,
// // //         frameX: tpl.frameX || 0,
// // //         frameY: tpl.frameY || 0
// // //       });

// // //       setFilePreview(tpl.file);
// // //       setFramePreview(tpl.frameFile);

// // //     } else {
// // //       setEditId(null);
// // //       setForm({
// // //         title: "",
// // //         type: "video",
// // //         status: "active",
// // //         parentType: "Category",
// // //         parentId: "",
// // //         file: null,
// // //         frameFile: null,
// // //         transitionPlacement: "below",
// // //         transitionType: "fade",
// // //         transitionDuration: 0.8,
// // //         profileAnimation: "none",
// // //         profileDelay: 2,
// // //         profileDuration: 0.6,
// // //         textAnimation: "none",
// // //         textDelay: 0,
// // //         textDuration: 0.5,
// // //         profileX: 50,
// // //         profileY: 50,
// // //         // profileSize: 120,
// // //         profileSize: 0,
// // //         profileRadius: 50,
// // //         ...defaultControls
// // //       });

// // //       setFilePreview(null);
// // //       setFramePreview(null);
// // //     }

// // //     setShow(true);
// // //     setIsPositioning(false);
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value, files } = e.target;

// // //     if (files) {
// // //       const file = files[0];

// // //       setForm(prev => ({ ...prev, [name]: file }));

// // //       if (name === "file") setFilePreview(URL.createObjectURL(file));
// // //       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));

// // //     } else {
// // //       if (name === "parentType") {
// // //         setForm(prev => ({
// // //           ...prev,
// // //           parentType: value,
// // //           parentId: ""
// // //         }));
// // //       } else {
// // //         setForm(prev => ({ ...prev, [name]: value }));
// // //       }
// // //     }
// // //   };



// // //   const handleProfileMouseDown = (e) => {
    

// // //   if (!isPositioning) return;

// // //   if (e.target.style.cursor?.includes("resize"))
// // //     return;

// // //   e.preventDefault();
// // //   setIsDragging(true);
// // // };

// // // const handleTextMouseDown = (e) => {

// // //   if (!isPositioning) return;

// // //   // resize handle click ignore
// // //   if (e.target.dataset.resize) return;

// // //   // agar contentEditable pe direct click hua → edit mode
// // //   if (e.target.isContentEditable) return;

// // //   e.preventDefault();
// // //   setIsDraggingText(true);
// // // };





// // //   const handleResizeMouseDown = (e, corner) => {
// // //     e.preventDefault();
// // //     e.stopPropagation();
// // //     setIsResizing(true);
// // //     setResizeCorner(corner);
// // //   };

// // //   const handleMouseMove = (e) => {
// // //     if (!previewRef.current) return;

// // //     const rect = previewRef.current.getBoundingClientRect();
// // //     const x = ((e.clientX - rect.left) / rect.width) * 100;
// // //     const y = ((e.clientY - rect.top) / rect.height) * 100;

// // //     if (isDragging) {
// // //       setForm(prev => ({
// // //         ...prev,
// // //         profileX: Math.max(0, Math.min(100, x)),
// // //         profileY: Math.max(0, Math.min(100, y))
// // //       }));
// // //     }
// // //     // TEXT DRAGGING
// // // if (isDraggingText) {
// // //   setText(prev => ({
// // //     ...prev,
// // //     x: Math.max(0, Math.min(100, x)),
// // //     y: Math.max(0, Math.min(100, y))
// // //   }));
// // // }

// // // if (isResizingText && textRef.current) {

// // //   const rect = textRef.current.getBoundingClientRect();

// // //   const newWidth = Math.max(
// // //     60,
// // //     Math.min(500, e.clientX - rect.left)
// // //   );

// // //   setText(prev => ({
// // //     ...prev,
// // //     width: newWidth
// // //   }));

// // //   return; // STOP → profile resize nahi chalega
// // // }

// // //      if (isResizing && profileRef.current) {

// // //     const centerX = (form.profileX / 100) * rect.width + rect.left;
// // //     const centerY = (form.profileY / 100) * rect.height + rect.top;

// // //     const distX = Math.abs(e.clientX - centerX);
// // //     const distY = Math.abs(e.clientY - centerY);

// // //     const newSize = Math.max(50, Math.min(250, Math.max(distX, distY) * 2));

// // //     setForm(prev => ({
// // //       ...prev,
// // //       profileSize: Math.round(newSize)
// // //       }));
// // //     }
// // //   };


// // //   const handleMouseUp = () => {
// // //   setIsDragging(false);
// // //   setIsResizing(false);

// // //   setIsDraggingText(false);
// // //   setIsResizingText(false); // ⭐ MUST

// // //   setResizeCorner(null);
// // // };


// // // useEffect(() => {

// // //   if (
// // //     isDragging ||
// // //     isResizing ||
// // //     isDraggingText ||
// // //     isResizingText   // ⭐⭐⭐ MOST IMPORTANT
// // //   ) {

// // //     window.addEventListener("mousemove", handleMouseMove);
// // //     window.addEventListener("mouseup", handleMouseUp);
// // //   }

// // //   return () => {
// // //     window.removeEventListener("mousemove", handleMouseMove);
// // //     window.removeEventListener("mouseup", handleMouseUp);
// // //   };

// // // }, [isDragging, isResizing, isDraggingText, isResizingText]);


// // //   // =================== SUBMIT FORM ===================
// // //   const handleSubmit = async () => {
// // //     if (!form.title || !form.parentId) return alert("Fill required fields");

// // //     setLoading(true);

// // //     const fd = new FormData();

// // //     Object.entries(form).forEach(([key, value]) => {
// // //       if (value !== null) fd.append(key, value);
// // //     });

// // //     fd.append("parentType", form.parentType);
// // //     fd.append("parentId", form.parentId);

// // //     if (editId)
// // //       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// // //     else
// // //       await axios.post(`${BASE_URL}/templates`, fd);

// // //     setShow(false);
// // //     fetchData();
// // //     setLoading(false);
// // //   };

 

// // // const handleDeleteSelected = () => {

// // //   if (text.show) {
// // //     setText({
// // //       value: "",
// // //       x: 50,
// // //       y: 50,
// // //       size: 24,
// // //   width: 150,
// // //       show: false
// // //     });
// // //     return;
// // //   }

// // //   if (form.profileSize > 0) {
// // //     setForm(prev => ({
// // //       ...prev,
// // //       profileSize: 0
// // //     }));
// // //   }

// // //   setIsPositioning(false);
// // // };


// // //   // =================== STATUS TOGGLE ===================
// // //   const handleToggleStatus = async (tpl) => {
// // //     try {
// // //       await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
// // //       fetchData();
// // //     } catch (e) {
// // //       alert("Toggle failed — backend route error");
// // //     }
// // //   };

// // //   // =================== CSV EXPORT ===================
// // //   const handleExportCSV = () => {
// // //     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// // //   };

// // //   // =================== CSV IMPORT ===================
// // //   const handleImportCSV = async () => {
// // //     if (!csvFile) return alert("Select a CSV file first!");

// // //     setCsvUploading(true);

// // //     const fd = new FormData();
// // //     fd.append("csv", csvFile);

// // //     try {
// // //       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
// // //       alert("CSV Imported Successfully!");
// // //       setShowCsvModal(false);
// // //       fetchData();
// // //     } catch {
// // //       alert("CSV Import Failed");
// // //     } finally {
// // //       setCsvUploading(false);
// // //     }
// // //   };

// // //   // =================== PARENT DROPDOWN LOGIC ===================
// // //   let parentOptions = [];

// // //   if (form.parentType === "Category") parentOptions = categories;
// // //   if (form.parentType === "Birthday") parentOptions = birthdayList;
// // //   if (form.parentType === "Anniversary") parentOptions = anniversaryList;
// // //   if (form.parentType === "Festival") parentOptions = festivalList;

// // //   // =================== RENDER ===================
// // //   return (
// // //     <Container fluid className="py-3">

// // //       {/* HEADER */}
// // //       <Row className="align-items-center mb-3 g-2">
// // //         <Col xs={12} md={4}>
// // //           <h3 className="text-center text-md-start">Templates</h3>
// // //         </Col>

// // //         <Col xs={12} md={4}>
// // //           <InputGroup className="mt-2 mt-md-0">
// // //             <Form.Control
// // //               placeholder="Search by title..."
// // //               value={search}
// // //               onChange={e => { setSearch(e.target.value); setPage(1); }}
// // //             />
// // //             <Button><FaSearch /></Button>
// // //           </InputGroup>
// // //         </Col>

// // //         <Col xs={12} md={4} className="text-md-end text-center mt-2 mt-md-0">

// // //           <Button className="me-2 mb-2" size="sm"
// // //             variant="success" onClick={() => setShowCsvModal(true)}>
// // //             <FaUpload /> Import
// // //           </Button>

// // //           <Button className="me-2 mb-2" size="sm"
// // //             variant="warning" onClick={handleExportCSV}>
// // //             <FaDownload /> Export
// // //           </Button>

// // //           <Button size="sm" onClick={() => handleShow()}>
// // //             <FaPlus /> Add
// // //           </Button>

// // //         </Col>
// // //       </Row>

// // //       {/* TABLE */}
// // //       <Card>
// // //         <Card.Body>

// // //           <div className="table-responsive">
// // //             <Table bordered hover className="align-middle text-center">
// // //               <thead>
// // //                 <tr>
// // //                   <th>Thumbnail</th>
// // //                   <th>Frame</th>
// // //                   <th>Title</th>
// // //                   <th>Type</th>
// // //                   <th>Status</th>
// // //                   <th>Actions</th>
// // //                 </tr>
// // //               </thead>

// // //               <tbody>
// // //                 {templates.map((tpl) => (
// // //                   <tr key={tpl._id}>
// // //                     <td>
// // //                       {tpl.type === "video" ? (
// // //                         <video
// // //                           src={tpl.file}
// // //                           width="90"
// // //                           height="60"
// // //                           controls
// // //                           muted
// // //                           style={{ borderRadius: 6, objectFit: "cover" }}
// // //                         />
// // //                       ) : (
// // //                         <img
// // //                           src={tpl.file}
// // //                           width="90"
// // //                           height="60"
// // //                           style={{ objectFit: "cover", borderRadius: 6 }}
// // //                         />
// // //                       )}
// // //                     </td>

// // //                     <td>
// // //                       {tpl.frameFile ? (
// // //                         <img src={tpl.frameFile} width="90" height="60"
// // //                           style={{ borderRadius: 6 }} />
// // //                       ) : "—"}
// // //                     </td>

// // //                     <td>{tpl.title}</td>

// // //                     <td>
// // //                       <Badge bg={tpl.type === "video" ? "primary" : "info"}>
// // //                         {tpl.type}
// // //                       </Badge>
// // //                     </td>

// // //                     <td>
// // //                       <Form.Check
// // //                         type="switch"
// // //                         checked={tpl.status === "active"}
// // //                         onChange={() => handleToggleStatus(tpl)}
// // //                         label={tpl.status === "active" ? "Active" : "Inactive"}
// // //                       />
// // //                     </td>

// // //                     <td>
// // //                       <Button size="sm" className="me-1"
// // //                         onClick={() => handleShow(tpl)}>
// // //                         <FaEdit />
// // //                       </Button>

// // //                       <Button size="sm" variant="danger"
// // //                         onClick={() => handleDelete(tpl._id)}>
// // //                         <FaTrash />
// // //                       </Button>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>

// // //             </Table>
// // //           </div>

// // //           {/* Pagination */}
// // //           <div className="d-flex justify-content-center mt-3">
// // //             <Button size="sm"
// // //               disabled={page === 1}
// // //               onClick={() => setPage(page - 1)}>Prev</Button>

// // //             <span className="px-3 py-1 mx-2 border rounded">
// // //               Page {page} / {totalPages}
// // //             </span>

// // //             <Button size="sm"
// // //               disabled={page === totalPages}
// // //               onClick={() => setPage(page + 1)}>Next</Button>
// // //           </div>

// // //         </Card.Body>
// // //       </Card>

// // //       {/* ================= ADD / EDIT MODAL ================= */}
// // //       <Modal show={show} onHide={() => setShow(false)}
// // //         centered size="lg">
// // //         <Modal.Header closeButton>
// // //           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
// // //         </Modal.Header>

// // //         <Modal.Body>
// // //           <Form>

// // //             {/* Title & Type */}
// // //             <Row className="g-3">
// // //               <Col md={6}>
// // //                 <Form.Label>Title</Form.Label>
// // //                 <Form.Control
// // //                   name="title"
// // //                   value={form.title}
// // //                   onChange={handleChange}
// // //                 />
// // //               </Col>

// // //               <Col md={6}>
// // //                 <Form.Label>Type</Form.Label>
// // //                 <Form.Select
// // //                   name="type"
// // //                   value={form.type}
// // //                   onChange={handleChange}
// // //                 >
// // //                   <option value="video">Video</option>
// // //                   <option value="graphics">Graphics</option>
// // //                 </Form.Select>
// // //               </Col>
// // //             </Row>

// // //             {/* Parent */}
// // //             <Row className="g-3 mt-1">
// // //               <Col md={6}>
// // //                 <Form.Label>Parent Type</Form.Label>
// // //                 <Form.Select name="parentType"
// // //                   value={form.parentType}
// // //                   onChange={handleChange}
// // //                 >
// // //                   <option value="Category">Category</option>
// // //                   <option value="Birthday">Birthday</option>
// // //                   <option value="Anniversary">Anniversary</option>
// // //                   <option value="Festival">Festival</option>
// // //                 </Form.Select>
// // //               </Col>

// // //               <Col md={6}>
// // //                 <Form.Label>Select Parent</Form.Label>
// // //                 <Form.Select
// // //                   name="parentId"
// // //                   value={form.parentId}
// // //                   onChange={handleChange}
// // //                 >
// // //                   <option value="">Choose...</option>
// // //                   {parentOptions.map((p) => (
// // //                     <option key={p._id} value={p._id}>
// // //                       {form.parentType === "Category" && p.categoryName}
// // //                       {form.parentType === "Politician" && p.title}
// // //                       {form.parentType === "Religious" && p.title}
// // //                       {form.parentType === "Birthday" && p.name}
// // //                       {form.parentType === "Anniversary" && p.name}
// // //                       {form.parentType === "Festival" && p.title}
// // //                     </option>
// // //                   ))}
// // //                 </Form.Select>
// // //               </Col>
// // //             </Row>

// // //             {/* Files */}
// // //             <Row className="g-3 mt-1">
// // //               <Col md={6}>
// // //                 <Form.Label>Thumbnail</Form.Label>
// // //                 <Form.Control type="file" name="file"
// // //                   onChange={handleChange}
// // //                   accept="image/*,video/*"
// // //                 />
// // //                 {filePreview && (
// // //                   form.type === "video" ? (
// // //                     <video
// // //                       src={filePreview}
// // //                       width="140"
// // //                       controls
// // //                       muted
// // //                       className="mt-2"
// // //                       style={{ borderRadius: 8 }}
// // //                     />
// // //                   ) : (
// // //                     <img
// // //                       src={filePreview}
// // //                       width="140"
// // //                       className="mt-2"
// // //                       style={{ borderRadius: 8 }}
// // //                     />
// // //                   )
// // //                 )}
// // //               </Col>

// // //               <Col md={6}>
// // //                 <Form.Label>Frame</Form.Label>
// // //                 <Form.Control type="file" name="frameFile"
// // //                   onChange={handleChange}
// // //                   accept="image/*"
// // //                 />
// // //                 {framePreview && (
// // //                   <img src={framePreview} width="140" className="mt-2"
// // //                     style={{ borderRadius: 8 }} />
// // //                 )}
// // //               </Col>
// // //             </Row>

// // //             {/* ================= LIVE PREVIEW ================= */}
// // //             <div
// // //               ref={previewRef}
// // //               className="mt-3 mx-auto"
// // //               style={{
// // //                 width: 330,
// // //                 height: 330,
// // //                 borderRadius: 16,
// // //                 position: "relative",
// // //                 overflow: "hidden",
// // //                 background: "#111",
// // //                 boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
// // //                 // cursor: isPositioning ? "default" : "not-allowed"
// // //                 cursor: isPositioning ? "crosshair" : "default"
// // //               }}
// // //             >

// // //               {/* BACKGROUND */}
// // //               {filePreview && (
// // //                 form.type === "video" ? (
// // //                   <video
// // //                     src={filePreview}
// // //                     autoPlay
// // //                     muted
// // //                     loop
// // //                     style={{
// // //                       width: "100%",
// // //                       height: "100%",
// // //                       objectFit: "cover",
// // //                       position: "absolute",
// // //                       inset: 0,
// // //                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// // //                       zIndex: 1,
// // //                     }}
// // //                   />
// // //                 ) : (
// // //                   <img
// // //                     src={filePreview}
// // //                     alt=""
// // //                     style={{
// // //                       width: "100%",
// // //                       height: "100%",
// // //                       objectFit: "cover",
// // //                       position: "absolute",
// // //                       inset: 0,
// // //                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// // //                       zIndex: 1,
// // //                     }}
// // //                   />
// // //                 )
// // //               )}


// // //               {form.profileSize > 0 && (

// // //   <div
// // //     ref={profileRef}
// // //     onMouseDown={isPositioning ? handleProfileMouseDown : undefined}
// // //     style={{
// // //       position: "absolute",
// // //       top: `${form.profileY}%`,
// // //       left: `${form.profileX}%`,
// // //       transform: "translate(-50%, -50%)",

// // //       width: form.profileSize,
// // //       height: form.profileSize,

// // //       borderRadius: `${form.profileRadius}%`,
// // //       background: "rgba(255,255,255,.85)",

// // //       display: "flex",
// // //       alignItems: "center",
// // //       justifyContent: "center",

// // //       cursor: isDragging ? "grabbing" : "grab",

// // //       border: isPositioning
// // //         ? "2px dashed #17a2b8"
// // //         : "none",

// // //       zIndex: 20,
// // //       transition: isDragging ? "none" : ".15s"
// // //     }}
// // //   >

// // //     {/* PLUS ICON */}
// // //     {isPositioning && (
// // //       <FaPlus size={22} color="#17a2b8" />
// // //     )}

// // //     {/* RESIZE HANDLES */}
// // //     {isPositioning && (
// // //       <>
// // //         {/* <ResizeHandle corner="tl"/>
// // //         <ResizeHandle corner="tr"/>
// // //         <ResizeHandle corner="bl"/>
// // //         <ResizeHandle corner="br"/> */}
// // //         <ResizeHandle corner="tl" handleResizeMouseDown={handleResizeMouseDown}/>
// // // <ResizeHandle corner="tr" handleResizeMouseDown={handleResizeMouseDown}/>
// // // <ResizeHandle corner="bl" handleResizeMouseDown={handleResizeMouseDown}/>
// // // <ResizeHandle corner="br" handleResizeMouseDown={handleResizeMouseDown}/>

// // //       </>
// // //     )}

// // //   </div>
// // // )}
// // // {/* ================= TEXT ELEMENT ================= */}
// // // {text.show && (
// // //   <div
// // //     onMouseDown={handleTextMouseDown}
// // //     style={{
// // //       position: "absolute",
// // //       top: `${text.y}%`,
// // //       left: `${text.x}%`,
// // //       transform: "translate(-50%, -50%)",
// // //       zIndex: 30
// // //     }}
// // //   >

// // //     {/* TEXT BOX */}
// // //     <div
// // //   ref={textRef}   // ⭐ MUST
// // //   contentEditable
// // //   suppressContentEditableWarning
// // //   spellCheck={false}
// // //  onInput={(e) => {

// // //   if (!e.currentTarget) return;

// // //   const val = e.currentTarget.innerText || "";

// // //   setText(prev => ({
// // //     ...prev,
// // //     value: val
// // //   }));

// // // }}

// // //   style={{
// // //     width: text.width,
// // //     minWidth: 60,
// // //     fontSize: `${text.size}px`,
// // //     fontWeight: 700,
// // //     color: "#fff",
// // //     padding: "6px 10px",
// // //     borderRadius: 6,
// // //     background: "rgba(0,0,0,.35)",
// // //     border: isPositioning ? "1px dashed #fff" : "none",
// // //     outline: "none",
// // //     cursor: "text",

// // //     textAlign: "left",     // ⭐ FIX reverse typing
// // //     direction: "ltr",
// // //     whiteSpace: "pre-wrap"
// // //   }}
// // // >
// // //   {text.value}
// // // </div>


// // //     {/* RESIZE HANDLE */}
// // //     {isPositioning && (
// // //       // <div
// // //       //   onMouseDown={(e) => {
// // //       //     e.stopPropagation();
// // //       //     setIsResizing(true);
// // //       //   }}
// // //       <div
// // //   data-resize="text"
// // //   onMouseDown={(e) => {
// // //     e.preventDefault();
// // //     e.stopPropagation();
// // //     setIsResizingText(true); // ✅ CORRECT
// // //   }}
// // //         style={{
// // //           position: "absolute",
// // //           right: -6,
// // //           bottom: -6,
// // //           width: 14,
// // //           height: 14,
// // //           background: "#17a2b8",
// // //           cursor: "nwse-resize",
// // //           borderRadius: 3
// // //         }}
// // //       />
// // //     )}

// // //   </div>
// // // )}


// // //               {/* FRAME */}
// // //               {framePreview && (
// // //                 <img
// // //                   src={framePreview}
// // //                   alt=""
// // //                   style={{
// // //                     width: "100%",
// // //                     height: "100%",
// // //                     objectFit: "contain",
// // //                     position: "absolute",
// // //                     inset: 0,
// // //                     transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
// // //                     zIndex: 4,
// // //                     pointerEvents: "none",
// // //                   }}
// // //                 />
// // //               )}

// // //             </div>

// // //             {/* ================= ACTION BUTTONS (Screenshot Style) ================= */}
// // //             <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
            
// // //               <Button 
// // //   onClick={() => {
// // //     setIsPositioning(true);

// // //     // agar circle exist nahi karta → create karo
// // //     if (form.profileSize === 0) {
// // //       setForm(prev => ({
// // //         ...prev,
// // //         // profileSize: 120,
// // //         profileSize: 0,
// // //         profileX: 50,
// // //         profileY: 50
// // //       }));
// // //     }
// // //   }}
// // //   style={{ 
// // //     backgroundColor: '#17a2b8', 
// // //     border: 'none',
// // //     borderRadius: 4,
// // //     padding: '8px 20px',
// // //     fontWeight: 500,
// // //     fontSize: 14
// // //   }}
// // // >
// // //   Add Circle Image
// // // </Button>

// // //               {/* <Button 
// // //                 onClick={() => setIsPositioning(true)}
// // //                 style={{ 
// // //                   backgroundColor: '#17a2b8', 
// // //                   border: 'none',
// // //                   borderRadius: 4,
// // //                   padding: '8px 20px',
// // //                   fontWeight: 500,
// // //                   fontSize: 14
// // //                 }}
// // //               >
// // //                 Add Image
// // //               </Button> */}
// // //               {/* <Button 
// // //                 style={{ 
// // //                   backgroundColor: '#17a2b8', 
// // //                   border: 'none',
// // //                   borderRadius: 4,
// // //                   padding: '8px 20px',
// // //                   fontWeight: 500,
// // //                   fontSize: 14
// // //                 }}
// // //               >
// // //                 Add Text
// // //               </Button> */}
// // //               <Button
// // //   // onClick={() => {
// // //   //   setIsPositioning(true);

// // //   //   setText({
// // //   //     value: "Your Text",
// // //   //     x: 50,
// // //   //     y: 50,
// // //   //     size: 24,
// // //   //     show: true
// // //   //   });
// // //   // }}
// // //   onClick={() => {
// // //   setIsPositioning(true);

// // //   setText(prev => {

// // //     // agar text already canvas par hai
// // //     if (prev.show) return prev;

// // //     // agar nahi hai → tab create karo
// // //     return {
// // //       value: "",
// // //       x: 50,
// // //       y: 50,
// // //       size: 24,
// // //       show: true
// // //     };
// // //   });
// // // }}

// // //   style={{ 
// // //     backgroundColor: '#17a2b8', 
// // //     border: 'none',
// // //     borderRadius: 4,
// // //     padding: '8px 20px',
// // //     fontWeight: 500,
// // //     fontSize: 14
// // //   }}
// // // >
// // //   Add Text
// // // </Button>

// // //               {/* <Button 
// // //                 onClick={() => setIsPositioning(false)}
// // //                 variant="danger"
// // //                 style={{ 
// // //                   borderRadius: 4,
// // //                   padding: '8px 20px',
// // //                   fontWeight: 500,
// // //                   fontSize: 14
// // //                 }}
// // //               >
// // //                 Delete Selected
// // //               </Button> */}
// // //               <Button
// // //   // onClick={handleDeleteProfile}
// // //   onClick={handleDeleteSelected}
// // //   variant="danger"
// // //   style={{ 
// // //     borderRadius: 4,
// // //     padding: '8px 20px',
// // //     fontWeight: 500,
// // //     fontSize: 14
// // //   }}
// // // >
// // //   Delete Selected
// // // </Button>

// // //             </div>

// // //             {/* ================= POSITION INPUT BOXES ================= */}
// // //             <Row className="mt-3 g-2">
// // //               <Col xs={3}>
// // //                 <Form.Label className="small text-muted mb-1">X Position</Form.Label>
// // //                 <Form.Control 
// // //                   type="number" 
// // //                   size="sm"
// // //                   value={Math.round(form.profileX)}
// // //                   onChange={(e) => setForm(prev => ({ ...prev, profileX: Number(e.target.value) }))}
// // //                   style={{ textAlign: 'center', fontWeight: 600 }}
// // //                 />
// // //               </Col>
// // //               <Col xs={3}>
// // //                 <Form.Label className="small text-muted mb-1">Y Position</Form.Label>
// // //                 <Form.Control 
// // //                   type="number" 
// // //                   size="sm"
// // //                   value={Math.round(form.profileY)}
// // //                   onChange={(e) => setForm(prev => ({ ...prev, profileY: Number(e.target.value) }))}
// // //                   style={{ textAlign: 'center', fontWeight: 600 }}
// // //                 />
// // //               </Col>
// // //               <Col xs={3}>
// // //                 <Form.Label className="small text-muted mb-1">Width</Form.Label>
// // //                 <Form.Control 
// // //                   type="number" 
// // //                   size="sm"
// // //                   value={form.profileSize}
// // //                   onChange={(e) => setForm(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
// // //                   style={{ textAlign: 'center', fontWeight: 600 }}
// // //                 />
// // //               </Col>
// // //               <Col xs={3}>
// // //                 <Form.Label className="small text-muted mb-1">Height</Form.Label>
// // //                 <Form.Control 
// // //                   type="number" 
// // //                   size="sm"
// // //                   value={form.profileSize}
// // //                   onChange={(e) => setForm(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
// // //                   style={{ textAlign: 'center', fontWeight: 600 }}
// // //                 />
// // //               </Col>
// // //             </Row>

// // //             {/* ================= FONT SIZE SLIDER ================= */}
// // //             {/* <div className="mt-3">
// // //               <Form.Label className="small text-muted">Font Size</Form.Label>
// // //               <Form.Range 
// // //                 min="10" 
// // //                 max="72" 
// // //                 defaultValue="24"
// // //                 style={{ 
// // //                   background: 'linear-gradient(to right, #17a2b8 0%, #17a2b8 50%, #ddd 50%, #ddd 100%)'
// // //                 }}
// // //               />
// // //             </div> */}
// // //             {/* ================= FONT SIZE CONTROL ================= */}
// // // {/* ================= FONT SIZE CONTROL ================= */}
// // // <div className="mt-3">
// // //   <Form.Label className="small text-muted mb-1">
// // //     Font Size ({text.size}px)
// // //   </Form.Label>

// // //   <Form.Control
// // //     type="number"
// // //     size="sm"
// // //     value={text.size}
// // //     min={10}
// // //     max={100}
// // //     // onChange={(e) =>
// // //     //   setText(prev => ({
// // //     //     ...prev,
// // //     //     size: Number(e.target.value)
// // //     //   }))
// // //     // }
// // //     onChange={(e) => {
// // //   let val = Number(e.target.value);

// // //   if (val < 10) val = 10;
// // //   if (val > 120) val = 120;

// // //   setText(prev => ({
// // //     ...prev,
// // //     size: val
// // //   }));
// // // }}

// // //     style={{
// // //       width: 120,
// // //       textAlign: "center",
// // //       fontWeight: 600
// // //     }}
// // //   />
// // // </div>



// // //             {/* ================= UPDATE & SHOW CANVAS BUTTONS ================= */}
// // //             {/* <div className="d-flex justify-content-center gap-2 mt-3">
// // //               <Button 
// // //                 style={{ 
// // //                   backgroundColor: '#ffc107', 
// // //                   border: 'none',
// // //                   borderRadius: 4,
// // //                   padding: '10px 30px',
// // //                   fontWeight: 600,
// // //                   color: '#000',
// // //                   fontSize: 14
// // //                 }}
// // //                 onClick={handleSubmit}
// // //               >
// // //                 Update Selected
// // //               </Button>
// // //               <Button 
// // //                 style={{ 
// // //                   backgroundColor: '#6c757d', 
// // //                   border: 'none',
// // //                   borderRadius: 4,
// // //                   padding: '10px 30px',
// // //                   fontWeight: 600,
// // //                   color: '#fff',
// // //                   fontSize: 14
// // //                 }}
// // //               >
// // //                 Show Canvas
// // //               </Button>
// // //             </div> */}

// // //             {/* ================= SAVE BUTTON ================= */}
// // //             {/* <div className="text-center mt-3">
// // //               <Button 
// // //                 style={{ 
// // //                   backgroundColor: '#17a2b8', 
// // //                   border: 'none',
// // //                   borderRadius: 4,
// // //                   padding: '10px 40px',
// // //                   fontWeight: 600,
// // //                   color: '#fff',
// // //                   fontSize: 16
// // //                 }}
// // //                 onClick={handleSubmit}
// // //                 disabled={loading}
// // //               >
// // //                 {loading ? "Saving..." : "Save"}
// // //               </Button>
// // //             </div> */}

// // //             {/* CONTROLS */}
// // //             <hr />

// // //             <h6>Transition Settings</h6>

// // //             <Form.Label>Transition Type</Form.Label>
// // //             <Form.Select
// // //               name="transitionType"
// // //               value={form.transitionType}
// // //               onChange={handleChange}
// // //             >
// // //               <option value="fade">Fade</option>
// // //               <option value="slideFromBottom">Slide Bottom</option>
// // //               <option value="slideFromTop">Slide Top</option>
// // //               <option value="slideFromLeft">Slide Left</option>
// // //               <option value="slideFromRight">Slide Right</option>
// // //               <option value="zoomIn">Zoom In</option>
// // //               <option value="rotate">Rotate</option>
// // //             </Form.Select>

// // //             <Form.Label className="mt-2">Transition Duration (sec)</Form.Label>
// // //             <Form.Control
// // //               type="number"
// // //               step="0.1"
// // //               name="transitionDuration"
// // //               value={form.transitionDuration}
// // //               onChange={handleChange}
// // //             />

// // //             <hr />
// // //             <h6>Profile Animation</h6>

// // //             <Form.Label>Animation</Form.Label>
// // //             <Form.Select
// // //               name="profileAnimation"
// // //               value={form.profileAnimation}
// // //               onChange={handleChange}
// // //             >
// // //               <option value="none">None</option>
// // //               <option value="fadeIn">Fade In</option>
// // //               <option value="popIn">Pop In</option>
// // //               <option value="bounce">Bounce</option>
// // //               <option value="scaleUp">Scale Up</option>
// // //               <option value="rotateIn">Rotate</option>
// // //             </Form.Select>

// // //             <Form.Label className="mt-2">Delay (sec)</Form.Label>
// // //             <Form.Control
// // //               type="number"
// // //               step="0.1"
// // //               name="profileDelay"
// // //               value={form.profileDelay}
// // //               onChange={handleChange}
// // //             />

// // //             <Form.Label className="mt-2">Duration (sec)</Form.Label>
// // //             <Form.Control
// // //               type="number"
// // //               step="0.1"
// // //               name="profileDuration"
// // //               value={form.profileDuration}
// // //               onChange={handleChange}
// // //             />

// // //             <hr />
// // //             {/* <h6>Thumbnail Controls</h6>
// // //             <Form.Label>Zoom: {form.fileZoom}x</Form.Label>
// // //             <Form.Range name="fileZoom" min="0.5" max="3"
// // //               step="0.1" value={form.fileZoom}
// // //               onChange={handleChange} />

// // //             <Form.Label>Move X: {form.fileX}px</Form.Label>
// // //             <Form.Range name="fileX" min="-200" max="200"
// // //               value={form.fileX}
// // //               onChange={handleChange} />

// // //             <Form.Label>Move Y: {form.fileY}px</Form.Label>
// // //             <Form.Range name="fileY" min="-200" max="200"
// // //               value={form.fileY}
// // //               onChange={handleChange} />

// // //             <hr /> */}
// // //             <h6>🎯 Profile Shape</h6>

// // //             <Form.Label>Border Radius (%): {form.profileRadius}%</Form.Label>
// // //             <Form.Range
// // //               name="profileRadius"
// // //               min="0"
// // //               max="50"
// // //               step="1"
// // //               value={form.profileRadius}
// // //               onChange={handleChange}
// // //             />

// // //             <hr />
// // //             <h6>Frame Controls</h6>
// // //             <Form.Label>Zoom: {form.frameZoom}x</Form.Label>
// // //             <Form.Range name="frameZoom" min="0.5" max="3"
// // //               step="0.1" value={form.frameZoom}
// // //               onChange={handleChange} />

// // //             <Form.Label>Move X: {form.frameX}px</Form.Label>
// // //             <Form.Range name="frameX" min="-200" max="200"
// // //               value={form.frameX}
// // //               onChange={handleChange} />

// // //             <Form.Label>Move Y: {form.frameY}px</Form.Label>
// // //             <Form.Range name="frameY" min="-200" max="200"
// // //               value={form.frameY}
// // //               onChange={handleChange} />

// // //           </Form>
// // //         </Modal.Body>

// // //         <Modal.Footer>
// // //           <Button variant="secondary"
// // //             onClick={() => setShow(false)}>Close</Button>

// // //           <Button variant="primary" disabled={loading}
// // //             onClick={handleSubmit}>
// // //             {loading ? "Saving..." : "Save"}
// // //           </Button>
// // //         </Modal.Footer>
// // //       </Modal>

// // //       {/* ================= CSV IMPORT MODAL ================= */}
// // //       <Modal show={showCsvModal}
// // //         onHide={() => setShowCsvModal(false)}
// // //         centered>
// // //         <Modal.Header closeButton>
// // //           <Modal.Title>Import Templates CSV</Modal.Title>
// // //         </Modal.Header>

// // //         <Modal.Body>
// // //           <Form.Group>
// // //             <Form.Label>Select CSV File</Form.Label>
// // //             <Form.Control
// // //               type="file"
// // //               accept=".csv"
// // //               onChange={(e) => setCsvFile(e.target.files[0])}
// // //             />
// // //           </Form.Group>
// // //         </Modal.Body>

// // //         <Modal.Footer>
// // //           <Button variant="secondary"
// // //             onClick={() => setShowCsvModal(false)}>Close</Button>

// // //           <Button variant="success"
// // //             disabled={csvUploading}
// // //             onClick={handleImportCSV}>
// // //             {csvUploading ? "Importing..." : "Import CSV"}
// // //           </Button>
// // //         </Modal.Footer>
// // //       </Modal>

// // //     </Container>
// // //   );
// // // };

// // // export default Templates;

// // import React, { useEffect, useState, useRef } from "react";
// // import {
// //   Container, Card, Button, Table, Badge, Modal,
// //   Form, InputGroup, Row, Col
// // } from "react-bootstrap";
// // import {
// //   FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
// // } from "react-icons/fa";
// // import axios from "axios";

// // // ✅ RESIZE HANDLE COMPONENT
// // const ResizeHandle = ({ corner, handleResizeMouseDown }) => {
// //   const positions = {
// //     tl: { top: -8, left: -8, cursor: "nwse-resize" },
// //     tr: { top: -8, right: -8, cursor: "nesw-resize" },
// //     bl: { bottom: -8, left: -8, cursor: "nesw-resize" },
// //     br: { bottom: -8, right: -8, cursor: "nwse-resize" }
// //   };

// //   return (
// //     <div
// //       data-resize="handle"
// //       onMouseDown={(e) => handleResizeMouseDown(e, corner)}
// //       style={{
// //         position: "absolute",
// //         width: 16,
// //         height: 16,
// //         background: "#fff",
// //         border: "2px solid #17a2b8",
// //         borderRadius: 4,
// //         zIndex: 999,
// //         ...positions[corner]
// //       }}
// //     />
// //   );
// // };

// // const Templates = () => {
// //   const BASE_URL = "http://localhost:7000/api";

// //   // CSV Modal States
// //   const [showCsvModal, setShowCsvModal] = useState(false);
// //   const [csvFile, setCsvFile] = useState(null);
// //   const [csvUploading, setCsvUploading] = useState(false);

// //   // Data States
// //   const [templates, setTemplates] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [politicians, setPoliticians] = useState([]);
// //   const [religiousList, setReligiousList] = useState([]);
// //   const [birthdayList, setBirthdayList] = useState([]);
// //   const [anniversaryList, setAnniversaryList] = useState([]);
// //   const [festivalList, setFestivalList] = useState([]);
  
// //   // ✅ TEXT REFS & STATES
// //   const [isResizingText, setIsResizingText] = useState(false);
// //   const [textResizeCorner, setTextResizeCorner] = useState(null);
// //   const textRef = useRef(null);
// //   const textWrapperRef = useRef(null);

// //   const [show, setShow] = useState(false);
// //   const [editId, setEditId] = useState(null);

// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const [filePreview, setFilePreview] = useState(null);
// //   const [framePreview, setFramePreview] = useState(null);

// //   const [text, setText] = useState({
// //     value: "",
// //     x: 50,
// //     y: 50,
// //     size: 24,
// //     width: 200,
// //     height: 60,
// //     show: false
// //   });

// //   const [isDraggingText, setIsDraggingText] = useState(false);

// //   // Profile positioning states
// //   const [isPositioning, setIsPositioning] = useState(false);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [isResizing, setIsResizing] = useState(false);
// //   const [resizeCorner, setResizeCorner] = useState(null);
  
// //   const previewRef = useRef(null);
// //   const profileRef = useRef(null);

// //   // Pagination
// //   const [page, setPage] = useState(1);
// //   const limit = 6;
// //   const [totalPages, setTotalPages] = useState(1);

// //   // Control Defaults
// //   const defaultControls = {
// //     fileZoom: 1,
// //     fileX: 0,
// //     fileY: 0,
// //     frameZoom: 1,
// //     frameX: 0,
// //     frameY: 0
// //   };

// //   // Main Form State
// //   const [form, setForm] = useState({
// //     title: "",
// //     type: "video",
// //     status: "active",
// //     parentType: "Category",
// //     parentId: "",
// //     file: null,
// //     frameFile: null,
// //     transitionPlacement: "below",
// //     transitionType: "fade",
// //     transitionDuration: 0.8,
// //     profileAnimation: "none",
// //     profileDelay: 2,
// //     profileDuration: 0.6,
// //     textAnimation: "none",
// //     textDelay: 0,
// //     textDuration: 0.5,
// //     profileX: 50,
// //     profileY: 50,
// //     profileSize: 0,
// //     profileRadius: 50,
// //     ...defaultControls
// //   });

// //   // =================== FETCH DATA ===================
// //   const fetchData = async () => {
// //     const tplRes = await axios.get(`${BASE_URL}/templates`, {
// //       params: { page, limit, search }
// //     });

// //     const [
// //       catRes, polRes, relRes, birthRes, anniRes, festRes
// //     ] = await Promise.all([
// //       axios.get(`${BASE_URL}/categories`),
// //       axios.get(`${BASE_URL}/politicians`),
// //       axios.get(`${BASE_URL}/religious`),
// //       axios.get(`${BASE_URL}/birthdays`),
// //       axios.get(`${BASE_URL}/anniversaries`),
// //       axios.get(`${BASE_URL}/festivals`)
// //     ]);

// //     setTemplates(tplRes.data.templates || []);
// //     setTotalPages(tplRes.data.pages || 1);
// //     setCategories(Array.isArray(catRes.data) ? catRes.data : []);
// //     setPoliticians(polRes.data.politicians || []);
// //     setReligiousList(relRes.data.religious || []);
// //     setBirthdayList(birthRes.data.birthdays || []);
// //     setAnniversaryList(anniRes.data.anniversaries || []);
// //     setFestivalList(festRes.data.festivals || []);
// //   };

// //   useEffect(() => { fetchData(); }, [page, search]);

// //   // =================== SHOW MODAL ===================
// //   const handleShow = (tpl = null) => {
// //     if (tpl) {
// //       setEditId(tpl._id);
// //       setForm({
// //         title: tpl.title,
// //         type: tpl.type,
// //         status: tpl.status,
// //         parentType:
// //           tpl.category ? "Category" :
// //             tpl.politician ? "Politician" :
// //               tpl.religious ? "Religious" :
// //                 tpl.birthday ? "Birthday" :
// //                   tpl.anniversary ? "Anniversary" :
// //                     tpl.festival ? "Festival" : "",
// //         parentId:
// //           tpl.category?._id ||
// //           tpl.politician?._id ||
// //           tpl.religious?._id ||
// //           tpl.birthday?._id ||
// //           tpl.anniversary?._id ||
// //           tpl.festival?._id || "",
// //         file: null,
// //         frameFile: null,
// //         transitionPlacement: tpl.transition?.placement || "below",
// //         transitionType: tpl.transition?.type || "fade",
// //         transitionDuration: tpl.transition?.duration || 0.8,
// //         profileAnimation: tpl.animation?.profile?.effect || "none",
// //         profileDelay: tpl.animation?.profile?.delay || 2,
// //         profileDuration: tpl.animation?.profile?.duration || 0.6,
// //         textAnimation: tpl.animation?.text?.effect || "none",
// //         textDelay: tpl.animation?.text?.delay || 0,
// //         textDuration: tpl.animation?.text?.duration || 0.5,
// //         profileX: tpl.profile?.x || 50,
// //         profileY: tpl.profile?.y || 50,
// //         profileSize: tpl.profile?.size || 0,
// //         profileRadius: tpl.profile?.radius || 50,
// //         fileZoom: tpl.fileZoom || 1,
// //         fileX: tpl.fileX || 0,
// //         fileY: tpl.fileY || 0,
// //         frameZoom: tpl.frameZoom || 1,
// //         frameX: tpl.frameX || 0,
// //         frameY: tpl.frameY || 0
// //       });
// //       setFilePreview(tpl.file);
// //       setFramePreview(tpl.frameFile);
// //     } else {
// //       setEditId(null);
// //       setForm({
// //         title: "",
// //         type: "video",
// //         status: "active",
// //         parentType: "Category",
// //         parentId: "",
// //         file: null,
// //         frameFile: null,
// //         transitionPlacement: "below",
// //         transitionType: "fade",
// //         transitionDuration: 0.8,
// //         profileAnimation: "none",
// //         profileDelay: 2,
// //         profileDuration: 0.6,
// //         textAnimation: "none",
// //         textDelay: 0,
// //         textDuration: 0.5,
// //         profileX: 50,
// //         profileY: 50,
// //         profileSize: 0,
// //         profileRadius: 50,
// //         ...defaultControls
// //       });
// //       setFilePreview(null);
// //       setFramePreview(null);
// //     }
// //     setShow(true);
// //     setIsPositioning(false);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;

// //     if (files) {
// //       const file = files[0];
// //       setForm(prev => ({ ...prev, [name]: file }));
// //       if (name === "file") setFilePreview(URL.createObjectURL(file));
// //       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));
// //     } else {
// //       if (name === "parentType") {
// //         setForm(prev => ({
// //           ...prev,
// //           parentType: value,
// //           parentId: ""
// //         }));
// //       } else {
// //         setForm(prev => ({ ...prev, [name]: value }));
// //       }
// //     }
// //   };

// //   // =================== MOUSE HANDLERS ===================
// //   const handleProfileMouseDown = (e) => {
// //     if (!isPositioning) return;
// //     if (e.target.style.cursor?.includes("resize")) return;
// //     e.preventDefault();
// //     setIsDragging(true);
// //   };

// //   // ✅ FIXED TEXT MOUSE DOWN - Proper drag vs edit detection
// //   const handleTextMouseDown = (e) => {
// //     if (!isPositioning) return;
    
// //     // Agar resize handle pe click hua
// //     if (e.target.dataset.resize === "handle") {
// //       return;
// //     }
    
// //     // Agar input field pe click hua (editing ke liye)
// //     if (e.target.tagName === "INPUT") {
// //       return; // Allow editing
// //     }
    
// //     // Wrapper pe click hua - drag mode
// //     e.preventDefault();
// //     setIsDraggingText(true);
// //   };

// //   const handleResizeMouseDown = (e, corner) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setIsResizing(true);
// //     setResizeCorner(corner);
// //   };

// //   // ✅ TEXT RESIZE HANDLER
// //   const handleTextResizeMouseDown = (e, corner) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setIsResizingText(true);
// //     setTextResizeCorner(corner);
// //   };

// //   const handleMouseMove = (e) => {
// //     if (!previewRef.current) return;

// //     const rect = previewRef.current.getBoundingClientRect();
// //     const x = ((e.clientX - rect.left) / rect.width) * 100;
// //     const y = ((e.clientY - rect.top) / rect.height) * 100;

// //     // PROFILE DRAGGING
// //     if (isDragging) {
// //       setForm(prev => ({
// //         ...prev,
// //         profileX: Math.max(0, Math.min(100, x)),
// //         profileY: Math.max(0, Math.min(100, y))
// //       }));
// //     }

// //     // TEXT DRAGGING
// //     if (isDraggingText) {
// //       setText(prev => ({
// //         ...prev,
// //         x: Math.max(0, Math.min(100, x)),
// //         y: Math.max(0, Math.min(100, y))
// //       }));
// //     }

// //     // ✅ TEXT RESIZING WITH CORNERS
// //     if (isResizingText && textRef.current) {
// //       const centerX = (text.x / 100) * rect.width + rect.left;
// //       const centerY = (text.y / 100) * rect.height + rect.top;

// //       let newWidth = text.width;
// //       let newHeight = text.height;

// //       if (textResizeCorner === "br") {
// //         newWidth = Math.max(80, (e.clientX - centerX) * 2);
// //         newHeight = Math.max(40, (e.clientY - centerY) * 2);
// //       } else if (textResizeCorner === "bl") {
// //         newWidth = Math.max(80, (centerX - e.clientX) * 2);
// //         newHeight = Math.max(40, (e.clientY - centerY) * 2);
// //       } else if (textResizeCorner === "tr") {
// //         newWidth = Math.max(80, (e.clientX - centerX) * 2);
// //         newHeight = Math.max(40, (centerY - e.clientY) * 2);
// //       } else if (textResizeCorner === "tl") {
// //         newWidth = Math.max(80, (centerX - e.clientX) * 2);
// //         newHeight = Math.max(40, (centerY - e.clientY) * 2);
// //       }

// //       setText(prev => ({
// //         ...prev,
// //         width: Math.round(newWidth),
// //         height: Math.round(newHeight)
// //       }));
// //       return;
// //     }

// //     // PROFILE RESIZING
// //     if (isResizing && profileRef.current) {
// //       const centerX = (form.profileX / 100) * rect.width + rect.left;
// //       const centerY = (form.profileY / 100) * rect.height + rect.top;
// //       const distX = Math.abs(e.clientX - centerX);
// //       const distY = Math.abs(e.clientY - centerY);
// //       const newSize = Math.max(50, Math.min(250, Math.max(distX, distY) * 2));
// //       setForm(prev => ({
// //         ...prev,
// //         profileSize: Math.round(newSize)
// //       }));
// //     }
// //   };

// //   const handleMouseUp = () => {
// //     setIsDragging(false);
// //     setIsResizing(false);
// //     setIsDraggingText(false);
// //     setIsResizingText(false);
// //     setResizeCorner(null);
// //     setTextResizeCorner(null);
// //   };

// //   useEffect(() => {
// //     if (isDragging || isResizing || isDraggingText || isResizingText) {
// //       window.addEventListener("mousemove", handleMouseMove);
// //       window.addEventListener("mouseup", handleMouseUp);
// //     }
// //     return () => {
// //       window.removeEventListener("mousemove", handleMouseMove);
// //       window.removeEventListener("mouseup", handleMouseUp);
// //     };
// //   }, [isDragging, isResizing, isDraggingText, isResizingText, text, form, textResizeCorner]);

// //   // =================== SUBMIT FORM ===================
// //   const handleSubmit = async () => {
// //     if (!form.title || !form.parentId) return alert("Fill required fields");
// //     setLoading(true);
// //     const fd = new FormData();
// //     Object.entries(form).forEach(([key, value]) => {
// //       if (value !== null) fd.append(key, value);
// //     });
// //     fd.append("parentType", form.parentType);
// //     fd.append("parentId", form.parentId);
// //     if (editId)
// //       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
// //     else
// //       await axios.post(`${BASE_URL}/templates`, fd);
// //     setShow(false);
// //     fetchData();
// //     setLoading(false);
// //   };

// //   const handleDeleteSelected = () => {
// //     if (text.show) {
// //       setText({
// //         value: "",
// //         x: 50,
// //         y: 50,
// //         size: 24,
// //         width: 200,
// //         height: 60,
// //         show: false
// //       });
// //       return;
// //     }
// //     if (form.profileSize > 0) {
// //       setForm(prev => ({
// //         ...prev,
// //         profileSize: 0
// //       }));
// //     }
// //     setIsPositioning(false);
// //   };

// //   // =================== STATUS TOGGLE ===================
// //   const handleToggleStatus = async (tpl) => {
// //     try {
// //       await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
// //       fetchData();
// //     } catch (e) {
// //       alert("Toggle failed — backend route error");
// //     }
// //   };

// //   // =================== CSV EXPORT ===================
// //   const handleExportCSV = () => {
// //     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
// //   };

// //   // =================== CSV IMPORT ===================
// //   const handleImportCSV = async () => {
// //     if (!csvFile) return alert("Select a CSV file first!");
// //     setCsvUploading(true);
// //     const fd = new FormData();
// //     fd.append("csv", csvFile);
// //     try {
// //       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
// //       alert("CSV Imported Successfully!");
// //       setShowCsvModal(false);
// //       fetchData();
// //     } catch {
// //       alert("CSV Import Failed");
// //     } finally {
// //       setCsvUploading(false);
// //     }
// //   };

// //   // =================== PARENT DROPDOWN LOGIC ===================
// //   let parentOptions = [];
// //   if (form.parentType === "Category") parentOptions = categories;
// //   if (form.parentType === "Birthday") parentOptions = birthdayList;
// //   if (form.parentType === "Anniversary") parentOptions = anniversaryList;
// //   if (form.parentType === "Festival") parentOptions = festivalList;

// //   // =================== RENDER ===================
// //   return (
// //     <Container fluid className="py-3">
// //       {/* HEADER */}
// //       <Row className="align-items-center mb-3 g-2">
// //         <Col xs={12} md={4}>
// //           <h3 className="text-center text-md-start">Templates</h3>
// //         </Col>
// //         <Col xs={12} md={4}>
// //           <InputGroup className="mt-2 mt-md-0">
// //             <Form.Control
// //               placeholder="Search by title..."
// //               value={search}
// //               onChange={e => { setSearch(e.target.value); setPage(1); }}
// //             />
// //             <Button><FaSearch /></Button>
// //           </InputGroup>
// //         </Col>
// //         <Col xs={12} md={4} className="text-md-end text-center mt-2 mt-md-0">
// //           <Button className="me-2 mb-2" size="sm"
// //             variant="success" onClick={() => setShowCsvModal(true)}>
// //             <FaUpload /> Import
// //           </Button>
// //           <Button className="me-2 mb-2" size="sm"
// //             variant="warning" onClick={handleExportCSV}>
// //             <FaDownload /> Export
// //           </Button>
// //           <Button size="sm" onClick={() => handleShow()}>
// //             <FaPlus /> Add
// //           </Button>
// //         </Col>
// //       </Row>

// //       {/* TABLE */}
// //       <Card>
// //         <Card.Body>
// //           <div className="table-responsive">
// //             <Table bordered hover className="align-middle text-center">
// //               <thead>
// //                 <tr>
// //                   <th>Thumbnail</th>
// //                   <th>Frame</th>
// //                   <th>Title</th>
// //                   <th>Type</th>
// //                   <th>Status</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {templates.map((tpl) => (
// //                   <tr key={tpl._id}>
// //                     <td>
// //                       {tpl.type === "video" ? (
// //                         <video
// //                           src={tpl.file}
// //                           width="90"
// //                           height="60"
// //                           controls
// //                           muted
// //                           style={{ borderRadius: 6, objectFit: "cover" }}
// //                         />
// //                       ) : (
// //                         <img
// //                           src={tpl.file}
// //                           width="90"
// //                           height="60"
// //                           style={{ objectFit: "cover", borderRadius: 6 }}
// //                         />
// //                       )}
// //                     </td>
// //                     <td>
// //                       {tpl.frameFile ? (
// //                         <img src={tpl.frameFile} width="90" height="60"
// //                           style={{ borderRadius: 6 }} />
// //                       ) : "—"}
// //                     </td>
// //                     <td>{tpl.title}</td>
// //                     <td>
// //                       <Badge bg={tpl.type === "video" ? "primary" : "info"}>
// //                         {tpl.type}
// //                       </Badge>
// //                     </td>
// //                     <td>
// //                       <Form.Check
// //                         type="switch"
// //                         checked={tpl.status === "active"}
// //                         onChange={() => handleToggleStatus(tpl)}
// //                         label={tpl.status === "active" ? "Active" : "Inactive"}
// //                       />
// //                     </td>
// //                     <td>
// //                       <Button size="sm" className="me-1"
// //                         onClick={() => handleShow(tpl)}>
// //                         <FaEdit />
// //                       </Button>
// //                       <Button size="sm" variant="danger"
// //                         onClick={() => handleDelete(tpl._id)}>
// //                         <FaTrash />
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </Table>
// //           </div>

// //           {/* Pagination */}
// //           <div className="d-flex justify-content-center mt-3">
// //             <Button size="sm"
// //               disabled={page === 1}
// //               onClick={() => setPage(page - 1)}>Prev</Button>
// //             <span className="px-3 py-1 mx-2 border rounded">
// //               Page {page} / {totalPages}
// //             </span>
// //             <Button size="sm"
// //               disabled={page === totalPages}
// //               onClick={() => setPage(page + 1)}>Next</Button>
// //           </div>
// //         </Card.Body>
// //       </Card>

// //       {/* ================= ADD / EDIT MODAL ================= */}
// //       <Modal show={show} onHide={() => setShow(false)}
// //         centered size="lg">
// //         <Modal.Header closeButton>
// //           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
// //         </Modal.Header>

// //         <Modal.Body>
// //           <Form>
// //             {/* Title & Type */}
// //             <Row className="g-3">
// //               <Col md={6}>
// //                 <Form.Label>Title</Form.Label>
// //                 <Form.Control
// //                   name="title"
// //                   value={form.title}
// //                   onChange={handleChange}
// //                 />
// //               </Col>
// //               <Col md={6}>
// //                 <Form.Label>Type</Form.Label>
// //                 <Form.Select
// //                   name="type"
// //                   value={form.type}
// //                   onChange={handleChange}
// //                 >
// //                   <option value="video">Video</option>
// //                   <option value="graphics">Graphics</option>
// //                 </Form.Select>
// //               </Col>
// //             </Row>

// //             {/* Parent */}
// //             <Row className="g-3 mt-1">
// //               <Col md={6}>
// //                 <Form.Label>Parent Type</Form.Label>
// //                 <Form.Select name="parentType"
// //                   value={form.parentType}
// //                   onChange={handleChange}
// //                 >
// //                   <option value="Category">Category</option>
// //                   <option value="Birthday">Birthday</option>
// //                   <option value="Anniversary">Anniversary</option>
// //                   <option value="Festival">Festival</option>
// //                 </Form.Select>
// //               </Col>
// //               <Col md={6}>
// //                 <Form.Label>Select Parent</Form.Label>
// //                 <Form.Select
// //                   name="parentId"
// //                   value={form.parentId}
// //                   onChange={handleChange}
// //                 >
// //                   <option value="">Choose...</option>
// //                   {parentOptions.map((p) => (
// //                     <option key={p._id} value={p._id}>
// //                       {form.parentType === "Category" && p.categoryName}
// //                       {form.parentType === "Politician" && p.title}
// //                       {form.parentType === "Religious" && p.title}
// //                       {form.parentType === "Birthday" && p.name}
// //                       {form.parentType === "Anniversary" && p.name}
// //                       {form.parentType === "Festival" && p.title}
// //                     </option>
// //                   ))}
// //                 </Form.Select>
// //               </Col>
// //             </Row>

// //             {/* Files */}
// //             <Row className="g-3 mt-1">
// //               <Col md={6}>
// //                 <Form.Label>Thumbnail</Form.Label>
// //                 <Form.Control type="file" name="file"
// //                   onChange={handleChange}
// //                   accept="image/*,video/*"
// //                 />
// //                 {filePreview && (
// //                   form.type === "video" ? (
// //                     <video
// //                       src={filePreview}
// //                       width="140"
// //                       controls
// //                       muted
// //                       className="mt-2"
// //                       style={{ borderRadius: 8 }}
// //                     />
// //                   ) : (
// //                     <img
// //                       src={filePreview}
// //                       width="140"
// //                       className="mt-2"
// //                       style={{ borderRadius: 8 }}
// //                     />
// //                   )
// //                 )}
// //               </Col>
// //               <Col md={6}>
// //                 <Form.Label>Frame</Form.Label>
// //                 <Form.Control type="file" name="frameFile"
// //                   onChange={handleChange}
// //                   accept="image/*"
// //                 />
// //                 {framePreview && (
// //                   <img src={framePreview} width="140" className="mt-2"
// //                     style={{ borderRadius: 8 }} />
// //                 )}
// //               </Col>
// //             </Row>

// //             {/* ================= LIVE PREVIEW ================= */}
// //             <div
// //               ref={previewRef}
// //               className="mt-3 mx-auto"
// //               style={{
// //                 width: 330,
// //                 height: 330,
// //                 borderRadius: 16,
// //                 position: "relative",
// //                 overflow: "hidden",
// //                 background: "#111",
// //                 boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
// //                 cursor: isPositioning ? "crosshair" : "default"
// //               }}
// //             >
// //               {/* BACKGROUND */}
// //               {filePreview && (
// //                 form.type === "video" ? (
// //                   <video
// //                     src={filePreview}
// //                     autoPlay
// //                     muted
// //                     loop
// //                     style={{
// //                       width: "100%",
// //                       height: "100%",
// //                       objectFit: "cover",
// //                       position: "absolute",
// //                       inset: 0,
// //                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// //                       zIndex: 1,
// //                     }}
// //                   />
// //                 ) : (
// //                   <img
// //                     src={filePreview}
// //                     alt=""
// //                     style={{
// //                       width: "100%",
// //                       height: "100%",
// //                       objectFit: "cover",
// //                       position: "absolute",
// //                       inset: 0,
// //                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
// //                       zIndex: 1,
// //                     }}
// //                   />
// //                 )
// //               )}

// //               {/* PROFILE CIRCLE */}
// //               {form.profileSize > 0 && (
// //                 <div
// //                   ref={profileRef}
// //                   onMouseDown={isPositioning ? handleProfileMouseDown : undefined}
// //                   style={{
// //                     position: "absolute",
// //                     top: `${form.profileY}%`,
// //                     left: `${form.profileX}%`,
// //                     transform: "translate(-50%, -50%)",
// //                     width: form.profileSize,
// //                     height: form.profileSize,
// //                     borderRadius: `${form.profileRadius}%`,
// //                     background: "rgba(255,255,255,.85)",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     cursor: isDragging ? "grabbing" : "grab",
// //                     border: isPositioning ? "2px dashed #17a2b8" : "none",
// //                     zIndex: 20,
// //                     transition: isDragging ? "none" : ".15s"
// //                   }}
// //                 >
// //                   {isPositioning && <FaPlus size={22} color="#17a2b8" />}
// //                   {isPositioning && (
// //                     <>
// //                       <ResizeHandle corner="tl" handleResizeMouseDown={handleResizeMouseDown}/>
// //                       <ResizeHandle corner="tr" handleResizeMouseDown={handleResizeMouseDown}/>
// //                       <ResizeHandle corner="bl" handleResizeMouseDown={handleResizeMouseDown}/>
// //                       <ResizeHandle corner="br" handleResizeMouseDown={handleResizeMouseDown}/>
// //                     </>
// //                   )}
// //                 </div>
// //               )}

// //               {/* ✅ TEXT ELEMENT - PROPER INPUT HANDLING */}
// //               {text.show && (
// //                 <div
// //                   ref={textWrapperRef}
// //                   onMouseDown={handleTextMouseDown}
// //                   style={{
// //                     position: "absolute",
// //                     top: `${text.y}%`,
// //                     left: `${text.x}%`,
// //                     transform: "translate(-50%, -50%)",
// //                     zIndex: 30,
// //                     cursor: isDraggingText ? "grabbing" : (isPositioning ? "move" : "default"),
// //                     userSelect: "none"
// //                   }}
// //                 >
// //                   <input
// //                     ref={textRef}
// //                     type="text"
// //                     value={text.value}
// //                     onChange={(e) => {
// //                       setText(prev => ({ ...prev, value: e.target.value }));
// //                     }}
// //                     onClick={(e) => {
// //                       e.stopPropagation(); // Prevent drag when clicking input
// //                     }}
// //                     placeholder="Type here..."
// //                     style={{
// //                       width: text.width,
// //                       minWidth: 80,
// //                       height: text.height,
// //                       minHeight: 40,
// //                       fontSize: `${text.size}px`,
// //                       fontWeight: 700,
// //                       color: "#fff",
// //                       padding: "10px 14px",
// //                       borderRadius: 6,
// //                       background: "rgba(0,0,0,.6)",
// //                       border: isPositioning ? "2px dashed #17a2b8" : "none",
// //                       outline: "none",
// //                       textAlign: "center",
// //                       cursor: "text"
// //                     }}
// //                   />

// //                   {/* ✅ CORNER RESIZE HANDLES FOR TEXT */}
// //                   {isPositioning && (
// //                     <>
// //                       <ResizeHandle corner="tl" handleResizeMouseDown={handleTextResizeMouseDown}/>
// //                       <ResizeHandle corner="tr" handleResizeMouseDown={handleTextResizeMouseDown}/>
// //                       <ResizeHandle corner="bl" handleResizeMouseDown={handleTextResizeMouseDown}/>
// //                       <ResizeHandle corner="br" handleResizeMouseDown={handleTextResizeMouseDown}/>
// //                     </>
// //                   )}
// //                 </div>
// //               )}

// //               {/* FRAME */}
// //               {framePreview && (
// //                 <img
// //                   src={framePreview}
// //                   alt=""
// //                   style={{
// //                     width: "100%",
// //                     height: "100%",
// //                     objectFit: "contain",
// //                     position: "absolute",
// //                     inset: 0,
// //                     transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
// //                     zIndex: 4,
// //                     pointerEvents: "none",
// //                   }}
// //                 />
// //               )}
// //             </div>

// //             {/* ================= ACTION BUTTONS ================= */}
// //             <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
// //               <Button 
// //                 onClick={() => {
// //                   setIsPositioning(true);
// //                   if (form.profileSize === 0) {
// //                     setForm(prev => ({
// //                       ...prev,
// //                       profileSize: 120,
// //                       profileX: 50,
// //                       profileY: 50
// //                     }));
// //                   }
// //                 }}
// //                 style={{ 
// //                   backgroundColor: '#17a2b8', 
// //                   border: 'none',
// //                   borderRadius: 4,
// //                   padding: '8px 20px',
// //                   fontWeight: 500,
// //                   fontSize: 14
// //                 }}
// //               >
// //                 Add Circle Image
// //               </Button>

// //               <Button
// //                 onClick={() => {
// //                   setIsPositioning(true);
// //                   setText(prev => {
// //                     if (prev.show) return prev;
// //                     return {
// //                       value: "",
// //                       x: 50,
// //                       y: 50,
// //                       size: 24,
// //                       width: 200,
// //                       height: 60,
// //                       show: true
// //                     };
// //                   });
// //                 }}
// //                 style={{ 
// //                   backgroundColor: '#17a2b8', 
// //                   border: 'none',
// //                   borderRadius: 4,
// //                   padding: '8px 20px',
// //                   fontWeight: 500,
// //                   fontSize: 14
// //                 }}
// //               >
// //                 Add Text
// //               </Button>

// //               <Button
// //                 onClick={handleDeleteSelected}
// //                 variant="danger"
// //                 style={{ 
// //                   borderRadius: 4,
// //                   padding: '8px 20px',
// //                   fontWeight: 500,
// //                   fontSize: 14
// //                 }}
// //               >
// //                 Delete Selected
// //               </Button>
// //             </div>

// //             {/* ================= POSITION INPUT BOXES ================= */}
// //             <Row className="mt-3 g-2">
// //               <Col xs={3}>
// //                 <Form.Label className="small text-muted mb-1">X Position</Form.Label>
// //                 <Form.Control 
// //                   type="number" 
// //                   size="sm"
// //                   value={Math.round(form.profileX)}
// //                   onChange={(e) => setForm(prev => ({ ...prev, profileX: Number(e.target.value) }))}
// //                   style={{ textAlign: 'center', fontWeight: 600 }}
// //                 />
// //               </Col>
// //               <Col xs={3}>
// //                 <Form.Label className="small text-muted mb-1">Y Position</Form.Label>
// //                 <Form.Control 
// //                   type="number" 
// //                   size="sm"
// //                   value={Math.round(form.profileY)}
// //                   onChange={(e) => setForm(prev => ({ ...prev, profileY: Number(e.target.value) }))}
// //                   style={{ textAlign: 'center', fontWeight: 600 }}
// //                 />
// //               </Col>
// //               <Col xs={3}>
// //                 <Form.Label className="small text-muted mb-1">Width</Form.Label>
// //                 <Form.Control 
// //                   type="number" 
// //                   size="sm"
// //                   value={form.profileSize}
// //                   onChange={(e) => setForm(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
// //                   style={{ textAlign: 'center', fontWeight: 600 }}
// //                 />
// //               </Col>
// //               <Col xs={3}>
// //                 <Form.Label className="small text-muted mb-1">Height</Form.Label>
// //                 <Form.Control 
// //                   type="number" 
// //                   size="sm"
// //                   value={form.profileSize}
// //                   onChange={(e) => setForm(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
// //                   style={{ textAlign: 'center', fontWeight: 600 }}
// //                 />
// //               </Col>
// //             </Row>

// //             {/* ================= FONT SIZE CONTROL ================= */}
// //             <div className="mt-3">
// //               <Form.Label className="small text-muted mb-1">
// //                 Font Size ({text.size}px)
// //               </Form.Label>
// //               <Form.Control
// //                 type="number"
// //                 size="sm"
// //                 value={text.size}
// //                 min={10}
// //                 max={120}
// //                 onChange={(e) => {
// //                   let val = Number(e.target.value);
// //                   if (val < 10) val = 10;
// //                   if (val > 120) val = 120;
// //                   setText(prev => ({ ...prev, size: val }));
// //                 }}
// //                 style={{
// //                   width: 120,
// //                   textAlign: "center",
// //                   fontWeight: 600
// //                 }}
// //               />
// //             </div>

// //             {/* CONTROLS */}
// //             <hr />
// //             <h6>Transition Settings</h6>
// //             <Form.Label>Transition Type</Form.Label>
// //             <Form.Select
// //               name="transitionType"
// //               value={form.transitionType}
// //               onChange={handleChange}
// //             >
// //               <option value="fade">Fade</option>
// //               <option value="slideFromBottom">Slide Bottom</option>
// //               <option value="slideFromTop">Slide Top</option>
// //               <option value="slideFromLeft">Slide Left</option>
// //               <option value="slideFromRight">Slide Right</option>
// //               <option value="zoomIn">Zoom In</option>
// //               <option value="rotate">Rotate</option>
// //             </Form.Select>

// //             <Form.Label className="mt-2">Transition Duration (sec)</Form.Label>
// //             <Form.Control
// //               type="number"
// //               step="0.1"
// //               name="transitionDuration"
// //               value={form.transitionDuration}
// //               onChange={handleChange}
// //             />

// //             <hr />
// //             <h6>Profile Animation</h6>
// //             <Form.Label>Animation</Form.Label>
// //             <Form.Select
// //               name="profileAnimation"
// //               value={form.profileAnimation}
// //               onChange={handleChange}
// //             >
// //               <option value="none">None</option>
// //               <option value="fadeIn">Fade In</option>
// //               <option value="popIn">Pop In</option>
// //               <option value="bounce">Bounce</option>
// //               <option value="scaleUp">Scale Up</option>
// //               <option value="rotateIn">Rotate</option>
// //             </Form.Select>

// //             <Form.Label className="mt-2">Delay (sec)</Form.Label>
// //             <Form.Control
// //               type="number"
// //               step="0.1"
// //               name="profileDelay"
// //               value={form.profileDelay}
// //               onChange={handleChange}
// //             />

// //             <Form.Label className="mt-2">Duration (sec)</Form.Label>
// //             <Form.Control
// //               type="number"
// //               step="0.1"
// //               name="profileDuration"
// //               value={form.profileDuration}
// //               onChange={handleChange}
// //             />

// //             <hr />
// //             <h6>🎯 Profile Shape</h6>
// //             <Form.Label>Border Radius (%): {form.profileRadius}%</Form.Label>
// //             <Form.Range
// //               name="profileRadius"
// //               min="0"
// //               max="50"
// //               step="1"
// //               value={form.profileRadius}
// //               onChange={handleChange}
// //             />

// //             <hr />
// //             <h6>Frame Controls</h6>
// //             <Form.Label>Zoom: {form.frameZoom}x</Form.Label>
// //             <Form.Range name="frameZoom" min="0.5" max="3"
// //               step="0.1" value={form.frameZoom}
// //               onChange={handleChange} />

// //             <Form.Label>Move X: {form.frameX}px</Form.Label>
// //             <Form.Range name="frameX" min="-200" max="200"
// //               value={form.frameX}
// //               onChange={handleChange} />

// //             <Form.Label>Move Y: {form.frameY}px</Form.Label>
// //             <Form.Range name="frameY" min="-200" max="200"
// //               value={form.frameY}
// //               onChange={handleChange} />
// //           </Form>
// //         </Modal.Body>

// //         <Modal.Footer>
// //           <Button variant="secondary"
// //             onClick={() => setShow(false)}>Close</Button>
// //           <Button variant="primary" disabled={loading}
// //             onClick={handleSubmit}>
// //             {loading ? "Saving..." : "Save"}
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>

// //       {/* ================= CSV IMPORT MODAL ================= */}
// //       <Modal show={showCsvModal}
// //         onHide={() => setShowCsvModal(false)}
// //         centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Import Templates CSV</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form.Group>
// //             <Form.Label>Select CSV File</Form.Label>
// //             <Form.Control
// //               type="file"
// //               accept=".csv"
// //               onChange={(e) => setCsvFile(e.target.files[0])}
// //             />
// //           </Form.Group>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary"
// //             onClick={() => setShowCsvModal(false)}>Close</Button>
// //           <Button variant="success"
// //             disabled={csvUploading}
// //             onClick={handleImportCSV}>
// //             {csvUploading ? "Importing..." : "Import CSV"}
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </Container>
// //   );
// // };

// // export default Templates;


// import React, { useEffect, useState, useRef } from "react";
// import {
//   Container, Card, Button, Table, Badge, Modal,
//   Form, InputGroup, Row, Col
// } from "react-bootstrap";
// import {
//   FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
// } from "react-icons/fa";
// import axios from "axios";

// // ✅ RESIZE HANDLE COMPONENT
// const ResizeHandle = ({ corner, handleResizeMouseDown }) => {
//   const positions = {
//     tl: { top: -8, left: -8, cursor: "nwse-resize" },
//     tr: { top: -8, right: -8, cursor: "nesw-resize" },
//     bl: { bottom: -8, left: -8, cursor: "nesw-resize" },
//     br: { bottom: -8, right: -8, cursor: "nwse-resize" }
//   };

//   return (
//     <div
//       data-resize="handle"
//       onMouseDown={(e) => handleResizeMouseDown(e, corner)}
//       style={{
//         position: "absolute",
//         width: 16,
//         height: 16,
//         background: "#fff",
//         border: "2px solid #17a2b8",
//         borderRadius: 4,
//         zIndex: 999,
//         ...positions[corner]
//       }}
//     />
//   );
// };

// const Templates = () => {
//   const BASE_URL = "http://localhost:7000/api";

//   // CSV Modal States
//   const [showCsvModal, setShowCsvModal] = useState(false);
//   const [csvFile, setCsvFile] = useState(null);
//   const [csvUploading, setCsvUploading] = useState(false);

//   // Data States
//   const [templates, setTemplates] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [politicians, setPoliticians] = useState([]);
//   const [religiousList, setReligiousList] = useState([]);
//   const [birthdayList, setBirthdayList] = useState([]);
//   const [anniversaryList, setAnniversaryList] = useState([]);
//   const [festivalList, setFestivalList] = useState([]);
  
//   // ✅ TEXT REFS & STATES
//   const [isResizingText, setIsResizingText] = useState(false);
//   const [textResizeCorner, setTextResizeCorner] = useState(null);
//   const textRef = useRef(null);
//   const textWrapperRef = useRef(null);

//   const [show, setShow] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [filePreview, setFilePreview] = useState(null);
//   const [framePreview, setFramePreview] = useState(null);

//   const [text, setText] = useState({
//     value: "",
//     x: 50,
//     y: 50,
//     size: 24,
//     width: 200,
//     height: 60,
//     show: false
//   });

//   const [isDraggingText, setIsDraggingText] = useState(false);
//   const [isEditingText, setIsEditingText] = useState(false);

//   // Profile positioning states
//   const [isPositioning, setIsPositioning] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizing, setIsResizing] = useState(false);
//   const [resizeCorner, setResizeCorner] = useState(null);
  
//   const previewRef = useRef(null);
//   const profileRef = useRef(null);

//   // Pagination
//   const [page, setPage] = useState(1);
//   const limit = 6;
//   const [totalPages, setTotalPages] = useState(1);

//   // Control Defaults
//   const defaultControls = {
//     fileZoom: 1,
//     fileX: 0,
//     fileY: 0,
//     frameZoom: 1,
//     frameX: 0,
//     frameY: 0
//   };

//   // Main Form State
//   const [form, setForm] = useState({
//     title: "",
//     type: "video",
//     status: "active",
//     parentType: "Category",
//     parentId: "",
//     file: null,
//     frameFile: null,
//     transitionPlacement: "below",
//     transitionType: "fade",
//     transitionDuration: 0.8,
//     profileAnimation: "none",
//     profileDelay: 2,
//     profileDuration: 0.6,
//     textAnimation: "none",
//     textDelay: 0,
//     textDuration: 0.5,
//     profileX: 50,
//     profileY: 50,
//     profileSize: 0,
//     profileRadius: 50,
//     ...defaultControls
//   });

//   // =================== FETCH DATA ===================
//   const fetchData = async () => {
//     const tplRes = await axios.get(`${BASE_URL}/templates`, {
//       params: { page, limit, search }
//     });

//     const [
//       catRes, polRes, relRes, birthRes, anniRes, festRes
//     ] = await Promise.all([
//       axios.get(`${BASE_URL}/categories`),
//       axios.get(`${BASE_URL}/politicians`),
//       axios.get(`${BASE_URL}/religious`),
//       axios.get(`${BASE_URL}/birthdays`),
//       axios.get(`${BASE_URL}/anniversaries`),
//       axios.get(`${BASE_URL}/festivals`)
//     ]);

//     setTemplates(tplRes.data.templates || []);
//     setTotalPages(tplRes.data.pages || 1);
//     setCategories(Array.isArray(catRes.data) ? catRes.data : []);
//     setPoliticians(polRes.data.politicians || []);
//     setReligiousList(relRes.data.religious || []);
//     setBirthdayList(birthRes.data.birthdays || []);
//     setAnniversaryList(anniRes.data.anniversaries || []);
//     setFestivalList(festRes.data.festivals || []);
//   };

//   useEffect(() => { fetchData(); }, [page, search]);

//   // =================== SHOW MODAL ===================
//   const handleShow = (tpl = null) => {
//     if (tpl) {
//       setEditId(tpl._id);
//       setForm({
//         title: tpl.title,
//         type: tpl.type,
//         status: tpl.status,
//         parentType:
//           tpl.category ? "Category" :
//             tpl.politician ? "Politician" :
//               tpl.religious ? "Religious" :
//                 tpl.birthday ? "Birthday" :
//                   tpl.anniversary ? "Anniversary" :
//                     tpl.festival ? "Festival" : "",
//         parentId:
//           tpl.category?._id ||
//           tpl.politician?._id ||
//           tpl.religious?._id ||
//           tpl.birthday?._id ||
//           tpl.anniversary?._id ||
//           tpl.festival?._id || "",
//         file: null,
//         frameFile: null,
//         transitionPlacement: tpl.transition?.placement || "below",
//         transitionType: tpl.transition?.type || "fade",
//         transitionDuration: tpl.transition?.duration || 0.8,
//         profileAnimation: tpl.animation?.profile?.effect || "none",
//         profileDelay: tpl.animation?.profile?.delay || 2,
//         profileDuration: tpl.animation?.profile?.duration || 0.6,
//         textAnimation: tpl.animation?.text?.effect || "none",
//         textDelay: tpl.animation?.text?.delay || 0,
//         textDuration: tpl.animation?.text?.duration || 0.5,
//         profileX: tpl.profile?.x || 50,
//         profileY: tpl.profile?.y || 50,
//         profileSize: tpl.profile?.size || 0,
//         profileRadius: tpl.profile?.radius || 50,
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
//         transitionPlacement: "below",
//         transitionType: "fade",
//         transitionDuration: 0.8,
//         profileAnimation: "none",
//         profileDelay: 2,
//         profileDuration: 0.6,
//         textAnimation: "none",
//         textDelay: 0,
//         textDuration: 0.5,
//         profileX: 50,
//         profileY: 50,
//         profileSize: 0,
//         profileRadius: 50,
//         ...defaultControls
//       });
//       setFilePreview(null);
//       setFramePreview(null);
//     }
//     setShow(true);
//     setIsPositioning(false);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       setForm(prev => ({ ...prev, [name]: file }));
//       if (name === "file") setFilePreview(URL.createObjectURL(file));
//       if (name === "frameFile") setFramePreview(URL.createObjectURL(file));
//     } else {
//       if (name === "parentType") {
//         setForm(prev => ({
//           ...prev,
//           parentType: value,
//           parentId: ""
//         }));
//       } else {
//         setForm(prev => ({ ...prev, [name]: value }));
//       }
//     }
//   };

//   // =================== MOUSE HANDLERS ===================
//   const handleProfileMouseDown = (e) => {
//     if (!isPositioning) return;
//     if (e.target.style.cursor?.includes("resize")) return;
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   // ✅ FIXED TEXT MOUSE DOWN - Proper drag vs edit detection
//   const handleTextMouseDown = (e) => {
//     if (!isPositioning) return;
    
//     // Agar resize handle pe click hua
//     if (e.target.dataset.resize === "handle") {
//       return;
//     }
    
//     // Agar input field pe click hua (editing ke liye)
//     if (e.target.tagName === "INPUT") {
//       setIsEditingText(true);
//       return; // Allow editing
//     }
    
//     // Wrapper pe click hua - drag mode
//     e.preventDefault();
//     setIsEditingText(false);
//     setIsDraggingText(true);
//   };

//   const handleResizeMouseDown = (e, corner) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsResizing(true);
//     setResizeCorner(corner);
//   };

//   // ✅ TEXT RESIZE HANDLER
//   const handleTextResizeMouseDown = (e, corner) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsResizingText(true);
//     setTextResizeCorner(corner);
//   };

//   const handleMouseMove = (e) => {
//     if (!previewRef.current) return;

//     const rect = previewRef.current.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;

//     // PROFILE DRAGGING
//     if (isDragging) {
//       setForm(prev => ({
//         ...prev,
//         profileX: Math.max(0, Math.min(100, x)),
//         profileY: Math.max(0, Math.min(100, y))
//       }));
//     }

//     // TEXT DRAGGING
//     if (isDraggingText) {
//       setText(prev => ({
//         ...prev,
//         x: Math.max(0, Math.min(100, x)),
//         y: Math.max(0, Math.min(100, y))
//       }));
//     }

//     // ✅ TEXT RESIZING WITH CORNERS
//     if (isResizingText && textRef.current) {
//       const centerX = (text.x / 100) * rect.width + rect.left;
//       const centerY = (text.y / 100) * rect.height + rect.top;

//       let newWidth = text.width;
//       let newHeight = text.height;

//       if (textResizeCorner === "br") {
//         newWidth = Math.max(80, (e.clientX - centerX) * 2);
//         newHeight = Math.max(40, (e.clientY - centerY) * 2);
//       } else if (textResizeCorner === "bl") {
//         newWidth = Math.max(80, (centerX - e.clientX) * 2);
//         newHeight = Math.max(40, (e.clientY - centerY) * 2);
//       } else if (textResizeCorner === "tr") {
//         newWidth = Math.max(80, (e.clientX - centerX) * 2);
//         newHeight = Math.max(40, (centerY - e.clientY) * 2);
//       } else if (textResizeCorner === "tl") {
//         newWidth = Math.max(80, (centerX - e.clientX) * 2);
//         newHeight = Math.max(40, (centerY - e.clientY) * 2);
//       }

//       setText(prev => ({
//         ...prev,
//         width: Math.round(newWidth),
//         height: Math.round(newHeight)
//       }));
//       return;
//     }

//     // PROFILE RESIZING
//     if (isResizing && profileRef.current) {
//       const centerX = (form.profileX / 100) * rect.width + rect.left;
//       const centerY = (form.profileY / 100) * rect.height + rect.top;
//       const distX = Math.abs(e.clientX - centerX);
//       const distY = Math.abs(e.clientY - centerY);
//       const newSize = Math.max(50, Math.min(250, Math.max(distX, distY) * 2));
//       setForm(prev => ({
//         ...prev,
//         profileSize: Math.round(newSize)
//       }));
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     setIsResizing(false);
//     setIsDraggingText(false);
//     setIsResizingText(false);
//     setResizeCorner(null);
//     setTextResizeCorner(null);
//   };

//   useEffect(() => {
//     if (isDragging || isResizing || isDraggingText || isResizingText) {
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);
//     }
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, isResizing, isDraggingText, isResizingText, text, form, textResizeCorner]);

//   // =================== SUBMIT FORM ===================
//   const handleSubmit = async () => {
//     if (!form.title || !form.parentId) return alert("Fill required fields");
//     setLoading(true);
//     const fd = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (value !== null) fd.append(key, value);
//     });
//     fd.append("parentType", form.parentType);
//     fd.append("parentId", form.parentId);
//     if (editId)
//       await axios.put(`${BASE_URL}/templates/${editId}`, fd);
//     else
//       await axios.post(`${BASE_URL}/templates`, fd);
//     setShow(false);
//     fetchData();
//     setLoading(false);
//   };

//   const handleDeleteSelected = () => {
//     if (text.show) {
//       setText({
//         value: "",
//         x: 50,
//         y: 50,
//         size: 24,
//         width: 200,
//         height: 60,
//         show: false
//       });
//       return;
//     }
//     if (form.profileSize > 0) {
//       setForm(prev => ({
//         ...prev,
//         profileSize: 0
//       }));
//     }
//     setIsPositioning(false);
//   };

//   // ✅ DELETE TEMPLATE (API)
// const handleDelete = async (id) => {

//   if (!window.confirm("Delete this template?")) return;

//   try {

//     await axios.delete(`${BASE_URL}/templates/${id}`);

//     // list refresh
//     fetchData();

//   } catch (err) {

//     console.error(err);
//     alert("Delete failed");

//   }
// };


//   // =================== STATUS TOGGLE ===================
//   const handleToggleStatus = async (tpl) => {
//     try {
//       await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
//       fetchData();
//     } catch (e) {
//       alert("Toggle failed — backend route error");
//     }
//   };

//   // =================== CSV EXPORT ===================
//   const handleExportCSV = () => {
//     window.open(`${BASE_URL}/templates/export-csv`, "_blank");
//   };

//   // =================== CSV IMPORT ===================
//   const handleImportCSV = async () => {
//     if (!csvFile) return alert("Select a CSV file first!");
//     setCsvUploading(true);
//     const fd = new FormData();
//     fd.append("csv", csvFile);
//     try {
//       await axios.post(`${BASE_URL}/templates/import-csv-file`, fd);
//       alert("CSV Imported Successfully!");
//       setShowCsvModal(false);
//       fetchData();
//     } catch {
//       alert("CSV Import Failed");
//     } finally {
//       setCsvUploading(false);
//     }
//   };

//   // =================== PARENT DROPDOWN LOGIC ===================
//   let parentOptions = [];
//   if (form.parentType === "Category") parentOptions = categories;
//   if (form.parentType === "Birthday") parentOptions = birthdayList;
//   if (form.parentType === "Anniversary") parentOptions = anniversaryList;
//   if (form.parentType === "Festival") parentOptions = festivalList;

//   // =================== RENDER ===================
//   return (
//     <Container fluid className="py-3">
//       {/* HEADER */}
//       <Row className="align-items-center mb-3 g-2">
//         <Col xs={12} md={4}>
//           <h3 className="text-center text-md-start">Templates</h3>
//         </Col>
//         <Col xs={12} md={4}>
//           <InputGroup className="mt-2 mt-md-0">
//             <Form.Control
//               placeholder="Search by title..."
//               value={search}
//               onChange={e => { setSearch(e.target.value); setPage(1); }}
//             />
//             <Button><FaSearch /></Button>
//           </InputGroup>
//         </Col>
//         <Col xs={12} md={4} className="text-md-end text-center mt-2 mt-md-0">
//           <Button className="me-2 mb-2" size="sm"
//             variant="success" onClick={() => setShowCsvModal(true)}>
//             <FaUpload /> Import
//           </Button>
//           <Button className="me-2 mb-2" size="sm"
//             variant="warning" onClick={handleExportCSV}>
//             <FaDownload /> Export
//           </Button>
//           <Button size="sm" onClick={() => handleShow()}>
//             <FaPlus /> Add
//           </Button>
//         </Col>
//       </Row>

//       {/* TABLE */}
//       <Card>
//         <Card.Body>
//           <div className="table-responsive">
//             <Table bordered hover className="align-middle text-center">
//               <thead>
//                 <tr>
//                   <th>Thumbnail</th>
//                   <th>Frame</th>
//                   <th>Title</th>
//                   <th>Type</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {templates.map((tpl) => (
//                   <tr key={tpl._id}>
//                     <td>
//                       {tpl.type === "video" ? (
//                         <video
//                           src={tpl.file}
//                           width="90"
//                           height="60"
//                           controls
//                           muted
//                           style={{ borderRadius: 6, objectFit: "cover" }}
//                         />
//                       ) : (
//                         <img
//                           src={tpl.file}
//                           width="90"
//                           height="60"
//                           style={{ objectFit: "cover", borderRadius: 6 }}
//                         />
//                       )}
//                     </td>
//                     <td>
//                       {tpl.frameFile ? (
//                         <img src={tpl.frameFile} width="90" height="60"
//                           style={{ borderRadius: 6 }} />
//                       ) : "—"}
//                     </td>
//                     <td>{tpl.title}</td>
//                     <td>
//                       <Badge bg={tpl.type === "video" ? "primary" : "info"}>
//                         {tpl.type}
//                       </Badge>
//                     </td>
//                     <td>
//                       <Form.Check
//                         type="switch"
//                         checked={tpl.status === "active"}
//                         onChange={() => handleToggleStatus(tpl)}
//                         label={tpl.status === "active" ? "Active" : "Inactive"}
//                       />
//                     </td>
//                     <td>
//                       <Button size="sm" className="me-1"
//                         onClick={() => handleShow(tpl)}>
//                         <FaEdit />
//                       </Button>
//                       <Button size="sm" variant="danger"
//                         onClick={() => handleDelete(tpl._id)}>
//                         <FaTrash />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>

//           {/* Pagination */}
//           <div className="d-flex justify-content-center mt-3">
//             <Button size="sm"
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}>Prev</Button>
//             <span className="px-3 py-1 mx-2 border rounded">
//               Page {page} / {totalPages}
//             </span>
//             <Button size="sm"
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}>Next</Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* ================= ADD / EDIT MODAL ================= */}
//       <Modal show={show} onHide={() => setShow(false)}
//         centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form>
//             {/* Title & Type */}
//             <Row className="g-3">
//               <Col md={6}>
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   name="title"
//                   value={form.title}
//                   onChange={handleChange}
//                 />
//               </Col>
//               <Col md={6}>
//                 <Form.Label>Type</Form.Label>
//                 <Form.Select
//                   name="type"
//                   value={form.type}
//                   onChange={handleChange}
//                 >
//                   <option value="video">Video</option>
//                   <option value="graphics">Graphics</option>
//                 </Form.Select>
//               </Col>
//             </Row>

//             {/* Parent */}
//             <Row className="g-3 mt-1">
//               <Col md={6}>
//                 <Form.Label>Parent Type</Form.Label>
//                 <Form.Select name="parentType"
//                   value={form.parentType}
//                   onChange={handleChange}
//                 >
//                   <option value="Category">Category</option>
//                   <option value="Birthday">Birthday</option>
//                   <option value="Anniversary">Anniversary</option>
//                   <option value="Festival">Festival</option>
//                 </Form.Select>
//               </Col>
//               <Col md={6}>
//                 <Form.Label>Select Parent</Form.Label>
//                 <Form.Select
//                   name="parentId"
//                   value={form.parentId}
//                   onChange={handleChange}
//                 >
//                   <option value="">Choose...</option>
//                   {parentOptions.map((p) => (
//                     <option key={p._id} value={p._id}>
//                       {form.parentType === "Category" && p.categoryName}
//                       {form.parentType === "Politician" && p.title}
//                       {form.parentType === "Religious" && p.title}
//                       {form.parentType === "Birthday" && p.name}
//                       {form.parentType === "Anniversary" && p.name}
//                       {form.parentType === "Festival" && p.title}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Col>
//             </Row>

//             {/* Files */}
//             <Row className="g-3 mt-1">
//               <Col md={6}>
//                 <Form.Label>Thumbnail</Form.Label>
//                 <Form.Control type="file" name="file"
//                   onChange={handleChange}
//                   accept="image/*,video/*"
//                 />
//                 {/* {filePreview && (
//                   form.type === "video" ? (
//                     <video
//                       src={filePreview}
//                       width="140"
//                       controls
//                       muted
//                       className="mt-2"
//                       style={{ borderRadius: 8 }}
//                     />
//                   ) : (
//                     <img
//                       src={filePreview}
//                       width="140"
//                       className="mt-2"
//                       style={{ borderRadius: 8 }}
//                     />
//                   )
//                 )} */}
//               </Col>
//               <Col md={6}>
//                 <Form.Label>Frame</Form.Label>
//                 <Form.Control type="file" name="frameFile"
//                   onChange={handleChange}
//                   accept="image/*"
//                 />
//                 {/* {framePreview && (
//                   <img src={framePreview} width="140" className="mt-2"
//                     style={{ borderRadius: 8 }} />
//                 )} */}
//               </Col>
//             </Row>

//             {/* ================= LIVE PREVIEW ================= */}
//             <div
//               ref={previewRef}
//               className="mt-3 mx-auto"
//               style={{
//                 width: 330,
//                 height: 330,
//                 borderRadius: 16,
//                 position: "relative",
//                 overflow: "hidden",
//                 background: "#111",
//                 boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
//                 cursor: isPositioning ? "crosshair" : "default"
//               }}
//             >
//               {/* BACKGROUND */}
//               {filePreview && (
//                 form.type === "video" ? (
//                   <video
//                     src={filePreview}
//                     autoPlay
//                     muted
//                     loop
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       position: "absolute",
//                       inset: 0,
//                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
//                       zIndex: 1,
//                     }}
//                   />
//                 ) : (
//                   <img
//                     src={filePreview}
//                     alt=""
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       position: "absolute",
//                       inset: 0,
//                       transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
//                       zIndex: 1,
//                     }}
//                   />
//                 )
//               )}

//               {/* PROFILE CIRCLE */}
//               {form.profileSize > 0 && (
//                 <div
//                   ref={profileRef}
//                   onMouseDown={isPositioning ? handleProfileMouseDown : undefined}
//                   style={{
//                     position: "absolute",
//                     top: `${form.profileY}%`,
//                     left: `${form.profileX}%`,
//                     transform: "translate(-50%, -50%)",
//                     width: form.profileSize,
//                     height: form.profileSize,
//                     borderRadius: `${form.profileRadius}%`,
//                     background: "rgba(255,255,255,.85)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: isDragging ? "grabbing" : "grab",
//                     border: isPositioning ? "2px dashed #17a2b8" : "none",
//                     zIndex: 20,
//                     transition: isDragging ? "none" : ".15s"
//                   }}
//                 >
//                   {isPositioning && <FaPlus size={22} color="#17a2b8" />}
//                   {isPositioning && (
//                     <>
//                       <ResizeHandle corner="tl" handleResizeMouseDown={handleResizeMouseDown}/>
//                       <ResizeHandle corner="tr" handleResizeMouseDown={handleResizeMouseDown}/>
//                       <ResizeHandle corner="bl" handleResizeMouseDown={handleResizeMouseDown}/>
//                       <ResizeHandle corner="br" handleResizeMouseDown={handleResizeMouseDown}/>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* ✅ TEXT ELEMENT - PROPER INPUT HANDLING */}
//               {text.show && (
//                 <div
//                   ref={textWrapperRef}
//                   onMouseDown={handleTextMouseDown}
//                   style={{
//                     position: "absolute",
//                     top: `${text.y}%`,
//                     left: `${text.x}%`,
//                     transform: "translate(-50%, -50%)",
//                     zIndex: 30,
//                     cursor: isDraggingText ? "grabbing" : (isPositioning && !isEditingText ? "move" : "default"),
//                     padding: "2px",
//                     border: isPositioning && !isEditingText ? "2px solid transparent" : "none",
//                     borderRadius: 8
//                   }}
//                   onMouseEnter={() => {
//                     if (isPositioning && !isEditingText) {
//                       // Show drag cursor when hovering wrapper
//                     }
//                   }}
//                 >
//                   <input
//                     ref={textRef}
//                     type="text"
//                     value={text.value}
//                     onChange={(e) => {
//                       setText(prev => ({ ...prev, value: e.target.value }));
//                     }}
//                     onFocus={() => setIsEditingText(true)}
//                     onBlur={() => setIsEditingText(false)}
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent drag when clicking input
//                       setIsEditingText(true);
//                     }}
//                     placeholder="Type here..."
//                     style={{
//                       width: text.width,
//                       minWidth: 80,
//                       height: text.height,
//                       minHeight: 40,
//                       fontSize: `${text.size}px`,
//                       fontWeight: 700,
//                       color: "#fff",
//                       padding: "10px 14px",
//                       borderRadius: 6,
//                       background: "rgba(0,0,0,.6)",
//                       border: isPositioning ? "2px dashed #17a2b8" : "none",
//                       outline: "none",
//                       textAlign: "center",
//                       cursor: "text",
//                       pointerEvents: "auto"
//                     }}
//                   />

//                   {/* ✅ CORNER RESIZE HANDLES FOR TEXT */}
//                   {isPositioning && (
//                     <>
//                       <ResizeHandle corner="tl" handleResizeMouseDown={handleTextResizeMouseDown}/>
//                       <ResizeHandle corner="tr" handleResizeMouseDown={handleTextResizeMouseDown}/>
//                       <ResizeHandle corner="bl" handleResizeMouseDown={handleTextResizeMouseDown}/>
//                       <ResizeHandle corner="br" handleResizeMouseDown={handleTextResizeMouseDown}/>
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* FRAME */}
//               {framePreview && (
//                 <img
//                   src={framePreview}
//                   alt=""
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "contain",
//                     position: "absolute",
//                     inset: 0,
//                     transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
//                     zIndex: 4,
//                     pointerEvents: "none",
//                   }}
//                 />
//               )}
//             </div>

//             {/* ================= ACTION BUTTONS ================= */}
//             <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
//               <Button 
//                 onClick={() => {
//                   setIsPositioning(true);
//                   if (form.profileSize === 0) {
//                     setForm(prev => ({
//                       ...prev,
//                       profileSize: 120,
//                       profileX: 50,
//                       profileY: 50
//                     }));
//                   }
//                 }}
//                 style={{ 
//                   backgroundColor: '#17a2b8', 
//                   border: 'none',
//                   borderRadius: 4,
//                   padding: '8px 20px',
//                   fontWeight: 500,
//                   fontSize: 14
//                 }}
//               >
//                 Add Circle Image
//               </Button>

//               <Button
//                 onClick={() => {
//                   setIsPositioning(true);
//                   setText(prev => {
//                     if (prev.show) return prev;
//                     return {
//                       value: "",
//                       x: 50,
//                       y: 50,
//                       size: 24,
//                       width: 200,
//                       height: 60,
//                       show: true
//                     };
//                   });
//                 }}
//                 style={{ 
//                   backgroundColor: '#17a2b8', 
//                   border: 'none',
//                   borderRadius: 4,
//                   padding: '8px 20px',
//                   fontWeight: 500,
//                   fontSize: 14
//                 }}
//               >
//                 Add Text
//               </Button>

//               <Button
//                 onClick={handleDeleteSelected}
//                 variant="danger"
//                 style={{ 
//                   borderRadius: 4,
//                   padding: '8px 20px',
//                   fontWeight: 500,
//                   fontSize: 14
//                 }}
//               >
//                 Delete Selected
//               </Button>
//             </div>

//             {/* ================= POSITION INPUT BOXES ================= */}
//             <Row className="mt-3 g-2">
//               <Col xs={3}>
//                 <Form.Label className="small text-muted mb-1">X Position</Form.Label>
//                 <Form.Control 
//                   type="number" 
//                   size="sm"
//                   value={Math.round(form.profileX)}
//                   onChange={(e) => setForm(prev => ({ ...prev, profileX: Number(e.target.value) }))}
//                   style={{ textAlign: 'center', fontWeight: 600 }}
//                 />
//               </Col>
//               <Col xs={3}>
//                 <Form.Label className="small text-muted mb-1">Y Position</Form.Label>
//                 <Form.Control 
//                   type="number" 
//                   size="sm"
//                   value={Math.round(form.profileY)}
//                   onChange={(e) => setForm(prev => ({ ...prev, profileY: Number(e.target.value) }))}
//                   style={{ textAlign: 'center', fontWeight: 600 }}
//                 />
//               </Col>
//               <Col xs={3}>
//                 <Form.Label className="small text-muted mb-1">Width</Form.Label>
//                 <Form.Control 
//                   type="number" 
//                   size="sm"
//                   value={form.profileSize}
//                   onChange={(e) => setForm(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
//                   style={{ textAlign: 'center', fontWeight: 600 }}
//                 />
//               </Col>
//               <Col xs={3}>
//                 <Form.Label className="small text-muted mb-1">Height</Form.Label>
//                 <Form.Control 
//                   type="number" 
//                   size="sm"
//                   value={form.profileSize}
//                   onChange={(e) => setForm(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
//                   style={{ textAlign: 'center', fontWeight: 600 }}
//                 />
//               </Col>
//             </Row>

//             {/* ================= FONT SIZE CONTROL ================= */}
//             <div className="mt-3">
//               <Form.Label className="small text-muted mb-1">
//                 Font Size ({text.size}px)
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 size="sm"
//                 value={text.size}
//                 min={10}
//                 max={120}
//                 onChange={(e) => {
//                   let val = Number(e.target.value);
//                   if (val < 10) val = 10;
//                   if (val > 120) val = 120;
//                   setText(prev => ({ ...prev, size: val }));
//                 }}
//                 style={{
//                   width: 120,
//                   textAlign: "center",
//                   fontWeight: 600
//                 }}
//               />
//             </div>

//             {/* CONTROLS */}
//             <hr />
//             <h6>Transition Settings</h6>
//             <Form.Label>Transition Type</Form.Label>
//             <Form.Select
//               name="transitionType"
//               value={form.transitionType}
//               onChange={handleChange}
//             >
//               <option value="fade">Fade</option>
//               <option value="slideFromBottom">Slide Bottom</option>
//               <option value="slideFromTop">Slide Top</option>
//               <option value="slideFromLeft">Slide Left</option>
//               <option value="slideFromRight">Slide Right</option>
//               <option value="zoomIn">Zoom In</option>
//               <option value="rotate">Rotate</option>
//             </Form.Select>

//             <Form.Label className="mt-2">Transition Duration (sec)</Form.Label>
//             <Form.Control
//               type="number"
//               step="0.1"
//               name="transitionDuration"
//               value={form.transitionDuration}
//               onChange={handleChange}
//             />

//             <hr />
//             <h6>Profile Animation</h6>
//             <Form.Label>Animation</Form.Label>
//             <Form.Select
//               name="profileAnimation"
//               value={form.profileAnimation}
//               onChange={handleChange}
//             >
//               <option value="none">None</option>
//               <option value="fadeIn">Fade In</option>
//               <option value="popIn">Pop In</option>
//               <option value="bounce">Bounce</option>
//               <option value="scaleUp">Scale Up</option>
//               <option value="rotateIn">Rotate</option>
//             </Form.Select>

//             <Form.Label className="mt-2">Delay (sec)</Form.Label>
//             <Form.Control
//               type="number"
//               step="0.1"
//               name="profileDelay"
//               value={form.profileDelay}
//               onChange={handleChange}
//             />

//             <Form.Label className="mt-2">Duration (sec)</Form.Label>
//             <Form.Control
//               type="number"
//               step="0.1"
//               name="profileDuration"
//               value={form.profileDuration}
//               onChange={handleChange}
//             />

//             <hr />
//             <h6>🎯 Profile Shape</h6>
//             <Form.Label>Border Radius (%): {form.profileRadius}%</Form.Label>
//             <Form.Range
//               name="profileRadius"
//               min="0"
//               max="50"
//               step="1"
//               value={form.profileRadius}
//               onChange={handleChange}
//             />

//             <hr />
//             <h6>Frame Controls</h6>
//             <Form.Label>Zoom: {form.frameZoom}x</Form.Label>
//             <Form.Range name="frameZoom" min="0.5" max="3"
//               step="0.1" value={form.frameZoom}
//               onChange={handleChange} />

//             <Form.Label>Move X: {form.frameX}px</Form.Label>
//             <Form.Range name="frameX" min="-200" max="200"
//               value={form.frameX}
//               onChange={handleChange} />

//             <Form.Label>Move Y: {form.frameY}px</Form.Label>
//             <Form.Range name="frameY" min="-200" max="200"
//               value={form.frameY}
//               onChange={handleChange} />
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary"
//             onClick={() => setShow(false)}>Close</Button>
//           <Button variant="primary" disabled={loading}
//             onClick={handleSubmit}>
//             {loading ? "Saving..." : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ================= CSV IMPORT MODAL ================= */}
//       <Modal show={showCsvModal}
//         onHide={() => setShowCsvModal(false)}
//         centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Import Templates CSV</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Select CSV File</Form.Label>
//             <Form.Control
//               type="file"
//               accept=".csv"
//               onChange={(e) => setCsvFile(e.target.files[0])}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary"
//             onClick={() => setShowCsvModal(false)}>Close</Button>
//           <Button variant="success"
//             disabled={csvUploading}
//             onClick={handleImportCSV}>
//             {csvUploading ? "Importing..." : "Import CSV"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Templates;


import React, { useEffect, useState, useRef } from "react";
import {
  Container, Card, Button, Table, Badge, Modal,
  Form, InputGroup, Row, Col, Tabs, Tab
} from "react-bootstrap";
import {
  FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
} from "react-icons/fa";
import axios from "axios";

// ✅ RESIZE HANDLE COMPONENT
const ResizeHandle = ({ corner, handleResizeMouseDown }) => {
  const positions = {
    tl: { top: -8, left: -8, cursor: "nwse-resize" },
    tr: { top: -8, right: -8, cursor: "nesw-resize" },
    bl: { bottom: -8, left: -8, cursor: "nesw-resize" },
    br: { bottom: -8, right: -8, cursor: "nwse-resize" }
  };

  return (
    <div
      data-resize="handle"
      onMouseDown={(e) => handleResizeMouseDown(e, corner)}
      style={{
        position: "absolute",
        width: 16,
        height: 16,
        background: "#fff",
        border: "2px solid #17a2b8",
        borderRadius: 4,
        zIndex: 999,
        ...positions[corner]
      }}
    />
  );
};

const Templates = () => {
  const BASE_URL = "http://localhost:7000/api";

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
  const [languages, setLanguages] = useState([]);
const [selectedLanguage, setSelectedLanguage] = useState("");

  
  // ✅ TEXT REFS & STATES
  const [isResizingText, setIsResizingText] = useState(false);
  const [textResizeCorner, setTextResizeCorner] = useState(null);
  const textRef = useRef(null);
  const textWrapperRef = useRef(null);

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [filePreview, setFilePreview] = useState(null);
  const [framePreview, setFramePreview] = useState(null);

  const [text, setText] = useState({
    value: "",
    x: 50,
    y: 50,
    size: 24,
    width: 200,
    height: 60,
    show: false
  });

  const [isDraggingText, setIsDraggingText] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);

  // Profile positioning states
  const [isPositioning, setIsPositioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState(null);
  
  const previewRef = useRef(null);
  const profileRef = useRef(null);

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
    language: "",
    type: "video",
    status: "active",
    parentType: "Category",
    parentId: "",
    file: null,
    frameFile: null,
    transitionPlacement: "below",
    transitionType: "fade",
    transitionDuration: 0.8,
    profileAnimation: "none",
    profileDelay: 2,
    profileDuration: 0.6,
    textAnimation: "none",
    textDelay: 0,
    textDuration: 0.5,
    profileX: 50,
    profileY: 50,
    profileSize: 0,
    profileRadius: 50,
    ...defaultControls
  });

  // =================== FETCH DATA ===================
  const fetchData = async () => {
    const tplRes = await axios.get(`${BASE_URL}/templates`, {
      // params: { page, limit, search }
 params: {
  page,
  limit,
  search,
  language: selectedLanguage || undefined
}

    });

    const [
      catRes, polRes, relRes, birthRes, anniRes, festRes, langRes
    ] = await Promise.all([
      axios.get(`${BASE_URL}/categories`),
      axios.get(`${BASE_URL}/politicians`),
      axios.get(`${BASE_URL}/religious`),
      axios.get(`${BASE_URL}/birthdays`),
      axios.get(`${BASE_URL}/anniversaries`),
      axios.get(`${BASE_URL}/festivals`),
       axios.get(`${BASE_URL}/languages`)
    ]);

    setTemplates(tplRes.data.templates || []);
    setTotalPages(tplRes.data.pages || 1);
    setCategories(Array.isArray(catRes.data) ? catRes.data : []);
    setPoliticians(polRes.data.politicians || []);
    setReligiousList(relRes.data.religious || []);
    setBirthdayList(birthRes.data.birthdays || []);
    setAnniversaryList(anniRes.data.anniversaries || []);
    setFestivalList(festRes.data.festivals || []);
    setLanguages(langRes.data || []);
  };

  useEffect(() => { fetchData(); }, [page, search,selectedLanguage]);

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
          language: tpl.language?._id || "",
        file: null,
        frameFile: null,
        transitionPlacement: tpl.transition?.placement || "below",
        transitionType: tpl.transition?.type || "fade",
        transitionDuration: tpl.transition?.duration || 0.8,
        profileAnimation: tpl.animation?.profile?.effect || "none",
        profileDelay: tpl.animation?.profile?.delay || 2,
        profileDuration: tpl.animation?.profile?.duration || 0.6,
        textAnimation: tpl.animation?.text?.effect || "none",
        textDelay: tpl.animation?.text?.delay || 0,
        textDuration: tpl.animation?.text?.duration || 0.5,
        profileX: tpl.profile?.x || 50,
        profileY: tpl.profile?.y || 50,
        profileSize: tpl.profile?.size || 0,
        profileRadius: tpl.profile?.radius || 50,
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
        language: "",
        type: "video",
        status: "active",
        parentType: "Category",
        parentId: "",
        file: null,
        frameFile: null,
        transitionPlacement: "below",
        transitionType: "fade",
        transitionDuration: 0.8,
        profileAnimation: "none",
        profileDelay: 2,
        profileDuration: 0.6,
        textAnimation: "none",
        textDelay: 0,
        textDuration: 0.5,
        profileX: 50,
        profileY: 50,
        profileSize: 0,
        profileRadius: 50,
        ...defaultControls
      });
      setFilePreview(null);
      setFramePreview(null);
    }
    setShow(true);
    setIsPositioning(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm(prev => ({ ...prev, [name]: file }));
      if (name === "file") setFilePreview(URL.createObjectURL(file));
      if (name === "frameFile") setFramePreview(URL.createObjectURL(file));
    } else {
      if (name === "parentType") {
        setForm(prev => ({
          ...prev,
          parentType: value,
          parentId: ""
        }));
      } else {
        setForm(prev => ({ ...prev, [name]: value }));
      }
    }
  };

  // =================== MOUSE HANDLERS ===================
  const handleProfileMouseDown = (e) => {
    if (!isPositioning) return;
    if (e.target.style.cursor?.includes("resize")) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTextMouseDown = (e) => {
    if (!isPositioning) return;
    if (e.target.dataset.resize === "handle") return;
    if (e.target.tagName === "INPUT") {
      setIsEditingText(true);
      return;
    }
    e.preventDefault();
    setIsEditingText(false);
    setIsDraggingText(true);
  };

  const handleResizeMouseDown = (e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeCorner(corner);
  };

  const handleTextResizeMouseDown = (e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizingText(true);
    setTextResizeCorner(corner);
  };

  const handleMouseMove = (e) => {
    if (!previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (isDragging) {
      setForm(prev => ({
        ...prev,
        profileX: Math.max(0, Math.min(100, x)),
        profileY: Math.max(0, Math.min(100, y))
      }));
    }

    if (isDraggingText) {
      setText(prev => ({
        ...prev,
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
      }));
    }

    if (isResizingText && textRef.current) {
      const centerX = (text.x / 100) * rect.width + rect.left;
      const centerY = (text.y / 100) * rect.height + rect.top;

      let newWidth = text.width;
      let newHeight = text.height;

      if (textResizeCorner === "br") {
        newWidth = Math.max(80, (e.clientX - centerX) * 2);
        newHeight = Math.max(40, (e.clientY - centerY) * 2);
      } else if (textResizeCorner === "bl") {
        newWidth = Math.max(80, (centerX - e.clientX) * 2);
        newHeight = Math.max(40, (e.clientY - centerY) * 2);
      } else if (textResizeCorner === "tr") {
        newWidth = Math.max(80, (e.clientX - centerX) * 2);
        newHeight = Math.max(40, (centerY - e.clientY) * 2);
      } else if (textResizeCorner === "tl") {
        newWidth = Math.max(80, (centerX - e.clientX) * 2);
        newHeight = Math.max(40, (centerY - e.clientY) * 2);
      }

      setText(prev => ({
        ...prev,
        width: Math.round(newWidth),
        height: Math.round(newHeight)
      }));
      return;
    }

    if (isResizing && profileRef.current) {
      const centerX = (form.profileX / 100) * rect.width + rect.left;
      const centerY = (form.profileY / 100) * rect.height + rect.top;
      const distX = Math.abs(e.clientX - centerX);
      const distY = Math.abs(e.clientY - centerY);
      const newSize = Math.max(50, Math.min(250, Math.max(distX, distY) * 2));
      setForm(prev => ({
        ...prev,
        profileSize: Math.round(newSize)
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsDraggingText(false);
    setIsResizingText(false);
    setResizeCorner(null);
    setTextResizeCorner(null);
  };

  useEffect(() => {
    if (isDragging || isResizing || isDraggingText || isResizingText) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, isDraggingText, isResizingText, text, form, textResizeCorner]);

  // =================== SUBMIT FORM ===================
  const handleSubmit = async () => {
    if (!form.title || !form.parentId) return alert("Fill required fields");
   
    setLoading(true);
    const fd = new FormData();
    // Object.entries(form).forEach(([key, value]) => {
    //   if (value !== null) fd.append(key, value);
    // });
    Object.entries(form).forEach(([key, value]) => {

  // language empty hai to send mat kar
  // if (key === "language" && !value) return;
  if (key === "language" && value === "") return;


  if (value !== null) {
    fd.append(key, value);
  }
});
    fd.append("parentType", form.parentType);
    fd.append("parentId", form.parentId);
    // if (editId)
    //   await axios.put(`${BASE_URL}/templates/${editId}`, fd);
    // else
    //   await axios.post(`${BASE_URL}/templates`, fd);
    // setShow(false);
    // fetchData();
    // setLoading(false);
    try {

  if (editId) {
    await axios.put(`${BASE_URL}/templates/${editId}`, fd);
  } else {
    await axios.post(`${BASE_URL}/templates`, fd);
  }

  // success ke baad
  setShow(false);
  fetchData();

} catch (err) {

  console.log("SERVER ERROR 👉", err.response?.data);

  alert(
    err.response?.data?.message || 
    "Server error — check backend"
  );

} finally {

  // YE HAMESHA chalega
  setLoading(false);

}

  };

  const handleDeleteSelected = () => {
    if (text.show) {
      setText({
        value: "",
        x: 50,
        y: 50,
        size: 24,
        width: 200,
        height: 60,
        show: false
      });
      return;
    }
    if (form.profileSize > 0) {
      setForm(prev => ({
        ...prev,
        profileSize: 0
      }));
    }
    setIsPositioning(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      await axios.delete(`${BASE_URL}/templates/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleToggleStatus = async (tpl) => {
    try {
      await axios.put(`${BASE_URL}/templates/toggle-status/${tpl._id}`);
      fetchData();
    } catch (e) {
      alert("Toggle failed — backend route error");
    }
  };

  const handleExportCSV = () => {
    window.open(`${BASE_URL}/templates/export-csv`, "_blank");
  };

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

  let parentOptions = [];
  if (form.parentType === "Category") parentOptions = categories;
  if (form.parentType === "Birthday") parentOptions = birthdayList;
  if (form.parentType === "Anniversary") parentOptions = anniversaryList;
  if (form.parentType === "Festival") parentOptions = festivalList;

  // =================== RENDER ===================
  return (
    <Container fluid className="py-3">
      {/* HEADER */}
      {/* <Row className="align-items-center mb-3 g-2">
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
      </Row> */}
      <Row className="align-items-center mb-3 g-2">

  {/* TITLE */}
  <Col xs={12} md={3}>
    <h3 className="text-center text-md-start">Templates</h3>
  </Col>

  {/* SEARCH */}
  <Col xs={12} md={3}>
    <InputGroup className="mt-2 mt-md-0">
      <Form.Control
        placeholder="Search by title..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      <Button><FaSearch /></Button>
    </InputGroup>
  </Col>


  {/* ⭐⭐⭐ LANGUAGE FILTER */}
  <Col xs={12} md={3}>
    <Form.Select
      value={selectedLanguage}
      onChange={(e) => {
        setSelectedLanguage(e.target.value);
        setPage(1); // pagination reset
      }}
      className="mt-2 mt-md-0"
    >
      <option value="">All Languages</option>

      {languages.map((lang) => (
        <option key={lang._id} value={lang._id}>
          {lang.name}
        </option>
      ))}
    </Form.Select>
  </Col>


  {/* BUTTONS */}
  <Col xs={12} md={3} className="text-md-end text-center mt-2 mt-md-0">
    <Button
      className="me-2 mb-2"
      size="sm"
      variant="success"
      onClick={() => setShowCsvModal(true)}
    >
      <FaUpload /> Import
    </Button>

    <Button
      className="me-2 mb-2"
      size="sm"
      variant="warning"
      onClick={handleExportCSV}
    >
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
                  <th>Language</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((tpl) => (
                  <tr key={tpl._id}>
                    <td>
                      {tpl.type === "video" ? (
                        <video
                          src={tpl.file}
                          width="90"
                          height="60"
                          controls
                          muted
                          style={{ borderRadius: 6, objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={tpl.file}
                          width="90"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: 6 }}
                        />
                      )}
                    </td>
                    <td>
                      {tpl.frameFile ? (
                        <img src={tpl.frameFile} width="90" height="60"
                          style={{ borderRadius: 6 }} />
                      ) : "—"}
                    </td>
                    <td>{tpl.title}</td>
                    <td>{tpl.language?.name || "-"}</td>

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
      <Modal show={show} onHide={() => setShow(false)} centered size="xl" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Template" : "Add Template"}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          <Row>
            {/* LEFT COLUMN - PREVIEW */}
            <Col lg={5}>
              <div
                ref={previewRef}
                className="mx-auto"
                style={{
                  width: '100%',
                  maxWidth: 330,
                  height: 330,
                  borderRadius: 16,
                  position: "relative",
                  overflow: "hidden",
                  background: "#111",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                  cursor: isPositioning ? "crosshair" : "default"
                }}
              >
                {/* BACKGROUND */}
                {filePreview && (
                  form.type === "video" ? (
                    <video
                      src={filePreview}
                      autoPlay
                      muted
                      loop
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                        transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <img
                      src={filePreview}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                        transform: `scale(${form.fileZoom}) translate(${form.fileX}px, ${form.fileY}px)`,
                        zIndex: 1,
                      }}
                    />
                  )
                )}

                {/* PROFILE CIRCLE */}
                {form.profileSize > 0 && (
                  <div
                    ref={profileRef}
                    onMouseDown={isPositioning ? handleProfileMouseDown : undefined}
                    style={{
                      position: "absolute",
                      top: `${form.profileY}%`,
                      left: `${form.profileX}%`,
                      transform: "translate(-50%, -50%)",
                      width: form.profileSize,
                      height: form.profileSize,
                      borderRadius: `${form.profileRadius}%`,
                      background: "rgba(255,255,255,.85)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: isDragging ? "grabbing" : "grab",
                      border: isPositioning ? "2px dashed #17a2b8" : "none",
                      zIndex: 20,
                      transition: isDragging ? "none" : ".15s"
                    }}
                  >
                    {isPositioning && <FaPlus size={22} color="#17a2b8" />}
                    {isPositioning && (
                      <>
                        <ResizeHandle corner="tl" handleResizeMouseDown={handleResizeMouseDown}/>
                        <ResizeHandle corner="tr" handleResizeMouseDown={handleResizeMouseDown}/>
                        <ResizeHandle corner="bl" handleResizeMouseDown={handleResizeMouseDown}/>
                        <ResizeHandle corner="br" handleResizeMouseDown={handleResizeMouseDown}/>
                      </>
                    )}
                  </div>
                )}

                {/* TEXT ELEMENT */}
                {text.show && (
                  <div
                    ref={textWrapperRef}
                    onMouseDown={handleTextMouseDown}
                    style={{
                      position: "absolute",
                      top: `${text.y}%`,
                      left: `${text.x}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 30,
                      cursor: isDraggingText ? "grabbing" : (isPositioning && !isEditingText ? "move" : "default"),
                      padding: "2px",
                      border: isPositioning && !isEditingText ? "2px solid transparent" : "none",
                      borderRadius: 8
                    }}
                  >
                    <input
                      ref={textRef}
                      type="text"
                      value={text.value}
                      onChange={(e) => setText(prev => ({ ...prev, value: e.target.value }))}
                      onFocus={() => setIsEditingText(true)}
                      onBlur={() => setIsEditingText(false)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingText(true);
                      }}
                      placeholder="Type here..."
                      style={{
                        width: text.width,
                        minWidth: 80,
                        height: text.height,
                        minHeight: 40,
                        fontSize: `${text.size}px`,
                        fontWeight: 700,
                        color: "#fff",
                        padding: "10px 14px",
                        borderRadius: 6,
                        background: "rgba(0,0,0,.6)",
                        border: isPositioning ? "2px dashed #17a2b8" : "none",
                        outline: "none",
                        textAlign: "center",
                        cursor: "text",
                        pointerEvents: "auto"
                      }}
                    />

                    {isPositioning && (
                      <>
                        <ResizeHandle corner="tl" handleResizeMouseDown={handleTextResizeMouseDown}/>
                        <ResizeHandle corner="tr" handleResizeMouseDown={handleTextResizeMouseDown}/>
                        <ResizeHandle corner="bl" handleResizeMouseDown={handleTextResizeMouseDown}/>
                        <ResizeHandle corner="br" handleResizeMouseDown={handleTextResizeMouseDown}/>
                      </>
                    )}
                  </div>
                )}

                {/* FRAME */}
                {framePreview && (
                  <img
                    src={framePreview}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      position: "absolute",
                      inset: 0,
                      transform: `scale(${form.frameZoom}) translate(${form.frameX}px, ${form.frameY}px)`,
                      zIndex: 4,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                <Button 
                  size="sm"
                  onClick={() => {
                    setIsPositioning(true);
                    if (form.profileSize === 0) {
                      setForm(prev => ({
                        ...prev,
                        profileSize: 120,
                        profileX: 50,
                        profileY: 50
                      }));
                    }
                  }}
                  variant="info"
                >
                  Add Circle Image
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    setIsPositioning(true);
                    setText(prev => {
                      if (prev.show) return prev;
                      return {
                        value: "",
                        x: 50,
                        y: 50,
                        size: 24,
                        width: 200,
                        height: 60,
                        show: true
                      };
                    });
                  }}
                  variant="info"
                >
                  Add Text
                </Button>

                <Button
                  size="sm"
                  onClick={handleDeleteSelected}
                  variant="danger"
                >
                  Delete Selected
                </Button>
              </div>
            </Col>

            {/* RIGHT COLUMN - FORM */}
            <Col lg={7}>
              <Tabs defaultActiveKey="basic" className="mb-3">
                {/* BASIC SETTINGS TAB */}
                <Tab eventKey="basic" title="Basic">
                  <Row className="g-2">
                    <Col md={6}>
                      <Form.Label className="small mb-1">Title *</Form.Label>
                      <Form.Control size="sm" name="title" value={form.title} onChange={handleChange} />
                    </Col>
                      <Col md={6}>
      <Form.Label className="small mb-1">Language *</Form.Label>
      <Form.Select
        size="sm"
        name="language"
        value={form.language}
        onChange={handleChange}
      >
        <option value="">Select Language</option>

        {languages.map((lang) => (
          <option key={lang._id} value={lang._id}>
            {lang.name}
          </option>
        ))}
      </Form.Select>
    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Type</Form.Label>
                      <Form.Select size="sm" name="type" value={form.type} onChange={handleChange}>
                        <option value="video">Video</option>
                        <option value="graphics">Graphics</option>
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Parent Type</Form.Label>
                      <Form.Select size="sm" name="parentType" value={form.parentType} onChange={handleChange}>
                        <option value="Category">Category</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Festival">Festival</option>
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Select Parent *</Form.Label>
                      <Form.Select size="sm" name="parentId" value={form.parentId} onChange={handleChange}>
                        <option value="">Choose...</option>
                        {parentOptions.map((p) => (
                          <option key={p._id} value={p._id}>
                            {form.parentType === "Category" && p.categoryName}
                            {form.parentType === "Politician" && p.title}
                            {form.parentType === "Religious" && p.title}
                            {form.parentType === "Birthday" && p.name}
                            {form.parentType === "Anniversary" && p.name}
                            {form.parentType === "Festival" && p.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Thumbnail</Form.Label>
                      <Form.Control size="sm" type="file" name="file" onChange={handleChange} accept="image/*,video/*" />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Frame</Form.Label>
                      <Form.Control size="sm" type="file" name="frameFile" onChange={handleChange} accept="image/*" />
                    </Col>
                  </Row>
                </Tab>

                {/* POSITION TAB */}
                <Tab eventKey="position" title="Position">
                  <h6 className="mb-2">Profile Position & Size</h6>
                  <Row className="g-2">
                    <Col xs={6}>
                      <Form.Label className="small">X: {Math.round(form.profileX)}</Form.Label>
                      <Form.Control size="sm" type="number" value={Math.round(form.profileX)}
                        onChange={(e) => setForm(prev => ({ ...prev, profileX: Number(e.target.value) }))} />
                    </Col>
                    <Col xs={6}>
                      <Form.Label className="small">Y: {Math.round(form.profileY)}</Form.Label>
                      <Form.Control size="sm" type="number" value={Math.round(form.profileY)}
                        onChange={(e) => setForm(prev => ({ ...prev, profileY: Number(e.target.value) }))} />
                    </Col>
                    <Col xs={6}>
                      <Form.Label className="small">Size: {form.profileSize}px</Form.Label>
                      <Form.Control size="sm" type="number" value={form.profileSize}
                        onChange={(e) => setForm(prev => ({ ...prev, profileSize: Number(e.target.value) }))} />
                    </Col>
                    <Col xs={6}>
                      <Form.Label className="small">Radius: {form.profileRadius}%</Form.Label>
                      <Form.Range size="sm" name="profileRadius" min="0" max="50" value={form.profileRadius} onChange={handleChange} />
                    </Col>
                  </Row>

                  <hr className="my-3" />

                  <h6 className="mb-2">Text Settings</h6>
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Label className="small">Font Size: {text.size}px</Form.Label>
                      <Form.Control size="sm" type="number" min={10} max={120} value={text.size}
                        onChange={(e) => setText(prev => ({ ...prev, size: Math.min(120, Math.max(10, Number(e.target.value))) }))} />
                    </Col>
                  </Row>
                </Tab>

                {/* ANIMATIONS TAB */}
                <Tab eventKey="animations" title="Animations">
                  <h6 className="mb-2">Transition</h6>
                  <Row className="g-2">
                    <Col md={6}>
                      <Form.Label className="small">Type</Form.Label>
                      <Form.Select size="sm" name="transitionType" value={form.transitionType} onChange={handleChange}>
                        <option value="fade">Fade</option>
                        <option value="slideFromBottom">Slide Bottom</option>
                        <option value="slideFromTop">Slide Top</option>
                        <option value="slideFromLeft">Slide Left</option>
                        <option value="slideFromRight">Slide Right</option>
                        <option value="zoomIn">Zoom In</option>
                        <option value="rotate">Rotate</option>
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small">Duration (sec)</Form.Label>
                      <Form.Control size="sm" type="number" step="0.1" name="transitionDuration" value={form.transitionDuration} onChange={handleChange} />
                    </Col>
                  </Row>

                  <hr className="my-3" />

                  <h6 className="mb-2">Profile Animation</h6>
                  <Row className="g-2">
                    <Col md={4}>
                      <Form.Label className="small">Effect</Form.Label>
                      <Form.Select size="sm" name="profileAnimation" value={form.profileAnimation} onChange={handleChange}>
                        <option value="none">None</option>
                        <option value="fadeIn">Fade In</option>
                        <option value="popIn">Pop In</option>
                        <option value="bounce">Bounce</option>
                        <option value="scaleUp">Scale Up</option>
                        <option value="rotateIn">Rotate</option>
                      </Form.Select>
                    </Col>
                    <Col md={4}>
                      <Form.Label className="small">Delay (sec)</Form.Label>
                      <Form.Control size="sm" type="number" step="0.1" name="profileDelay" value={form.profileDelay} onChange={handleChange} />
                    </Col>
                    <Col md={4}>
                      <Form.Label className="small">Duration (sec)</Form.Label>
                      <Form.Control size="sm" type="number" step="0.1" name="profileDuration" value={form.profileDuration} onChange={handleChange} />
                    </Col>
                  </Row>
                </Tab>

                {/* FRAME CONTROLS TAB */}
                <Tab eventKey="frame" title="Frame">
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Label className="small">Zoom: {form.frameZoom}x</Form.Label>
                      <Form.Range size="sm" name="frameZoom" min="0.5" max="3" step="0.1" value={form.frameZoom} onChange={handleChange} />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move X: {form.frameX}px</Form.Label>
                      <Form.Range size="sm" name="frameX" min="-200" max="200" value={form.frameX} onChange={handleChange} />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move Y: {form.frameY}px</Form.Label>
                      <Form.Range size="sm" name="frameY" min="-200" max="200" value={form.frameY} onChange={handleChange} />
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CSV IMPORT MODAL */}
      <Modal show={showCsvModal} onHide={() => setShowCsvModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Templates CSV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select CSV File</Form.Label>
            <Form.Control type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCsvModal(false)}>Close</Button>
          <Button variant="success" disabled={csvUploading} onClick={handleImportCSV}>
            {csvUploading ? "Importing..." : "Import CSV"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Templates;