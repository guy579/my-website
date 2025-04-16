document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  localStorage.setItem('username', username); // Store for later

  // Update page content
  document.getElementById('display-name').textContent = username;
  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
});

// On page load, check if user already signed up
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('username');
  if (savedName) {
    document.getElementById('display-name').textContent = savedName;
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  }
});
