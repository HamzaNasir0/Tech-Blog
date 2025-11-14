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

async function loadMyPosts(token) {
  try {
    const res = await fetch(`${API_BASE}/posts/me/my-posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      myPostsList.innerHTML = '<p>Error loading your posts.</p>';
      return;
    }

    const posts = await res.json();
    myPostsList.innerHTML = '';

    if (!posts.length) {
      myPostsList.innerHTML = '<p>You have no posts yet.</p>';
      return;
    }

    posts.forEach(post => {
      const div = document.createElement('div');
      div.className = 'admin-post-item';
      div.dataset.id = post.id;
      div.innerHTML = `
        <div class="admin-post-item-title">${post.title}</div>
        <div class="admin-post-item-meta">
          ${post.category_name || 'Uncategorised'} •
          ${new Date(post.created_at).toLocaleDateString()}
        </div>
      `;

      div.addEventListener('click', () => loadIntoForm(post));
      myPostsList.appendChild(div);
    });
  } catch (err) {
    console.error('Error loading my posts', err);
  }
}

function loadIntoForm(post) {
  postIdInput.value = post.id;
  postTitleInput.value = post.title;
  postContentTextarea.value = post.content;
  postCategorySelect.value = post.category_id || '';

  saveBtn.textContent = 'Update Post';
  deleteBtn.style.display = 'inline-block';
  postStatus.textContent = '';
}

function clearForm() {
  postIdInput.value = '';
  postTitleInput.value = '';
  postContentTextarea.value = '';
  postCategorySelect.value = '';
  saveBtn.textContent = 'Create Post';
  deleteBtn.style.display = 'none';
  postStatus.textContent = '';
}

async function handleSave(e, token) {
  e.preventDefault();
  postStatus.textContent = 'Saving...';

  const id = postIdInput.value;
  const title = postTitleInput.value.trim();
  const content = postContentTextarea.value.trim();
  const category_id = postCategorySelect.value || null;

  if (!title || !content) {
    postStatus.textContent = 'Title and content are required.';
    return;
  }

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/posts/${id}` : `${API_BASE}/posts`;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, category_id })
    });

    const data = await res.json();
    if (!res.ok) {
      postStatus.textContent = data.error || 'Failed to save post';
      return;
    }

    postStatus.textContent = id ? 'Post updated!' : 'Post created!';
    clearForm();
    loadMyPosts(token);
  } catch (err) {
    console.error('Save post error', err);
    postStatus.textContent = 'Error saving post';
  }
}