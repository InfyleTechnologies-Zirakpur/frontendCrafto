import React, { useEffect, useState } from "react";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const API = "http://localhost:7000/api/settings/payment";

const PaymentSettings = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    razorpayEnabled: false,
    razorpayKeyId: "",
    razorpaySecret: "",
    offlineEnabled: false,
    upiDetails: "",
  });

  /* =====================================================
     FETCH SETTINGS
  ===================================================== */
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.settings?.payment) {
        setForm(res.data.settings.payment);
      }
    } catch (err) {
      setError("Failed to load payment settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  /* =====================================================
     UPDATE SETTINGS
  ===================================================== */
  const saveSettings = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await axios.put(API, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("✅ Payment settings updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 700,
        margin: "auto",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Card.Body>
        <h4 className="mb-4 fw-bold">💳 Payment Settings</h4>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* ================= RAZORPAY ================= */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Enable Razorpay"
            checked={form.razorpayEnabled}
            onChange={(e) =>
              setForm({ ...form, razorpayEnabled: e.target.checked })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Razorpay Key ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="rzp_live_xxxxx"
            value={form.razorpayKeyId || ""}
            onChange={(e) =>
              setForm({ ...form, razorpayKeyId: e.target.value })
            }
            disabled={!form.razorpayEnabled}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Razorpay Secret</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            value={form.razorpaySecret || ""}
            onChange={(e) =>
              setForm({ ...form, razorpaySecret: e.target.value })
            }
            disabled={!form.razorpayEnabled}
          />
          <small className="text-muted">
            Secret is stored securely on server
          </small>
        </Form.Group>

        <hr />

        {/* ================= OFFLINE / UPI ================= */}
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Enable Offline / UPI Payment"
            checked={form.offlineEnabled}
            onChange={(e) =>
              setForm({ ...form, offlineEnabled: e.target.checked })
            }
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>UPI Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="UPI ID / Instructions"
            value={form.upiDetails || ""}
            onChange={(e) =>
              setForm({ ...form, upiDetails: e.target.value })
            }
            disabled={!form.offlineEnabled}
          />
        </Form.Group>

        {/* ================= SAVE BUTTON ================= */}
        <Button
          onClick={saveSettings}
          disabled={saving}
          style={{
            width: "100%",
            background: "#00BCD4",
            border: "none",
            padding: "12px",
            fontWeight: 600,
            borderRadius: 8,
          }}
        >
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PaymentSettings;
