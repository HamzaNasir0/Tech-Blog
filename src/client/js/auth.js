const API_BASE = '/api';

function storeUser(token, user) {
  localStorage.setItem(
    'techblog_token',
    token
  );
  localStorage.setItem(
    'techblog_user',
    JSON.stringify(user)
  );
}