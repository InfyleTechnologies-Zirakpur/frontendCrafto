import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Table, Image } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const API_URL = "https://crafto-backend-zqcn.onrender.com/api/birthdays";

const BirthdayManager = () => {
  const [birthdays, setBirthdays] = useState([]);
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
    photoType: "",

    banner: null,
    bannerPreview: "",

    zoom: 1,
    offsetX: 0,
    offsetY: 0,

    bannerZoom: 1,
    bannerX: 0,
    bannerY: 0,
  });

  /* ================= FETCH ================= */
  const fetchData = async () => {
    const res = await axios.get(API_URL, {
      params: { search, page, limit },
    });
    setBirthdays(res.data.birthdays);
    setTotalPages(res.data.pages);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files?.length) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
        photoType: file.type.startsWith("video") ? "video" : "image",
      }));
      return;
    }

    if (name === "banner" && files?.length) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        banner: file,
        bannerPreview: URL.createObjectURL(file),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Object.keys(formData).forEach((key) => {
    //   if (
    //     ["photo", "banner", "photoPreview", "bannerPreview", "photoType"].includes(
    //       key
    //     )
    //   )
    //     return;
    //   data.append(key, formData[key]);
    // });

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

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchData();
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditing(item);
    setFormData({
      title: item.title,
      name: item.name,
      date: item.date,
      status: item.status,

      photo: null,
      photoPreview: item.photo || "",
      photoType: item.photoType || "image",

      banner: null,
      bannerPreview: item.banner || "",

      zoom: item.zoom || 1,
      offsetX: item.offsetX || 0,
      offsetY: item.offsetY || 0,

      bannerZoom: item.bannerZoom || 1,
      bannerX: item.bannerX || 0,
      bannerY: item.bannerY || 0,
       profileSize: item.profile?.size || 140,
    profileShape: item.profile?.shape || "circle",
    profilePosition: item.profile?.position || "center",

    // 🔥 PROFILE ANIMATION
    profileAnimation: item.animation?.profile?.effect || "fadeIn",
    profileAnimationDuration: item.animation?.profile?.duration || 0.6,
    profileAnimationDelay: item.animation?.profile?.delay || 0,

    // 🔥 TRANSITION
    transitionType: item.transition?.type || "fade",
    transitionDuration: item.transition?.duration || 0.8,
    transitionDelay: item.transition?.delay || 0,
    });
    setShowModal(true);
  };

  /* ================= CLOSE ================= */
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
      photoType: "",

      banner: null,
      bannerPreview: "",

      zoom: 1,
      offsetX: 0,
      offsetY: 0,

      bannerZoom: 1,
      bannerX: 0,
      bannerY: 0,

      profileSize: 140,
  profileShape: "circle",
  profilePosition: "center",

  // 🔥 PROFILE ANIMATION
  profileAnimation: "fadeIn",
  profileAnimationDuration: 0.6,
  profileAnimationDelay: 0,

  // 🔥 TRANSITION
  transitionType: "fade",
  transitionDuration: 0.8,
  transitionDelay: 0,

    });
  };

  return (
    <div className="p-3 p-md-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h4>Birthday Manager</h4>
        <Button onClick={() => setShowModal(true)}>
          <FaPlus /> Add Birthday
        </Button>
      </div>

      {/* SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* TABLE */}
      <Table bordered hover className="text-center align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Banner</th>
            <th>Photo / Video</th>
            <th>Name</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {birthdays.map((b, i) => (
            <tr key={b._id}>
              <td>{(page - 1) * limit + i + 1}</td>

              <td>
                {b.banner ? (
                  <Image src={b.banner} width="80" height="45" />
                ) : "—"}
              </td>

              <td>
                {b.photoType === "video" ? (
                  <video src={b.photo} width="60" height="60" controls />
                ) : (
                  <Image src={b.photo} width="60" height="60" roundedCircle />
                )}
              </td>

              <td>{b.name}</td>
              <td>{b.title}</td>
              <td>{b.date}</td>
              <td>{b.status}</td>

              <td>
                <Button size="sm" variant="warning" onClick={() => handleEdit(b)}>
                  <FaEdit />
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(b._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit" : "Add"} Birthday</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control className="mb-2" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
            <Form.Control className="mb-2" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <Form.Control className="mb-2" type="date" name="date" value={formData.date} onChange={handleChange} />

            <Form.Control className="mb-2" type="file" name="photo" accept="image/*,video/*" onChange={handleChange} />
            <Form.Control className="mb-3" type="file" name="banner" onChange={handleChange} />

            {/* PHOTO PREVIEW */}
            {formData.photoPreview && formData.photoType === "image" && (
              <>
                <div style={{ width: 260, height: 260, margin: "auto", overflow: "hidden", borderRadius: "50%" }}>
                  <img
                    src={formData.photoPreview}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transform: `scale(${formData.zoom}) translate(${formData.offsetX}px, ${formData.offsetY}px)`,
                    }}
                  />
                </div>

                <h6 className="mt-3">Photo Controls</h6>
                <Form.Range name="zoom" min="0.5" max="3" step="0.1" value={formData.zoom} onChange={handleChange} />
                <Form.Range name="offsetX" min="-200" max="200" value={formData.offsetX} onChange={handleChange} />
                <Form.Range name="offsetY" min="-200" max="200" value={formData.offsetY} onChange={handleChange} />
              </>
            )}

            {formData.photoPreview && formData.photoType === "video" && (
              <video src={formData.photoPreview} controls width="100%" />
            )}

            {/* BANNER */}
            {formData.bannerPreview && (
              <>
                <img
                  src={formData.bannerPreview}
                  alt="banner"
                  width="100%"
                  style={{
                    marginTop: 20,
                    transform: `scale(${formData.bannerZoom}) translate(${formData.bannerX}px, ${formData.bannerY}px)`,
                  }}
                />

                <h6 className="mt-3">Banner Controls</h6>
                <Form.Range name="bannerZoom" min="0.5" max="3" step="0.1" value={formData.bannerZoom} onChange={handleChange} />
                <Form.Range name="bannerX" min="-300" max="300" value={formData.bannerX} onChange={handleChange} />
                <Form.Range name="bannerY" min="-300" max="300" value={formData.bannerY} onChange={handleChange} />
              </>
            )}
            <hr />
<h6>Profile Settings</h6>

<Form.Label>Profile Shape</Form.Label>
<Form.Select name="profileShape" value={formData.profileShape} onChange={handleChange}>
  <option value="circle">Circle</option>
  <option value="square">Square</option>
  <option value="rounded">Rounded</option>
</Form.Select>

<Form.Label className="mt-2">Profile Size</Form.Label>
<Form.Range
  name="profileSize"
  min="80"
  max="300"
  value={formData.profileSize}
  onChange={handleChange}
/>

<Form.Label className="mt-2">Profile Position</Form.Label>
<Form.Select name="profilePosition" value={formData.profilePosition} onChange={handleChange}>
  <option value="topLeft">Top Left</option>
  <option value="topCenter">Top Center</option>
  <option value="topRight">Top Right</option>
  <option value="center">Center</option>
  <option value="bottomLeft">Bottom Left</option>
  <option value="bottomCenter">Bottom Center</option>
  <option value="bottomRight">Bottom Right</option>
</Form.Select>

<hr />
<h6>Profile Animation</h6>

<Form.Select
  name="profileAnimation"
  value={formData.profileAnimation}
  onChange={handleChange}
>
  <option value="none">None</option>
  <option value="fadeIn">Fade In</option>
  <option value="slideUp">Slide Up</option>
  <option value="zoomIn">Zoom In</option>
  <option value="rotateIn">Rotate In</option>
</Form.Select>

<Form.Label className="mt-2">Duration (sec)</Form.Label>
<Form.Control
  type="number"
  step="0.1"
  name="profileAnimationDuration"
  value={formData.profileAnimationDuration}
  onChange={handleChange}
/>

<Form.Label className="mt-2">Delay (sec)</Form.Label>
<Form.Control
  type="number"
  step="0.1"
  name="profileAnimationDelay"
  value={formData.profileAnimationDelay}
  onChange={handleChange}
/>

<hr />
<h6>Transition</h6>

<Form.Select
  name="transitionType"
  value={formData.transitionType}
  onChange={handleChange}
>
  <option value="fade">Fade</option>
  <option value="slideFromBottom">Slide Bottom</option>
  <option value="slideFromTop">Slide Top</option>
  <option value="slideFromLeft">Slide Left</option>
  <option value="slideFromRight">Slide Right</option>
  <option value="zoomIn">Zoom In</option>
</Form.Select>

<Form.Label className="mt-2">Duration (sec)</Form.Label>
<Form.Control
  type="number"
  step="0.1"
  name="transitionDuration"
  value={formData.transitionDuration}
  onChange={handleChange}
/>

<Form.Label className="mt-2">Delay (sec)</Form.Label>
<Form.Control
  type="number"
  step="0.1"
  name="transitionDelay"
  value={formData.transitionDelay}
  onChange={handleChange}
/>


            <Button type="submit" className="w-100 mt-3">
              {editing ? "Update" : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BirthdayManager;
