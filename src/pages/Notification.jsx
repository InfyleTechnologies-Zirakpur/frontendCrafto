// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Notifications() {
//   const [data, setData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null); // ⭐ Edit Mode

//   const [form, setForm] = useState({
//     title: "",
//     message: "",
//     type: "",
//   });

//   const [image, setImage] = useState(null);

//   // Fetch List
//   const getData = async () => {
//     try {
//       const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/notification/list");
//       setData(res.data.notifications);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   // Handle Submit → Add OR Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const fd = new FormData();
//       fd.append("title", form.title);
//       fd.append("message", form.message);
//       fd.append("type", form.type);
//       if (image) fd.append("image", image);

//       if (editId) {
//         // ⭐ UPDATE Request
//         await axios.put(`https://crafto-backend-zqcn.onrender.com/api/notification/update/${editId}`, fd);
//         alert("Notification Updated!");
//       } else {
//         // ⭐ CREATE Request
//         await axios.post("https://crafto-backend-zqcn.onrender.com/api/notification/add", fd);
//         alert("Notification Added!");
//       }

//       // Reset
//       setForm({ title: "", message: "", type: "" });
//       setImage(null);
//       setEditId(null);
//       setShowForm(false);
//       getData();

//     } catch (error) {
//       alert("Error in saving data");
//       console.log(error);
//     }
//   };

//   // ⭐ DELETE
//   const deleteNotification = async (id) => {
//     try {
//       await axios.delete(`https://crafto-backend-zqcn.onrender.com/api/notification/delete/${id}`);
//       getData();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ⭐ EDIT — Load data in form
//   const editNotification = (item) => {
//     setForm({
//       title: item.title,
//       message: item.message,
//       type: item.type,
//     });
//     setEditId(item._id);
//     setShowForm(true);
//   };

//   return (
//     <div className="container mt-4">

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3>Notifications / List</h3>

//         {!showForm && (
//           <button 
//             className="btn btn-success" 
//             onClick={() => { setShowForm(true); setEditId(null); }}
//           >
//             Add New
//           </button>
//         )}
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <div className="card p-3 mb-4">
          
//           <div className="d-flex justify-content-between align-items-center">
//             <h5>{editId ? "Edit Notification" : "Add Notification"}</h5>

//             <button 
//               className="btn btn-danger btn-sm"
//               onClick={() => { setShowForm(false); setEditId(null); }}
//             >
//               Close
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
            
//             <label className="mt-2">Title</label>
//             <input 
//               type="text" 
//               className="form-control"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <label className="mt-2">Message</label>
//             <textarea 
//               className="form-control"
//               value={form.message}
//               onChange={(e) => setForm({ ...form, message: e.target.value })}
//             ></textarea>

//             <label className="mt-2">Type</label>
//             <input 
//               type="text"
//               className="form-control"
//               placeholder="Normal / Offer / Festival / Update"
//               value={form.type}
//               onChange={(e) => setForm({ ...form, type: e.target.value })}
//             />

//             <label className="mt-2">Image (optional)</label>
//             <input 
//               type="file" 
//               className="form-control"
//               onChange={(e) => setImage(e.target.files[0])}
//             />

//             {/* Show current image when editing */}
//             {editId && (
//               <div className="mt-2">
//                 <small>Current Image:</small><br/>
//                 <img 
//                   src={data.find((x) => x._id === editId)?.image} 
//                   width="80"
//                   style={{ borderRadius: "8px" }}
//                 />
//               </div>
//             )}

//             <button className="btn btn-success mt-3 w-100">
//               {editId ? "Update" : "Save"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* LIST TABLE */}
//       {!showForm && (
//         <div className="card p-3">
//           <h5>Notifications</h5>

//           <table className="table table-hover mt-3">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Message</th>
//                 <th>Type</th>
//                 <th>Image</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.map((item, i) => (
//                 <tr key={item._id}>
//                   <td>{i + 1}</td>
//                   <td>{item.title}</td>
//                   <td>{item.message}</td>
//                   <td>{item.type}</td>
//                   <td>
//                     {item.image && (
//                       <img 
//                         src={item.image} 
//                         width="50"
//                         style={{ borderRadius: "5px" }}
//                       />
//                     )}
//                   </td>

//                   <td>
//                     <button 
//                       className="btn btn-primary btn-sm me-2"
//                       onClick={() => editNotification(item)}
//                     >
//                       Edit
//                     </button>

//                     <button 
//                       className="btn btn-danger btn-sm"
//                       onClick={() => deleteNotification(item._id)}
//                     >
//                       Delete
//                     </button>
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

// export default Notifications;

import React, { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "",
  });

  const [image, setImage] = useState(null);

  // Fetch List
  const getData = async () => {
    try {
      const res = await axios.get("https://crafto-backend-zqcn.onrender.com/api/notification/list");
      setData(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("message", form.message);
      fd.append("type", form.type);
      if (image) fd.append("image", image);

      if (editId) {
        await axios.put(`https://crafto-backend-zqcn.onrender.com/api/notification/update/${editId}`, fd);
        alert("Notification Updated!");
      } else {
        await axios.post("https://crafto-backend-zqcn.onrender.com/api/notification/add", fd);
        alert("Notification Added!");
      }

      setForm({ title: "", message: "", type: "" });
      setImage(null);
      setEditId(null);
      setShowForm(false);
      getData();
    } catch (error) {
      alert("Error in saving data");
      console.log(error);
    }
  };

  // Delete
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`https://crafto-backend-zqcn.onrender.com/api/notification/delete/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const editNotification = (item) => {
    setForm({
      title: item.title,
      message: item.message,
      type: item.type,
    });
    setEditId(item._id);
    setShowForm(true);
  };

  return (
    <div className="container mt-4">

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="text-center text-md-start">Notifications / List</h3>

        {!showForm && (
          <button
            className="btn btn-success w-100 w-md-auto"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
          >
            Add New
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="card p-3 mb-4">

          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5>{editId ? "Edit Notification" : "Add Notification"}</h5>

            <button
              className="btn btn-danger btn-sm mt-2 mt-md-0"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <label className="mt-2">Title</label>
            <input
              type="text"
              className="form-control"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <label className="mt-2">Message</label>
            <textarea
              className="form-control"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            ></textarea>

            <label className="mt-2">Type</label>
            <input
              type="text"
              className="form-control"
              placeholder="Normal / Offer / Festival / Update"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />

            <label className="mt-2">Image (optional)</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {editId && (
              <div className="mt-2">
                <small>Current Image:</small><br />
                <img
                  src={data.find((x) => x._id === editId)?.image}
                  width="80"
                  style={{ borderRadius: "8px" }}
                />
              </div>
            )}

            <button className="btn btn-success mt-3 w-100">
              {editId ? "Update" : "Save"}
            </button>

          </form>
        </div>
      )}

      {/* LIST TABLE */}
      {!showForm && (
        <div className="card p-3">
          <h5>Notifications</h5>

          <div className="table-responsive mt-3">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td style={{ maxWidth: "200px", whiteSpace: "normal" }}>
                      {item.message}
                    </td>
                    <td>{item.type}</td>

                    <td>
                      {item.image && (
                        <img
                          src={item.image}
                          width="50"
                          className="img-fluid"
                          style={{ borderRadius: "5px" }}
                        />
                      )}
                    </td>

                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => editNotification(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteNotification(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      )}

    </div>
  );
}

export default Notifications;
