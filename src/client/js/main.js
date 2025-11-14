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