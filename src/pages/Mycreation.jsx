// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyCreationAdmin.css";

// const API_URL = "https://crafto-backend-zqcn.onrender.com/api/mycreations";

// export default function MyCreationAdmin() {
//   const [creations, setCreations] = useState([]);

//   useEffect(() => {
//     fetchCreations();
//   }, []);

//   const fetchCreations = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setCreations(res.data.creations || []);
//     } catch (err) {
//       console.error("Error fetching creations:", err);
//     }
//   };

//   const handleStatus = async (id, status) => {
//     try {
//       await axios.put(`${API_URL}/${id}/status`, { status });
//       fetchCreations();
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="mycreation-admin">
//       <h2>My Creations (Admin Panel)</h2>

//       {creations.length === 0 ? (
//         <p className="empty-state">No creations found.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="mycreation-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>User</th>
//                 <th>Status</th>
//                 <th>Preview</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {creations.map((c) => (
//                 <tr key={c._id}>
//                   <td>{c.title}</td>
//                   <td>{c.user?.name || "Unknown"}</td>
//                   <td>
//                     <span
//                       className={`status-pill ${
//                         c.status === "approved"
//                           ? "status-approved"
//                           : c.status === "rejected"
//                           ? "status-rejected"
//                           : "status-pending"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>
//                   <td>
//                     <a
//                       href={c.file}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="preview-link"
//                     >
//                       🔗 View
//                     </a>
//                   </td>
//                   <td>
//                     {c.status === "pending" ? (
//                       <div className="actions">
//                         <button
//                           className="btn btn-approve"
//                           onClick={() => handleStatus(c._id, "approved")}
//                         >
//                           Approve
//                         </button>
//                         <button
//                           className="btn btn-reject"
//                           onClick={() => handleStatus(c._id, "rejected")}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     ) : (
//                       <span className="no-action">—</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyCreationAdmin.css";

// const API_URL = "https://crafto-backend-zqcn.onrender.com/api/mycreations";

// export default function MyCreationAdmin() {
//   const [creations, setCreations] = useState([]);

//   useEffect(() => {
//     fetchCreations();
//   }, []);

//   const fetchCreations = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setCreations(res.data.creations || []);
//     } catch (err) {
//       console.error("Error fetching creations:", err);
//     }
//   };

//   const handleStatus = async (id, newStatus) => {
//     try {
//       await axios.put(`${API_URL}/${id}/status`, { status: newStatus });
//       fetchCreations();
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="mycreation-admin">
//       <h2>🎨 My Creations (Admin Panel)</h2>

//       {creations.length === 0 ? (
//         <p className="empty-state">No creations found.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="mycreation-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>User</th>
//                 <th>Status</th>
//                 <th>Preview</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {creations.map((c) => (
//                 <tr key={c._id}>
//                   <td>{c.title || "Untitled"}</td>
//                   <td>{c.user?.name || "Unknown"}</td>
//                   <td>
//                     <span
//                       className={`status-pill ${
//                         c.status === "approved"
//                           ? "status-approved"
//                           : c.status === "rejected"
//                           ? "status-rejected"
//                           : "status-pending"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>
//                   <td>
//                     {c.file ? (
//                       <a
//                         href={c.file}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="preview-link"
//                       >
//                         🔗 View File
//                       </a>
//                     ) : (
//                       <span className="no-file">No file</span>
//                     )}
//                   </td>
//                   <td>
//                     <div className="actions">
//                       {c.status === "pending" && (
//                         <>
//                           <button
//                             className="btn btn-approve"
//                             onClick={() => handleStatus(c._id, "approved")}
//                           >
//                             Approve
//                           </button>
//                           <button
//                             className="btn btn-reject"
//                             onClick={() => handleStatus(c._id, "rejected")}
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                       {c.status === "approved" && (
//                         <button
//                           className="btn btn-reject"
//                           onClick={() => handleStatus(c._id, "rejected")}
//                         >
//                           Reject
//                         </button>
//                       )}

//                       {c.status === "rejected" && (
//                         <button
//                           className="btn btn-approve"
//                           onClick={() => handleStatus(c._id, "approved")}
//                         >
//                           Approve
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyCreationAdmin.css";

// const API_URL = "https://crafto-backend-zqcn.onrender.com/api/mycreations";

// export default function MyCreationAdmin() {
//   const [creations, setCreations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchCreations();
//   }, []);

//   const fetchCreations = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       setCreations(res.data.creations || []);
//     } catch (err) {
//       console.error("❌ Error fetching creations:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatus = async (id, newStatus) => {
//     try {
//       await axios.put(`${API_URL}/${id}/status`, {
//         status: newStatus,
//       });
//       fetchCreations();
//     } catch (err) {
//       console.error("❌ Error updating status:", err);
//     }
//   };

//   return (
//     <div className="mycreation-admin">
//       <h2>🎨 My Creations (Admin Panel)</h2>

//       {loading ? (
//         <p className="empty-state">Loading...</p>
//       ) : creations.length === 0 ? (
//         <p className="empty-state">No creations found.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="mycreation-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>User</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Preview</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {creations.map((c) => (
//                 <tr key={c._id}>
//                   {/* TITLE */}
//                   <td>{c.title || "Untitled"}</td>

//                   {/* USER */}
//                   <td>{c.user?.name || "Unknown"}</td>

//                   {/* CATEGORY */}
//                   <td>
//                     {c.category ? (
//                       <span className="category-badge">
//                         {c.category.name}
//                       </span>
//                     ) : (
//                       <span className="no-category">—</span>
//                     )}
//                   </td>

//                   {/* STATUS */}
//                   <td>
//                     <span
//                       className={`status-pill ${
//                         c.status === "approved"
//                           ? "status-approved"
//                           : c.status === "rejected"
//                           ? "status-rejected"
//                           : "status-pending"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>

//                   {/* FILE PREVIEW */}
//                   <td>
//                     {c.file ? (
//                       <a
//                         href={c.file}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="preview-link"
//                       >
//                         🔗 View File
//                       </a>
//                     ) : (
//                       <span className="no-file">No file</span>
//                     )}
//                   </td>

//                   {/* ACTIONS */}
//                   <td>
//                     <div className="actions">
//                       {c.status === "pending" && (
//                         <>
//                           <button
//                             className="btn btn-approve"
//                             onClick={() =>
//                               handleStatus(c._id, "approved")
//                             }
//                           >
//                             Approve
//                           </button>

//                           <button
//                             className="btn btn-reject"
//                             onClick={() =>
//                               handleStatus(c._id, "rejected")
//                             }
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                       {c.status === "approved" && (
//                         <button
//                           className="btn btn-reject"
//                           onClick={() =>
//                             handleStatus(c._id, "rejected")
//                           }
//                         >
//                           Reject
//                         </button>
//                       )}

//                       {c.status === "rejected" && (
//                         <button
//                           className="btn btn-approve"
//                           onClick={() =>
//                             handleStatus(c._id, "approved")
//                           }
//                         >
//                           Approve
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyCreationAdmin.css";

// const API_URL = "https://crafto-backend-zqcn.onrender.com/api/mycreations";

// export default function MyCreationAdmin() {
//   const [creations, setCreations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchCreations();
//   }, []);

//   const fetchCreations = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL);
//       setCreations(res.data.creations || []);
//     } catch (err) {
//       console.error("❌ Error fetching creations:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatus = async (id, newStatus) => {
//     try {
//       await axios.put(`${API_URL}/${id}/status`, {
//         status: newStatus,
//       });
//       fetchCreations();
//     } catch (err) {
//       console.error("❌ Error updating status:", err);
//     }
//   };

//   return (
//     <div className="mycreation-admin">
//       <h2>🎨 My Creations (Admin Panel)</h2>

//       {loading ? (
//         <p className="empty-state">Loading...</p>
//       ) : creations.length === 0 ? (
//         <p className="empty-state">No creations found.</p>
//       ) : (
//         <div className="table-wrapper">
//           <table className="mycreation-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Owner</th> {/* ✅ CONTENT OWNER */}
//                 <th>User</th>
//                 <th>Category</th>
//                 <th>Status</th>
//                 <th>Preview</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {creations.map((c) => (
//                 <tr key={c._id}>
//                   {/* TITLE */}
//                   <td>{c.title || "Untitled"}</td>

//                   {/* CONTENT OWNER NAME */}
//                   <td>
//                     <strong>{c.contentOwnerName || "—"}</strong>
//                   </td>

//                   {/* USER (ACCOUNT NAME) */}
//                   <td>{c.user?.name || "Unknown"}</td>

//                   {/* CATEGORY */}
//                   <td>
//                     {c.category ? (
//                       <span className="category-badge">
//                         {c.category.name}
//                       </span>
//                     ) : (
//                       <span className="no-category">—</span>
//                     )}
//                   </td>

//                   {/* STATUS */}
//                   <td>
//                     <span
//                       className={`status-pill ${
//                         c.status === "approved"
//                           ? "status-approved"
//                           : c.status === "rejected"
//                           ? "status-rejected"
//                           : "status-pending"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>

//                   {/* FILE PREVIEW */}
//                   <td>
//                     {c.file ? (
//                       <a
//                         href={c.file}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="preview-link"
//                       >
//                         🔗 View File
//                       </a>
//                     ) : (
//                       <span className="no-file">No file</span>
//                     )}
//                   </td>

//                   {/* ACTIONS */}
//                   <td>
//                     <div className="actions">
//                       {c.status === "pending" && (
//                         <>
//                           <button
//                             className="btn btn-approve"
//                             onClick={() =>
//                               handleStatus(c._id, "approved")
//                             }
//                           >
//                             Approve
//                           </button>

//                           <button
//                             className="btn btn-reject"
//                             onClick={() =>
//                               handleStatus(c._id, "rejected")
//                             }
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                       {c.status === "approved" && (
//                         <button
//                           className="btn btn-reject"
//                           onClick={() =>
//                             handleStatus(c._id, "rejected")
//                           }
//                         >
//                           Reject
//                         </button>
//                       )}

//                       {c.status === "rejected" && (
//                         <button
//                           className="btn btn-approve"
//                           onClick={() =>
//                             handleStatus(c._id, "approved")
//                           }
//                         >
//                           Approve
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyCreationAdmin.css";

const API_URL = "https://crafto-backend-zqcn.onrender.com/api/mycreations";

// 🔐 JWT header helper
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default function MyCreationAdmin() {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCreations();
  }, []);

  const fetchCreations = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(API_URL, getAuthHeaders());

      setCreations(res.data.creations || []);
    } catch (err) {
      console.error("❌ Error fetching creations:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load creations. Are you logged in as Admin?"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/${id}/status`,
        { status: newStatus },
        getAuthHeaders()
      );
      fetchCreations();
    } catch (err) {
      console.error("❌ Error updating status:", err);
      alert(
        err.response?.data?.message ||
          "Status update failed (check admin login)"
      );
    }
  };

  return (
    <div className="mycreation-admin">
      <h2>🎨 My Creations (Admin Panel)</h2>

      {loading && <p className="empty-state">Loading...</p>}
      {error && <p className="error-state">{error}</p>}

      {!loading && !error && creations.length === 0 && (
        <p className="empty-state">No creations found.</p>
      )}

      {!loading && creations.length > 0 && (
        <div className="table-wrapper">
          <table className="mycreation-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Owner</th>
                <th>User</th>
                <th>Category</th>
                <th>Status</th>
                <th>Preview</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {creations.map((c) => (
                <tr key={c._id}>
                  {/* TITLE */}
                  <td>{c.title || "Untitled"}</td>

                  {/* CONTENT OWNER */}
                  <td>
                    <strong>{c.contentOwnerName || "—"}</strong>
                  </td>

                  {/* USER */}
                  <td>{c.user?.name || "Unknown"}</td>

                  {/* CATEGORY */}
                  <td>
                    {/* {c.category ? (
                      <span className="category-badge">
                        {c.category.name}
                      </span>
                    ) : (
                      <span className="no-category">—</span>
                    )} */}

                    {c.category ? (
  <span className="category-badge">
    {c.category}
  </span>
) : (
  <span className="no-category">—</span>
)}

                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`status-pill ${
                        c.status === "approved"
                          ? "status-approved"
                          : c.status === "rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* PREVIEW */}
                  <td>
                    {c.file ? (
                      <a
                        href={c.file}
                        target="_blank"
                        rel="noreferrer"
                        className="preview-link"
                      >
                        🔗 View File
                      </a>
                    ) : (
                      <span className="no-file">No file</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="actions">
                      {c.status !== "approved" && (
                        <button
                          className="btn btn-approve"
                          onClick={() =>
                            handleStatus(c._id, "approved")
                          }
                        >
                          Approve
                        </button>
                      )}

                      {c.status !== "rejected" && (
                        <button
                          className="btn btn-reject"
                          onClick={() =>
                            handleStatus(c._id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
