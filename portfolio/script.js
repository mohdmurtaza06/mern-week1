const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const form = document.getElementById("contactForm");
form.addEventListener("submit", event => {
  event.preventDefault();

  document.querySelectorAll(".error").forEach(el => el.textContent = "");
  document.getElementById("successMessage").textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (name.length < 2) {
    document.getElementById("nameError").textContent = "Please enter at least 2 characters.";
    valid = false;
  }
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    valid = false;
  }
  if (message.length < 10) {
    document.getElementById("messageError").textContent = "Message must contain at least 10 characters.";
    valid = false;
  }

  if (valid) {
    document.getElementById("successMessage").textContent =
      "Form validated successfully. Thanks for reaching out!";
    form.reset();
  }
});
