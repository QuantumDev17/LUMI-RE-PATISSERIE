// src/pages/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import ProductForm from "../components/ProductForm";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [products, setProducts]   = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [selected, setSelected]   = useState(null); // null = create, else edit

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchProducts();
  }, [navigate]);

  async function fetchProducts(category = "") {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const url = category
        ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}`
        : `${API_BASE}/api/products?page=1&limit=1000`;

      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.status === 401) {
        navigate("/");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const list = Array.isArray(data) ? data : data.items || [];
      setProducts(list);
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  // CREATE/UPDATE
  const handleFormSubmit = async (formData) => {
    const token = localStorage.getItem("token");
    const method = selected ? "PUT" : "POST";
    const url = selected
      ? `${API_BASE}/api/products/${selected._id}`
      : `${API_BASE}/api/products`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      if (!res.ok) {
        alert(text || `Save failed (HTTP ${res.status})`);
        return;
      }

      await fetchProducts();
      setShowForm(false);
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Network error while saving.");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const text = await res.text();
        alert(text || `Delete failed (HTTP ${res.status})`);
        return;
      }
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Network error while deleting.");
    }
  };

  // Stats + recent
  const countsByCategory = useMemo(() => {
    const map = {};
    for (const p of products) {
      const cat = (p.category || "uncategorized").trim();
      map[cat] = (map[cat] || 0) + 1;
    }
    return map;
  }, [products]);

  const totalProducts = products.length;
  const categories = Object.keys(countsByCategory).sort();
  const recent = useMemo(
    () =>
      [...products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6),
    [products]
  );

  // Group for table
  const grouped = useMemo(() => {
    return products.reduce((acc, p) => {
      const c = (p.category || "Uncategorized").trim();
      (acc[c] ||= []).push(p);
      return acc;
    }, {});
  }, [products]);

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 8 }}>Admin Dashboard</h1>
      <p style={{ marginTop: 0, color: "#666" }}>Manage your products below.</p>

      <div style={{ display: "flex", gap: 12, margin: "16px 0 24px" }}>
        <button className="btn" onClick={() => { setSelected(null); setShowForm(true); }}>
          Create Product
        </button>
        <a className="btn" href="/e-boutique">View Storefront</a>
      </div>

      {showForm && (
        <ProductForm
          onClose={() => { setShowForm(false); setSelected(null); }}
          onSubmit={handleFormSubmit}
          product={selected}
        />
      )}

      {loading && <p>Loading…</p>}
      {!loading && error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginTop: 16 }}>
            <StatCard label="Total Products" value={totalProducts} />
            {categories.map((c) => (
              <StatCard key={c} label={`In ${c}`} value={countsByCategory[c]} />
            ))}
          </div>

          {/* Recent */}
          <section style={{ marginTop: 28 }}>
            <h2 style={{ marginBottom: 12 }}>Recent Products</h2>
            {recent.length === 0 ? (
              <p>No products yet.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                {recent.map((p) => (
                  <article key={p._id} style={{ border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
                    <img
                      src={resolveImage(p.image)}
                      alt={p.name}
                      style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 8 }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: "#666", fontSize: 14, marginTop: 2, textTransform: "capitalize" }}>
                      {p.category} • ${Number(p.price).toFixed(2)}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
                      Added {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}
                    </div>
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <button onClick={() => { setSelected(p); setShowForm(true); }}>Edit</button>
                      <button onClick={() => handleDelete(p._id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Full list grouped by category */}
          <section style={{ marginTop: 28 }}>
            {Object.keys(grouped).map((cat) => (
              <div key={cat} style={{ marginTop: 24 }}>
                <h2 style={{ textTransform: "capitalize" }}>{cat}</h2>
                <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Name</th><th>Price ($)</th><th>Stock</th><th>Category</th><th>Image</th><th>Created At</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grouped[cat].map((p) => (
                      <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{Number(p.price).toFixed(2)}</td>
                        <td>{p.stock ?? 0}</td>
                        <td>{p.category || "Uncategorized"}</td>
                        <td>
                          {p.image ? (
                            <img
                              src={resolveImage(p.image)}
                              alt={p.name}
                              style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                            />
                          ) : <span>No image</span>}
                        </td>
                        <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}</td>
                        <td>
                          <button onClick={() => { setSelected(p); setShowForm(true); }}>Edit</button>{" "}
                          <button onClick={() => handleDelete(p._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 13, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

// Images in DB are relative to backend/public
function resolveImage(path = "") {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
