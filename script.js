let isLoggedIn = false;

function toggleMenu() {
  const dropdown = document.getElementById("menuDropdown");
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

function openModal() {
  document.getElementById("loginModal").style.display = "flex";
  document.getElementById("menuDropdown").style.display = "none";
}

function closeModal() {
  document.getElementById("loginModal").style.display = "none";
}

function submitLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    isLoggedIn = true;
    closeModal();
    toggleAuthButtons();
    alert(`Welcome, ${username}!`);
  } else {
    alert("Please enter both username and password.");
  }
}

function signOut() {
  isLoggedIn = false;
  toggleAuthButtons();
  alert("You have been signed out.");
}

function toggleAuthButtons() {
  document.getElementById("signInOption").style.display = isLoggedIn
    ? "none"
    : "block";
  document.getElementById("signOutOption").style.display = isLoggedIn
    ? "block"
    : "none";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById("chat");

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = message;
  chat.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.innerText = "You said: " + message;
  chat.appendChild(botMsg);

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById("userInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const chat = document.getElementById("chat");
        const imgContainer = document.createElement("div");
        imgContainer.className = "message user";
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = "Uploaded image";
        imgContainer.appendChild(img);
        chat.appendChild(imgContainer);
        chat.scrollTop = chat.scrollHeight;
      };
      reader.readAsDataURL(file);
    }
  });

window.addEventListener("click", function (e) {
  if (!e.target.closest(".menu-button") && !e.target.closest(".dropdown")) {
    document.getElementById("menuDropdown").style.display = "none";
  }
});
