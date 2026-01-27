// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Form,
//   Button,
//   Card,
//   Spinner,
//   Alert,
//   Table,
// } from "react-bootstrap";

// const POLITICIAN_API = "https://crafto-backend-zqcn.onrender.com/api/politicians";
// const POST_API = "https://crafto-backend-zqcn.onrender.com/api/politician-posts";

// const PoliticianPostForm = () => {
//   const token = localStorage.getItem("token");

//   /* ================= STATES ================= */
//   const [politicians, setPoliticians] = useState([]);
//   const [posts, setPosts] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [tableLoading, setTableLoading] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [form, setForm] = useState({
//     politician: "",
//     title: "",
//     description: "",
//     media: null,
//     preview: "",
//   });

//   /* ================= FETCH POLITICIANS ================= */
//   const fetchPoliticians = async () => {
//     try {
//       const res = await axios.get(POLITICIAN_API);
//       setPoliticians(res.data.politicians || []);
//     } catch (err) {
//       setError("Failed to load politicians");
//     }
//   };

//   /* ================= FETCH POSTS ================= */
//   const fetchPosts = async () => {
//     try {
//       setTableLoading(true);
//       const res = await axios.get(POST_API, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPosts(res.data.posts || []);
//     } catch (err) {
//       console.error("Failed to load posts");
//     } finally {
//       setTableLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPoliticians();
//     fetchPosts();
//   }, []);

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       const file = files[0];
//       setForm((prev) => ({
//         ...prev,
//         [name]: file,
//         preview: URL.createObjectURL(file),
//       }));
//     } else {
//       setForm((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!form.politician || !form.title) {
//       setError("Politician and title are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const fd = new FormData();
//       fd.append("politician", form.politician);
//       fd.append("title", form.title);
//       fd.append("description", form.description);
//       if (form.media) fd.append("media", form.media);

//       await axios.post(POST_API, fd, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setSuccess("✅ Politician post created successfully");

//       setForm({
//         politician: "",
//         title: "",
//         description: "",
//         media: null,
//         preview: "",
//       });

//       fetchPosts(); // 🔥 refresh table
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <Container className="py-4" style={{ maxWidth: 900 }}>
//       {/* ================= FORM ================= */}
//       <Card className="shadow-sm mb-4">
//         <Card.Body>
//           <h4 className="text-center mb-3">🏛️ Create Politician Post</h4>

//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">{success}</Alert>}

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Select Politician</Form.Label>
//               <Form.Select
//                 name="politician"
//                 value={form.politician}
//                 onChange={handleChange}
//               >
//                 <option value="">-- Choose Politician --</option>
//                 {politicians.map((p) => (
//                   <option key={p._id} value={p._id}>
//                     {p.title}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Post Title</Form.Label>
//               <Form.Control
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//                 placeholder="Enter post title"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Media (Image / Video)</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="media"
//                 accept="image/*,video/*"
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             {form.preview && (
//               <div className="text-center mb-3">
//                 {form.media?.type?.startsWith("video") ? (
//                   <video src={form.preview} width="250" controls />
//                 ) : (
//                   <img src={form.preview} width="250" alt="preview" />
//                 )}
//               </div>
//             )}

//             <Button type="submit" className="w-100" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Spinner size="sm" /> Saving...
//                 </>
//               ) : (
//                 "Save Post"
//               )}
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>

//       {/* ================= TABLE ================= */}
//       <Card className="shadow-sm">
//         <Card.Body>
//           <h5 className="mb-3 text-center">📋 Politician Posts</h5>

//           {tableLoading ? (
//             <div className="text-center">
//               <Spinner />
//             </div>
//           ) : (
//             <Table bordered hover responsive className="align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>#</th>
//                   <th>Politician</th>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Media</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {posts.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="text-center">
//                       No posts found
//                     </td>
//                   </tr>
//                 ) : (
//                   posts.map((post, index) => (
//                     <tr key={post._id}>
//                       <td>{index + 1}</td>
//                       <td>{post.politician?.title}</td>
//                       <td>{post.title}</td>
//                       <td style={{ maxWidth: 200 }}>
//                         {post.description}
//                       </td>
//                       <td>
//                         {post.media ? (
//                           post.media.endsWith(".mp4") ? (
//                             <video src={post.media} width="80" controls />
//                           ) : (
//                             <img src={post.media} width="80" alt="" />
//                           )
//                         ) : (
//                           "—"
//                         )}
//                       </td>
//                       <td>
//                         {new Date(post.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default PoliticianPostForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Card,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";

const POLITICIAN_API = "https://crafto-backend-zqcn.onrender.com/api/politicians";
const POST_API = "https://crafto-backend-zqcn.onrender.com/api/politician-posts";

const PoliticianPostForm = () => {
  const token = localStorage.getItem("token");

  /* ================= STATES ================= */
  const [politicians, setPoliticians] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    politician: "",
    title: "",
    description: "",
    media: null,
    preview: "",
  });

  /* ================= FETCH DATA ================= */
  const fetchPoliticians = async () => {
    const res = await axios.get(POLITICIAN_API);
    setPoliticians(res.data.politicians || []);
  };

  const fetchPosts = async () => {
    try {
      setTableLoading(true);
      const res = await axios.get(POST_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data.posts || []);
    } catch {
      setError("Failed to load posts");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchPoliticians();
    fetchPosts();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        media: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  /* ================= SUBMIT (CREATE / UPDATE) ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("politician", form.politician);
      fd.append("title", form.title);
      fd.append("description", form.description);
      if (form.media) fd.append("media", form.media);

      if (isEdit) {
        await axios.put(`${POST_API}/${editId}`, fd, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("✅ Post updated successfully");
      } else {
        await axios.post(POST_API, fd, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("✅ Post created successfully");
      }

      resetForm();
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (post) => {
    setIsEdit(true);
    setEditId(post._id);
    setForm({
      politician: post.politician?._id,
      title: post.title,
      description: post.description,
      media: null,
      preview: post.media,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    await axios.delete(`${POST_API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchPosts();
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setIsEdit(false);
    setEditId(null);
    setForm({
      politician: "",
      title: "",
      description: "",
      media: null,
      preview: "",
    });
  };

  /* ================= UI ================= */
  return (
    <Container className="py-4" style={{ maxWidth: 1000 }}>
      {/* FORM */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h4 className="text-center">
            {isEdit ? "✏️ Edit Post" : "🏛️ Create Politician Post"}
          </h4>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Select
              className="mb-3"
              name="politician"
              value={form.politician}
              onChange={handleChange}
            >
              <option value="">-- Select Politician --</option>
              {politicians.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </Form.Select>

            <Form.Control
              className="mb-3"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Post title"
            />

            <Form.Control
              as="textarea"
              rows={3}
              className="mb-3"
              name="description"
              value={form.description}
              onChange={handleChange}
            />

            <Form.Control
              type="file"
              className="mb-3"
              accept="image/*,video/*"
              onChange={handleChange}
            />

            {form.preview && (
              <div className="text-center mb-3">
                {form.preview.endsWith(".mp4") ? (
                  <video src={form.preview} width="200" controls />
                ) : (
                  <img src={form.preview} width="200" alt="" />
                )}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-100">
              {loading ? <Spinner size="sm" /> : isEdit ? "Update" : "Save"}
            </Button>

            {isEdit && (
              <Button
                variant="secondary"
                className="w-100 mt-2"
                onClick={resetForm}
              >
                Cancel Edit
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* TABLE */}
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="text-center mb-3">📋 Politician Posts</h5>

          {tableLoading ? (
            <Spinner />
          ) : (
            <Table bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Politician</th>
                  <th>Title</th>
                  <th>Media</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post._id}>
                    <td>{i + 1}</td>
                    <td>{post.politician?.title}</td>
                    <td>{post.title}</td>
                    <td>
                      {post.media && (
                        post.media.endsWith(".mp4") ? (
                          <video src={post.media} width="80" />
                        ) : (
                          <img src={post.media} width="80" />
                        )
                      )}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PoliticianPostForm;
