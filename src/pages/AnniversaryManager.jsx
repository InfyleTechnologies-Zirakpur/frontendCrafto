// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form, Table, Image } from "react-bootstrap";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const API_URL = "https://crafto-backend-zqcn.onrender.com/api/anniversaries";

// const AnniversaryManager = () => {
//   const [anniversaries, setAnniversaries] = useState([]);
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
//     banner: null,
//     bannerPreview: "",

//     zoom: 1,
//     offsetX: 0,
//     offsetY: 0,

//     bannerZoom: 1,
//     bannerX: 0,
//     bannerY: 0,
//   });

//   // Fetch Data
//   const fetchData = async () => {
//     const res = await axios.get(API_URL, {
//       params: { search, page, limit }
//     });

//     setAnniversaries(res.data.anniversaries);
//     setTotalPages(res.data.pages);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, search]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "photo" && files?.length) {
//       setFormData({
//         ...formData,
//         photo: files[0],
//         photoPreview: URL.createObjectURL(files[0]),
//       });
//       return;
//     }

//     if (name === "banner" && files?.length) {
//       setFormData({
//         ...formData,
//         banner: files[0],
//         bannerPreview: URL.createObjectURL(files[0]),
//       });
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();

//     Object.keys(formData).forEach((key) => {
//       if (key === "photo" || key === "banner") return;
//       data.append(key, formData[key]);
//     });

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

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this entry?")) {
//       await axios.delete(`${API_URL}/${id}`);
//       fetchData();
//     }
//   };

//   const handleEdit = (item) => {
//     setEditing(item);

//     setFormData({
//       title: item.title,
//       name: item.name,
//       date: item.date,
//       status: item.status,

//       photo: null,
//       photoPreview: item.photo || "",

//       banner: null,
//       bannerPreview: item.banner || "",

//       zoom: item.zoom || 1,
//       offsetX: item.offsetX || 0,
//       offsetY: item.offsetY || 0,

//       bannerZoom: item.bannerZoom || 1,
//       bannerX: item.bannerX || 0,
//       bannerY: item.bannerY || 0,
//     });

//     setShowModal(true);
//   };

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
//       banner: null,
//       bannerPreview: "",

//       zoom: 1,
//       offsetX: 0,
//       offsetY: 0,

//       bannerZoom: 1,
//       bannerX: 0,
//       bannerY: 0,
//     });
//   };

//   return (
//     <div className="p-4">
//       {/* HEADER */}
//       <div className="d-flex justify-content-between mb-3">
//         <h4>Anniversary Manager</h4>
//         <Button onClick={() => setShowModal(true)}>
//           <FaPlus /> Add Anniversary
//         </Button>
//       </div>

//       {/* SEARCH */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search by name..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setPage(1);
//         }}
//       />

//       {/* TABLE */}
//       <Table bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Banner</th>
//             <th>Photo</th>
//             <th>Name</th>
//             <th>Title</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {anniversaries.map((a, i) => (
//             <tr key={a._id}>
//               <td>{(page - 1) * limit + i + 1}</td>
//               <td>{a.banner ? <Image src={a.banner} width="70" /> : "—"}</td>
//               <td>{a.photo ? <Image src={a.photo} width="60" /> : "—"}</td>

//               <td>{a.name}</td>
//               <td>{a.title}</td>
//               <td>{a.date}</td>
//               <td>{a.status}</td>

//               <td>
//                 <Button
//                   size="sm"
//                   variant="warning"
//                   onClick={() => handleEdit(a)}
//                 >
//                   <FaEdit />
//                 </Button>{" "}
//                 <Button
//                   size="sm"
//                   variant="danger"
//                   onClick={() => handleDelete(a._id)}
//                 >
//                   <FaTrash />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* PAGINATION */}
//       <div className="d-flex justify-content-center gap-3 py-2">
//         <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </Button>
//         <span>
//           Page {page} / {totalPages}
//         </span>
//         <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
//           Next
//         </Button>
//       </div>

//       {/* MODAL */}
//       <Modal show={showModal} onHide={handleClose} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editing ? "Edit Anniversary" : "Add Anniversary"}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>

//             <Form.Group className="mb-2">
//               <Form.Label>Title</Form.Label>
//               <Form.Control name="title" value={formData.title} onChange={handleChange} />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Name</Form.Label>
//               <Form.Control name="name" value={formData.name} onChange={handleChange} />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Date</Form.Label>
//               <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
//             </Form.Group>

//             {/* Upload Row */}
//             <div className="row">
//               <div className="col-md-6">
//                 <Form.Group>
//                   <Form.Label>Photo Upload</Form.Label>
//                   <Form.Control type="file" name="photo" onChange={handleChange} />
//                 </Form.Group>
//               </div>

//               <div className="col-md-6">
//                 <Form.Group>
//                   <Form.Label>Banner Upload</Form.Label>
//                   <Form.Control type="file" name="banner" onChange={handleChange} />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* LIVE PREVIEW */}
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

//               {/* Banner */}
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

//               {/* Profile Photo */}
//               {formData.photoPreview && (
//                 <div
//                   style={{
//                     width: 140,
//                     height: 140,
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     border: "4px solid white",
//                     background: "white",
//                   }}
//                 >
//                   <img
//                     src={formData.photoPreview}
//                     alt="photo"
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       transform: `scale(${formData.zoom}) translate(${formData.offsetX}px, ${formData.offsetY}px)`
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* PHOTO CONTROLS */}
//             <hr />
//             <h6>Photo Controls</h6>

//             <Form.Label>Zoom: {formData.zoom}</Form.Label>
//             <Form.Range name="zoom" min="0.1" max="3" step="0.1" value={formData.zoom} onChange={handleChange} />

//             <Form.Label>X Position: {formData.offsetX}px</Form.Label>
//             <Form.Range name="offsetX" min="-200" max="200" value={formData.offsetX} onChange={handleChange} />

//             <Form.Label>Y Position: {formData.offsetY}px</Form.Label>
//             <Form.Range name="offsetY" min="-200" max="200" value={formData.offsetY} onChange={handleChange} />

//             {/* BANNER CONTROLS */}
//             <hr />
//             <h6>Banner Controls</h6>

//             <Form.Label>Zoom: {formData.bannerZoom}</Form.Label>
//             <Form.Range name="bannerZoom" min="0.1" max="3" step="0.1" value={formData.bannerZoom} onChange={handleChange} />

//             <Form.Label>X Position: {formData.bannerX}px</Form.Label>
//             <Form.Range name="bannerX" min="-200" max="200" value={formData.bannerX} onChange={handleChange} />

//             <Form.Label>Y Position: {formData.bannerY}px</Form.Label>
//             <Form.Range name="bannerY" min="-200" max="200" value={formData.bannerY} onChange={handleChange} />

//             <Button type="submit" className="w-100 mt-3" variant="primary">
//               {editing ? "Update" : "Save"}
//             </Button>

//           </Form>
//         </Modal.Body>

//       </Modal>
//     </div>
//   );
// };

// export default AnniversaryManager;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Image } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const API_URL = "https://crafto-backend-zqcn.onrender.com/api/anniversaries";

const AnniversaryManager = () => {
  const [anniversaries, setAnniversaries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    date: "",
    status: "active",

    photo: null,
    photoPreview: "",
    banner: null,
    bannerPreview: "",

    zoom: 1,
    offsetX: 0,
    offsetY: 0,

    bannerZoom: 1,
    bannerX: 0,
    bannerY: 0,
  });

  const fetchData = async () => {
    const res = await axios.get(API_URL, {
      params: { search, page, limit },
    });

    setAnniversaries(res.data.anniversaries);
    setTotalPages(res.data.pages);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files?.length) {
      setFormData({
        ...formData,
        photo: files[0],
        photoPreview: URL.createObjectURL(files[0]),
      });
      return;
    }

    if (name === "banner" && files?.length) {
      setFormData({
        ...formData,
        banner: files[0],
        bannerPreview: URL.createObjectURL(files[0]),
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "photo" || key === "banner") return;
      data.append(key, formData[key]);
    });

    if (formData.photo) data.append("photo", formData.photo);
    if (formData.banner) data.append("banner", formData.banner);

    if (editing) {
      await axios.put(`${API_URL}/${editing._id}`, data);
    } else {
      await axios.post(API_URL, data);
    }

    handleClose();
    fetchData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    }
  };

  const handleEdit = (item) => {
    setEditing(item);

    setFormData({
      title: item.title,
      name: item.name,
      date: item.date,
      status: item.status,

      photo: null,
      photoPreview: item.photo || "",
      banner: null,
      bannerPreview: item.banner || "",

      zoom: item.zoom || 1,
      offsetX: item.offsetX || 0,
      offsetY: item.offsetY || 0,

      bannerZoom: item.bannerZoom || 1,
      bannerX: item.bannerX || 0,
      bannerY: item.bannerY || 0,
    });

    setShowModal(true);
  };

  const handleClose = () => {
    setEditing(null);
    setShowModal(false);

    setFormData({
      title: "",
      name: "",
      date: "",
      status: "active",

      photo: null,
      photoPreview: "",
      banner: null,
      bannerPreview: "",

      zoom: 1,
      offsetX: 0,
      offsetY: 0,

      bannerZoom: 1,
      bannerX: 0,
      bannerY: 0,
    });
  };

  return (
    <div className="p-3 p-md-4">

      {/* HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h4 className="m-0">Anniversary Manager</h4>

        <Button className="w-100 w-md-auto" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Anniversary
        </Button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* RESPONSIVE TABLE */}
      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Banner</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {anniversaries.map((a, i) => (
              <tr key={a._id}>
                <td>{(page - 1) * limit + i + 1}</td>

                <td>
                  {a.banner ? (
                    <Image
                      src={a.banner}
                      width="90"
                      height="50"
                      style={{ objectFit: "cover", borderRadius: "6px" }}
                    />
                  ) : "—"}
                </td>

                <td>
                  {a.photo ? (
                    <Image
                      src={a.photo}
                      width="60"
                      height="60"
                      roundedCircle
                      style={{ objectFit: "cover" }}
                    />
                  ) : "—"}
                </td>

                <td>{a.name}</td>
                <td>{a.title}</td>
                <td>{a.date}</td>
                <td>{a.status}</td>

                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button size="sm" variant="warning" onClick={() => handleEdit(a)}>
                      <FaEdit />
                    </Button>

                    <Button size="sm" variant="danger" onClick={() => handleDelete(a._id)}>
                      <FaTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center align-items-center gap-3 py-3">
        <Button size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>

        <span>
          Page {page} / {totalPages}
        </span>

        <Button size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Edit Anniversary" : "Add Anniversary"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            {/* TEXT FIELDS */}
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={formData.title} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
            </Form.Group>

            {/* FILE UPLOAD ROW */}
            <div className="row my-3">
              <div className="col-12 col-md-6">
                <Form.Label>Photo Upload</Form.Label>
                <Form.Control type="file" name="photo" onChange={handleChange} />
              </div>

              <div className="col-12 col-md-6 mt-3 mt-md-0">
                <Form.Label>Banner Upload</Form.Label>
                <Form.Control type="file" name="banner" onChange={handleChange} />
              </div>
            </div>

            {/* LIVE PREVIEW */}
            <div
              style={{
                width: "100%",
                maxWidth: 320,
                height: 300,
                margin: "20px auto",
                position: "relative",
                overflow: "hidden",
                borderRadius: 12,
                border: "1px dashed #999",
                background: "#f2f2f2",
              }}
            >
              {/* Banner */}
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

              {/* Photo */}
              {formData.photoPreview && (
                <div
                  style={{
                    width: 140,
                    height: 140,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid white",
                  }}
                >
                  <img
                    src={formData.photoPreview}
                    alt="photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transform: `scale(${formData.zoom}) translate(${formData.offsetX}px, ${formData.offsetY}px)`
                    }}
                  />
                </div>
              )}
            </div>

            {/* PHOTO CONTROLS */}
            <h6>Photo Controls</h6>

            <Form.Label>Zoom: {formData.zoom}</Form.Label>
            <Form.Range name="zoom" min="0.3" max="3" step="0.1" value={formData.zoom} onChange={handleChange} />

            <Form.Label>X Position: {formData.offsetX}px</Form.Label>
            <Form.Range name="offsetX" min="-200" max="200" value={formData.offsetX} onChange={handleChange} />

            <Form.Label>Y Position: {formData.offsetY}px</Form.Label>
            <Form.Range name="offsetY" min="-200" max="200" value={formData.offsetY} onChange={handleChange} />

            {/* BANNER CONTROLS */}
            <h6 className="mt-4">Banner Controls</h6>

            <Form.Label>Zoom: {formData.bannerZoom}</Form.Label>
            <Form.Range name="bannerZoom" min="0.3" max="3" step="0.1" value={formData.bannerZoom} onChange={handleChange} />

            <Form.Label>X Position: {formData.bannerX}px</Form.Label>
            <Form.Range name="bannerX" min="-300" max="300" value={formData.bannerX} onChange={handleChange} />

            <Form.Label>Y Position: {formData.bannerY}px</Form.Label>
            <Form.Range name="bannerY" min="-300" max="300" value={formData.bannerY} onChange={handleChange} />

            <Button type="submit" className="w-100 mt-3" variant="primary">
              {editing ? "Update" : "Save"}
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AnniversaryManager;
