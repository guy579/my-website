document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;

  // Save the username to localStorage
  localStorage.setItem('username', username); 

  // Send the username to the Discord webhook
  sendToDiscord(username);

  // Update the page content
  document.getElementById('display-name').textContent = username;
  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
});

// Function to send data to Discord
function sendToDiscord(username) {
  const webhookURL = "https://discord.com/api/webhooks/1362138187962650727/aVG7VuftNpdkCSHQH8aMGEp5HoLdTuis4OdDrpVFdwnj0TDcVUCkEr3dUt4zV-5OP1rL"; // Replace with your actual Discord webhook URL

  const payload = {
    content: `New signup: ${username}`,
    username: "Signup Bot", // Name the bot
    avatar_url: "https://cdn.discordapp.com/icons/your_server_id/your_icon.png", // Optional avatar URL
  };

  // Make a POST request to the webhook
  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// On page load, check if user already signed up
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('username');
  if (savedName) {
    document.getElementById('display-name').textContent = savedName;
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  }
});
