const postContainer = document.getElementById('post-content');
const titleElement = document.getElementById('post-title');
const metaElement = document.getElementById('post-meta');

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (!postId) {
  postContainer.innerHTML = "<p>Invalid post ID.</p>";
}

async function loadPost() {
  try {
    const res = await fetch(`/api/posts/${postId}`);
    const post = await res.json();

    if (!post || post.error) {
      postContainer.innerHTML = "<p>Post not found.</p>";
      return;
    }

    titleElement.textContent = post.title;
    metaElement.textContent = `Posted by ${post.author_name || "Unknown"} • ${new Date(post.created_at).toLocaleDateString()}`;
    postContainer.innerHTML = post.content.replace(/\n/g, "<br>");

  } catch (err) {
    console.error("Failed to load post:", err);
    postContainer.innerHTML = "<p>Error loading post.</p>";
  }
}

loadPost();
