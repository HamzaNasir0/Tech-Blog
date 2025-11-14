const API_BASE = '/api';

const adminLoginLink = document.getElementById('adminLoginLink');
const logoutLink = document.getElementById('logoutLink');
const adminWelcome = document.getElementById('adminWelcome');

const postForm = document.getElementById('postForm');
const postIdInput = document.getElementById('postId');
const postTitleInput = document.getElementById('postTitle');
const postCategorySelect = document.getElementById('postCategory');
const postContentTextarea = document.getElementById('postContent');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');
const clearBtn = document.getElementById('clearBtn');
const postStatus = document.getElementById('postStatus');
const myPostsList = document.getElementById('myPostsList');


function getToken() {
  return localStorage.getItem('techblog_token');
}

function getUser() {
  const data = localStorage.getItem('techblog_user');
  return data ? JSON.parse(data) : null;
}

function requireAuth() {
  const token = getToken();
  const user = getUser();
  if (!token || !user) {
    window.location.href = 'login.html';
  }
  return { token, user };
}

document.addEventListener('DOMContentLoaded', () => {
  const { token, user } = requireAuth();

  adminLoginLink.style.display = 'none';
  logoutLink.style.display = 'inline-block';
  adminWelcome.textContent = `Logged in as ${user.username}`;

  logoutLink.addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('techblog_token');
    localStorage.removeItem('techblog_user');
    window.location.href = 'index.html';
  });

  loadCategories(token);
  loadMyPosts(token);

  postForm.addEventListener('submit', e => handleSave(e, token));
  clearBtn.addEventListener('click', clearForm);
  deleteBtn.addEventListener('click', () => handleDelete(token));
});

async function loadCategories(token) {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    const cats = await res.json();

    postCategorySelect.innerHTML = '<option value="">Uncategorised</option>';

    cats
      .filter(c => c.slug !== 'all')
      .forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = cat.name;
        postCategorySelect.appendChild(opt);
      });
  } catch (err) {
    console.error('Error loading categories', err);
  }
}