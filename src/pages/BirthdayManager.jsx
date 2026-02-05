// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form, Table, Image } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const API_URL = "https://crafto-backend-zqcn.onrender.com/api/birthdays";

// const BirthdayManager = () => {
//   const [birthdays, setBirthdays] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 5;
//   const [totalPages, setTotalPages] = useState(1);

//   const [formData, setFormData] = useState({
//     title: "",
//     name: "",
//     date: "",
//     status: "active",

//     photo: null,
//     photoPreview: "",
//     photoType: "",

//     banner: null,
//     bannerPreview: "",

//     zoom: 1,
//     offsetX: 0,
//     offsetY: 0,

//     bannerZoom: 1,
//     bannerX: 0,
//     bannerY: 0,
//   });

//   /* ================= FETCH ================= */
//   const fetchData = async () => {
//     const res = await axios.get(API_URL, {
//       params: { search, page, limit },
//     });
//     setBirthdays(res.data.birthdays);
//     setTotalPages(res.data.pages);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, search]);

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "photo" && files?.length) {
//       const file = files[0];
//       setFormData((prev) => ({
//         ...prev,
//         photo: file,
//         photoPreview: URL.createObjectURL(file),
//         photoType: file.type.startsWith("video") ? "video" : "image",
//       }));
//       return;
//     }

//     if (name === "banner" && files?.length) {
//       const file = files[0];
//       setFormData((prev) => ({
//         ...prev,
//         banner: file,
//         bannerPreview: URL.createObjectURL(file),
//       }));
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();

//     // Object.keys(formData).forEach((key) => {
//     //   if (
//     //     ["photo", "banner", "photoPreview", "bannerPreview", "photoType"].includes(
//     //       key
//     //     )
//     //   )
//     //     return;
//     //   data.append(key, formData[key]);
//     // });

//     if (formData.photo) data.append("photo", formData.photo);
//     if (formData.banner) data.append("banner", formData.banner);

//     if (editing) {
//       await axios.put(`${API_URL}/${editing._id}`, data);
//     } else {
//       await axios.post(API_URL, data);
//     }

//     handleClose();
//     fetchData();
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this entry?")) {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchData();
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (item) => {
//     setEditing(item);
//     setFormData({
//       title: item.title,
//       name: item.name,
//       date: item.date,
//       status: item.status,

//       photo: null,
//       photoPreview: item.photo || "",
//       photoType: item.photoType || "image",

//       banner: null,
//       bannerPreview: item.banner || "",

//       zoom: item.zoom || 1,
//       offsetX: item.offsetX || 0,
//       offsetY: item.offsetY || 0,

//       bannerZoom: item.bannerZoom || 1,
//       bannerX: item.bannerX || 0,
//       bannerY: item.bannerY || 0,
//        profileSize: item.profile?.size || 140,
//     profileShape: item.profile?.shape || "circle",
//     profilePosition: item.profile?.position || "center",

//     // 🔥 PROFILE ANIMATION
//     profileAnimation: item.animation?.profile?.effect || "fadeIn",
//     profileAnimationDuration: item.animation?.profile?.duration || 0.6,
//     profileAnimationDelay: item.animation?.profile?.delay || 0,

//     // 🔥 TRANSITION
//     transitionType: item.transition?.type || "fade",
//     transitionDuration: item.transition?.duration || 0.8,
//     transitionDelay: item.transition?.delay || 0,
//     });
//     setShowModal(true);
//   };

//   /* ================= CLOSE ================= */
//   const handleClose = () => {
//     setEditing(null);
//     setShowModal(false);
//     setFormData({
//       title: "",
//       name: "",
//       date: "",
//       status: "active",

//       photo: null,
//       photoPreview: "",
//       photoType: "",

//       banner: null,
//       bannerPreview: "",

//       zoom: 1,
//       offsetX: 0,
//       offsetY: 0,

//       bannerZoom: 1,
//       bannerX: 0,
//       bannerY: 0,

//       profileSize: 140,
//   profileShape: "circle",
//   profilePosition: "center",

//   // 🔥 PROFILE ANIMATION
//   profileAnimation: "fadeIn",
//   profileAnimationDuration: 0.6,
//   profileAnimationDelay: 0,

//   // 🔥 TRANSITION
//   transitionType: "fade",
//   transitionDuration: 0.8,
//   transitionDelay: 0,

//     });
//   };

//   return (
//     <div className="p-3 p-md-4">
//       {/* HEADER */}
//       <div className="d-flex justify-content-between mb-3">
//         <h4>Birthday Manager</h4>
//         <Button onClick={() => setShowModal(true)}>
//           <FaPlus /> Add Birthday
//         </Button>
//       </div>

//       {/* SEARCH */}
//       <input
//         className="form-control mb-3"
//         placeholder="Search by name..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setPage(1);
//         }}
//       />

//       {/* TABLE */}
//       <Table bordered hover className="text-center align-middle">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Banner</th>
//             <th>Photo / Video</th>
//             <th>Name</th>
//             <th>Title</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {birthdays.map((b, i) => (
//             <tr key={b._id}>
//               <td>{(page - 1) * limit + i + 1}</td>

//               <td>
//                 {b.banner ? (
//                   <Image src={b.banner} width="80" height="45" />
//                 ) : "—"}
//               </td>

//               <td>
//                 {b.photoType === "video" ? (
//                   <video src={b.photo} width="60" height="60" controls />
//                 ) : (
//                   <Image src={b.photo} width="60" height="60" roundedCircle />
//                 )}
//               </td>

//               <td>{b.name}</td>
//               <td>{b.title}</td>
//               <td>{b.date}</td>
//               <td>{b.status}</td>

//               <td>
//                 <Button size="sm" variant="warning" onClick={() => handleEdit(b)}>
//                   <FaEdit />
//                 </Button>{" "}
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => handleDelete(b._id)}
//                 >
//                   <FaTrash />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* MODAL */}
//       <Modal show={showModal} onHide={handleClose} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editing ? "Edit" : "Add"} Birthday</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Control className="mb-2" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
//             <Form.Control className="mb-2" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
//             <Form.Control className="mb-2" type="date" name="date" value={formData.date} onChange={handleChange} />

//             <Form.Control className="mb-2" type="file" name="photo" accept="image/*,video/*" onChange={handleChange} />
//             <Form.Control className="mb-3" type="file" name="banner" onChange={handleChange} />

//             {/* PHOTO PREVIEW */}
//             {formData.photoPreview && formData.photoType === "image" && (
//               <>
//                 <div style={{ width: 260, height: 260, margin: "auto", overflow: "hidden", borderRadius: "50%" }}>
//                   <img
//                     src={formData.photoPreview}
//                     alt="preview"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       transform: `scale(${formData.zoom}) translate(${formData.offsetX}px, ${formData.offsetY}px)`,
//                     }}
//                   />
//                 </div>

//                 <h6 className="mt-3">Photo Controls</h6>
//                 <Form.Range name="zoom" min="0.5" max="3" step="0.1" value={formData.zoom} onChange={handleChange} />
//                 <Form.Range name="offsetX" min="-200" max="200" value={formData.offsetX} onChange={handleChange} />
//                 <Form.Range name="offsetY" min="-200" max="200" value={formData.offsetY} onChange={handleChange} />
//               </>
//             )}

//             {formData.photoPreview && formData.photoType === "video" && (
//               <video src={formData.photoPreview} controls width="100%" />
//             )}

//             {/* BANNER */}
//             {formData.bannerPreview && (
//               <>
//                 <img
//                   src={formData.bannerPreview}
//                   alt="banner"
//                   width="100%"
//                   style={{
//                     marginTop: 20,
//                     transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`,
//                   }}
//                 />

//                 <h6 className="mt-3">Banner Controls</h6>
//                 <Form.Range name="bannerZoom" min="0.5" max="3" step="0.1" value={formData.bannerZoom} onChange={handleChange} />
//                 <Form.Range name="bannerX" min="-300" max="300" value={formData.bannerX} onChange={handleChange} />
//                 <Form.Range name="bannerY" min="-300" max="300" value={formData.bannerY} onChange={handleChange} />
//               </>
//             )}
//             <hr />
// <h6>Profile Settings</h6>

// <Form.Label>Profile Shape</Form.Label>
// <Form.Select name="profileShape" value={formData.profileShape} onChange={handleChange}>
//   <option value="circle">Circle</option>
//   <option value="square">Square</option>
//   <option value="rounded">Rounded</option>
// </Form.Select>

// <Form.Label className="mt-2">Profile Size</Form.Label>
// <Form.Range
//   name="profileSize"
//   min="80"
//   max="300"
//   value={formData.profileSize}
//   onChange={handleChange}
// />

// <Form.Label className="mt-2">Profile Position</Form.Label>
// <Form.Select name="profilePosition" value={formData.profilePosition} onChange={handleChange}>
//   <option value="topLeft">Top Left</option>
//   <option value="topCenter">Top Center</option>
//   <option value="topRight">Top Right</option>
//   <option value="center">Center</option>
//   <option value="bottomLeft">Bottom Left</option>
//   <option value="bottomCenter">Bottom Center</option>
//   <option value="bottomRight">Bottom Right</option>
// </Form.Select>

// <hr />
// <h6>Profile Animation</h6>

// <Form.Select
//   name="profileAnimation"
//   value={formData.profileAnimation}
//   onChange={handleChange}
// >
//   <option value="none">None</option>
//   <option value="fadeIn">Fade In</option>
//   <option value="slideUp">Slide Up</option>
//   <option value="zoomIn">Zoom In</option>
//   <option value="rotateIn">Rotate In</option>
// </Form.Select>

// <Form.Label className="mt-2">Duration (sec)</Form.Label>
// <Form.Control
//   type="number"
//   step="0.1"
//   name="profileAnimationDuration"
//   value={formData.profileAnimationDuration}
//   onChange={handleChange}
// />

// <Form.Label className="mt-2">Delay (sec)</Form.Label>
// <Form.Control
//   type="number"
//   step="0.1"
//   name="profileAnimationDelay"
//   value={formData.profileAnimationDelay}
//   onChange={handleChange}
// />

// <hr />
// <h6>Transition</h6>

// <Form.Select
//   name="transitionType"
//   value={formData.transitionType}
//   onChange={handleChange}
// >
//   <option value="fade">Fade</option>
//   <option value="slideFromBottom">Slide Bottom</option>
//   <option value="slideFromTop">Slide Top</option>
//   <option value="slideFromLeft">Slide Left</option>
//   <option value="slideFromRight">Slide Right</option>
//   <option value="zoomIn">Zoom In</option>
// </Form.Select>

// <Form.Label className="mt-2">Duration (sec)</Form.Label>
// <Form.Control
//   type="number"
//   step="0.1"
//   name="transitionDuration"
//   value={formData.transitionDuration}
//   onChange={handleChange}
// />

// <Form.Label className="mt-2">Delay (sec)</Form.Label>
// <Form.Control
//   type="number"
//   step="0.1"
//   name="transitionDelay"
//   value={formData.transitionDelay}
//   onChange={handleChange}
// />


//             <Button type="submit" className="w-100 mt-3">
//               {editing ? "Update" : "Save"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default BirthdayManager;


import React, { useEffect, useState, useRef } from "react";
import {
  Container, Card, Button, Table, Badge, Modal,
  Form, InputGroup, Row, Col, Tabs, Tab
} from "react-bootstrap";
import {
  FaPlus, FaEdit, FaTrash, FaSearch
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

const BirthdayManager = () => {
  const API_URL = "http://localhost:7000/api/birthdays";

  // Data States
  const [birthdays, setBirthdays] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  
  // ✅ TEXT REFS & STATES
  const [isResizingText, setIsResizingText] = useState(false);
  const [textResizeCorner, setTextResizeCorner] = useState(null);
  const textRef = useRef(null);
  const textWrapperRef = useRef(null);

  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);
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
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);

  // Control Defaults
  const defaultControls = {
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
    bannerZoom: 1,
    bannerX: 0,
    bannerY: 0
  };

  // Main Form State
  const [form, setForm] = useState({
    title: "",
    name: "",
    date: "",
    // status: "active",
    language: "",
    
    photo: null,
    photoType: "image",
    banner: null,

    profileAnimation: "fadeIn",
    profileDelay: 0,
    profileDuration: 0.6,

    transitionType: "fade",
    transitionDuration: 0.8,
    transitionDelay: 0,

    profileX: 50,
    profileY: 50,
    profileSize: 140,
    profileRadius: 50,

    ...defaultControls
  });

  // =================== FETCH DATA ===================
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL, {
        params: { 
          page, 
          limit, 
          search,
          language: selectedLanguage || undefined
        }
      });
      setBirthdays(res.data.birthdays || []);
      setTotalPages(res.data.pages || 1);

      // Fetch languages
      const langRes = await axios.get("http://localhost:7000/api/languages");
      setLanguages(langRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, [page, search, selectedLanguage]);

  // =================== SHOW MODAL ===================
  const handleShow = (item = null) => {
    if (item) {
      setEditing(item);
      setForm({
        title: item.title,
        name: item.name,
        date: item.date,
        // status: item.status,
        language: item.language?._id || "",
        
        photo: null,
        photoType: item.photoType || "image",
        banner: null,

        profileAnimation: item.animation?.profile?.effect || "fadeIn",
        profileDelay: item.animation?.profile?.delay || 0,
        profileDuration: item.animation?.profile?.duration || 0.6,

        transitionType: item.transition?.type || "fade",
        transitionDuration: item.transition?.duration || 0.8,
        transitionDelay: item.transition?.delay || 0,

        profileX: item.profile?.x || 50,
        profileY: item.profile?.y || 50,
        profileSize: item.profile?.size || 140,
        profileRadius: item.profile?.radius || 50,

        zoom: item.zoom || 1,
        offsetX: item.offsetX || 0,
        offsetY: item.offsetY || 0,
        bannerZoom: item.bannerZoom || 1,
        bannerX: item.bannerX || 0,
        bannerY: item.bannerY || 0
      });
      setPhotoPreview(item.photo);
      setBannerPreview(item.banner);
    } else {
      setEditing(null);
      setForm({
        title: "",
        name: "",
        date: "",
        // status: "active",
        language: "",
        photo: null,
        photoType: "image",
        banner: null,
        profileAnimation: "fadeIn",
        profileDelay: 0,
        profileDuration: 0.6,
        transitionType: "fade",
        transitionDuration: 0.8,
        transitionDelay: 0,
        profileX: 50,
        profileY: 50,
        profileSize: 140,
        profileRadius: 50,
        ...defaultControls
      });
      setPhotoPreview(null);
      setBannerPreview(null);
    }
    setShow(true);
    setIsPositioning(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm(prev => ({ ...prev, [name]: file }));
      
      if (name === "photo") {
        setPhotoPreview(URL.createObjectURL(file));
        setForm(prev => ({
          ...prev,
          photoType: file.type.startsWith("video") ? "video" : "image"
        }));
      }
      if (name === "banner") setBannerPreview(URL.createObjectURL(file));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.name) return alert("Fill required fields");

    setLoading(true);
    const fd = new FormData();
    
    Object.entries(form).forEach(([key, value]) => {
      // Skip empty language
      if (key === "language" && value === "") return;
      
      if (value !== null && !["photo", "banner"].includes(key)) {
        fd.append(key, value);
      }
    });

    if (form.photo) fd.append("photo", form.photo);
    if (form.banner) fd.append("banner", form.banner);

    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing._id}`, fd);
      } else {
        await axios.post(API_URL, fd);
      }
      setShow(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.message || "Server error"));
    } finally {
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
    if (!window.confirm("Delete this birthday?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // const handleToggleStatus = async (item) => {
  //   try {
  //     await axios.put(`${API_URL}/toggle-status/${item._id}`);
  //     fetchData();
  //   } catch (e) {
  //     alert("Toggle failed");
  //   }
  // };

  // =================== RENDER ===================
  return (
    <Container fluid className="py-3">
      {/* HEADER */}
      <Row className="align-items-center mb-3 g-2">
        <Col xs={12} md={3}>
          <h3 className="text-center text-md-start">Birthdays</h3>
        </Col>
        <Col xs={12} md={3}>
          <InputGroup className="mt-2 mt-md-0">
            <Form.Control
              placeholder="Search by name..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
            <Button><FaSearch /></Button>
          </InputGroup>
        </Col>
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
        <Col xs={12} md={3} className="text-md-end text-center mt-2 mt-md-0">
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
                  <th>Photo</th>
                  <th>Banner</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Language</th>
                  {/* <th>Status</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {birthdays.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.photoType === "video" ? (
                        <video
                          src={item.photo}
                          width="90"
                          height="60"
                          controls
                          muted
                          style={{ borderRadius: 6, objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={item.photo}
                          width="90"
                          height="60"
                          style={{ objectFit: "cover", borderRadius: 6 }}
                        />
                      )}
                    </td>
                    <td>
                      {item.banner ? (
                        <img src={item.banner} width="90" height="60"
                          style={{ borderRadius: 6 }} />
                      ) : "—"}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.language?.name || "-"}</td>
                    {/* <td>
                      <Form.Check
                        type="switch"
                        checked={item.status === "active"}
                        onChange={() => handleToggleStatus(item)}
                        label={item.status === "active" ? "Active" : "Inactive"}
                      />
                    </td> */}
                    <td>
                      <Button size="sm" className="me-1"
                        onClick={() => handleShow(item)}>
                        <FaEdit />
                      </Button>
                      <Button size="sm" variant="danger"
                        onClick={() => handleDelete(item._id)}>
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
          <Modal.Title>{editing ? "Edit Birthday" : "Add Birthday"}</Modal.Title>
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
                {photoPreview && (
                  form.photoType === "video" ? (
                    <video
                      src={photoPreview}
                      autoPlay
                      muted
                      loop
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                        transform: `scale(${form.zoom}) translate(${form.offsetX}px, ${form.offsetY}px)`,
                        zIndex: 1,
                      }}
                    />
                  ) : (
                    <img
                      src={photoPreview}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0,
                        transform: `scale(${form.zoom}) translate(${form.offsetX}px, ${form.offsetY}px)`,
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

                {/* BANNER */}
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
                      transform: `scale(${form.bannerZoom}) translate(${form.bannerX}px, ${form.bannerY}px)`,
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
                        profileSize: 140,
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
                      <Form.Label className="small mb-1">Name *</Form.Label>
                      <Form.Control size="sm" name="name" value={form.name} onChange={handleChange} />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Date</Form.Label>
                      <Form.Control size="sm" type="date" name="date" value={form.date} onChange={handleChange} />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Language</Form.Label>
                      <Form.Select size="sm" name="language" value={form.language} onChange={handleChange}>
                        <option value="">Select Language</option>
                        {languages.map((lang) => (
                          <option key={lang._id} value={lang._id}>
                            {lang.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    {/* <Col md={6}>
                      <Form.Label className="small mb-1">Status</Form.Label>
                      <Form.Select size="sm" name="status" value={form.status} onChange={handleChange}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Form.Select>
                    </Col> */}
                    <Col md={6}>
                      <Form.Label className="small mb-1">Photo</Form.Label>
                      <Form.Control size="sm" type="file" name="photo" onChange={handleChange} accept="image/*,video/*" />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small mb-1">Banner</Form.Label>
                      <Form.Control size="sm" type="file" name="banner" onChange={handleChange} accept="image/*" />
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

                {/* MEDIA CONTROLS TAB */}
                <Tab eventKey="media" title="Media">
                  {/* <h6 className="mb-2">Photo Controls</h6>
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Label className="small">Zoom: {form.zoom}x</Form.Label>
                      <Form.Range size="sm" name="zoom" min="0.3" max="3" step="0.1" value={form.zoom} onChange={handleChange} />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move X: {form.offsetX}px</Form.Label>
                      <Form.Range size="sm" name="offsetX" min="-200" max="200" value={form.offsetX} onChange={handleChange} />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move Y: {form.offsetY}px</Form.Label>
                      <Form.Range size="sm" name="offsetY" min="-200" max="200" value={form.offsetY} onChange={handleChange} />
                    </Col>
                  </Row> */}

                  <hr className="my-3" />

                  <h6 className="mb-2">Banner Controls</h6>
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Label className="small">Zoom: {form.bannerZoom}x</Form.Label>
                      <Form.Range size="sm" name="bannerZoom" min="0.5" max="3" step="0.1" value={form.bannerZoom} onChange={handleChange} />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move X: {form.bannerX}px</Form.Label>
                      <Form.Range size="sm" name="bannerX" min="-200" max="200" value={form.bannerX} onChange={handleChange} />
                    </Col>
                    <Col xs={12}>
                      <Form.Label className="small">Move Y: {form.bannerY}px</Form.Label>
                      <Form.Range size="sm" name="bannerY" min="-200" max="200" value={form.bannerY} onChange={handleChange} />
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
    </Container>
  );
};

export default BirthdayManager;