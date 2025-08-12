import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // auth/role gate
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    // fetch data
    (async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/products?page=1&limit=1000`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: "include",
        });
        if (res.status === 401) {
          // not authorized -> bounce to home/login
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
    })();
  }, [navigate]);

  // derived stats
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

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 8 }}>Admin Dashboard</h1>
      <p style={{ marginTop: 0, color: "#666" }}>
        Overview of your store. Manage products, categories, and more.
      </p>

      {/* quick actions */}
      <div style={{ display: "flex", gap: 12, margin: "16px 0 24px" }}>
        <Link to="/admin-dashboard" className="btn">Manage Products</Link>
        <Link to="/e-boutique" className="btn">View Storefront</Link>
      </div>

      {loading && <p>Loading…</p>}
      {!loading && error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            <StatCard label="Total Products" value={totalProducts} />
            {categories.map((c) => (
              <StatCard key={c} label={`In ${c}`} value={countsByCategory[c]} />
            ))}
          </div>

          {/* Recent products */}
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
                    />
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: "#666", fontSize: 14, marginTop: 2, textTransform: "capitalize" }}>
                      {p.category} • ${Number(p.price).toFixed(2)}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
                      Added {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

/* --- helpers/components --- */

function StatCard({ label, value }) {
  return (
    <div style={{
      padding: 16, border: "1px solid #eee", borderRadius: 12,
      display: "flex", flexDirection: "column", gap: 6
    }}>
      <div style={{ fontSize: 13, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function resolveImage(path = "") {
  if (!path) return "";
  const base = import.meta.env.BASE_URL || "/";
  return path.startsWith("/") ? base + path.slice(1) : base + path;
}
