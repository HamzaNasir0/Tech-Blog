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

function selectCategory(id) {
  document
    .querySelectorAll('.category-pill')
    .forEach(el => el.classList.remove('active'));
  const active = [...document.querySelectorAll('.category-pill')].find(
    el => el.dataset.id === String(id)
  );
  if (active) active.classList.add('active');

  loadPosts(id);
}

async function loadPosts(categoryId = 'all') {
  try {
    const url =
      categoryId && categoryId !== 'all'
        ? `${API_BASE}/posts?category=${categoryId}`
        : `${API_BASE}/posts`;

    const res = await fetch(url);
    const posts = await res.json();

    postsList.innerHTML = '';

    if (!posts.length) {
      emptyState.style.display = 'block';
      postsList.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    postsList.style.display = 'flex';

    posts.forEach(post => {
      const a = document.createElement('a');
      a.className = 'post-card';
      a.href = `post.html?id=${post.id}`;

      const created = new Date(post.created_at).toLocaleDateString();

      a.innerHTML = `
        <div class="post-meta">
          <span>${post.author_name || 'Unknown'}</span>
          <span>
            <span class="post-category">${post.category_name || 'Uncategorised'}</span>
            <span>${created}</span>
          </span>
        </div>
        <div class="post-title">${post.title}</div>
        <div class="post-excerpt">
          ${post.content.length > 180 ? post.content.slice(0, 180) + '…' : post.content}
        </div>
      `;
      postsList.appendChild(a);
    });
  } catch (err) {
    console.error('Error loading posts', err);
  }
}
