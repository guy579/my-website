document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const displayName = document.getElementById("display-name");
  const signupContainer = document.getElementById("signup-container");
  const mainContent = document.getElementById("main-content");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Set your desired password here
    const correctPassword = "mySecret123"; // <--- Change this to whatever you want

    if (password !== correctPassword) {
      alert("Incorrect password. Please try again.");
      return;
    }

    // Save username
    localStorage.setItem("username", username);
    displayName.textContent = username;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";

    // Send to Discord
    sendToDiscord(username);
  });

  // If already signed in
  const savedName = localStorage.getItem("username");
  if (savedName) {
    displayName.textContent = savedName;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";
  }
});

function sendToDiscord(username) {
  const webhookURL = "https://discord.com/api/webhooks/1362138187962650727/aVG7VuftNpdkCSHQH8aMGEp5HoLdTuis4OdDrpVFdwnj0TDcVUCkEr3dUt4zV-5OP1rL";

  const payload = {
    content: `New signup: ${username}`,
    username: "Signup Bot"
  };

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch(err => {
    console.error("Webhook error:", err);
  });
}
