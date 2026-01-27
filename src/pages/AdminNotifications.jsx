// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // const AdminNotifications = () => {
// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     body: "",
// // //     image: "",
// // //     link: "",
// // //   });

// // //   const [loading, setLoading] = useState(false);
// // //   const [success, setSuccess] = useState(null);
// // //   const [error, setError] = useState("");

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //     setError("");
// // //     setSuccess(null);
// // //   };

// // //   const sendNotification = async () => {
// // //     if (!form.title.trim() || !form.body.trim()) {
// // //       setError("❌ Title aur Message dono required hain");
// // //       return;
// // //     }

// // //     try {
// // //       setLoading(true);
// // //       setError("");
// // //       setSuccess(null);

// // //       const res = await axios.post(
// // //         "https://crafto-backend-zqcn.onrender.com/api/notifications/send",
// // //         {
// // //           title: form.title,
// // //           body: form.body,
// // //           image: form.image,
// // //           link: form.link,
// // //         },
// // //         {
// // //           headers: { "Content-Type": "application/json" },
// // //         }
// // //       );

// // //       setSuccess(`✅ Sent: ${res.data.sent} | ❌ Failed: ${res.data.failed}`);

// // //       setForm({
// // //         title: "",
// // //         body: "",
// // //         image: "",
// // //         link: "",
// // //       });
// // //     } catch (err) {
// // //       console.error(err);
// // //       setError("❌ Notification send nahi hui");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div style={styles.container}>
// // //       <div style={styles.card}>
// // //         <h2 style={styles.heading}>Send Push Notification</h2>

// // //         <input
// // //           type="text"
// // //           name="title"
// // //           placeholder="Notification Title"
// // //           value={form.title}
// // //           onChange={handleChange}
// // //           style={styles.input}
// // //         />

// // //         <textarea
// // //           name="body"
// // //           placeholder="Notification Message"
// // //           value={form.body}
// // //           onChange={handleChange}
// // //           style={styles.textarea}
// // //         />

// // //         <input
// // //           type="text"
// // //           name="image"
// // //           placeholder="Image URL (optional)"
// // //           value={form.image}
// // //           onChange={handleChange}
// // //           style={styles.input}
// // //         />

// // //         <input
// // //           type="text"
// // //           name="link"
// // //           placeholder="Deep Link (optional)"
// // //           value={form.link}
// // //           onChange={handleChange}
// // //           style={styles.input}
// // //         />

// // //         <button
// // //           onClick={sendNotification}
// // //           disabled={loading}
// // //           style={{
// // //             ...styles.button,
// // //             opacity: loading ? 0.7 : 1,
// // //             cursor: loading ? "not-allowed" : "pointer",
// // //           }}
// // //         >
// // //           {loading ? "Sending..." : "Send Notification"}
// // //         </button>

// // //         {error && <div style={styles.error}>{error}</div>}
// // //         {success && <div style={styles.success}>{success}</div>}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* ================= STYLES ================= */

// // // const styles = {
// // //   container: {
// // //     minHeight: "100vh",
// // //     display: "flex",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     background: "#f8fafc", // ✅ WHITE / LIGHT BACKGROUND
// // //   },
// // //   card: {
// // //     background: "#ffffff", // ✅ CARD WHITE
// // //     padding: "30px",
// // //     borderRadius: "12px",
// // //     width: "420px",
// // //     color: "#0f172a",
// // //     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
// // //     border: "1px solid #e5e7eb",
// // //   },
// // //   heading: {
// // //     textAlign: "center",
// // //     marginBottom: "20px",
// // //     color: "#1e293b",
// // //   },
// // //   input: {
// // //     width: "100%",
// // //     padding: "12px",
// // //     marginBottom: "12px",
// // //     borderRadius: "6px",
// // //     border: "1px solid #cbd5e1",
// // //     outline: "none",
// // //     background: "#ffffff",
// // //     color: "#0f172a",
// // //   },
// // //   textarea: {
// // //     width: "100%",
// // //     height: "90px",
// // //     padding: "12px",
// // //     marginBottom: "12px",
// // //     borderRadius: "6px",
// // //     border: "1px solid #cbd5e1",
// // //     outline: "none",
// // //     background: "#ffffff",
// // //     color: "#0f172a",
// // //     resize: "none",
// // //   },
// // //   button: {
// // //     width: "100%",
// // //     padding: "14px",
// // //     background: "#2563eb",
// // //     color: "#ffffff",
// // //     border: "none",
// // //     borderRadius: "8px",
// // //     fontWeight: "600",
// // //     marginTop: "6px",
// // //   },
// // //   error: {
// // //     marginTop: "14px",
// // //     textAlign: "center",
// // //     color: "#dc2626",
// // //     fontSize: "14px",
// // //   },
// // //   success: {
// // //     marginTop: "14px",
// // //     textAlign: "center",
// // //     color: "#16a34a",
// // //     fontSize: "14px",
// // //   },
// // // };

// // // export default AdminNotifications;

// // import React, { useState } from "react";
// // import axios from "axios";

// // const API_BASE =
// //   "https://crafto-backend-zqcn.onrender.com/api/notification";

// // const AdminNotifications = () => {
// //   const [form, setForm] = useState({
// //     title: "",
// //     body: "",
// //     image: "",
// //     link: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState("");
// //   const [error, setError] = useState("");

// //   /* ===============================
// //      HANDLE INPUT CHANGE
// //   =============================== */
// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //     setError("");
// //     setSuccess("");
// //   };

// //   /* ===============================
// //      SAVE + SEND NOTIFICATION
// //   =============================== */
// //   const sendNotification = async () => {
// //     if (!form.title.trim() || !form.body.trim()) {
// //       setError("❌ Title aur Message dono required hain");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError("");
// //       setSuccess("");

// //       /* ===============================
// //          1️⃣ SAVE IN MONGODB
// //       =============================== */
// //       const saveRes = await axios.post(
// //         API_BASE,
// //         {
// //           title: form.title,
// //           body: form.body,
// //           image: form.image,
// //           link: form.link,
// //         },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );

// //       const notificationId = saveRes.data.notification._id;

// //       /* ===============================
// //          2️⃣ SEND PUSH NOTIFICATION
// //       =============================== */
// //       const sendRes = await axios.post(
// //         `${API_BASE}/send/${notificationId}`,
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );

// //       setSuccess(
// //         `✅ Sent: ${sendRes.data.sent} | ❌ Failed: ${sendRes.data.failed}`
// //       );

// //       setForm({
// //         title: "",
// //         body: "",
// //         image: "",
// //         link: "",
// //       });
// //     } catch (err) {
// //       console.error("NOTIFICATION ERROR:", err);
// //       setError("❌ Notification send nahi hui");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.card}>
// //         <h2 style={styles.heading}>Send Push Notification</h2>

// //         <input
// //           type="text"
// //           name="title"
// //           placeholder="Notification Title"
// //           value={form.title}
// //           onChange={handleChange}
// //           style={styles.input}
// //         />

// //         <textarea
// //           name="body"
// //           placeholder="Notification Message"
// //           value={form.body}
// //           onChange={handleChange}
// //           style={styles.textarea}
// //         />

// //         <input
// //           type="text"
// //           name="image"
// //           placeholder="Image URL (optional)"
// //           value={form.image}
// //           onChange={handleChange}
// //           style={styles.input}
// //         />

// //         <input
// //           type="text"
// //           name="link"
// //           placeholder="Deep Link (optional)"
// //           value={form.link}
// //           onChange={handleChange}
// //           style={styles.input}
// //         />

// //         <button
// //           onClick={sendNotification}
// //           disabled={loading}
// //           style={{
// //             ...styles.button,
// //             opacity: loading ? 0.7 : 1,
// //             cursor: loading ? "not-allowed" : "pointer",
// //           }}
// //         >
// //           {loading ? "Sending..." : "Send Notification"}
// //         </button>

// //         {error && <div style={styles.error}>{error}</div>}
// //         {success && <div style={styles.success}>{success}</div>}
// //       </div>
// //     </div>
// //   );
// // };

// // /* ================= STYLES ================= */

// // const styles = {
// //   container: {
// //     minHeight: "100vh",
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     background: "#f8fafc",
// //   },
// //   card: {
// //     background: "#ffffff",
// //     padding: "30px",
// //     borderRadius: "12px",
// //     width: "420px",
// //     color: "#0f172a",
// //     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
// //     border: "1px solid #e5e7eb",
// //   },
// //   heading: {
// //     textAlign: "center",
// //     marginBottom: "20px",
// //     color: "#1e293b",
// //   },
// //   input: {
// //     width: "100%",
// //     padding: "12px",
// //     marginBottom: "12px",
// //     borderRadius: "6px",
// //     border: "1px solid #cbd5e1",
// //     outline: "none",
// //   },
// //   textarea: {
// //     width: "100%",
// //     height: "90px",
// //     padding: "12px",
// //     marginBottom: "12px",
// //     borderRadius: "6px",
// //     border: "1px solid #cbd5e1",
// //     resize: "none",
// //   },
// //   button: {
// //     width: "100%",
// //     padding: "14px",
// //     background: "#2563eb",
// //     color: "#ffffff",
// //     border: "none",
// //     borderRadius: "8px",
// //     fontWeight: "600",
// //     marginTop: "6px",
// //   },
// //   error: {
// //     marginTop: "14px",
// //     textAlign: "center",
// //     color: "#dc2626",
// //     fontSize: "14px",
// //   },
// //   success: {
// //     marginTop: "14px",
// //     textAlign: "center",
// //     color: "#16a34a",
// //     fontSize: "14px",
// //   },
// // };

// // export default AdminNotifications;

// import React, { useState } from "react";
// import axios from "axios";

// const API_BASE = "https://crafto-backend-zqcn.onrender.com/api/notifications";

// const AdminNotifications = () => {
//   const [form, setForm] = useState({
//     title: "",
//     body: "",
//     image: "",
//     link: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   /* ===============================
//      HANDLE INPUT CHANGE
//   =============================== */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//     setSuccess("");
//   };

//   /* ===============================
//      SAVE + SEND NOTIFICATION
//   =============================== */
//   const sendNotification = async () => {
//     if (!form.title.trim() || !form.body.trim()) {
//       setError("❌ Title aur Message dono required hain");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       /* ===============================
//          1️⃣ SAVE NOTIFICATION IN MONGODB
//       =============================== */
//       const saveRes = await axios.post(
//         API_BASE,
//         {
//           title: form.title,
//           body: form.body,
//           image: form.image,
//           link: form.link,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const notificationId = saveRes.data.notification._id;

//       /* ===============================
//          2️⃣ SEND PUSH NOTIFICATION
//       =============================== */
//       const sendRes = await axios.post(
//         `${API_BASE}/send/${notificationId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setSuccess(
//         `✅ Sent: ${sendRes.data.sent} | ❌ Failed: ${sendRes.data.failed}`
//       );

//       setForm({
//         title: "",
//         body: "",
//         image: "",
//         link: "",
//       });
//     } catch (err) {
//       console.error("NOTIFICATION ERROR:", err);
//       setError(
//         err.response?.data?.message || "❌ Notification send nahi hui"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Send Push Notification</h2>

//         <input
//           type="text"
//           name="title"
//           placeholder="Notification Title"
//           value={form.title}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <textarea
//           name="body"
//           placeholder="Notification Message"
//           value={form.body}
//           onChange={handleChange}
//           style={styles.textarea}
//         />

//         <input
//           type="text"
//           name="image"
//           placeholder="Image URL (optional)"
//           value={form.image}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <input
//           type="text"
//           name="link"
//           placeholder="Deep Link (optional)"
//           value={form.link}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <button
//           onClick={sendNotification}
//           disabled={loading}
//           style={{
//             ...styles.button,
//             opacity: loading ? 0.7 : 1,
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Sending..." : "Send Notification"}
//         </button>

//         {error && <div style={styles.error}>{error}</div>}
//         {success && <div style={styles.success}>{success}</div>}
//       </div>
//     </div>
//   );
// };

// /* ================= STYLES ================= */

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#f8fafc",
//   },
//   card: {
//     background: "#ffffff",
//     padding: "30px",
//     borderRadius: "12px",
//     width: "420px",
//     color: "#0f172a",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     border: "1px solid #e5e7eb",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//     color: "#1e293b",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "12px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     outline: "none",
//   },
//   textarea: {
//     width: "100%",
//     height: "90px",
//     padding: "12px",
//     marginBottom: "12px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     resize: "none",
//   },
//   button: {
//     width: "100%",
//     padding: "14px",
//     background: "#2563eb",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: "600",
//     marginTop: "6px",
//   },
//   error: {
//     marginTop: "14px",
//     textAlign: "center",
//     color: "#dc2626",
//     fontSize: "14px",
//   },
//   success: {
//     marginTop: "14px",
//     textAlign: "center",
//     color: "#16a34a",
//     fontSize: "14px",
//   },
// };

// export default AdminNotifications;

// import React, { useState } from "react";
// import axios from "axios";

// const API_BASE = "https://crafto-backend-zqcn.onrender.com/api/notifications";

// const AdminNotifications = () => {
//   const [form, setForm] = useState({
//     title: "",
//     body: "",
//     image: "",
//     link: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   /* ===============================
//      HANDLE INPUT CHANGE
//   =============================== */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setError("");
//     setSuccess("");
//   };

//   /* ===============================
//      SAVE + SEND NOTIFICATION
//   =============================== */
//   const sendNotification = async () => {
//     if (!form.title.trim() || !form.body.trim()) {
//       setError("❌ Title aur Message dono required hain");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       /* ===============================
//          1️⃣ SAVE NOTIFICATION
//       =============================== */
//       const saveRes = await axios.post(
//         API_BASE,
//         {
//           title: form.title.trim(),
//           body: form.body.trim(),
//           image: form.image.trim(),
//           link: form.link.trim(),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const notificationId = saveRes.data.notification._id;

//       /* ===============================
//          2️⃣ SEND PUSH NOTIFICATION
//       =============================== */
//       const sendRes = await axios.post(
//         `${API_BASE}/send/${notificationId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setSuccess(
//         `✅ Sent: ${sendRes.data.sent} | ❌ Failed: ${sendRes.data.failed}`
//       );

//       setForm({
//         title: "",
//         body: "",
//         image: "",
//         link: "",
//       });
//     } catch (err) {
//       console.error("NOTIFICATION ERROR:", err);
//       setError(
//         err.response?.data?.message || "❌ Notification send nahi hui"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Send Push Notification</h2>

//         <input
//           type="text"
//           name="title"
//           placeholder="Notification Title"
//           value={form.title}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <textarea
//           name="body"
//           placeholder="Notification Message"
//           value={form.body}
//           onChange={handleChange}
//           style={styles.textarea}
//         />

//         <input
//           type="text"
//           name="image"
//           placeholder="Image URL (optional)"
//           value={form.image}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <input
//           type="text"
//           name="link"
//           placeholder="Deep Link (optional)"
//           value={form.link}
//           onChange={handleChange}
//           style={styles.input}
//         />

//         <button
//           onClick={sendNotification}
//           disabled={loading}
//           style={{
//             ...styles.button,
//             opacity: loading ? 0.7 : 1,
//             cursor: loading ? "not-allowed" : "pointer",
//           }}
//         >
//           {loading ? "Sending..." : "Send Notification"}
//         </button>

//         {error && <div style={styles.error}>{error}</div>}
//         {success && <div style={styles.success}>{success}</div>}
//       </div>
//     </div>
//   );
// };

// /* ================= STYLES ================= */

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#f8fafc",
//   },
//   card: {
//     background: "#ffffff",
//     padding: "30px",
//     borderRadius: "12px",
//     width: "420px",
//     color: "#0f172a",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     border: "1px solid #e5e7eb",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//     color: "#1e293b",
//   },
//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "12px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     outline: "none",
//   },
//   textarea: {
//     width: "100%",
//     height: "90px",
//     padding: "12px",
//     marginBottom: "12px",
//     borderRadius: "6px",
//     border: "1px solid #cbd5e1",
//     resize: "none",
//   },
//   button: {
//     width: "100%",
//     padding: "14px",
//     background: "#2563eb",
//     color: "#ffffff",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: "600",
//     marginTop: "6px",
//   },
//   error: {
//     marginTop: "14px",
//     textAlign: "center",
//     color: "#dc2626",
//     fontSize: "14px",
//   },
//   success: {
//     marginTop: "14px",
//     textAlign: "center",
//     color: "#16a34a",
//     fontSize: "14px",
//   },
// };

// export default AdminNotifications;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://crafto-backend-zqcn.onrender.com/api/notifications";

const AdminNotifications = () => {
  const [form, setForm] = useState({
    title: "",
    body: "",
    image: "",
    link: "",
  });

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ===============================
     📥 FETCH SENT NOTIFICATIONS
  =============================== */
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(API_BASE, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const sentOnly = res.data.notifications.filter(
        (n) => n.sent === true
      );

      setNotifications(sentOnly);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* ===============================
     INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  /* ===============================
     SAVE + SEND NOTIFICATION
  =============================== */
  const sendNotification = async () => {
    if (!form.title.trim() || !form.body.trim()) {
      setError("❌ Title aur message required hain");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // 1️⃣ Save notification
      const saveRes = await axios.post(
        API_BASE,
        {
          title: form.title.trim(),
          body: form.body.trim(),
          image: form.image.trim(),
          link: form.link.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const notificationId = saveRes.data.notification._id;

      // 2️⃣ Send push
      const sendRes = await axios.post(
        `${API_BASE}/send/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess(
        `✅ Sent: ${sendRes.data.sent} | ❌ Failed: ${sendRes.data.failed}`
      );

      setForm({ title: "", body: "", image: "", link: "" });

      fetchNotifications();
    } catch (err) {
      console.error("SEND ERROR:", err);
      setError("❌ Notification send nahi hui");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* ===============================
          SEND NOTIFICATION CARD
      =============================== */}
      <div style={styles.card}>
        <h2 style={styles.heading}>📢 Send Push Notification</h2>

        <input
          type="text"
          name="title"
          placeholder="Notification Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="body"
          placeholder="Notification Message"
          value={form.body}
          onChange={handleChange}
          style={styles.textarea}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="text"
          name="link"
          placeholder="Deep Link (optional)"
          value={form.link}
          onChange={handleChange}
          style={styles.input}
        />

        <button
          onClick={sendNotification}
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </div>

      {/* ===============================
          📜 SENT NOTIFICATIONS LIST
      =============================== */}
      <div style={styles.listCard}>
        <h3 style={styles.listHeading}>📜 Sent Notifications</h3>

        {notifications.length === 0 ? (
          <p style={styles.empty}>No notifications sent yet</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} style={styles.notificationItem}>
              <div style={styles.notificationHeader}>
                <span style={styles.notificationTitle}>{n.title}</span>
                <span style={styles.time}>
                  {new Date(n.updatedAt).toLocaleString()}
                </span>
              </div>

              <p style={styles.message}>{n.body}</p>

              {n.link && <small style={styles.link}>🔗 {n.link}</small>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ===============================
   🎨 STYLES
=============================== */

const styles = {
  container: {
    padding: "40px",
    background: "#f8fafc",
    minHeight: "100vh",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "14px",
    maxWidth: "420px",
    margin: "auto",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0f172a",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },

  textarea: {
    width: "100%",
    height: "90px",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    resize: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    marginTop: "12px",
    color: "#dc2626",
    textAlign: "center",
  },

  success: {
    marginTop: "12px",
    color: "#16a34a",
    textAlign: "center",
  },

  listCard: {
    marginTop: "40px",
    background: "#ffffff",
    padding: "24px",
    borderRadius: "14px",
    maxWidth: "720px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
  },

  listHeading: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "10px",
  },

  notificationItem: {
    padding: "16px",
    borderRadius: "10px",
    background: "#f9fafb",
    marginBottom: "14px",
    border: "1px solid #e5e7eb",
  },

  notificationHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },

  notificationTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },

  time: {
    fontSize: "12px",
    color: "#6b7280",
  },

  message: {
    fontSize: "14px",
    color: "#374151",
    lineHeight: "1.5",
  },

  link: {
    fontSize: "12px",
    color: "#2563eb",
  },

  empty: {
    textAlign: "center",
    color: "#6b7280",
    padding: "20px",
  },
};

export default AdminNotifications;
