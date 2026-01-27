
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./auth.css";

// // export default function AuthPage() {
// //   const navigate = useNavigate();
// //   const [isSignup, setIsSignup] = useState(false);
// //   const [email, setEmail] = useState("");
// //   const [name, setName] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [step, setStep] = useState(1);
// //   const [message, setMessage] = useState("");

// //   const sendOtp = async () => {
// //     try {
// //       const url = isSignup
// //         ? "https://crafto-backend-zqcn.onrender.com/api/auth/signup/send-otp"
// //         : "https://crafto-backend-zqcn.onrender.com/api/auth/login/send-otp";

// //       const res = await fetch(url, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email }),
// //       });

// //       const data = await res.json();
// //       setMessage(data.message || "OTP sent");
// //       if (data.success) setStep(2);
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("Failed to send OTP");
// //     }
// //   };

// //   const verifyOtp = async () => {
// //     try {
// //       const url = isSignup
// //         ? "https://crafto-backend-zqcn.onrender.com/api/auth/signup/verify-otp"
// //         : "https://crafto-backend-zqcn.onrender.com/api/auth/login/verify-otp";

// //       const body = isSignup ? { email, otp, name } : { email, otp };

// //       const res = await fetch(url, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(body),
// //       });

// //       const data = await res.json();
// //       setMessage(data.message);

// //       if (data.success) {
// //         if (isSignup) {
// //           setIsSignup(false);
// //           setStep(1);
// //           setOtp("");
// //           setName("");
// //           setMessage("Signup successful! Please login.");
// //         } else {
// //           // User/Admin login success
// //           localStorage.setItem("token", data.token);
// //           navigate("/dashboard");
// //         }
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setMessage("Failed to verify OTP");
// //     }
// //   };

// //   return (
// //     <div className="auth-container">
// //       <h2>{isSignup ? "Signup" : "Login"}</h2>

// //       {step === 1 && (
// //         <>
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //           <button onClick={sendOtp}>Send OTP</button>
// //         </>
// //       )}

// //       {step === 2 && (
// //         <>
// //           {isSignup && (
// //             <input
// //               type="text"
// //               placeholder="Name"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //             />
// //           )}
// //           <input
// //             type="text"
// //             placeholder="Enter OTP"
// //             value={otp}
// //             onChange={(e) => setOtp(e.target.value)}
// //           />
// //           <button onClick={verifyOtp}>Verify OTP</button>
// //         </>
// //       )}

// //       <div
// //         className="switch"
// //         onClick={() => {
// //           setIsSignup(!isSignup);
// //           setStep(1);
// //           setOtp("");
// //           setMessage("");
// //         }}
// //       >
// //         {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
// //       </div>

// //       {message && <p className="message">{message}</p>}
// //     </div>
// //   );
// // }

// // AdminLogin.jsx


// import React, { useState } from "react";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     const res = await fetch(
//       "https://crafto-backend-zqcn.onrender.com/api/auth/admin/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       }
//     );

//     const data = await res.json();
//     if (data.token) {
//       localStorage.setItem("adminToken", data.token);
//       window.location.href = "/admin/dashboard";
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  /* =====================================================
     🔍 CHECK IF ADMIN EXISTS (ON PAGE LOAD)
  ===================================================== */
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch(
          "https://crafto-backend-zqcn.onrender.com/api/auth/admin/exists",
          { cache: "no-store" } // avoid 304 cache issue
        );
        const data = await res.json();

        // admin nahi mila → signup dikhao
        setIsSignup(!data.exists);
      } catch (err) {
        console.error("ADMIN EXISTS CHECK ERROR:", err);
        setIsSignup(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  /* =====================================================
     🔐 SUBMIT (ADMIN SIGNUP / LOGIN)
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

    setSubmitting(true);

    const url = isSignup
      ? "https://crafto-backend-zqcn.onrender.com/api/auth/admin/signup"
      : "https://crafto-backend-zqcn.onrender.com/api/auth/admin/login";

    const body = isSignup
      ? form
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      /* ---------- SIGNUP SUCCESS ---------- */
      if (data.success && isSignup) {
        alert("Admin created successfully. Please login.");
        setIsSignup(false);
        setSubmitting(false);
        return;
      }

      /* ---------- LOGIN SUCCESS ---------- */
      if (data.token) {
        // 🔥 VERY IMPORTANT (App.js expects THIS key)
        localStorage.setItem("token", data.token);

        // ✅ FINAL & GUARANTEED NAVIGATION
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("AUTH ERROR:", err);
      setError("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  /* =====================================================
     ⏳ LOADING STATE
  ===================================================== */
  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loader}>Checking admin...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isSignup ? "Admin Signup" : "Admin Login"}
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
          disabled={submitting}
        >
          {submitting
            ? "Please wait..."
            : isSignup
            ? "Create Admin"
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
            ? "Already have admin account? Login"
            : "Create new admin account"}
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
      "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
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
    color: "#2c3e50",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 14,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
    outline: "none",
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
    fontWeight: 500,
  },

  error: {
    color: "#e74c3c",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },

  loader: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
};
