import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE = "http://localhost:7000";

const ENDPOINTS = {
  adminAds: `${API_BASE}/api/admin/ads`,
  userAds: (userId) => `${API_BASE}/api/app/ads/${userId}`,
};

export default function AdsDashboard() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>AdMob Admin Dashboard</h1>
        <p style={styles.subtitle}>Manage advertisement settings and test user configurations</p>
      </header>

      <div style={styles.content}>
        <AdminAdsPanel />
        {/* <TestUserPanel /> */}
      </div>
    </div>
  );
}
function AdminAdsPanel() {
   const [rewardedEnabled, setRewardedEnabled] = useState(true);
const [nativeEnabled, setNativeEnabled] = useState(true);
const [rewardedId, setRewardedId] = useState("");
const [nativeId, setNativeId] = useState("");
  const [adsEnabled, setAdsEnabled] = useState(false);
  const [adFrequency, setAdFrequency] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(ENDPOINTS.adminAds);
    //   setAdsEnabled(response.data.adsEnabled);
    //   setAdFrequency(response.data.adFrequency);
    setAdsEnabled(response.data.adsEnabled);
setAdFrequency(response.data.adFrequency);
setRewardedEnabled(response.data.rewardedEnabled ?? true);
setNativeEnabled(response.data.nativeEnabled ?? true);
setRewardedId(response.data.rewardedId || "");
setNativeId(response.data.nativeId || "");

    } catch (err) {
      setError("Failed to load ad settings. Please try again.");
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaveStatus("saving");
      await axios.put(ENDPOINTS.adminAds, {
        // adsEnabled,
        // adFrequency,
        adsEnabled,
  adFrequency,
  rewardedId,
  nativeId,
    rewardedEnabled,
  nativeEnabled,

      });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus("error");
      console.error("Error saving settings:", err);
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (loading) {
    return (
      <div style={styles.card}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading admin settings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.card}>
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
          <button onClick={fetchSettings} style={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>Global Ad Settings</h2>
        <span style={{ ...styles.badge, ...(adsEnabled ? styles.badgeActive : styles.badgeInactive) }}>
          {adsEnabled ? "Active" : "Inactive"}
        </span>
      </div>

      <div style={styles.cardBody}>
        <div style={styles.formGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={adsEnabled}
              onChange={(e) => setAdsEnabled(e.target.checked)}
              style={styles.checkbox}
            />
            <span style={styles.checkboxText}>Enable Ads Globally</span>
          </label>
          <p style={styles.helpText}>
            Toggle to enable or disable advertisements across the entire platform
          </p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Ad Frequency
            <span style={styles.labelHint}>(Show ad after every N posts)</span>
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={adFrequency}
            onChange={(e) => setAdFrequency(Number(e.target.value))}
            style={styles.numberInput}
          />
          <p style={styles.helpText}>
            Display an advertisement after every {adFrequency} post{adFrequency !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ================= REWARDED AD SETTINGS ================= */}
<div style={styles.formGroup}>
  <label style={styles.checkboxLabel}>
    <input
      type="checkbox"
      checked={rewardedEnabled}
      onChange={(e) => setRewardedEnabled(e.target.checked)}
      style={styles.checkbox}
    />
    <span style={styles.checkboxText}>Enable Rewarded Ads</span>
  </label>

  {rewardedEnabled && (
    <input
      type="text"
      value={rewardedId}
      onChange={(e) => setRewardedId(e.target.value)}
      placeholder="ca-app-pub-xxxx/xxxx"
      style={styles.textInput}
    />
  )}
</div>

{/* ================= NATIVE AD SETTINGS ================= */}
<div style={styles.formGroup}>
  <label style={styles.checkboxLabel}>
    <input
      type="checkbox"
      checked={nativeEnabled}
      onChange={(e) => setNativeEnabled(e.target.checked)}
      style={styles.checkbox}
    />
    <span style={styles.checkboxText}>Enable Native Ads</span>
  </label>

  {nativeEnabled && (
    <input
      type="text"
      value={nativeId}
      onChange={(e) => setNativeId(e.target.value)}
      placeholder="ca-app-pub-xxxx/xxxx"
      style={styles.textInput}
    />
  )}
</div>


        <button 
          onClick={saveSettings} 
          style={{
            ...styles.primaryButton,
            ...(saveStatus === "saving" && styles.buttonDisabled)
          }}
          disabled={saveStatus === "saving"}
        >
          {saveStatus === "saving" ? "Saving..." : "Save Settings"}
        </button>

        {saveStatus === "success" && (
          <div style={styles.successMessage}>
            ✅ Settings saved successfully
          </div>
        )}

        {saveStatus === "error" && (
          <div style={styles.errorMessage}>
            ❌ Failed to save settings. Please try again.
          </div>
        )}
      </div>
      
    </div>
    
  );
}


// function TestUserPanel() {
//   const [userId, setUserId] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const checkUserAds = async () => {
//     if (!userId.trim()) {
//       setError("Please enter a valid User ID");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(ENDPOINTS.userAds(userId));
//       setResult(response.data);
//     } catch (err) {
//       setError("Failed to fetch user data. Please check the User ID and try again.");
//       setResult(null);
//       console.error("Error fetching user ads:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       checkUserAds();
//     }
//   };

//   return (
//     <div style={styles.card}>
//       <div style={styles.cardHeader}>
//         <h2 style={styles.cardTitle}>Test User Configuration</h2>
//       </div>

//       <div style={styles.cardBody}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>User ID</label>
//           <input
//             type="text"
//             placeholder="Enter User ID (e.g., user123)"
//             value={userId}
//             onChange={(e) => {
//               setUserId(e.target.value);
//               setError(null);
//             }}
//             onKeyPress={handleKeyPress}
//             style={styles.textInput}
//           />
//           <p style={styles.helpText}>
//             Enter a user ID to check their ad configuration and subscription status
//           </p>
//         </div>

//         <button 
//           onClick={checkUserAds} 
//           style={{
//             ...styles.secondaryButton,
//             ...(loading && styles.buttonDisabled)
//           }}
//           disabled={loading}
//         >
//           {loading ? "Checking..." : "Check Configuration"}
//         </button>

//         {error && (
//           <div style={styles.errorMessage}>
//             {error}
//           </div>
//         )}

//        {result && (
//   <div style={styles.resultContainer}>
//     <h3 style={styles.resultTitle}>Configuration Result</h3>

//     <div style={styles.resultGrid}>

//       {/* USER TYPE */}
//       <div style={styles.resultItem}>
//         <span style={styles.resultLabel}>User Type:</span>
//         <span
//           style={{
//             ...styles.resultValue,
//             ...(result.userType === "PAID"
//               ? styles.paidBadge
//               : styles.freeBadge),
//           }}
//         >
//           {result.userType}
//         </span>
//       </div>

//       {/* ADS ENABLED */}
//       <div style={styles.resultItem}>
//         <span style={styles.resultLabel}>Ads Enabled:</span>
//         <span style={styles.resultValue}>
//           {result.showAds ? "✅ Yes" : "❌ No"}
//         </span>
//       </div>

//       {/* AD FREQUENCY */}
//       {result.showAds && (
//         <div style={styles.resultItem}>
//           <span style={styles.resultLabel}>Ad Frequency:</span>
//           <span style={styles.resultValue}>
//             Every {result.adFrequency} posts
//           </span>
//         </div>
//       )}

//       {/* INTERSTITIAL */}
//       {result.interstitial && (
//         <div style={styles.resultItem}>
//           <span style={styles.resultLabel}>Interstitial Ad:</span>
//           <span style={styles.resultValue}>{result.interstitial}</span>
//         </div>
//       )}

//       {/* REWARDED */}
//       {result.rewarded && (
//         <div style={styles.resultItem}>
//           <span style={styles.resultLabel}>Rewarded Ad:</span>
//           <span style={styles.resultValue}>{result.rewarded}</span>
//         </div>
//       )}

//       {/* NATIVE */}
//       {result.native && (
//         <div style={styles.resultItem}>
//           <span style={styles.resultLabel}>Native Ad:</span>
//           <span style={styles.resultValue}>{result.native}</span>
//         </div>
//       )}
//     </div>

//     <details style={styles.jsonDetails}>
//       <summary style={styles.jsonSummary}>View Raw JSON</summary>
//       <pre style={styles.jsonPre}>
//         {JSON.stringify(result, null, 2)}
//       </pre>
//     </details>
//   </div>
// )}

//       </div>
//     </div>
//   );
// }

/*
  ===============================
  STYLES
  ===============================
*/
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    color: "white",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  subtitle: {
    fontSize: "16px",
    margin: 0,
    opacity: 0.9,
  },
  content: {
    maxWidth: "900px",
    margin: "0 auto",
    display: "grid",
    gap: "30px",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  cardHeader: {
    padding: "24px 30px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    margin: 0,
    color: "#1f2937",
  },
  cardBody: {
    padding: "30px",
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  labelHint: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#6b7280",
    marginLeft: "8px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    cursor: "pointer",
  },
  checkboxText: {
    color: "#1f2937",
    fontWeight: "500",
  },
  textInput: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  numberInput: {
    width: "120px",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  helpText: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "8px 0 0 0",
  },
  primaryButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
  },
  secondaryButton: {
    background: "#3b82f6",
    color: "white",
    padding: "12px 32px",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  badge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  badgeActive: {
    background: "#d1fae5",
    color: "#065f46",
  },
  badgeInactive: {
    background: "#fee2e2",
    color: "#991b1b",
  },
  successMessage: {
    marginTop: "16px",
    padding: "12px 16px",
    background: "#d1fae5",
    color: "#065f46",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  errorMessage: {
    marginTop: "16px",
    padding: "12px 16px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  },
  loadingContainer: {
    padding: "60px 20px",
    textAlign: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    margin: "0 auto 16px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#6b7280",
    fontSize: "14px",
  },
  errorContainer: {
    padding: "40px 20px",
    textAlign: "center",
  },
  errorText: {
    color: "#991b1b",
    marginBottom: "16px",
  },
  retryButton: {
    background: "#3b82f6",
    color: "white",
    padding: "10px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
  resultContainer: {
    marginTop: "24px",
    padding: "24px",
    background: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  resultTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 0,
    marginBottom: "20px",
  },
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  resultItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  resultLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  resultValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
  },
  paidBadge: {
    display: "inline-block",
    padding: "4px 12px",
    background: "#d1fae5",
    color: "#065f46",
    borderRadius: "4px",
    fontSize: "14px",
  },
  freeBadge: {
    display: "inline-block",
    padding: "4px 12px",
    background: "#dbeafe",
    color: "#1e40af",
    borderRadius: "4px",
    fontSize: "14px",
  },
  jsonDetails: {
    marginTop: "16px",
  },
  jsonSummary: {
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    color: "#667eea",
    marginBottom: "12px",
    userSelect: "none",
  },
  jsonPre: {
    background: "#1f2937",
    color: "#10b981",
    padding: "16px",
    borderRadius: "6px",
    fontSize: "13px",
    overflow: "auto",
    margin: 0,
    fontFamily: "Monaco, Consolas, monospace",
  },
};