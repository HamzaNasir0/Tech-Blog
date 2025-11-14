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