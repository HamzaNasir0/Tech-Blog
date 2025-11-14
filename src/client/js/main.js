const API_BASE = '/api';

const categoryBar = document.getElementById('categoryBar');
const postsList = document.getElementById('postsList');
const emptyState = document.getElementById('emptyState');
const loginLink = document.getElementById('loginLink');

function getStoredUser() {
  const data = localStorage.getItem('techblog_user');
  return data ? JSON.parse(data) : null;
}

document.addEventListener('DOMContentLoaded', () => {
  const user = getStoredUser();
  if (user) {
    loginLink.textContent = user.username;
    loginLink.href = 'admin.html';
  }

  loadCategories();
  loadPosts();
});

async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    const categories = await res.json();

    categoryBar.innerHTML = '';

    const allPill = document.createElement('button');
    allPill.className = 'category-pill active';
    allPill.textContent = 'All';
    allPill.dataset.id = 'all';
    allPill.addEventListener('click', () => selectCategory('all'));
    categoryBar.appendChild(allPill);

    categories
      .filter(c => c.slug !== 'all')
      .forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-pill';
        btn.textContent = cat.name;
        btn.dataset.id = cat.id;
        btn.addEventListener('click', () => selectCategory(cat.id));
        categoryBar.appendChild(btn);
      });
  } catch (err) {
    console.error('Error loading categories', err);
  }
}