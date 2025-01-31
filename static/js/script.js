// Script for sidebar toggle button
const sidebarBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector("nav");

sidebarBtn.addEventListener("click", () => {
  document.body.classList.toggle("active");
  sidebar.classList.toggle("active");
  document.body.style.gridTemplateColumns = sidebar.classList.contains("active")
    ? "var(--sidebar-width-expanded) 1fr"
    : "var(--sidebar-width-collapsed) 1fr";
});

// Chat popup
const chatTrigger = document.getElementById('chatTrigger');
const chatPopup = document.getElementById('chatPopup');
const closeChatBtn = document.getElementById('closeChatBtn');

chatTrigger.addEventListener('click', () => {
  chatPopup.style.display = 'block';
  chatTrigger.style.display = 'none';
});

closeChatBtn.addEventListener('click', () => {
  chatPopup.style.display = 'none';
  chatTrigger.style.display = 'flex';
});