const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export async function adminLogin(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(typeof err.detail === "string" ? err.detail : "Giriş başarısız");
  }
  return res.json();
}

export async function adminMe() {
  const res = await fetch(`${API}/auth/me`, { credentials: "include" });
  if (!res.ok) throw new Error("unauthorized");
  return res.json();
}

export async function adminLogout() {
  await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
}

export async function fetchContent() {
  const res = await fetch(`${API}/content`);
  if (!res.ok) throw new Error("content");
  return res.json();
}

export async function saveContent(data) {
  const res = await fetch(`${API}/admin/content`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("save failed");
  return res.json();
}

export async function fetchRevisions() {
  const res = await fetch(`${API}/admin/revisions`, { credentials: "include" });
  if (!res.ok) throw new Error("revisions");
  return res.json();
}

export async function restoreRevision(revId) {
  const res = await fetch(`${API}/admin/restore/${revId}`, { method: "POST", credentials: "include" });
  if (!res.ok) throw new Error("restore failed");
  return res.json();
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/admin/upload`, {
    method: "POST",
    credentials: "include",
    body: fd,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(typeof err.detail === "string" ? err.detail : "Yükleme başarısız");
  }
  return res.json();
}
