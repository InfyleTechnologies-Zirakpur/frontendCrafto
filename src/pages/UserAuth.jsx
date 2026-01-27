// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UserAuth() {
//   const navigate = useNavigate();

//   const [isSignup, setIsSignup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   /* =====================================================
//      🔐 SUBMIT (USER SIGNUP / LOGIN)
//   ===================================================== */
//   const submit = async () => {
//     setError("");

//     if (!form.email || !form.password) {
//       setError("Email and password required");
//       return;
//     }

//     if (isSignup && !form.name) {
//       setError("Name is required for signup");
//       return;
//     }

//     setLoading(true);

//     const url = isSignup
//       ? "https://crafto-backend-zqcn.onrender.com/api/auth/user/create"
//       : "https://crafto-backend-zqcn.onrender.com/api/auth/user/log";

//     const body = isSignup
//       ? form
//       : { email: form.email, password: form.password };

//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         navigate("/dashboard", { replace: true });
//       } else {
//         setError(data.message || "Authentication failed");
//       }
//     } catch (err) {
//       console.error("USER AUTH ERROR:", err);
//       setError("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>
//           {isSignup ? "User Signup" : "User Login"}
//         </h2>

//         {isSignup && (
//           <input
//             style={styles.input}
//             placeholder="Full Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />
//         )}

//         <input
//           style={styles.input}
//           placeholder="Email Address"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         {error && <p style={styles.error}>{error}</p>}

//         <button
//           style={styles.button}
//           onClick={submit}
//           disabled={loading}
//         >
//           {loading
//             ? "Please wait..."
//             : isSignup
//             ? "Signup"
//             : "Login"}
//         </button>

//         <p
//           style={styles.switch}
//           onClick={() => {
//             setIsSignup(!isSignup);
//             setError("");
//           }}
//         >
//           {isSignup
//             ? "Already have account? Login"
//             : "Create account"}
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ================== STYLES ================== */

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background:
//       "linear-gradient(135deg, #1d2671, #c33764)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontFamily: "Poppins, sans-serif",
//   },

//   card: {
//     width: "100%",
//     maxWidth: 420,
//     background: "#ffffff",
//     padding: "36px 32px",
//     borderRadius: 14,
//     boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
//   },

//   title: {
//     textAlign: "center",
//     marginBottom: 26,
//     fontWeight: 600,
//     fontSize: 22,
//   },

//   input: {
//     width: "100%",
//     padding: "12px 14px",
//     marginBottom: 14,
//     borderRadius: 8,
//     border: "1px solid #ccc",
//     fontSize: 14,
//   },

//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "linear-gradient(135deg,#667eea,#764ba2)",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     fontWeight: 600,
//     cursor: "pointer",
//     marginTop: 8,
//   },

//   switch: {
//     marginTop: 18,
//     textAlign: "center",
//     color: "#667eea",
//     cursor: "pointer",
//     fontSize: 14,
//   },

//   error: {
//     color: "#e74c3c",
//     fontSize: 13,
//     marginBottom: 10,
//     textAlign: "center",
//   },
// };

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAuth() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* =====================================================
     🔐 SUBMIT (USER SIGNUP / LOGIN)
  ===================================================== */
  const submit = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password required");
      return;
    }

    if (isSignup && !form.name) {
      setError("Name is required for signup");
      return;
    }

    setLoading(true);

    const url = isSignup
      ? "https://crafto-backend-zqcn.onrender.com/api/auth/user/create"
      : "https://crafto-backend-zqcn.onrender.com/api/auth/user/log";

    // 🔔 FCM TOKEN (saved by Firebase earlier)
    const fcmToken = localStorage.getItem("fcmToken");

    const body = isSignup
      ? {
          ...form,
          fcmToken,
          platform: "web",
        }
      : {
          email: form.email,
          password: form.password,
          fcmToken,
          platform: "web",
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("USER AUTH ERROR:", err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isSignup ? "User Signup" : "User Login"}
        </h2>

        {isSignup && (
          <input
            style={styles.input}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          style={styles.input}
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={styles.button}
          onClick={submit}
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Signup"
            : "Login"}
        </button>

        <p
          style={styles.switch}
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup
            ? "Already have account? Login"
            : "Create account"}
        </p>
      </div>
    </div>
  );
}

/* ================== STYLES ================== */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #1d2671, #c33764)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 420,
    background: "#ffffff",
    padding: "36px 32px",
    borderRadius: 14,
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  },

  title: {
    textAlign: "center",
    marginBottom: 26,
    fontWeight: 600,
    fontSize: 22,
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 14,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  },

  switch: {
    marginTop: 18,
    textAlign: "center",
    color: "#667eea",
    cursor: "pointer",
    fontSize: 14,
  },

  error: {
    color: "#e74c3c",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
};
