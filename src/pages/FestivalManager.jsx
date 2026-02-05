
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Button, Modal, Form, Table, Image, Spinner } from "react-bootstrap";
// // import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// // const API_URL =
// //   process.env.REACT_APP_API_URL || "https://crafto-backend-zqcn.onrender.com/api/festivals";



// // const FestivalManager = () => {
// //   const [festivals, setFestivals] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editing, setEditing] = useState(null);

// //   const [search, setSearch] = useState("");
// //   const [page, setPage] = useState(1);
// //   const limit = 5;
// //   const [totalPages, setTotalPages] = useState(1);

// //   const [loadingList, setLoadingList] = useState(false);
// //   const [saving, setSaving] = useState(false);


// //   const [formData, setFormData] = useState({
// //   /* ================= BASIC ================= */
// //   title: "",
// //   template: "",
// //   status: "active",

// //   /* ================= TIMELINE ================= */
// //   startDate: "",   // maps to startAt
// //   endDate: "",     // maps to expireAt

// //   /* ================= LOGO ================= */
// //   logo: null,
// //   logoType: "",     // image | video
// //   preview: "",

// //   zoom: 1,
// //   x: 0,
// //   y: 0,

// //   /* ================= PROFILE SETTINGS ================= */
// //   profileSize: 120,
// //   profileShape: "circle",

// //   /* ================= PROFILE ANIMATION ================= */
// //   animationName: "fade",
// //   animationDuration: 0.8,   // seconds
// //   animationDelay: 0,
// //   animationEasing: "ease-in-out",

// //   /* ================= TRANSITION ================= */
// //   transitionType: "fade",
// //   transitionDuration: 0.8,
// //   transitionDelay: 0,
// //   transitionEasing: "ease-in-out",

// //   /* ================= BANNER ================= */
// //   banner: null,
// //   bannerPreview: "",
// //   bannerZoom: 1,
// //   bannerX: 0,
// //   bannerY: 0,
// // });


// //   /* ================= FETCH FESTIVALS ================= */
// //   const fetchData = async () => {
// //     try {
// //       setLoadingList(true);
// //       const res = await axios.get(API_URL, {
// //         params: { search, page, limit },
// //       });
// //       setFestivals(res.data.festivals || []);
// //       setTotalPages(res.data.pages || 1);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to load festivals");
// //     } finally {
// //       setLoadingList(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [page, search]);

// //   /* ================= HANDLE CHANGE ================= */
// //   const handleChange = (e) => {
// //     const { name, files, value } = e.target;

// //     if (files && files.length) {
// //       const file = files[0];

// //       if (name === "logo") {
// //         setFormData((p) => ({
// //           ...p,
// //           logo: file,
// //           preview: URL.createObjectURL(file),
// //           logoType: file.type.startsWith("video") ? "video" : "image",
// //         }));
// //         return;
// //       }

// //       if (name === "banner") {
// //         setFormData((p) => ({
// //           ...p,
// //           banner: file,
// //           bannerPreview: URL.createObjectURL(file),
// //         }));
// //         return;
// //       }
// //     }

// //     setFormData((p) => ({ ...p, [name]: value }));
// //   };



// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   try {
// //     setSaving(true);

// //     const data = new FormData();

// //     /* ================= BASIC ================= */
// //     data.append("title", formData.title);
// //     data.append("template", formData.template);
// //     data.append("status", formData.status);

// //     /* ================= TIMELINE ================= */
// //     data.append("startAt", formData.startDate);
// //     data.append("expireAt", formData.endDate);

// //     /* ================= LOGO TRANSFORM ================= */
// //     data.append("zoom", formData.zoom);
// //     data.append("offsetX", formData.x);
// //     data.append("offsetY", formData.y);

// //     /* ================= PROFILE ================= */
// //     data.append("profileSize", formData.profileSize);
// //     data.append("profileShape", formData.profileShape);

// //     /* ================= PROFILE ANIMATION ================= */
// //     data.append("animationName", formData.animationName);
// //     data.append("animationDuration", formData.animationDuration * 1000); // sec → ms
// //     data.append("animationDelay", formData.animationDelay * 1000);
// //     data.append("animationEasing", formData.animationEasing);

// //     /* ================= BANNER ================= */
// //     data.append("bannerZoom", formData.bannerZoom);
// //     data.append("bannerX", formData.bannerX);
// //     data.append("bannerY", formData.bannerY);

// //     /* ================= FILES ================= */
// //     if (formData.logo) data.append("logo", formData.logo);
// //     if (formData.banner) data.append("banner", formData.banner);

// //     const config = {
// //       headers: { "Content-Type": "multipart/form-data" },
// //     };

// //     if (editing) {
// //       await axios.put(`${API_URL}/${editing._id}`, data, config);
// //     } else {
// //       await axios.post(API_URL, data, config);
// //     }

// //     handleClose();
// //     fetchData();
// //   } catch (err) {
// //     console.error(err);
// //     alert("Save failed");
// //   } finally {
// //     setSaving(false);
// //   }
// // };


// // const handleEdit = (item) => {
// //   setEditing(item);

// //   setFormData({
// //     /* ================= BASIC ================= */
// //     title: item.title || "",
// //     template: item.template || "",
// //     status: item.status || "active",

// //     /* ================= TIMELINE ================= */
// //     startDate: item.startAt ? item.startAt.slice(0, 10) : "",
// //     endDate: item.expireAt ? item.expireAt.slice(0, 10) : "",

// //     /* ================= LOGO ================= */
// //     logo: null,
// //     preview: item.logo || "",
// //     logoType: item.logoType || "image",

// //     zoom: item.zoom || 1,
// //     x: item.offsetX || 0,
// //     y: item.offsetY || 0,

// //     /* ================= PROFILE ================= */
// //     profileSize: item.profile?.size || 120,
// //     profileShape: item.profile?.shape || "circle",

// //     /* ================= PROFILE ANIMATION ================= */
// //     animationName: item.profileAnimation?.name || "fade",
// //     animationDuration:
// //       item.profileAnimation?.duration
// //         ? item.profileAnimation.duration / 1000
// //         : 0.8, // ms → sec
// //     animationDelay:
// //       item.profileAnimation?.delay
// //         ? item.profileAnimation.delay / 1000
// //         : 0,
// //     animationEasing:
// //       item.profileAnimation?.easing || "ease-in-out",

// //     /* ================= BANNER ================= */
// //     banner: null,
// //     bannerPreview: item.banner || "",
// //     bannerZoom: item.bannerZoom || 1,
// //     bannerX: item.bannerX || 0,
// //     bannerY: item.bannerY || 0,
// //   });

// //   setShowModal(true);
// // };

// //   /* ================= DELETE ================= */
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this festival?")) return;
// //     await axios.delete(`${API_URL}/${id}`);
// //     fetchData();
// //   };



// // const handleClose = () => {
// //   setEditing(null);
// //   setShowModal(false);

// //   setFormData({
// //     /* ================= BASIC ================= */
// //     title: "",
// //     template: "",
// //     status: "active",

// //     /* ================= TIMELINE ================= */
// //     startDate: "",
// //     endDate: "",

// //     /* ================= LOGO ================= */
// //     logo: null,
// //     logoType: "",
// //     preview: "",

// //     zoom: 1,
// //     x: 0,
// //     y: 0,

// //     /* ================= PROFILE ================= */
// //     profileSize: 120,
// //     profileShape: "circle",

// //     /* ================= PROFILE ANIMATION ================= */
// //     animationName: "fade",
// //     animationDuration: 0.8,
// //     animationDelay: 0,
// //     animationEasing: "ease-in-out",

// //     /* ================= BANNER ================= */
// //     banner: null,
// //     bannerPreview: "",
// //     bannerZoom: 1,
// //     bannerX: 0,
// //     bannerY: 0,
// //   });
// // };



 

// //   return (
// //     <div>
// //       <div className="d-flex justify-content-between mb-3">
// //         <h4>Festival Templates</h4>
// //         <Button onClick={() => setShowModal(true)}>
// //           <FaPlus /> Add Festival
// //         </Button>
// //       </div>

// //       <input
// //         className="form-control mb-3"
// //         placeholder="Search festival..."
// //         value={search}
// //         onChange={(e) => {
// //           setSearch(e.target.value);
// //           setPage(1);
// //         }}
// //       />

// //       {loadingList ? (
// //         <Spinner />
// //       ) : (
// //         <Table bordered hover responsive>
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>Logo</th>
// //               <th>Banner</th>
// //               <th>Title</th>
// //               <th>Status</th>
              
// // <th>Start</th>
// // <th>End</th>
// //               {/* <th>Render</th> */}
              
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {festivals.map((f, i) => (
// //               <tr key={f._id}>
// //                 <td>{(page - 1) * limit + i + 1}</td>
// //                 <td>
// //                   {f.logo &&
// //                     (f.logo.includes(".mp4") ? (
// //                       <video src={f.logo} width="60" autoPlay loop muted />
// //                     ) : (
// //                       <Image src={f.logo} width="60" />
// //                     ))}
// //                 </td>
// //                 <td>{f.banner && <img src={f.banner} width="100" alt="" />}</td>
// //                 <td>{f.title}</td>
// //                 <td>
// //   <span
// //     className={`badge ${
// //       f.status === "active"
// //         ? "bg-success"
// //         : f.status === "expired"
// //         ? "bg-danger"
// //         : "bg-secondary"
// //     }`}
// //   >
// //     {f.status}
// //   </span>
// // </td>

// // <td>
// //   {f.startAt ? new Date(f.startAt).toISOString().slice(0,10) : "-"}
// // </td>

// // <td>
// //   {f.expireAt ? new Date(f.expireAt).toISOString().slice(0,10) : "-"}
// // </td>


                
// //                 {/* <td>
// //                   <Button size="sm" onClick={() => renderVideo(f._id)}>
// //                     Render
// //                   </Button>
// //                 </td> */}
// //                 <td>
// //                   {/* <Button size="sm" onClick={() => handleEdit(f)}>
// //                     <FaEdit />
// //                   </Button>{" "} */}
// //                   <Button
// //   size="sm"
// //   disabled={f.status === "expired"}
// //   onClick={() => handleEdit(f)}
// // >
// //   <FaEdit />
// // </Button>

// //                   <Button size="sm" variant="danger" onClick={() => handleDelete(f._id)}>
// //                     <FaTrash />
// //                   </Button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       )}

// //       {/* ================= MODAL ================= */}
// //       <Modal show={showModal} onHide={handleClose} centered size="lg">
// //         <Modal.Header closeButton>
// //           <Modal.Title>{editing ? "Edit" : "Add"} Festival</Modal.Title>
// //         </Modal.Header>


// // <Modal.Body>
// //   <Form onSubmit={handleSubmit}>

// //     {/* ================= BASIC ================= */}
// //     <Form.Control
// //       className="mb-2"
// //       name="title"
// //       placeholder="Festival Title"
// //       value={formData.title}
// //       onChange={handleChange}
// //       required
// //     />

// //     <Form.Control
// //       className="mb-2"
// //       name="template"
// //       placeholder="Template Name"
// //       value={formData.template}
// //       onChange={handleChange}
// //       required
// //     />

// //     {/* ================= FILES ================= */}
// //     <Form.Control
// //       className="mb-2"
// //       type="file"
// //       name="logo"
// //       accept="image/*,video/*"
// //       onChange={handleChange}
// //     />

// //     <Form.Control
// //       className="mb-2"
// //       type="file"
// //       name="banner"
// //       accept="image/*"
// //       onChange={handleChange}
// //     />

// //     {/* ================= TIMELINE ================= */}
// //     <Form.Label>Start Date</Form.Label>
// //     <Form.Control
// //       className="mb-2"
// //       type="date"
// //       name="startDate"
// //       value={formData.startDate}
// //       onChange={handleChange}
// //       required
// //     />

// //     <Form.Label>End Date</Form.Label>
// //     <Form.Control
// //       className="mb-3"
// //       type="date"
// //       name="endDate"
// //       value={formData.endDate}
// //       onChange={handleChange}
// //       required
// //     />

// //     <hr />

// //     {/* ================= PROFILE ANIMATION ================= */}
// //     <h6>Profile Animation</h6>

// //     <Form.Label>Animation Type</Form.Label>
// //     <Form.Select
// //       name="animationName"
// //       value={formData.animationName}
// //       onChange={handleChange}
// //     >
// //       <option value="fade">Fade</option>
// //       <option value="zoom">Zoom</option>
// //       <option value="slide">Slide</option>
// //       <option value="bounce">Bounce</option>
// //     </Form.Select>

// //     <Form.Label className="mt-2">Duration (seconds)</Form.Label>
// //     <Form.Control
// //       type="number"
// //       step="0.1"
// //       name="animationDuration"
// //       value={formData.animationDuration}
// //       onChange={handleChange}
// //     />

// //     <Form.Label className="mt-2">Delay (seconds)</Form.Label>
// //     <Form.Control
// //       type="number"
// //       step="0.1"
// //       name="animationDelay"
// //       value={formData.animationDelay}
// //       onChange={handleChange}
// //     />

// //     <Form.Label className="mt-2">Easing</Form.Label>
// //     <Form.Select
// //       name="animationEasing"
// //       value={formData.animationEasing}
// //       onChange={handleChange}
// //     >
// //       <option value="ease-in-out">Ease In Out</option>
// //       <option value="ease-in">Ease In</option>
// //       <option value="ease-out">Ease Out</option>
// //       <option value="linear">Linear</option>
// //     </Form.Select>

// //     <hr />

// //     {/* ================= SCREEN TRANSITION ================= */}
// //     <h6>Screen Transition</h6>

// //     <Form.Label>Transition Type</Form.Label>
// //     <Form.Select
// //       name="transitionType"
// //       value={formData.transitionType}
// //       onChange={handleChange}
// //     >
// //       <option value="fade">Fade</option>
// //       <option value="slide">Slide</option>
// //       <option value="zoom">Zoom</option>
// //     </Form.Select>

// //     <Form.Label className="mt-2">Duration (seconds)</Form.Label>
// //     <Form.Control
// //       type="number"
// //       step="0.1"
// //       name="transitionDuration"
// //       value={formData.transitionDuration}
// //       onChange={handleChange}
// //     />

// //     <Form.Label className="mt-3">Delay (seconds)</Form.Label>
// //     <Form.Control
// //       type="number"
// //       step="0.1"
// //       name="transitionDelay"
// //       value={formData.transitionDelay}
// //       onChange={handleChange}
// //     />

  

// //             {/* ===== BANNER PREVIEW ===== */}
// //             {formData.bannerPreview && (
// //               <div
// //                 style={{
// //                   width: "100%",
// //                   height: 150,
// //                   marginBottom: 10,
// //                   overflow: "hidden",
// //                   border: "1px dashed #ccc",
// //                 }}
// //               >
// //                 <img
// //                   src={formData.bannerPreview}
// //                   alt="banner"
// //                   style={{
// //                     width: "100%",
// //                     height: "100%",
// //                     objectFit: "cover",
// //                     transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`,
// //                   }}
// //                 />
// //               </div>
// //             )}

        

  
// // {formData.preview && (
// //   <div
// //     key={
// //       formData.animationName +
// //       formData.profileSize +
// //       formData.profileShape +
// //       formData.zoom +
// //       formData.x +
// //       formData.y
// //     }
// //     style={{
// //       width: "100%",
// //       height: 240,
// //       display: "flex",
// //       alignItems: "center",
// //       justifyContent: "center",
// //       background: "#f8f9fa",
// //       border: "1px dashed #ccc",
// //       borderRadius: 12,
// //       marginBottom: 15,
// //     }}
// //   >
// //     <div
// //       className={formData.animationName}
// //       style={{
// //         width: formData.profileSize,
// //         height: formData.profileSize,
// //         borderRadius:
// //           formData.profileShape === "circle"
// //             ? "50%"
// //             : formData.profileShape === "rounded"
// //             ? "14px"
// //             : "0px",
// //         overflow: "hidden",
// //         transform: `translate(${formData.x}px, ${formData.y}px) scale(${formData.zoom})`,
// //         transition: "transform 0.3s ease",
// //         boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
// //         background: "#fff",
// //       }}
// //     >
// //       {formData.logoType === "video" ? (
// //         <video
// //           src={formData.preview}
// //           autoPlay
// //           loop
// //           muted
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       ) : (
// //         <img
// //           src={formData.preview}
// //           alt="logo"
// //           style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //         />
// //       )}
// //     </div>
// //   </div>
// // )}


// //               <hr />

// // <Form.Label>Profile Size</Form.Label>
// // <Form.Range
// //   min="60"
// //   max="250"
// //   value={formData.profileSize}
// //   onChange={(e) =>
// //     setFormData((p) => ({
// //       ...p,
// //       profileSize: Number(e.target.value),
// //     }))
// //   }
// // />

// // <Form.Label>Profile Shape</Form.Label>
// // <Form.Select
// //   value={formData.profileShape}
// //   onChange={(e) =>
// //     setFormData((p) => ({ ...p, profileShape: e.target.value }))
// //   }
// // >
// //   <option value="circle">Circle</option>
// //   <option value="rounded">Rounded</option>
// //   <option value="square">Square</option>
// // </Form.Select>

// // <Form.Label>Profile Animation</Form.Label>
// // <Form.Select
// //   value={formData.animationName}
// //   onChange={(e) =>
// //     setFormData((p) => ({ ...p, animationName: e.target.value }))
// //   }
// // >
// //   <option value="fade">Fade</option>
// //   <option value="zoom">Zoom</option>
// //   <option value="slide">Slide</option>
// //   <option value="bounce">Bounce</option>
// // </Form.Select>


// //             <hr />

// //             <Form.Label>Logo Zoom</Form.Label>
// //             <Form.Range min="0.3" max="3" step="0.1" value={formData.zoom}
// //               onChange={(e) => setFormData((p) => ({ ...p, zoom: Number(e.target.value) }))} />

// //             <Form.Label>Logo X</Form.Label>
// //             <Form.Range min="-150" max="150" value={formData.x}
// //               onChange={(e) => setFormData((p) => ({ ...p, x: Number(e.target.value) }))} />

// //             <Form.Label>Logo Y</Form.Label>
// //             <Form.Range min="-150" max="150" value={formData.y}
// //               onChange={(e) => setFormData((p) => ({ ...p, y: Number(e.target.value) }))} />

// //             <hr />

// //             <Form.Label>Banner Zoom</Form.Label>
// //             <Form.Range min="0.3" max="3" step="0.1" value={formData.bannerZoom}
// //               onChange={(e) => setFormData((p) => ({ ...p, bannerZoom: Number(e.target.value) }))} />

// //             <Form.Label>Banner X</Form.Label>
// //             <Form.Range min="-300" max="300" value={formData.bannerX}
// //               onChange={(e) => setFormData((p) => ({ ...p, bannerX: Number(e.target.value) }))} />

// //             <Form.Label>Banner Y</Form.Label>
// //             <Form.Range min="-300" max="300" value={formData.bannerY}
// //               onChange={(e) => setFormData((p) => ({ ...p, bannerY: Number(e.target.value) }))} />

// //             <Button type="submit" className="w-100 mt-3" disabled={saving}>
// //               {saving ? "Saving..." : "Save"}
// //             </Button>
// //           </Form>
// //         </Modal.Body>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default FestivalManager;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import {
//   Container, Card, Button, Table, Badge, Modal,
//   Form, InputGroup, Row, Col, Tabs, Tab
// } from "react-bootstrap";
// import {
//   FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
// } from "react-icons/fa";

// const API_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:7000/api/festivals";

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

// const FestivalManager = () => {
//   // CSV Modal States
//   const [showCsvModal, setShowCsvModal] = useState(false);
//   const [csvFile, setCsvFile] = useState(null);
//   const [csvUploading, setCsvUploading] = useState(false);

//   // Data States
//   const [festivals, setFestivals] = useState([]);
//   const [languages, setLanguages] = useState([]);
//   const [selectedLanguage, setSelectedLanguage] = useState("");

//   // ✅ TEXT REFS & STATES
//   const [isResizingText, setIsResizingText] = useState(false);
//   const [textResizeCorner, setTextResizeCorner] = useState(null);
//   const textRef = useRef(null);
//   const textWrapperRef = useRef(null);

//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [search, setSearch] = useState("");
//   const [loadingList, setLoadingList] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [logoPreview, setLogoPreview] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState(null);

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
//   const limit = 5;
//   const [totalPages, setTotalPages] = useState(1);

//   // Main Form State
//   const [formData, setFormData] = useState({
//     /* ================= BASIC ================= */
//     title: "",
//     template: "",
//     status: "active",
//     language: "",

//     /* ================= TIMELINE ================= */
//     startDate: "",
//     endDate: "",

//     /* ================= LOGO ================= */
//     logo: null,
//     logoType: "",
//     preview: "",

//     zoom: 1,
//     x: 0,
//     y: 0,

//     /* ================= PROFILE SETTINGS ================= */
//     profileSize: 120,
//     profileShape: "circle",
//     profileX: 50,
//     profileY: 50,
//     profileRadius: 50,

//     /* ================= PROFILE ANIMATION ================= */
//     animationName: "fade",
//     animationDuration: 0.8,
//     animationDelay: 0,
//     animationEasing: "ease-in-out",

//     /* ================= TRANSITION ================= */
//     transitionType: "fade",
//     transitionDuration: 0.8,
//     transitionDelay: 0,
//     transitionEasing: "ease-in-out",

//     /* ================= BANNER ================= */
//     banner: null,
//     bannerPreview: "",
//     bannerZoom: 1,
//     bannerX: 0,
//     bannerY: 0,
//   });

//   // =================== FETCH DATA ===================
//   const fetchData = async () => {
//     try {
//       setLoadingList(true);
//       const [festRes, langRes] = await Promise.all([
//         axios.get(API_URL, {
//           params: {
//             search,
//             page,
//             limit,
//             language: selectedLanguage || undefined
//           }
//         }),
//         axios.get("http://localhost:7000/api/languages")
//       ]);

//       setFestivals(festRes.data.festivals || []);
//       setTotalPages(festRes.data.pages || 1);
//       setLanguages(langRes.data || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load festivals");
//     } finally {
//       setLoadingList(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, search, selectedLanguage]);

//   // =================== HANDLE CHANGE ===================
//   const handleChange = (e) => {
//     const { name, files, value } = e.target;

//     if (files && files.length) {
//       const file = files[0];

//       if (name === "logo") {
//         setFormData((p) => ({
//           ...p,
//           logo: file,
//           preview: URL.createObjectURL(file),
//           logoType: file.type.startsWith("video") ? "video" : "image",
//         }));
//         setLogoPreview(URL.createObjectURL(file));
//         return;
//       }

//       if (name === "banner") {
//         setFormData((p) => ({
//           ...p,
//           banner: file,
//           bannerPreview: URL.createObjectURL(file),
//         }));
//         setBannerPreview(URL.createObjectURL(file));
//         return;
//       }
//     }

//     setFormData((p) => ({ ...p, [name]: value }));
//   };

//   // =================== MOUSE HANDLERS ===================
//   const handleProfileMouseDown = (e) => {
//     if (!isPositioning) return;
//     if (e.target.style.cursor?.includes("resize")) return;
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleTextMouseDown = (e) => {
//     if (!isPositioning) return;
//     if (e.target.dataset.resize === "handle") return;
//     if (e.target.tagName === "INPUT") {
//       setIsEditingText(true);
//       return;
//     }
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

//     if (isDragging) {
//       setFormData(prev => ({
//         ...prev,
//         profileX: Math.max(0, Math.min(100, x)),
//         profileY: Math.max(0, Math.min(100, y))
//       }));
//     }

//     if (isDraggingText) {
//       setText(prev => ({
//         ...prev,
//         x: Math.max(0, Math.min(100, x)),
//         y: Math.max(0, Math.min(100, y))
//       }));
//     }

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

//     if (isResizing && profileRef.current) {
//       const centerX = (formData.profileX / 100) * rect.width + rect.left;
//       const centerY = (formData.profileY / 100) * rect.height + rect.top;
//       const distX = Math.abs(e.clientX - centerX);
//       const distY = Math.abs(e.clientY - centerY);
//       const newSize = Math.max(50, Math.min(250, Math.max(distX, distY) * 2));
//       setFormData(prev => ({
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
//   }, [isDragging, isResizing, isDraggingText, isResizingText, text, formData, textResizeCorner]);

//   // =================== SUBMIT FORM ===================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       const data = new FormData();

//       /* ================= BASIC ================= */
//       data.append("title", formData.title);
//       data.append("template", formData.template);
//       data.append("status", formData.status);
      
//       // Language handling
//       if (formData.language && formData.language !== "") {
//         data.append("language", formData.language);
//       }

//       /* ================= TIMELINE ================= */
//       data.append("startAt", formData.startDate);
//       data.append("expireAt", formData.endDate);

//       /* ================= LOGO TRANSFORM ================= */
//       data.append("zoom", formData.zoom);
//       data.append("offsetX", formData.x);
//       data.append("offsetY", formData.y);

//       /* ================= PROFILE ================= */
//       data.append("profileSize", formData.profileSize);
//       data.append("profileShape", formData.profileShape);
//       data.append("profileX", formData.profileX);
//       data.append("profileY", formData.profileY);
//       data.append("profileRadius", formData.profileRadius);

//       /* ================= PROFILE ANIMATION ================= */
//       data.append("animationName", formData.animationName);
//       data.append("animationDuration", formData.animationDuration * 1000);
//       data.append("animationDelay", formData.animationDelay * 1000);
//       data.append("animationEasing", formData.animationEasing);

//       /* ================= TRANSITION ================= */
//       data.append("transitionType", formData.transitionType);
//       data.append("transitionDuration", formData.transitionDuration);
//       data.append("transitionDelay", formData.transitionDelay);
//       data.append("transitionEasing", formData.transitionEasing);

//       /* ================= BANNER ================= */
//       data.append("bannerZoom", formData.bannerZoom);
//       data.append("bannerX", formData.bannerX);
//       data.append("bannerY", formData.bannerY);

//       /* ================= TEXT ================= */
//       if (text.show) {
//         data.append("textValue", text.value);
//         data.append("textX", text.x);
//         data.append("textY", text.y);
//         data.append("textSize", text.size);
//         data.append("textWidth", text.width);
//         data.append("textHeight", text.height);
//       }

//       /* ================= FILES ================= */
//       if (formData.logo) data.append("logo", formData.logo);
//       if (formData.banner) data.append("banner", formData.banner);

//       const config = {
//         headers: { "Content-Type": "multipart/form-data" },
//       };

//       if (editing) {
//         await axios.put(`${API_URL}/${editing._id}`, data, config);
//       } else {
//         await axios.post(API_URL, data, config);
//       }

//       handleClose();
//       fetchData();
//     } catch (err) {
//       console.error("SERVER ERROR 👉", err.response?.data);
//       alert(
//         err.response?.data?.message ||
//         "Server error — check backend"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditing(item);

//     setFormData({
//       /* ================= BASIC ================= */
//       title: item.title || "",
//       template: item.template || "",
//       status: item.status || "active",
//       language: item.language?._id || "",

//       /* ================= TIMELINE ================= */
//       startDate: item.startAt ? item.startAt.slice(0, 10) : "",
//       endDate: item.expireAt ? item.expireAt.slice(0, 10) : "",

//       /* ================= LOGO ================= */
//       logo: null,
//       preview: item.logo || "",
//       logoType: item.logoType || "image",

//       zoom: item.zoom || 1,
//       x: item.offsetX || 0,
//       y: item.offsetY || 0,

//       /* ================= PROFILE ================= */
//       profileSize: item.profile?.size || 120,
//       profileShape: item.profile?.shape || "circle",
//       profileX: item.profileX || 50,
//       profileY: item.profileY || 50,
//       profileRadius: item.profileRadius || 50,

//       /* ================= PROFILE ANIMATION ================= */
//       animationName: item.profileAnimation?.name || "fade",
//       animationDuration:
//         item.profileAnimation?.duration
//           ? item.profileAnimation.duration / 1000
//           : 0.8,
//       animationDelay:
//         item.profileAnimation?.delay
//           ? item.profileAnimation.delay / 1000
//           : 0,
//       animationEasing:
//         item.profileAnimation?.easing || "ease-in-out",

//       /* ================= TRANSITION ================= */
//       transitionType: item.transition?.type || "fade",
//       transitionDuration: item.transition?.duration || 0.8,
//       transitionDelay: item.transition?.delay || 0,
//       transitionEasing: item.transition?.easing || "ease-in-out",

//       /* ================= BANNER ================= */
//       banner: null,
//       bannerPreview: item.banner || "",
//       bannerZoom: item.bannerZoom || 1,
//       bannerX: item.bannerX || 0,
//       bannerY: item.bannerY || 0,
//     });

//     setLogoPreview(item.logo || null);
//     setBannerPreview(item.banner || null);

//     // Load text if exists
//     if (item.text) {
//       setText({
//         value: item.text.value || "",
//         x: item.text.x || 50,
//         y: item.text.y || 50,
//         size: item.text.size || 24,
//         width: item.text.width || 200,
//         height: item.text.height || 60,
//         show: true
//       });
//     }

//     setShowModal(true);
//     setIsPositioning(false);
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

//   const handleToggleStatus = async (item) => {
//     try {
//       // await axios.put(`${API_URL}/toggle-status/${item._id}`);
//       await axios.put(
//   `${API_URL}/toggle-status/${item._id}`,
//   {} // 👈 VERY IMPORTANT (empty body)
// );

//       fetchData();
//     } catch (e) {
//       alert("Toggle failed — backend route error");
//     }
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
//     if (formData.profileSize > 0) {
//       setFormData(prev => ({
//         ...prev,
//         profileSize: 0
//       }));
//     }
//     setIsPositioning(false);
//   };

//   const handleClose = () => {
//     setEditing(null);
//     setShowModal(false);
//     setIsPositioning(false);

//     setFormData({
//       title: "",
//       template: "",
//       status: "active",
//       language: "",
//       startDate: "",
//       endDate: "",
//       logo: null,
//       logoType: "",
//       preview: "",
//       zoom: 1,
//       x: 0,
//       y: 0,
//       profileSize: 120,
//       profileShape: "circle",
//       profileX: 50,
//       profileY: 50,
//       profileRadius: 50,
//       animationName: "fade",
//       animationDuration: 0.8,
//       animationDelay: 0,
//       animationEasing: "ease-in-out",
//       transitionType: "fade",
//       transitionDuration: 0.8,
//       transitionDelay: 0,
//       transitionEasing: "ease-in-out",
//       banner: null,
//       bannerPreview: "",
//       bannerZoom: 1,
//       bannerX: 0,
//       bannerY: 0,
//     });

//     setText({
//       value: "",
//       x: 50,
//       y: 50,
//       size: 24,
//       width: 200,
//       height: 60,
//       show: false
//     });

//     setLogoPreview(null);
//     setBannerPreview(null);
//   };

//   const handleExportCSV = () => {
//     window.open(`${API_URL}/export-csv`, "_blank");
//   };

//   const handleImportCSV = async () => {
//     if (!csvFile) return alert("Select a CSV file first!");
//     setCsvUploading(true);
//     const fd = new FormData();
//     fd.append("csv", csvFile);
//     try {
//       await axios.post(`${API_URL}/import-csv-file`, fd);
//       alert("CSV Imported Successfully!");
//       setShowCsvModal(false);
//       fetchData();
//     } catch {
//       alert("CSV Import Failed");
//     } finally {
//       setCsvUploading(false);
//     }
//   };

//   // =================== RENDER ===================
//   return (
//     <Container fluid className="py-3">
//       {/* HEADER */}
//       <Row className="align-items-center mb-3 g-2">
//         {/* TITLE */}
//         <Col xs={12} md={3}>
//           <h3 className="text-center text-md-start">Festival Templates</h3>
//         </Col>

//         {/* SEARCH */}
//         <Col xs={12} md={3}>
//           <InputGroup className="mt-2 mt-md-0">
//             <Form.Control
//               placeholder="Search festivals..."
//               value={search}
//               onChange={e => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//             />
//             <Button><FaSearch /></Button>
//           </InputGroup>
//         </Col>

//         {/* LANGUAGE FILTER */}
//         <Col xs={12} md={3}>
//           <Form.Select
//             value={selectedLanguage}
//             onChange={(e) => {
//               setSelectedLanguage(e.target.value);
//               setPage(1);
//             }}
//             className="mt-2 mt-md-0"
//           >
//             <option value="">All Languages</option>
//             {languages.map((lang) => (
//               <option key={lang._id} value={lang._id}>
//                 {lang.name}
//               </option>
//             ))}
//           </Form.Select>
//         </Col>

//         {/* BUTTONS */}
//         <Col xs={12} md={3} className="text-md-end text-center mt-2 mt-md-0">
//           <Button
//             className="me-2 mb-2"
//             size="sm"
//             variant="success"
//             onClick={() => setShowCsvModal(true)}
//           >
//             <FaUpload /> Import
//           </Button>

//           <Button
//             className="me-2 mb-2"
//             size="sm"
//             variant="warning"
//             onClick={handleExportCSV}
//           >
//             <FaDownload /> Export
//           </Button>

//           <Button size="sm" onClick={() => setShowModal(true)}>
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
//                   <th>#</th>
//                   <th>Logo</th>
//                   <th>Banner</th>
//                   <th>Title</th>
//                   <th>Language</th>
//                   <th>Status</th>
//                   <th>Start</th>
//                   <th>End</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {festivals.map((f, i) => (
//                   <tr key={f._id}>
//                     <td>{(page - 1) * limit + i + 1}</td>
//                     <td>
//                       {f.logo &&
//                         (f.logo.includes(".mp4") ? (
//                           <video
//                             src={f.logo}
//                             width="60"
//                             height="60"
//                             autoPlay
//                             loop
//                             muted
//                             style={{ borderRadius: 6, objectFit: "cover" }}
//                           />
//                         ) : (
//                           <img
//                             src={f.logo}
//                             width="60"
//                             height="60"
//                             style={{ objectFit: "cover", borderRadius: 6 }}
//                             alt=""
//                           />
//                         ))}
//                     </td>
//                     <td>
//                       {f.banner && (
//                         <img
//                           src={f.banner}
//                           width="90"
//                           height="60"
//                           style={{ borderRadius: 6 }}
//                           alt=""
//                         />
//                       )}
//                     </td>
//                     <td>{f.title}</td>
//                     <td>{f.language?.name || "-"}</td>
//                     <td>
//                       <Form.Check
//                         type="switch"
//                         checked={f.status === "active"}
//                         onChange={() => handleToggleStatus(f)}
//                         label={f.status === "active" ? "Active" : "Inactive"}
//                       />
//                     </td>
//                     <td>
//                       {f.startAt
//                         ? new Date(f.startAt).toISOString().slice(0, 10)
//                         : "-"}
//                     </td>
//                     <td>
//                       {f.expireAt
//                         ? new Date(f.expireAt).toISOString().slice(0, 10)
//                         : "-"}
//                     </td>
//                     <td>
//                       <Button
//                         size="sm"
//                         className="me-1"
//                         disabled={f.status === "expired"}
//                         onClick={() => handleEdit(f)}
//                       >
//                         <FaEdit />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="danger"
//                         onClick={() => handleDelete(f._id)}
//                       >
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
//             <Button
//               size="sm"
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//             >
//               Prev
//             </Button>
//             <span className="px-3 py-1 mx-2 border rounded">
//               Page {page} / {totalPages}
//             </span>
//             <Button
//               size="sm"
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//             >
//               Next
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* ================= ADD / EDIT MODAL ================= */}
//       <Modal show={showModal} onHide={handleClose} centered size="xl" scrollable>
//         <Modal.Header closeButton>
//           <Modal.Title>{editing ? "Edit" : "Add"} Festival</Modal.Title>
//         </Modal.Header>

//         <Modal.Body style={{ maxHeight: '75vh', overflowY: 'auto' }}>
//           <Row>
//             {/* LEFT COLUMN - PREVIEW */}
//             <Col lg={5}>
//               <div
//                 ref={previewRef}
//                 className="mx-auto"
//                 style={{
//                   width: '100%',
//                   maxWidth: 330,
//                   height: 330,
//                   borderRadius: 16,
//                   position: "relative",
//                   overflow: "hidden",
//                   background: "#111",
//                   boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
//                   cursor: isPositioning ? "crosshair" : "default"
//                 }}
//               >
//                 {/* BACKGROUND (LOGO) */}
//                 {logoPreview && (
//                   formData.logoType === "video" ? (
//                     <video
//                       src={logoPreview}
//                       autoPlay
//                       muted
//                       loop
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         position: "absolute",
//                         inset: 0,
//                         transform: `scale(${formData.zoom}) translate(${formData.x}px, ${formData.y}px)`,
//                         zIndex: 1,
//                       }}
//                     />
//                   ) : (
//                     <img
//                       src={logoPreview}
//                       alt=""
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         position: "absolute",
//                         inset: 0,
//                         transform: `scale(${formData.zoom}) translate(${formData.x}px, ${formData.y}px)`,
//                         zIndex: 1,
//                       }}
//                     />
//                   )
//                 )}

//                 {/* PROFILE CIRCLE */}
//                 {formData.profileSize > 0 && (
//                   <div
//                     ref={profileRef}
//                     onMouseDown={isPositioning ? handleProfileMouseDown : undefined}
//                     style={{
//                       position: "absolute",
//                       top: `${formData.profileY}%`,
//                       left: `${formData.profileX}%`,
//                       transform: "translate(-50%, -50%)",
//                       width: formData.profileSize,
//                       height: formData.profileSize,
//                       borderRadius: `${formData.profileRadius}%`,
//                       background: "rgba(255,255,255,.85)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: isDragging ? "grabbing" : "grab",
//                       border: isPositioning ? "2px dashed #17a2b8" : "none",
//                       zIndex: 20,
//                       transition: isDragging ? "none" : ".15s"
//                     }}
//                   >
//                     {isPositioning && <FaPlus size={22} color="#17a2b8" />}
//                     {isPositioning && (
//                       <>
//                         <ResizeHandle corner="tl" handleResizeMouseDown={handleResizeMouseDown} />
//                         <ResizeHandle corner="tr" handleResizeMouseDown={handleResizeMouseDown} />
//                         <ResizeHandle corner="bl" handleResizeMouseDown={handleResizeMouseDown} />
//                         <ResizeHandle corner="br" handleResizeMouseDown={handleResizeMouseDown} />
//                       </>
//                     )}
//                   </div>
//                 )}

//                 {/* TEXT ELEMENT */}
//                 {text.show && (
//                   <div
//                     ref={textWrapperRef}
//                     onMouseDown={handleTextMouseDown}
//                     style={{
//                       position: "absolute",
//                       top: `${text.y}%`,
//                       left: `${text.x}%`,
//                       transform: "translate(-50%, -50%)",
//                       zIndex: 30,
//                       cursor: isDraggingText ? "grabbing" : (isPositioning && !isEditingText ? "move" : "default"),
//                       padding: "2px",
//                       border: isPositioning && !isEditingText ? "2px solid transparent" : "none",
//                       borderRadius: 8
//                     }}
//                   >
//                     <input
//                       ref={textRef}
//                       type="text"
//                       value={text.value}
//                       onChange={(e) => setText(prev => ({ ...prev, value: e.target.value }))}
//                       onFocus={() => setIsEditingText(true)}
//                       onBlur={() => setIsEditingText(false)}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setIsEditingText(true);
//                       }}
//                       placeholder="Type here..."
//                       style={{
//                         width: text.width,
//                         minWidth: 80,
//                         height: text.height,
//                         minHeight: 40,
//                         fontSize: `${text.size}px`,
//                         fontWeight: 700,
//                         color: "#fff",
//                         padding: "10px 14px",
//                         borderRadius: 6,
//                         background: "rgba(0,0,0,.6)",
//                         border: isPositioning ? "2px dashed #17a2b8" : "none",
//                         outline: "none",
//                         textAlign: "center",
//                         cursor: "text",
//                         pointerEvents: "auto"
//                       }}
//                     />

//                     {isPositioning && (
//                       <>
//                         <ResizeHandle corner="tl" handleResizeMouseDown={handleTextResizeMouseDown} />
//                         <ResizeHandle corner="tr" handleResizeMouseDown={handleTextResizeMouseDown} />
//                         <ResizeHandle corner="bl" handleResizeMouseDown={handleTextResizeMouseDown} />
//                         <ResizeHandle corner="br" handleResizeMouseDown={handleTextResizeMouseDown} />
//                       </>
//                     )}
//                   </div>
//                 )}

//                 {/* BANNER/FRAME */}
//                 {bannerPreview && (
//                   <img
//                     src={bannerPreview}
//                     alt=""
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       position: "absolute",
//                       inset: 0,
//                       transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`,
//                       zIndex: 4,
//                       pointerEvents: "none",
//                     }}
//                   />
//                 )}
//               </div>

//               {/* ACTION BUTTONS */}
//               <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
//                 <Button
//                   size="sm"
//                   onClick={() => {
//                     setIsPositioning(true);
//                     if (formData.profileSize === 0) {
//                       setFormData(prev => ({
//                         ...prev,
//                         profileSize: 120,
//                         profileX: 50,
//                         profileY: 50
//                       }));
//                     }
//                   }}
//                   variant="info"
//                 >
//                   Add Circle Image
//                 </Button>

//                 <Button
//                   size="sm"
//                   onClick={() => {
//                     setIsPositioning(true);
//                     setText(prev => {
//                       if (prev.show) return prev;
//                       return {
//                         value: "",
//                         x: 50,
//                         y: 50,
//                         size: 24,
//                         width: 200,
//                         height: 60,
//                         show: true
//                       };
//                     });
//                   }}
//                   variant="info"
//                 >
//                   Add Text
//                 </Button>

//                 <Button
//                   size="sm"
//                   onClick={handleDeleteSelected}
//                   variant="danger"
//                 >
//                   Delete Selected
//                 </Button>
//               </div>
//             </Col>

//             {/* RIGHT COLUMN - FORM */}
//             <Col lg={7}>
//               <Tabs defaultActiveKey="basic" className="mb-3">
//                 {/* BASIC SETTINGS TAB */}
//                 <Tab eventKey="basic" title="Basic">
//                   <Row className="g-2">
//                     <Col md={6}>
//                       <Form.Label className="small mb-1">Title *</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         required
//                       />
//                     </Col>

//                     <Col md={6}>
//                       <Form.Label className="small mb-1">Template</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         name="template"
//                         value={formData.template}
//                         onChange={handleChange}
//                       />
//                     </Col>

//                     <Col md={6}>
//                       <Form.Label className="small mb-1">Language</Form.Label>
//                       <Form.Select
//                         size="sm"
//                         name="language"
//                         value={formData.language}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Language</option>
//                         {languages.map((lang) => (
//                           <option key={lang._id} value={lang._id}>
//                             {lang.name}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Label className="small mb-1">Status</Form.Label>
//                       <Form.Select
//                         size="sm"
//                         name="status"
//                         value={formData.status}
//                         onChange={handleChange}
//                       >
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                       </Form.Select>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Label className="small mb-1">Start Date *</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="date"
//                         name="startDate"
//                         value={formData.startDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </Col>

//                     <Col md={6}>
//                       <Form.Label className="small mb-1">End Date *</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="date"
//                         name="endDate"
//                         value={formData.endDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </Col>

//                     <Col md={6}>
//                       <Form.Label className="small mb-1">Logo (Image/Video)</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="file"
//                         name="logo"
//                         onChange={handleChange}
//                         accept="image/*,video/*"
//                       />
//                     </Col>

//                     <Col md={6}>
//                       <Form.Label className="small mb-1">Banner</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="file"
//                         name="banner"
//                         onChange={handleChange}
//                         accept="image/*"
//                       />
//                     </Col>
//                   </Row>
//                 </Tab>

//                 {/* POSITION TAB */}
//                 <Tab eventKey="position" title="Position">
//                   <h6 className="mb-2">Profile Position & Size</h6>
//                   <Row className="g-2">
//                     <Col xs={6}>
//                       <Form.Label className="small">X: {Math.round(formData.profileX)}</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         value={Math.round(formData.profileX)}
//                         onChange={(e) => setFormData(prev => ({ ...prev, profileX: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={6}>
//                       <Form.Label className="small">Y: {Math.round(formData.profileY)}</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         value={Math.round(formData.profileY)}
//                         onChange={(e) => setFormData(prev => ({ ...prev, profileY: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={6}>
//                       <Form.Label className="small">Size: {formData.profileSize}px</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         value={formData.profileSize}
//                         onChange={(e) => setFormData(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={6}>
//                       <Form.Label className="small">Radius: {formData.profileRadius}%</Form.Label>
//                       <Form.Range
//                         size="sm"
//                         min="0"
//                         max="50"
//                         value={formData.profileRadius}
//                         onChange={(e) => setFormData(prev => ({ ...prev, profileRadius: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={12}>
//                       <Form.Label className="small">Shape</Form.Label>
//                       <Form.Select
//                         size="sm"
//                         value={formData.profileShape}
//                         onChange={(e) => setFormData(prev => ({ ...prev, profileShape: e.target.value }))}
//                       >
//                         <option value="circle">Circle</option>
//                         <option value="rounded">Rounded</option>
//                         <option value="square">Square</option>
//                       </Form.Select>
//                     </Col>
//                   </Row>

//                   <hr className="my-3" />

//                   <h6 className="mb-2">Text Settings</h6>
//                   <Row className="g-2">
//                     <Col xs={12}>
//                       <Form.Label className="small">Font Size: {text.size}px</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         min={10}
//                         max={120}
//                         value={text.size}
//                         onChange={(e) => setText(prev => ({ ...prev, size: Math.min(120, Math.max(10, Number(e.target.value))) }))}
//                       />
//                     </Col>
//                   </Row>
//                 </Tab>

//                 {/* ANIMATIONS TAB */}
//                 <Tab eventKey="animations" title="Animations">
//                   <h6 className="mb-2">Screen Transition</h6>
//                   <Row className="g-2">
//                     <Col md={6}>
//                       <Form.Label className="small">Type</Form.Label>
//                       <Form.Select
//                         size="sm"
//                         name="transitionType"
//                         value={formData.transitionType}
//                         onChange={handleChange}
//                       >
//                         <option value="fade">Fade</option>
//                         <option value="slide">Slide</option>
//                         <option value="zoom">Zoom</option>
//                       </Form.Select>
//                     </Col>
//                     <Col md={6}>
//                       <Form.Label className="small">Duration (sec)</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         step="0.1"
//                         name="transitionDuration"
//                         value={formData.transitionDuration}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>

//                   <hr className="my-3" />

//                   <h6 className="mb-2">Profile Animation</h6>
//                   <Row className="g-2">
//                     <Col md={4}>
//                       <Form.Label className="small">Effect</Form.Label>
//                       <Form.Select
//                         size="sm"
//                         name="animationName"
//                         value={formData.animationName}
//                         onChange={handleChange}
//                       >
//                         <option value="none">None</option>
//                         <option value="fade">Fade</option>
//                         <option value="zoom">Zoom</option>
//                         <option value="slide">Slide</option>
//                         <option value="bounce">Bounce</option>
//                       </Form.Select>
//                     </Col>
//                     <Col md={4}>
//                       <Form.Label className="small">Delay (sec)</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         step="0.1"
//                         name="animationDelay"
//                         value={formData.animationDelay}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                     <Col md={4}>
//                       <Form.Label className="small">Duration (sec)</Form.Label>
//                       <Form.Control
//                         size="sm"
//                         type="number"
//                         step="0.1"
//                         name="animationDuration"
//                         value={formData.animationDuration}
//                         onChange={handleChange}
//                       />
//                     </Col>
//                   </Row>
//                 </Tab>

//                 {/* LOGO & BANNER CONTROLS TAB */}
//                 <Tab eventKey="controls" title="Controls">
//                   <h6 className="mb-2">Logo Controls</h6>
//                   <Row className="g-2">
//                     <Col xs={12}>
//                       <Form.Label className="small">Zoom: {formData.zoom}x</Form.Label>
//                       <Form.Range
//                         size="sm"
//                         min="0.3"
//                         max="3"
//                         step="0.1"
//                         value={formData.zoom}
//                         onChange={(e) => setFormData(prev => ({ ...prev, zoom: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={12}>
//                       <Form.Label className="small">Move X: {formData.x}px</Form.Label>
//                       <Form.Range
//                         size="sm"
//                         min="-150"
//                         max="150"
//                         value={formData.x}
//                         onChange={(e) => setFormData(prev => ({ ...prev, x: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={12}>
//                       <Form.Label className="small">Move Y: {formData.y}px</Form.Label>
//                       <Form.Range
//                         size="sm"
//                         min="-150"
//                         max="150"
//                         value={formData.y}
//                         onChange={(e) => setFormData(prev => ({ ...prev, y: Number(e.target.value) }))}
//                       />
//                     </Col>
//                   </Row>

//                   <hr className="my-3" />

//                   <h6 className="mb-2">Banner Controls</h6>
//                   <Row className="g-2">
//                     <Col xs={12}>
//                       <Form.Label className="small">Zoom: {formData.bannerZoom}x</Form.Label>
//                       <Form.Range
//                         size="sm"
//                         min="0.3"
//                         max="3"
//                         step="0.1"
//                         value={formData.bannerZoom}
//                         onChange={(e) => setFormData(prev => ({ ...prev, bannerZoom: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={12}>
//                       <Form.Label className="small">Move X: {formData.bannerX}px</Form.Label>
//                       <Form.Range
//                         size="sm"
//                         min="-300"
//                         max="300"
//                         value={formData.bannerX}
//                         onChange={(e) => setFormData(prev => ({ ...prev, bannerX: Number(e.target.value) }))}
//                       />
//                     </Col>
//                     <Col xs={12}>
//                       <Form.Label className="small">Move Y: {formData.bannerY}px</Form.Label>
//                       <Form.Range
//                         size="sm"
//                         min="-300"
//                         max="300"
//                         value={formData.bannerY}
//                         onChange={(e) => setFormData(prev => ({ ...prev, bannerY: Number(e.target.value) }))}
//                       />
//                     </Col>
//                   </Row>
//                 </Tab>
//               </Tabs>
//             </Col>
//           </Row>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" disabled={saving} onClick={handleSubmit}>
//             {saving ? "Saving..." : "Save"}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* CSV IMPORT MODAL */}
//       <Modal show={showCsvModal} onHide={() => setShowCsvModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Import Festivals CSV</Modal.Title>
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
//           <Button variant="secondary" onClick={() => setShowCsvModal(false)}>
//             Close
//           </Button>
//           <Button variant="success" disabled={csvUploading} onClick={handleImportCSV}>
//             {csvUploading ? "Importing..." : "Import CSV"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default FestivalManager;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Container, Card, Button, Table, Badge, Modal,
  Form, InputGroup, Row, Col, Tabs, Tab, Alert
} from "react-bootstrap";
import {
  FaPlus, FaEdit, FaTrash, FaSearch, FaDownload, FaUpload
} from "react-icons/fa";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:7000/api/festivals";

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

const FestivalManager = () => {
  // CSV Modal States
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csvUploading, setCsvUploading] = useState(false);

  // Data States
  const [festivals, setFestivals] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Alert State
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ✅ TEXT REFS & STATES
  const [isResizingText, setIsResizingText] = useState(false);
  const [textResizeCorner, setTextResizeCorner] = useState(null);
  const textRef = useRef(null);
  const textWrapperRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);

  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

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
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  // Main Form State
  const [formData, setFormData] = useState({
    /* ================= BASIC ================= */
    title: "",
    template: "",
    status: "active",
    language: "",

    /* ================= TIMELINE ================= */
    startDate: "",
    endDate: "",

    /* ================= LOGO ================= */
    logo: null,
    logoType: "",
    preview: "",

    zoom: 1,
    x: 0,
    y: 0,

    /* ================= PROFILE SETTINGS ================= */
    profileSize: 120,
    profileShape: "circle",
    profileX: 50,
    profileY: 50,
    profileRadius: 50,

    /* ================= PROFILE ANIMATION ================= */
    animationName: "fade",
    animationDuration: 0.8,
    animationDelay: 0,
    animationEasing: "ease-in-out",

    /* ================= TRANSITION ================= */
    transitionType: "fade",
    transitionDuration: 0.8,
    transitionDelay: 0,
    transitionEasing: "ease-in-out",

    /* ================= BANNER ================= */
    banner: null,
    bannerPreview: "",
    bannerZoom: 1,
    bannerX: 0,
    bannerY: 0,
  });

  // Show Alert Helper
  const showAlert = (message, variant = "success") => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: "", variant: "" }), 3000);
  };

  // =================== FETCH DATA ===================
  const fetchData = async () => {
    try {
      setLoadingList(true);
      const [festRes, langRes] = await Promise.all([
        axios.get(API_URL, {
          params: {
            search,
            page,
            limit,
            language: selectedLanguage || undefined
          }
        }),
        axios.get("http://localhost:7000/api/languages")
      ]);

      setFestivals(festRes.data.festivals || []);
      setTotalPages(festRes.data.pages || 1);
      setLanguages(langRes.data || []);
    } catch (err) {
      console.error(err);
      showAlert("Failed to load festivals", "danger");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, selectedLanguage]);

  // =================== HANDLE CHANGE ===================
  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files && files.length) {
      const file = files[0];

      if (name === "logo") {
        setFormData((p) => ({
          ...p,
          logo: file,
          preview: URL.createObjectURL(file),
          logoType: file.type.startsWith("video") ? "video" : "image",
        }));
        setLogoPreview(URL.createObjectURL(file));
        return;
      }

      if (name === "banner") {
        setFormData((p) => ({
          ...p,
          banner: file,
          bannerPreview: URL.createObjectURL(file),
        }));
        setBannerPreview(URL.createObjectURL(file));
        return;
      }
    }

    setFormData((p) => ({ ...p, [name]: value }));
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
      setFormData(prev => ({
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
      const centerX = (formData.profileX / 100) * rect.width + rect.left;
      const centerY = (formData.profileY / 100) * rect.height + rect.top;
      const distX = Math.abs(e.clientX - centerX);
      const distY = Math.abs(e.clientY - centerY);
      const newSize = Math.max(50, Math.min(250, Math.max(distX, distY) * 2));
      setFormData(prev => ({
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
  }, [isDragging, isResizing, isDraggingText, isResizingText, text, formData, textResizeCorner]);

  // =================== SUBMIT FORM ===================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      /* ================= BASIC ================= */
      data.append("title", formData.title);
      data.append("template", formData.template);
      data.append("status", formData.status);
      
      // Language handling
      if (formData.language && formData.language !== "") {
        data.append("language", formData.language);
      }

      /* ================= TIMELINE ================= */
      data.append("startAt", formData.startDate);
      data.append("expireAt", formData.endDate);

      /* ================= LOGO TRANSFORM ================= */
      data.append("zoom", formData.zoom);
      data.append("offsetX", formData.x);
      data.append("offsetY", formData.y);

      /* ================= PROFILE ================= */
      data.append("profileSize", formData.profileSize);
      data.append("profileShape", formData.profileShape);
      data.append("profileX", formData.profileX);
      data.append("profileY", formData.profileY);
      data.append("profileRadius", formData.profileRadius);

      /* ================= PROFILE ANIMATION ================= */
      data.append("animationName", formData.animationName);
      data.append("animationDuration", formData.animationDuration * 1000);
      data.append("animationDelay", formData.animationDelay * 1000);
      data.append("animationEasing", formData.animationEasing);

      /* ================= TRANSITION ================= */
      data.append("transitionType", formData.transitionType);
      data.append("transitionDuration", formData.transitionDuration);
      data.append("transitionDelay", formData.transitionDelay);
      data.append("transitionEasing", formData.transitionEasing);

      /* ================= BANNER ================= */
      data.append("bannerZoom", formData.bannerZoom);
      data.append("bannerX", formData.bannerX);
      data.append("bannerY", formData.bannerY);

      /* ================= TEXT ================= */
      if (text.show) {
        data.append("textValue", text.value);
        data.append("textX", text.x);
        data.append("textY", text.y);
        data.append("textSize", text.size);
        data.append("textWidth", text.width);
        data.append("textHeight", text.height);
      }

      /* ================= FILES ================= */
      if (formData.logo) data.append("logo", formData.logo);
      if (formData.banner) data.append("banner", formData.banner);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      if (editing) {
        await axios.put(`${API_URL}/${editing._id}`, data, config);
        showAlert("Festival updated successfully!", "success");
      } else {
        await axios.post(API_URL, data, config);
        showAlert("Festival created successfully!", "success");
      }

      handleClose();
      fetchData();
    } catch (err) {
      console.error("SERVER ERROR 👉", err.response?.data);
      showAlert(
        err.response?.data?.message || "Server error — check backend",
        "danger"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);

    setFormData({
      /* ================= BASIC ================= */
      title: item.title || "",
      template: item.template || "",
      status: item.status || "active",
      language: item.language?._id || "",

      /* ================= TIMELINE ================= */
      startDate: item.startAt ? item.startAt.slice(0, 10) : "",
      endDate: item.expireAt ? item.expireAt.slice(0, 10) : "",

      /* ================= LOGO ================= */
      logo: null,
      preview: item.logo || "",
      logoType: item.logoType || "image",

      zoom: item.zoom || 1,
      x: item.offsetX || 0,
      y: item.offsetY || 0,

      /* ================= PROFILE ================= */
      profileSize: item.profile?.size || 120,
      profileShape: item.profile?.shape || "circle",
      profileX: item.profileX || 50,
      profileY: item.profileY || 50,
      profileRadius: item.profileRadius || 50,

      /* ================= PROFILE ANIMATION ================= */
      animationName: item.profileAnimation?.name || "fade",
      animationDuration:
        item.profileAnimation?.duration
          ? item.profileAnimation.duration / 1000
          : 0.8,
      animationDelay:
        item.profileAnimation?.delay
          ? item.profileAnimation.delay / 1000
          : 0,
      animationEasing:
        item.profileAnimation?.easing || "ease-in-out",

      /* ================= TRANSITION ================= */
      transitionType: item.transition?.type || "fade",
      transitionDuration: item.transition?.duration || 0.8,
      transitionDelay: item.transition?.delay || 0,
      transitionEasing: item.transition?.easing || "ease-in-out",

      /* ================= BANNER ================= */
      banner: null,
      bannerPreview: item.banner || "",
      bannerZoom: item.bannerZoom || 1,
      bannerX: item.bannerX || 0,
      bannerY: item.bannerY || 0,
    });

    setLogoPreview(item.logo || null);
    setBannerPreview(item.banner || null);

    // Load text if exists
    if (item.text && item.text.show) {
      setText({
        value: item.text.value || "",
        x: item.text.x || 50,
        y: item.text.y || 50,
        size: item.text.size || 24,
        width: item.text.width || 200,
        height: item.text.height || 60,
        show: true
      });
    } else {
      setText({
        value: "",
        x: 50,
        y: 50,
        size: 24,
        width: 200,
        height: 60,
        show: false
      });
    }

    setShowModal(true);
    setIsPositioning(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this festival?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      showAlert("Festival deleted successfully!", "success");
      fetchData();
    } catch (err) {
      console.error(err);
      showAlert("Delete failed", "danger");
    }
  };

  // ✅ PROPERLY FIXED TOGGLE STATUS HANDLER
  const handleToggleStatus = async (item) => {
    // Check if festival is expired
    if (item.status === "expired") {
      showAlert("Cannot toggle expired festival", "warning");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/toggle-status/${item._id}`);
      
      if (response.data.success) {
        // Update state with new festival data from server
        setFestivals(prevFestivals =>
          prevFestivals.map(f =>
            f._id === item._id
              ? { ...f, status: response.data.status }
              : f
          )
        );
        showAlert(response.data.message, "success");
      } else {
        showAlert("Toggle failed", "danger");
      }
    } catch (err) {
      console.error("Toggle Error:", err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Toggle failed";
      showAlert(errorMsg, "danger");
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
    if (formData.profileSize > 0) {
      setFormData(prev => ({
        ...prev,
        profileSize: 0
      }));
    }
    setIsPositioning(false);
  };

  const handleClose = () => {
    setEditing(null);
    setShowModal(false);
    setIsPositioning(false);

    setFormData({
      title: "",
      template: "",
      status: "active",
      language: "",
      startDate: "",
      endDate: "",
      logo: null,
      logoType: "",
      preview: "",
      zoom: 1,
      x: 0,
      y: 0,
      profileSize: 120,
      profileShape: "circle",
      profileX: 50,
      profileY: 50,
      profileRadius: 50,
      animationName: "fade",
      animationDuration: 0.8,
      animationDelay: 0,
      animationEasing: "ease-in-out",
      transitionType: "fade",
      transitionDuration: 0.8,
      transitionDelay: 0,
      transitionEasing: "ease-in-out",
      banner: null,
      bannerPreview: "",
      bannerZoom: 1,
      bannerX: 0,
      bannerY: 0,
    });

    setText({
      value: "",
      x: 50,
      y: 50,
      size: 24,
      width: 200,
      height: 60,
      show: false
    });

    setLogoPreview(null);
    setBannerPreview(null);
  };

  const handleExportCSV = () => {
    window.open(`${API_URL}/export-csv`, "_blank");
  };

  const handleImportCSV = async () => {
    if (!csvFile) {
      showAlert("Select a CSV file first!", "warning");
      return;
    }
    setCsvUploading(true);
    const fd = new FormData();
    fd.append("csv", csvFile);
    try {
      await axios.post(`${API_URL}/import-csv-file`, fd);
      showAlert("CSV Imported Successfully!", "success");
      setShowCsvModal(false);
      fetchData();
    } catch {
      showAlert("CSV Import Failed", "danger");
    } finally {
      setCsvUploading(false);
    }
  };

  // =================== RENDER ===================
  return (
    <Container fluid className="py-3">
      {/* ALERT */}
      {alert.show && (
        <Alert 
          variant={alert.variant} 
          dismissible 
          onClose={() => setAlert({ ...alert, show: false })}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            minWidth: 300
          }}
        >
          {alert.message}
        </Alert>
      )}

      {/* HEADER */}
      <Row className="align-items-center mb-3 g-2">
        {/* TITLE */}
        <Col xs={12} md={3}>
          <h3 className="text-center text-md-start">Festival Templates</h3>
        </Col>

        {/* SEARCH */}
        <Col xs={12} md={3}>
          <InputGroup className="mt-2 mt-md-0">
            <Form.Control
              placeholder="Search festivals..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Button><FaSearch /></Button>
          </InputGroup>
        </Col>

        {/* LANGUAGE FILTER */}
        <Col xs={12} md={3}>
          <Form.Select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              setPage(1);
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

          <Button size="sm" onClick={() => setShowModal(true)}>
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
                  <th>#</th>
                  <th>Logo</th>
                  <th>Banner</th>
                  <th>Title</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingList ? (
                  <tr>
                    <td colSpan="9">Loading...</td>
                  </tr>
                ) : festivals.length === 0 ? (
                  <tr>
                    <td colSpan="9">No festivals found</td>
                  </tr>
                ) : (
                  festivals.map((f, i) => (
                    <tr key={f._id}>
                      <td>{(page - 1) * limit + i + 1}</td>
                      <td>
                        {f.logo &&
                          (f.logo.includes(".mp4") ? (
                            <video
                              src={f.logo}
                              width="60"
                              height="60"
                              autoPlay
                              loop
                              muted
                              style={{ borderRadius: 6, objectFit: "cover" }}
                            />
                          ) : (
                            <img
                              src={f.logo}
                              width="60"
                              height="60"
                              style={{ objectFit: "cover", borderRadius: 6 }}
                              alt=""
                            />
                          ))}
                      </td>
                      <td>
                        {f.banner && (
                          <img
                            src={f.banner}
                            width="90"
                            height="60"
                            style={{ borderRadius: 6 }}
                            alt=""
                          />
                        )}
                      </td>
                      <td>{f.title}</td>
                      <td>{f.language?.name || "-"}</td>
                      <td>
                        <Form.Check
                          type="switch"
                          checked={f.status === "active"}
                          onChange={() => handleToggleStatus(f)}
                          disabled={f.status === "expired"}
                          label={
                            f.status === "expired" ? (
                              <Badge bg="secondary">Expired</Badge>
                            ) : f.status === "active" ? (
                              <Badge bg="success">Active</Badge>
                            ) : (
                              <Badge bg="warning">Inactive</Badge>
                            )
                          }
                        />
                      </td>
                      <td>
                        {f.startAt
                          ? new Date(f.startAt).toISOString().slice(0, 10)
                          : "-"}
                      </td>
                      <td>
                        {f.expireAt
                          ? new Date(f.expireAt).toISOString().slice(0, 10)
                          : "-"}
                      </td>
                      <td>
                        <Button
                          size="sm"
                          className="me-1"
                          disabled={f.status === "expired"}
                          onClick={() => handleEdit(f)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(f._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-3">
            <Button
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </Button>
            <span className="px-3 py-1 mx-2 border rounded">
              Page {page} / {totalPages}
            </span>
            <Button
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* ================= ADD / EDIT MODAL ================= */}
      <Modal show={showModal} onHide={handleClose} centered size="xl" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit" : "Add"} Festival</Modal.Title>
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
                {/* BACKGROUND (LOGO) */}
                {logoPreview && (
                  formData.logoType === "video" ? (
                    <video
                      src={logoPreview}
                      autoPlay
                      muted
                      loop
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                        transform: `scale(${formData.zoom}) translate(${formData.x}px, ${formData.y}px)`,
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <img
                      src={logoPreview}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                        transform: `scale(${formData.zoom}) translate(${formData.x}px, ${formData.y}px)`,
                        zIndex: 1,
                      }}
                    />
                  )
                )}

                {/* PROFILE CIRCLE */}
                {formData.profileSize > 0 && (
                  <div
                    ref={profileRef}
                    onMouseDown={isPositioning ? handleProfileMouseDown : undefined}
                    style={{
                      position: "absolute",
                      top: `${formData.profileY}%`,
                      left: `${formData.profileX}%`,
                      transform: "translate(-50%, -50%)",
                      width: formData.profileSize,
                      height: formData.profileSize,
                      borderRadius: `${formData.profileRadius}%`,
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
                        <ResizeHandle corner="tl" handleResizeMouseDown={handleResizeMouseDown} />
                        <ResizeHandle corner="tr" handleResizeMouseDown={handleResizeMouseDown} />
                        <ResizeHandle corner="bl" handleResizeMouseDown={handleResizeMouseDown} />
                        <ResizeHandle corner="br" handleResizeMouseDown={handleResizeMouseDown} />
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
                        <ResizeHandle corner="tl" handleResizeMouseDown={handleTextResizeMouseDown} />
                        <ResizeHandle corner="tr" handleResizeMouseDown={handleTextResizeMouseDown} />
                        <ResizeHandle corner="bl" handleResizeMouseDown={handleTextResizeMouseDown} />
                        <ResizeHandle corner="br" handleResizeMouseDown={handleTextResizeMouseDown} />
                      </>
                    )}
                  </div>
                )}

                {/* BANNER/FRAME */}
                {bannerPreview && (
                  <img
                    src={bannerPreview}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      position: "absolute",
                      inset: 0,
                      transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`,
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
                    if (formData.profileSize === 0) {
                      setFormData(prev => ({
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
                      <Form.Control
                        size="sm"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small mb-1">Template</Form.Label>
                      <Form.Control
                        size="sm"
                        name="template"
                        value={formData.template}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small mb-1">Language</Form.Label>
                      <Form.Select
                        size="sm"
                        name="language"
                        value={formData.language}
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
                      <Form.Label className="small mb-1">Status</Form.Label>
                      <Form.Select
                        size="sm"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small mb-1">Start Date *</Form.Label>
                      <Form.Control
                        size="sm"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small mb-1">End Date *</Form.Label>
                      <Form.Control
                        size="sm"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small mb-1">Logo (Image/Video)</Form.Label>
                      <Form.Control
                        size="sm"
                        type="file"
                        name="logo"
                        onChange={handleChange}
                        accept="image/*,video/*"
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="small mb-1">Banner</Form.Label>
                      <Form.Control
                        size="sm"
                        type="file"
                        name="banner"
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </Col>
                  </Row>
                </Tab>

                {/* POSITION TAB */}
                <Tab eventKey="position" title="Position">
                  <h6 className="mb-2">Profile Position & Size</h6>
                  <Row className="g-2">
                    <Col xs={6}>
                      <Form.Label className="small">X: {Math.round(formData.profileX)}</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        value={Math.round(formData.profileX)}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileX: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Label className="small">Y: {Math.round(formData.profileY)}</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        value={Math.round(formData.profileY)}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileY: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Label className="small">Size: {formData.profileSize}px</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        value={formData.profileSize}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileSize: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Label className="small">Radius: {formData.profileRadius}%</Form.Label>
                      <Form.Range
                        size="sm"
                        min="0"
                        max="50"
                        value={formData.profileRadius}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileRadius: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Shape</Form.Label>
                      <Form.Select
                        size="sm"
                        value={formData.profileShape}
                        onChange={(e) => setFormData(prev => ({ ...prev, profileShape: e.target.value }))}
                      >
                        <option value="circle">Circle</option>
                        <option value="rounded">Rounded</option>
                        <option value="square">Square</option>
                      </Form.Select>
                    </Col>
                  </Row>

                  <hr className="my-3" />

                  <h6 className="mb-2">Text Settings</h6>
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Label className="small">Font Size: {text.size}px</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={10}
                        max={120}
                        value={text.size}
                        onChange={(e) => setText(prev => ({ ...prev, size: Math.min(120, Math.max(10, Number(e.target.value))) }))}
                      />
                    </Col>
                  </Row>
                </Tab>

                {/* ANIMATIONS TAB */}
                <Tab eventKey="animations" title="Animations">
                  <h6 className="mb-2">Screen Transition</h6>
                  <Row className="g-2">
                    <Col md={6}>
                      <Form.Label className="small">Type</Form.Label>
                      <Form.Select
                        size="sm"
                        name="transitionType"
                        value={formData.transitionType}
                        onChange={handleChange}
                      >
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                      </Form.Select>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small">Duration (sec)</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        step="0.1"
                        name="transitionDuration"
                        value={formData.transitionDuration}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <hr className="my-3" />

                  <h6 className="mb-2">Profile Animation</h6>
                  <Row className="g-2">
                    <Col md={4}>
                      <Form.Label className="small">Effect</Form.Label>
                      <Form.Select
                        size="sm"
                        name="animationName"
                        value={formData.animationName}
                        onChange={handleChange}
                      >
                        <option value="none">None</option>
                        <option value="fade">Fade</option>
                        <option value="zoom">Zoom</option>
                        <option value="slide">Slide</option>
                        <option value="bounce">Bounce</option>
                      </Form.Select>
                    </Col>
                    <Col md={4}>
                      <Form.Label className="small">Delay (sec)</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        step="0.1"
                        name="animationDelay"
                        value={formData.animationDelay}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label className="small">Duration (sec)</Form.Label>
                      <Form.Control
                        size="sm"
                        type="number"
                        step="0.1"
                        name="animationDuration"
                        value={formData.animationDuration}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Tab>

                {/* LOGO & BANNER CONTROLS TAB */}
                <Tab eventKey="controls" title="Controls">
                  {/* <h6 className="mb-2">Logo Controls</h6>
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Label className="small">Zoom: {formData.zoom}x</Form.Label>
                      <Form.Range
                        size="sm"
                        min="0.3"
                        max="3"
                        step="0.1"
                        value={formData.zoom}
                        onChange={(e) => setFormData(prev => ({ ...prev, zoom: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move X: {formData.x}px</Form.Label>
                      <Form.Range
                        size="sm"
                        min="-150"
                        max="150"
                        value={formData.x}
                        onChange={(e) => setFormData(prev => ({ ...prev, x: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move Y: {formData.y}px</Form.Label>
                      <Form.Range
                        size="sm"
                        min="-150"
                        max="150"
                        value={formData.y}
                        onChange={(e) => setFormData(prev => ({ ...prev, y: Number(e.target.value) }))}
                      />
                    </Col>
                  </Row>

                  <hr className="my-3" /> */}

                  <h6 className="mb-2">Banner Controls</h6>
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Label className="small">Zoom: {formData.bannerZoom}x</Form.Label>
                      <Form.Range
                        size="sm"
                        min="0.3"
                        max="3"
                        step="0.1"
                        value={formData.bannerZoom}
                        onChange={(e) => setFormData(prev => ({ ...prev, bannerZoom: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move X: {formData.bannerX}px</Form.Label>
                      <Form.Range
                        size="sm"
                        min="-300"
                        max="300"
                        value={formData.bannerX}
                        onChange={(e) => setFormData(prev => ({ ...prev, bannerX: Number(e.target.value) }))}
                      />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move Y: {formData.bannerY}px</Form.Label>
                      <Form.Range
                        size="sm"
                        min="-300"
                        max="300"
                        value={formData.bannerY}
                        onChange={(e) => setFormData(prev => ({ ...prev, bannerY: Number(e.target.value) }))}
                      />
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={saving} onClick={handleSubmit}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CSV IMPORT MODAL */}
      <Modal show={showCsvModal} onHide={() => setShowCsvModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import Festivals CSV</Modal.Title>
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
          <Button variant="secondary" onClick={() => setShowCsvModal(false)}>
            Close
          </Button>
          <Button variant="success" disabled={csvUploading} onClick={handleImportCSV}>
            {csvUploading ? "Importing..." : "Import CSV"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FestivalManager;