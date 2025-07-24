// src/api.js

export const BASE_URL = "https://noteme-backend-5wni.onrender.com/";

export const API = {
  getUser: `${BASE_URL}/api/users/me`,
  googleAuth: `${BASE_URL}/api/users/google`,
  googleCallback: `${BASE_URL}/api/users/google/callback`,
  // Notes endpoints
  getNotes: `${BASE_URL}/api/notes`,
  getNote: (id) => `${BASE_URL}/api/notes/${id}`,
  createNote: `${BASE_URL}/api/notes`,
  updateNote: (id) => `${BASE_URL}/api/notes/${id}`,
  deleteNote: (id) => `${BASE_URL}/api/notes/${id}`,
};

// Helper to get auth headers
function getAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// Notes API utility functions
export async function fetchNotes(token) {
  const res = await fetch(API.getNotes, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function fetchNote(token, id) {
  const res = await fetch(API.getNote(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}

export async function createNote(token, note) {
  const res = await fetch(API.createNote, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(token, id, note) {
  const res = await fetch(API.updateNote(id), {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(token, id) {
  const res = await fetch(API.deleteNote(id), {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}
