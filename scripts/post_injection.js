const title = localStorage.getItem("postTitle");
const text = localStorage.getItem("postText");

const post_title = document.querySelector(".post-title");
const post_text = document.querySelector(".post-body");

post_title.innerHTML = `<pre>${title}</pre>`;
post_text.innerHTML = `<pre>${text}</pre>`;

localStorage.removeItem("postTitle");
localStorage.removeItem("postText");