// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const API = "http://localhost:7000/api/ads";

// // const AdsAdmin = () => {
// //   const token = localStorage.getItem("token");

// //   const [ads, setAds] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editId, setEditId] = useState(null);
// //   const [file, setFile] = useState(null);

// //   const [form, setForm] = useState({
// //     quote: "",
// //     price: 2,
// //   });

// //   // ================= AUTH AXIOS =================
// //   const authAxios = axios.create({
// //     baseURL: API,
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   });

// //   // ================= LOAD ADS =================
// //   const loadAds = async () => {
// //     const res = await authAxios.get("/");
// //     setAds(res.data);
// //   };

// //   useEffect(() => {
// //     loadAds();
// //   }, []);

// //   // ================= FORM CHANGE =================
// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   // ================= SUBMIT =================
// //   const handleSubmit = async () => {
// //     if (!form.quote.trim()) {
// //       alert("Quote is required");
// //       return;
// //     }

// //     const fd = new FormData();
// //     fd.append("quote", form.quote);
// //     fd.append("price", form.price);
// //     if (file) fd.append("file", file);

// //     if (editId) {
// //       await authAxios.put(`/${editId}`, fd);
// //     } else {
// //       await authAxios.post("/", fd);
// //     }

// //     resetForm();
// //     loadAds();
// //   };

// //   // ================= EDIT =================
// //   const handleEdit = (ad) => {
// //     setEditId(ad._id);
// //     setShowForm(true);
// //     setForm({ quote: ad.quote, price: ad.price });
// //   };

// //   // ================= DELETE =================
// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this ad?")) return;
// //     await authAxios.delete(`/${id}`);
// //     loadAds();
// //   };

// //   // ================= TOGGLE STATUS =================
// //   const toggleStatus = async (id) => {
// //     await authAxios.put(`/toggle/${id}`);
// //     loadAds();
// //   };

// //   // ================= RESET =================
// //   const resetForm = () => {
// //     setShowForm(false);
// //     setEditId(null);
// //     setFile(null);
// //     setForm({ quote: "", price: 2 });
// //   };

// //   return (
// //     <div style={styles.page}>
// //       <div style={styles.header}>
// //         <h2>📢 Ads Admin Panel</h2>
// //         <button style={styles.addBtn} onClick={() => setShowForm(true)}>
// //           ➕ Add Ad
// //         </button>
// //       </div>

// //       {/* ================= FORM ================= */}
// //       {showForm && (
// //         <div style={styles.formBox}>
// //           <h3 style={{ marginBottom: 12 }}>
// //             {editId ? "✏️ Edit Ad" : "➕ Create Ad"}
// //           </h3>

// //           <input
// //             name="quote"
// //             placeholder="Enter quote"
// //             value={form.quote}
// //             onChange={handleChange}
// //             style={styles.input}
// //           />

// //           <input
// //             type="number"
// //             name="price"
// //             placeholder="Price (₹)"
// //             value={form.price}
// //             onChange={handleChange}
// //             style={styles.input}
// //           />

// //           <input
// //             type="file"
// //             accept="image/*,video/*"
// //             onChange={(e) => setFile(e.target.files[0])}
// //             style={styles.input}
// //           />

// //           <div style={{ marginTop: 10 }}>
// //             <button style={styles.saveBtn} onClick={handleSubmit}>
// //               {editId ? "Update" : "Save"}
// //             </button>
// //             <button style={styles.cancelBtn} onClick={resetForm}>
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* ================= TABLE ================= */}
// //       <div style={styles.tableWrap}>
// //         <table style={styles.table}>
// //           <thead>
// //             <tr>
// //               <th>#</th>
// //               <th>Media</th>
// //               <th>Quote</th>
// //               <th>Price</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {ads.map((ad, index) => (
// //               <tr key={ad._id}>
// //                 <td>{index + 1}</td>

// //                 <td>
// //                   {ad.mediaUrl &&
// //                     (ad.mediaType === "image" ? (
// //                       <img src={ad.mediaUrl} alt="" style={styles.thumb} />
// //                     ) : (
// //                       <video src={ad.mediaUrl} style={styles.thumb} muted />
// //                     ))}
// //                 </td>

// //                 <td style={{ maxWidth: 320 }}>{ad.quote}</td>

// //                 <td>₹{ad.price}</td>

// //                 <td>
// //                   <span
// //                     style={{
// //                       ...styles.badge,
// //                       background:
// //                         ad.status === "active" ? "#d4f5dd" : "#ffdede",
// //                       color:
// //                         ad.status === "active" ? "#1a7f37" : "#b00020",
// //                     }}
// //                   >
// //                     {ad.status}
// //                   </span>
// //                 </td>

// //                 <td>
// //                   <button
// //                     style={styles.actionBtn}
// //                     onClick={() => handleEdit(ad)}
// //                   >
// //                     ✏️
// //                   </button>
// //                   <button
// //                     style={styles.actionBtn}
// //                     onClick={() => handleDelete(ad._id)}
// //                   >
// //                     🗑
// //                   </button>
// //                   <button
// //                     style={styles.actionBtn}
// //                     onClick={() => toggleStatus(ad._id)}
// //                   >
// //                     🔁
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdsAdmin;

// // /* ================= STYLES ================= */

// // const styles = {
// //   page: {
// //     padding: 24,
// //     background: "#f4f6fb",
// //     minHeight: "100vh",
// //     fontFamily: "system-ui",
// //   },

// //   header: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 16,
// //   },

// //   addBtn: {
// //     background: "#6a5ae0",
// //     color: "#fff",
// //     border: "none",
// //     padding: "8px 14px",
// //     borderRadius: 6,
// //     cursor: "pointer",
// //   },

// //   formBox: {
// //     background: "#fff",
// //     padding: 16,
// //     borderRadius: 10,
// //     maxWidth: 520,
// //     boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
// //     marginBottom: 20,
// //   },

// //   input: {
// //     width: "100%",
// //     padding: 9,
// //     marginBottom: 10,
// //     borderRadius: 6,
// //     border: "1px solid #ccc",
// //   },

// //   saveBtn: {
// //     background: "#28a745",
// //     color: "#fff",
// //     border: "none",
// //     padding: "8px 14px",
// //     borderRadius: 6,
// //     cursor: "pointer",
// //   },

// //   cancelBtn: {
// //     background: "#999",
// //     color: "#fff",
// //     border: "none",
// //     padding: "8px 14px",
// //     borderRadius: 6,
// //     marginLeft: 8,
// //     cursor: "pointer",
// //   },

// //   tableWrap: {
// //     background: "#fff",
// //     borderRadius: 10,
// //     overflow: "hidden",
// //     boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
// //   },

// //   table: {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //   },

// //   thumb: {
// //     width: 60,
// //     height: 40,
// //     objectFit: "cover",
// //     borderRadius: 6,
// //     border: "1px solid #ddd",
// //   },

// //   badge: {
// //     padding: "4px 10px",
// //     borderRadius: 14,
// //     fontSize: 12,
// //     textTransform: "uppercase",
// //     fontWeight: 600,
// //   },

// //   actionBtn: {
// //     border: "none",
// //     background: "transparent",
// //     cursor: "pointer",
// //     fontSize: 16,
// //     marginRight: 6,
// //   },
// // };

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://crafto-backend-zqcn.onrender.com/api/ads";

// const AdsAdmin = () => {
//   const token = localStorage.getItem("token");

//   const [ads, setAds] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [file, setFile] = useState(null);

//   const [form, setForm] = useState({
//     quote: "",
//     price: 2,
//     gstPercent: 0,
//   });

//   const gstAmount =
//     (Number(form.price) * Number(form.gstPercent)) / 100 || 0;
//   const finalAmount = Number(form.price) + gstAmount;

//   // ================= AUTH AXIOS =================
//   const authAxios = axios.create({
//     baseURL: API,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // ================= LOAD ADS =================
//   const loadAds = async () => {
//     const res = await authAxios.get("/");
//     setAds(res.data);
//   };

//   useEffect(() => {
//     loadAds();
//   }, []);

//   // ================= FORM CHANGE =================
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async () => {
//     if (!form.quote.trim()) {
//       alert("Quote is required");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("quote", form.quote);
//     fd.append("price", form.price);
//     fd.append("gstPercent", form.gstPercent);
//     if (file) fd.append("file", file);

//     if (editId) {
//       await authAxios.put(`/${editId}`, fd);
//     } else {
//       await authAxios.post("/", fd);
//     }

//     resetForm();
//     loadAds();
//   };

//   // ================= EDIT =================
//   const handleEdit = (ad) => {
//     setEditId(ad._id);
//     setShowForm(true);
//     setForm({
//       quote: ad.quote,
//       price: ad.price,
//       gstPercent: ad.gstPercent || 0,
//     });
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this ad?")) return;
//     await authAxios.delete(`/${id}`);
//     loadAds();
//   };

//   // ================= TOGGLE STATUS =================
//   const toggleStatus = async (id) => {
//     await authAxios.put(`/toggle/${id}`);
//     loadAds();
//   };

//   // ================= RESET =================
//   const resetForm = () => {
//     setShowForm(false);
//     setEditId(null);
//     setFile(null);
//     setForm({ quote: "", price: 2, gstPercent: 0 });
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.header}>
//         <h2>📢 Ads Admin Panel</h2>
//         <button style={styles.addBtn} onClick={() => setShowForm(true)}>
//           ➕ Add Ad
//         </button>
//       </div>

//       {/* ================= FORM ================= */}
//       {showForm && (
//         <div style={styles.formBox}>
//           <h3>{editId ? "✏️ Edit Ad" : "➕ Create Ad"}</h3>

//           <input
//             name="quote"
//             placeholder="Quote"
//             value={form.quote}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             type="number"
//             name="price"
//             placeholder="Base Price (₹)"
//             value={form.price}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             type="number"
//             name="gstPercent"
//             placeholder="GST %"
//             value={form.gstPercent}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <div style={{ marginBottom: 10 }}>
//             <b>Final Amount: ₹{finalAmount}</b>
//           </div>

//           <input
//             type="file"
//             accept="image/*,video/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={styles.input}
//           />

//           <button style={styles.saveBtn} onClick={handleSubmit}>
//             {editId ? "Update" : "Save"}
//           </button>
//           <button style={styles.cancelBtn} onClick={resetForm}>
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* ================= TABLE ================= */}
//       <div style={styles.tableWrap}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Media</th>
//               <th>Quote</th>
//               <th>Base</th>
//               <th>GST %</th>
//               <th>Final</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {ads.map((ad, index) => (
//               <tr key={ad._id}>
//                 <td>{index + 1}</td>

//                 <td>
//                   {ad.mediaUrl &&
//                     (ad.mediaType === "image" ? (
//                       <img src={ad.mediaUrl} alt="" style={styles.thumb} />
//                     ) : (
//                       <video src={ad.mediaUrl} style={styles.thumb} muted />
//                     ))}
//                 </td>

//                 <td>{ad.quote}</td>
//                 <td>₹{ad.price}</td>
//                 <td>{ad.gstPercent || 0}%</td>
//                 <td>
//                   <b>₹{ad.finalAmount || ad.price}</b>
//                 </td>

//                 <td>
//                   <span
//                     style={{
//                       ...styles.badge,
//                       background:
//                         ad.status === "active" ? "#d4f5dd" : "#ffdede",
//                       color:
//                         ad.status === "active" ? "#1a7f37" : "#b00020",
//                     }}
//                   >
//                     {ad.status}
//                   </span>
//                 </td>

//                 <td>
//                   <button style={styles.actionBtn} onClick={() => handleEdit(ad)}>
//                     ✏️
//                   </button>
//                   <button
//                     style={styles.actionBtn}
//                     onClick={() => handleDelete(ad._id)}
//                   >
//                     🗑
//                   </button>
//                   <button
//                     style={styles.actionBtn}
//                     onClick={() => toggleStatus(ad._id)}
//                   >
//                     🔁
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdsAdmin;

// /* ================= STYLES ================= */

// const styles = {
//   page: {
//     padding: 24,
//     background: "#f4f6fb",
//     minHeight: "100vh",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   addBtn: {
//     background: "#6a5ae0",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//     borderRadius: 6,
//   },
//   formBox: {
//     background: "#fff",
//     padding: 16,
//     borderRadius: 10,
//     maxWidth: 520,
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     padding: 8,
//     marginBottom: 8,
//   },
//   saveBtn: {
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//     marginRight: 8,
//   },
//   cancelBtn: {
//     background: "#999",
//     color: "#fff",
//     border: "none",
//     padding: "8px 14px",
//   },
//   tableWrap: {
//     background: "#fff",
//     borderRadius: 10,
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   thumb: {
//     width: 60,
//     height: 40,
//     objectFit: "cover",
//   },
//   badge: {
//     padding: "4px 10px",
//     borderRadius: 12,
//     fontSize: 12,
//   },
//   actionBtn: {
//     border: "none",
//     background: "transparent",
//     cursor: "pointer",
//     marginRight: 6,
//   },
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:7000/api/ads";

// const AdsAdmin = () => {
//   const token = localStorage.getItem("token");

//   /* ================= STATE ================= */
//   const [ads, setAds] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [file, setFile] = useState(null);     // main media
//   const [banners, setBanners] = useState([]); // banner files

//   const [form, setForm] = useState({
//     quote: "",
//     price: 2,
//     gstPercent: 0,
//   });

//   /* ================= GST CALC ================= */
//   const price = Number(form.price) || 0;
//   const gstPercent = Number(form.gstPercent) || 0;
//   const gstAmount = (price * gstPercent) / 100;
//   const finalAmount = price + gstAmount;

//   /* ================= AXIOS ================= */
//   const authAxios = axios.create({
//     baseURL: API,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   /* ================= LOAD ADS ================= */
//   const loadAds = async () => {
//     try {
//       const res = await authAxios.get("/");
//       setAds(Array.isArray(res.data.ads) ? res.data.ads : []);
//     } catch (err) {
//       console.error("LOAD ADS ERROR:", err);
//       setAds([]);
//     }
//   };

//   useEffect(() => {
//     loadAds();
//     // eslint-disable-next-line
//   }, []);

//   /* ================= FORM CHANGE ================= */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* ================= BANNER HELPERS ================= */
//   const addBanner = () => {
//     if (banners.length >= 5) {
//       alert("Maximum 5 banner images allowed");
//       return;
//     }
//     setBanners([...banners, null]);
//   };

//   const updateBanner = (index, file) => {
//     const updated = [...banners];
//     updated[index] = file;
//     setBanners(updated);
//   };

//   const removeBanner = (index) => {
//     setBanners(banners.filter((_, i) => i !== index));
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     if (!form.quote.trim()) {
//       alert("Quote is required");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("quote", form.quote);
//     fd.append("price", form.price);
//     fd.append("gstPercent", form.gstPercent);

//     if (file) fd.append("file", file);
//     banners.forEach((b) => b && fd.append("banners", b));

//     try {
//       if (editId) {
//         await authAxios.put(`/${editId}`, fd);
//       } else {
//         await authAxios.post("/", fd);
//       }

//       resetForm();
//       loadAds();
//     } catch (err) {
//       alert("Save failed");
//       console.error(err);
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (ad) => {
//     setEditId(ad._id);
//     setShowForm(true);
//     setForm({
//       quote: ad.quote,
//       price: ad.price,
//       gstPercent: ad.gstPercent || 0,
//     });
//     setFile(null);
//     setBanners([]);
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this ad?")) return;
//     await authAxios.delete(`/${id}`);
//     loadAds();
//   };

//   /* ================= TOGGLE ================= */
//   const toggleStatus = async (id) => {
//     await authAxios.put(`/toggle/${id}`);
//     loadAds();
//   };

//   /* ================= RESET ================= */
//   const resetForm = () => {
//     setShowForm(false);
//     setEditId(null);
//     setFile(null);
//     setBanners([]);
//     setForm({ quote: "", price: 2, gstPercent: 0 });
//   };

//   /* ================= UI ================= */
//   return (
//     <div style={styles.page}>
//       {/* HEADER */}
//       <div style={styles.header}>
//         <h2>📢 Ads Admin Panel</h2>
//         <button style={styles.addBtn} onClick={() => setShowForm(true)}>
//           ➕ Add Ad
//         </button>
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <div style={styles.formBox}>
//           <h3>{editId ? "✏️ Edit Ad" : "➕ Create Ad"}</h3>

//           <input
//             name="quote"
//             placeholder="Quote"
//             value={form.quote}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             type="number"
//             name="price"
//             placeholder="Base Price ₹"
//             value={form.price}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             type="number"
//             name="gstPercent"
//             placeholder="GST %"
//             value={form.gstPercent}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <b>Final Amount: ₹{finalAmount}</b>
//           <hr />

//           <label>Main Image / Video</label>
//           <input
//             type="file"
//             accept="image/*,video/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={styles.input}
//           />

//           <label>Banner Images</label>

//           {banners.map((_, i) => (
//             <div key={i} style={styles.bannerRow}>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => updateBanner(i, e.target.files[0])}
//               />
//               <button onClick={() => removeBanner(i)} style={styles.removeBtn}>
//                 ✕
//               </button>
//             </div>
//           ))}

//           <button onClick={addBanner} style={styles.plusBtn}>
//             ➕ Add Banner
//           </button>

//           <div style={{ marginTop: 12 }}>
//             <button style={styles.saveBtn} onClick={handleSubmit}>
//               {editId ? "Update" : "Save"}
//             </button>
//             <button style={styles.cancelBtn} onClick={resetForm}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TABLE */}
//       <div style={styles.tableWrap}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Main</th>
//               <th>Quote</th>
//               <th>Price</th>
//               <th>GST</th>
//               <th>Final</th>
//               {/* <th>Banners</th> */}

//               <th style={{ minWidth: 160 }}>Banners</th>

//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {Array.isArray(ads) &&
//               ads.map((ad, i) => (
//                 <tr key={ad._id}>
//                   <td>{i + 1}</td>

//                   <td>
//                     {ad.mediaUrl && (
//                       <img src={ad.mediaUrl} alt="" style={styles.thumb} />
//                     )}
//                   </td>

//                   <td>{ad.quote}</td>
//                   <td>₹{ad.price}</td>
//                   <td>{ad.gstPercent}%</td>
//                   <td>
//                     <b>₹{ad.finalAmount || ad.price}</b>
//                   </td>

//                   {/* <td>
//                     <div style={{ display: "flex", gap: 4 }}>
//                       {ad.banners?.length
//                         ? ad.banners.map((b, i) => (
//                             <img
//                               key={i}
//                               src={b.imageUrl}
//                               alt=""
//                               style={styles.bannerThumb}
//                             />
//                           ))
//                         : "-"}
//                     </div>
//                   </td> */}
//                   {/* <td
//   style={{
//     minWidth: 160,          // ⭐ sabse important
//     overflow: "visible",    // ⭐ image cut nahi hogi
//     whiteSpace: "nowrap",
//   }}
// >
//   {ad.banners && ad.banners.length > 0 ? (
//     <div
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 8,
//       }}
//     >
//       {ad.banners.map((b) => (
//         <img
//           key={b._id}
//           src={b.imageUrl}
//           alt="banner"
//           style={{
//             width: 60,
//             height: 40,
//             objectFit: "cover",
//             borderRadius: 6,
//             border: "1px solid #ccc",
//             background: "#fff",
//             display: "block",
//           }}
//         />
//       ))}
//     </div>
//   ) : (
//     <span style={{ color: "#999" }}>—</span>
//   )}
// </td> */}


// <td
//   style={{
//     minWidth: 220,
//     maxWidth: 260,
//     verticalAlign: "top",
//   }}
// >
//   {ad.banners && ad.banners.length > 0 ? (
//     <div
//       style={{
//         display: "flex",
//         gap: 6,
//         flexWrap: "wrap",
//       }}
//     >
//       {ad.banners.map((b) => (
//         <img
//           key={b._id}
//           src={b.imageUrl}
//           alt="banner"
//           style={{
//             width: 60,
//             height: 40,
//             objectFit: "cover",
//             borderRadius: 6,
//             border: "1px solid #ccc",
//             display: "inline-block",
//             visibility: "visible",
//           }}
//         />
//       ))}
//     </div>
//   ) : (
//     <span style={{ color: "#999" }}>No Banner</span>
//   )}
// </td>


//                   <td>
//                     <span
//                       style={{
//                         ...styles.badge,
//                         background:
//                           ad.status === "active" ? "#d4f5dd" : "#ffdede",
//                       }}
//                     >
//                       {ad.status}
//                     </span>
//                   </td>

//                   <td>
//                     <button onClick={() => handleEdit(ad)}>✏️</button>
//                     <button onClick={() => handleDelete(ad._id)}>🗑</button>
//                     <button onClick={() => toggleStatus(ad._id)}>🔁</button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdsAdmin;

// /* ================= STYLES ================= */
// const styles = {
//   page: { padding: 24, background: "#f4f6fb", minHeight: "100vh" },
//   header: { display: "flex", justifyContent: "space-between" },
//   addBtn: { background: "#6a5ae0", color: "#fff", padding: "8px 14px" },

//   formBox: { background: "#fff", padding: 16, maxWidth: 560, marginBottom: 20 },
//   input: { width: "100%", padding: 8, marginBottom: 8 },

//   plusBtn: {
//     background: "#6a5ae0",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: 6,
//     marginTop: 6,
//   },

//   bannerRow: { display: "flex", gap: 8, marginBottom: 6 },

//   removeBtn: {
//     background: "#ff4d4f",
//     color: "#fff",
//     border: "none",
//     padding: "0 10px",
//   },

//   saveBtn: { background: "#28a745", color: "#fff", marginRight: 8 },
//   cancelBtn: { background: "#999", color: "#fff" },

//   tableWrap: { background: "#fff", marginTop: 20 },
// //   table: { width: "100%", borderCollapse: "collapse" },
// table: {
//   width: "100%",
//   borderCollapse: "collapse",
//   tableLayout: "auto",   // ⭐⭐⭐ MOST IMPORTANT
// },
//   thumb: { width: 60, height: 40, objectFit: "cover" },
//   bannerThumb: {
//     width: 40,
//     height: 30,
//     objectFit: "cover",
//     borderRadius: 4,
//     border: "1px solid #ddd",
//   },
//   badge: { padding: "4px 10px", borderRadius: 12 },
// };

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "http://localhost:7000/api/ads";

// const AdsAdmin = () => {
//   const token = localStorage.getItem("token");

//   /* ================= STATE ================= */
//   const [ads, setAds] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [file, setFile] = useState(null);     // main media
//   const [banners, setBanners] = useState([]); // banner files

//   const [form, setForm] = useState({
//     quote: "",
//     price: 2,
//     gstPercent: 0,
//   });

//   /* ================= GST CALC ================= */
//   const price = Number(form.price) || 0;
//   const gstPercent = Number(form.gstPercent) || 0;
//   const gstAmount = (price * gstPercent) / 100;
//   const finalAmount = price + gstAmount;

//   /* ================= AXIOS ================= */
//   const authAxios = axios.create({
//     baseURL: API,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   /* ================= LOAD ADS ================= */
//   const loadAds = async () => {
//     try {
//       const res = await authAxios.get("/");
//       setAds(Array.isArray(res.data.ads) ? res.data.ads : []);
//     } catch (err) {
//       console.error("LOAD ADS ERROR:", err);
//       setAds([]);
//     }
//   };

//   useEffect(() => {
//     loadAds();
//     // eslint-disable-next-line
//   }, []);

//   /* ================= FORM CHANGE ================= */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* ================= BANNER HELPERS ================= */
//   const addBanner = () => {
//     if (banners.length >= 5) {
//       alert("Maximum 5 banner images allowed");
//       return;
//     }
//     setBanners([...banners, null]);
//   };

//   const updateBanner = (index, file) => {
//     const updated = [...banners];
//     updated[index] = file;
//     setBanners(updated);
//   };

//   const removeBanner = (index) => {
//     setBanners(banners.filter((_, i) => i !== index));
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     if (!form.quote.trim()) {
//       alert("Quote is required");
//       return;
//     }

//     const fd = new FormData();
//     fd.append("quote", form.quote);
//     fd.append("price", form.price);
//     fd.append("gstPercent", form.gstPercent);

//     if (file) fd.append("file", file);
//     banners.forEach((b) => b && fd.append("banners", b));

//     try {
//       if (editId) {
//         await authAxios.put(`/${editId}`, fd);
//       } else {
//         await authAxios.post("/", fd);
//       }

//       resetForm();
//       loadAds();
//     } catch (err) {
//       alert("Save failed");
//       console.error(err);
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (ad) => {
//     setEditId(ad._id);
//     setShowForm(true);
//     setForm({
//       quote: ad.quote,
//       price: ad.price,
//       gstPercent: ad.gstPercent || 0,
//     });
//     setFile(null);
//     setBanners([]);
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this ad?")) return;
//     await authAxios.delete(`/${id}`);
//     loadAds();
//   };

//   /* ================= TOGGLE ================= */
//   const toggleStatus = async (id) => {
//     await authAxios.put(`/toggle/${id}`);
//     loadAds();
//   };

//   /* ================= RESET ================= */
//   const resetForm = () => {
//     setShowForm(false);
//     setEditId(null);
//     setFile(null);
//     setBanners([]);
//     setForm({ quote: "", price: 2, gstPercent: 0 });
//   };

//   /* ================= UI ================= */
//   return (
//     <div style={styles.page}>
//       {/* HEADER */}
//       <div style={styles.header}>
//         <h2>📢 Ads Admin Panel</h2>
//         <button style={styles.addBtn} onClick={() => setShowForm(true)}>
//           ➕ Add Ad
//         </button>
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <div style={styles.formBox}>
//           <h3>{editId ? "✏️ Edit Ad" : "➕ Create Ad"}</h3>

//           <input
//             name="quote"
//             placeholder="Quote"
//             value={form.quote}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             type="number"
//             name="price"
//             placeholder="Base Price ₹"
//             value={form.price}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <input
//             type="number"
//             name="gstPercent"
//             placeholder="GST %"
//             value={form.gstPercent}
//             onChange={handleChange}
//             style={styles.input}
//           />

//           <b>Final Amount: ₹{finalAmount}</b>
//           <hr />

//           <label>Main Image / Video</label>
//           <input
//             type="file"
//             accept="image/*,video/*"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={styles.input}
//           />

//           <label>Banner Images</label>

//           {banners.map((_, i) => (
//             <div key={i} style={styles.bannerRow}>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => updateBanner(i, e.target.files[0])}
//               />
//               <button onClick={() => removeBanner(i)} style={styles.removeBtn}>
//                 ✕
//               </button>
//             </div>
//           ))}

//           <button onClick={addBanner} style={styles.plusBtn}>
//             ➕ Add Banner
//           </button>

//           <div style={{ marginTop: 12 }}>
//             <button style={styles.saveBtn} onClick={handleSubmit}>
//               {editId ? "Update" : "Save"}
//             </button>
//             <button style={styles.cancelBtn} onClick={resetForm}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* TABLE */}
//       <div style={styles.tableWrap}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Main</th>
//               <th>Quote</th>
//               <th>Price</th>
//               <th>GST</th>
//               <th>Final</th>
//               {/* <th>Banners</th> */}

//               <th style={{ minWidth: 160 }}>Banners</th>

//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {Array.isArray(ads) &&
//               ads.map((ad, i) => (
//                 <tr key={ad._id}>
//                   <td>{i + 1}</td>

//                   <td>
//                     {ad.mediaUrl && (
//                       <img src={ad.mediaUrl} alt="" style={styles.thumb} />
//                     )}
//                   </td>

//                   <td>{ad.quote}</td>
//                   <td>₹{ad.price}</td>
//                   <td>{ad.gstPercent}%</td>
//                   <td>
//                     <b>₹{ad.finalAmount || ad.price}</b>
//                   </td>

//                   {/* <td>
//                     <div style={{ display: "flex", gap: 4 }}>
//                       {ad.banners?.length
//                         ? ad.banners.map((b, i) => (
//                             <img
//                               key={i}
//                               src={b.imageUrl}
//                               alt=""
//                               style={styles.bannerThumb}
//                             />
//                           ))
//                         : "-"}
//                     </div>
//                   </td> */}
//                   {/* <td
//   style={{
//     minWidth: 160,          // ⭐ sabse important
//     overflow: "visible",    // ⭐ image cut nahi hogi
//     whiteSpace: "nowrap",
//   }}
// >
//   {ad.banners && ad.banners.length > 0 ? (
//     <div
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 8,
//       }}
//     >
//       {ad.banners.map((b) => (
//         <img
//           key={b._id}
//           src={b.imageUrl}
//           alt="banner"
//           style={{
//             width: 60,
//             height: 40,
//             objectFit: "cover",
//             borderRadius: 6,
//             border: "1px solid #ccc",
//             background: "#fff",
//             display: "block",
//           }}
//         />
//       ))}
//     </div>
//   ) : (
//     <span style={{ color: "#999" }}>—</span>
//   )}
// </td> */}
// <td style={{ minWidth: 260 }}>
//   {Array.isArray(ad.banners) && ad.banners.length > 0 ? (
//     <div style={{ display: "flex", gap: 8 }}>
//       {ad.banners.map((b, idx) => (
//         <img
//           key={b.publicId || idx}
//           src={b.imageUrl}
//           alt="banner"
//           style={{
//             width: 70,
//             height: 45,
//             objectFit: "cover",
//             borderRadius: 6,
//             border: "1px solid #ccc",
//             display: "block",
//           }}
//         />
//       ))}
//     </div>
//   ) : (
//     <span style={{ color: "#999", fontSize: 13 }}>
//       No Banner ({ad.banners?.length || 0})
//     </span>
//   )}
// </td>



//                   <td>
//                     <span
//                       style={{
//                         ...styles.badge,
//                         background:
//                           ad.status === "active" ? "#d4f5dd" : "#ffdede",
//                       }}
//                     >
//                       {ad.status}
//                     </span>
//                   </td>

//                   <td>
//                     <button onClick={() => handleEdit(ad)}>✏️</button>
//                     <button onClick={() => handleDelete(ad._id)}>🗑</button>
//                     <button onClick={() => toggleStatus(ad._id)}>🔁</button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdsAdmin;

// /* ================= STYLES ================= */
// const styles = {
//   page: { padding: 24, background: "#f4f6fb", minHeight: "100vh" },
//   header: { display: "flex", justifyContent: "space-between" },
//   addBtn: { background: "#6a5ae0", color: "#fff", padding: "8px 14px" },

//   formBox: { background: "#fff", padding: 16, maxWidth: 560, marginBottom: 20 },
//   input: { width: "100%", padding: 8, marginBottom: 8 },

//   plusBtn: {
//     background: "#6a5ae0",
//     color: "#fff",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: 6,
//     marginTop: 6,
//   },

//   bannerRow: { display: "flex", gap: 8, marginBottom: 6 },

//   removeBtn: {
//     background: "#ff4d4f",
//     color: "#fff",
//     border: "none",
//     padding: "0 10px",
//   },

//   saveBtn: { background: "#28a745", color: "#fff", marginRight: 8 },
//   cancelBtn: { background: "#999", color: "#fff" },

//   tableWrap: { background: "#fff", marginTop: 20 },
// //   table: { width: "100%", borderCollapse: "collapse" },
// table: {
//   width: "100%",
//   borderCollapse: "collapse",
//   tableLayout: "auto",   // ⭐⭐⭐ MOST IMPORTANT
// },
//   thumb: { width: 60, height: 40, objectFit: "cover" },
//   bannerThumb: {
//     width: 40,
//     height: 30,
//     objectFit: "cover",
//     borderRadius: 4,
//     border: "1px solid #ddd",
//   },
//   badge: { padding: "4px 10px", borderRadius: 12 },
// };

import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7000/api/ads";

const AdsAdmin = () => {
  const token = localStorage.getItem("token");

  /* ================= STATE ================= */
  const [ads, setAds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [file, setFile] = useState(null); // main media
  const [banners, setBanners] = useState([]); // new banner files
  const [existingBanners, setExistingBanners] = useState([]); // existing banners when editing

  const [form, setForm] = useState({
    quote: "",
    price: 2,
    gstPercent: 0,
  });

  /* ================= GST CALC ================= */
  const price = Number(form.price) || 0;
  const gstPercent = Number(form.gstPercent) || 0;
  const gstAmount = (price * gstPercent) / 100;
  const finalAmount = price + gstAmount;

  /* ================= AXIOS ================= */
  const authAxios = axios.create({
    baseURL: API,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  /* ================= LOAD ADS ================= */
  const loadAds = async () => {
    try {
      const res = await authAxios.get("/");
      setAds(Array.isArray(res.data.ads) ? res.data.ads : []);
    } catch (err) {
      console.error("LOAD ADS ERROR:", err);
      setAds([]);
    }
  };

  useEffect(() => {
    loadAds();
    // eslint-disable-next-line
  }, []);

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= BANNER HELPERS ================= */
  const addBanner = () => {
    const totalBanners = banners.length + existingBanners.length;
    if (totalBanners >= 5) {
      alert("Maximum 5 banner images allowed");
      return;
    }
    setBanners([...banners, null]);
  };

  const updateBanner = (index, file) => {
    const updated = [...banners];
    updated[index] = file;
    setBanners(updated);
  };

  const removeBanner = (index) => {
    setBanners(banners.filter((_, i) => i !== index));
  };

  const removeExistingBanner = (index) => {
    setExistingBanners(existingBanners.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!form.quote.trim()) {
      alert("Quote is required");
      return;
    }

    const fd = new FormData();
    fd.append("quote", form.quote);
    fd.append("price", form.price);
    fd.append("gstPercent", form.gstPercent);

    if (file) fd.append("file", file);

    // Add new banner files
    banners.forEach((b) => b && fd.append("banners", b));

    // Send existing banners to preserve them
    if (editId && existingBanners.length > 0) {
      fd.append("existingBanners", JSON.stringify(existingBanners));
    }

    try {
      if (editId) {
        await authAxios.put(`/${editId}`, fd);
      } else {
        await authAxios.post("/", fd);
      }

      resetForm();
      loadAds();
    } catch (err) {
      alert("Save failed");
      console.error(err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (ad) => {
    setEditId(ad._id);
    setShowForm(true);
    setForm({
      quote: ad.quote,
      price: ad.price,
      gstPercent: ad.gstPercent || 0,
    });
    setFile(null);
    setBanners([]);
    setExistingBanners(ad.banners || []);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ad?")) return;
    await authAxios.delete(`/${id}`);
    loadAds();
  };

  /* ================= TOGGLE ================= */
  const toggleStatus = async (id) => {
    await authAxios.put(`/toggle/${id}`);
    loadAds();
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setFile(null);
    setBanners([]);
    setExistingBanners([]);
    setForm({ quote: "", price: 2, gstPercent: 0 });
  };

  /* ================= UI ================= */
  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>📢 Ads Admin Panel</h2>
        <button style={styles.addBtn} onClick={() => setShowForm(true)}>
          ➕ Add Ad
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={styles.formBox}>
          <h3 style={styles.formTitle}>
            {editId ? "✏️ Edit Ad" : "➕ Create Ad"}
          </h3>

          <input
            name="quote"
            placeholder="Enter Quote"
            value={form.quote}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="price"
            placeholder="Base Price (₹)"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="gstPercent"
            placeholder="GST %"
            value={form.gstPercent}
            onChange={handleChange}
            style={styles.input}
          />

          <div style={styles.finalAmountBox}>
            <strong>Final Amount: ₹{finalAmount.toFixed(2)}</strong>
          </div>

          <hr style={styles.divider} />

          <label style={styles.label}>Main Image / Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
          />

          <label style={styles.label}>Banner Images</label>

          {/* Existing Banners */}
          {existingBanners.length > 0 && (
            <div style={styles.existingBannersBox}>
              <small style={styles.existingLabel}>Existing Banners:</small>
              <div style={styles.existingBannersGrid}>
                {existingBanners.map((banner, i) => (
                  <div key={i} style={styles.existingBannerItem}>
                    <img
                      src={banner.imageUrl}
                      alt="banner"
                      style={styles.existingBannerThumb}
                    />
                    <button
                      onClick={() => removeExistingBanner(i)}
                      style={styles.existingBannerRemove}
                      title="Remove banner"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Banner Uploads */}
          {banners.map((_, i) => (
            <div key={i} style={styles.bannerRow}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateBanner(i, e.target.files[0])}
                style={styles.fileInput}
              />
              <button onClick={() => removeBanner(i)} style={styles.removeBtn}>
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={addBanner}
            style={styles.plusBtn}
            disabled={banners.length + existingBanners.length >= 5}
          >
            ➕ Add Banner ({banners.length + existingBanners.length}/5)
          </button>

          <div style={styles.formActions}>
            <button style={styles.saveBtn} onClick={handleSubmit}>
              {editId ? "Update" : "Save"}
            </button>
            <button style={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Main</th>
              <th style={styles.th}>Quote</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>GST</th>
              <th style={styles.th}>Final</th>
              {/* <th style={{ ...styles.th, minWidth: 220 }}>Banners</th> */}
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(ads) &&
              ads.map((ad, i) => (
                <tr key={ad._id} style={styles.tr}>
                  <td style={styles.td}>{i + 1}</td>

                  <td style={styles.td}>
                    {ad.mediaUrl && (
                      <img src={ad.mediaUrl} alt="ad" style={styles.thumb} />
                    )}
                  </td>

                  <td style={{ ...styles.td, maxWidth: 280 }}>{ad.quote}</td>
                  <td style={styles.td}>₹{ad.price}</td>
                  <td style={styles.td}>{ad.gstPercent}%</td>
                  <td style={styles.td}>
                    <strong>₹{ad.finalAmount || ad.price}</strong>
                  </td>

                  {/* <td style={{ ...styles.td, minWidth: 220 }}>
                    {Array.isArray(ad.banners) && ad.banners.length > 0 ? (
                      <div style={styles.bannersGrid}>
                        {ad.banners.map((b, idx) => (
                          <img
                            key={b.publicId || b._id || idx}
                            src={b.imageUrl}
                            alt="banner"
                            style={styles.bannerThumb}
                          />
                        ))}
                      </div>
                    ) : (
                      <span style={styles.noBanner}>No Banners</span>
                    )}
                  </td> */}

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background:
                          ad.status === "active" ? "#d4f5dd" : "#ffdede",
                        color: ad.status === "active" ? "#1a7f37" : "#b00020",
                      }}
                    >
                      {ad.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      onClick={() => handleEdit(ad)}
                      style={styles.actionBtn}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      style={styles.actionBtn}
                      title="Delete"
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() => toggleStatus(ad._id)}
                      style={styles.actionBtn}
                      title="Toggle Status"
                    >
                      🔁
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {ads.length === 0 && (
          <div style={styles.emptyState}>
            <p>No ads found. Click "Add Ad" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdsAdmin;

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: 24,
    background: "#f4f6fb",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    margin: 0,
    fontSize: 28,
    color: "#1a1a1a",
  },

  addBtn: {
    background: "#6a5ae0",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    transition: "all 0.2s",
  },

  formBox: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    maxWidth: 600,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: 24,
  },

  formTitle: {
    marginTop: 0,
    marginBottom: 20,
    fontSize: 20,
    color: "#1a1a1a",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    boxSizing: "border-box",
  },

  fileInput: {
    width: "100%",
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    boxSizing: "border-box",
  },

  label: {
    display: "block",
    marginBottom: 8,
    marginTop: 12,
    fontSize: 14,
    fontWeight: 600,
    color: "#374151",
  },

  finalAmountBox: {
    padding: 12,
    background: "#f3f4f6",
    borderRadius: 6,
    marginBottom: 12,
    color: "#1f2937",
  },

  divider: {
    border: "none",
    borderTop: "1px solid #e5e7eb",
    margin: "16px 0",
  },

  existingBannersBox: {
    marginBottom: 16,
    padding: 12,
    background: "#f9fafb",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
  },

  existingLabel: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: 600,
  },

  existingBannersGrid: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },

  existingBannerItem: {
    position: "relative",
  },

  existingBannerThumb: {
    width: 90,
    height: 60,
    objectFit: "cover",
    borderRadius: 8,
    border: "2px solid #d1d5db",
    display: "block",
  },

  existingBannerRemove: {
    position: "absolute",
    top: -8,
    right: -8,
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 24,
    height: 24,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },

  bannerRow: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  removeBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: "bold",
    flexShrink: 0,
  },

  plusBtn: {
    background: "#6a5ae0",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    marginTop: 8,
    marginBottom: 16,
  },

  formActions: {
    display: "flex",
    gap: 12,
    marginTop: 20,
  },

  saveBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    flex: 1,
  },

  cancelBtn: {
    background: "#6b7280",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    flex: 1,
  },

  tableWrap: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "auto",
  },

  th: {
    background: "#f9fafb",
    padding: "12px 16px",
    textAlign: "left",
    fontSize: 13,
    fontWeight: 700,
    color: "#374151",
    borderBottom: "2px solid #e5e7eb",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  tr: {
    borderBottom: "1px solid #e5e7eb",
  },

  td: {
    padding: "12px 16px",
    fontSize: 14,
    color: "#1f2937",
    verticalAlign: "middle",
  },

  thumb: {
    width: 70,
    height: 50,
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    display: "block",
  },

  bannersGrid: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  bannerThumb: {
    width: 70,
    height: 45,
    objectFit: "cover",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    display: "block",
  },

  noBanner: {
    color: "#9ca3af",
    fontSize: 13,
    fontStyle: "italic",
  },

  badge: {
    padding: "5px 12px",
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "inline-block",
  },

  actionBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 20,
    marginRight: 8,
    padding: 4,
    transition: "transform 0.2s",
  },

  emptyState: {
    padding: 40,
    textAlign: "center",
    color: "#6b7280",
  },
};