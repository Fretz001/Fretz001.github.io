const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const themeSwitch = document.getElementById("theme-switch");

// Mobile Menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Dark Mode
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    themeSwitch.checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    themeSwitch.checked = false;
  }
}
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  setTheme(true);
} else {
  setTheme(false);
}
themeSwitch.addEventListener("change", () => {
  const isDark = themeSwitch.checked;
  setTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Authentication
const modal = document.getElementById("authModal");
const openBtn = document.getElementById("openAuthModal");
const closeBtn = document.querySelector(".close");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const tabBtns = document.querySelectorAll(".tab-btn");
const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");
const welcomeText = document.getElementById("welcomeText");
const logoutBtn = document.getElementById("logoutBtn");
const authBtn = document.querySelector(".auth-btn");

// Modal controls
openBtn.addEventListener("click", e => { e.preventDefault(); modal.style.display = "block"; checkLoginStatus(); });
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

// Tabs
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));
    document.getElementById(btn.dataset.tab + "Form").classList.add("active");
  });
});

// Sign Up
signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (localStorage.getItem(email)) {
    signupMessage.className = "auth-message error";
    signupMessage.textContent = "Email already exists!";
    return;
  }

  const user = { name, email, password };
  localStorage.setItem(email, JSON.stringify(user));
  localStorage.setItem("currentUser", JSON.stringify(user));
  signupMessage.className = "auth-message success";
  signupMessage.textContent = "Success! Logging you in…";
  setTimeout(() => location.reload(), 1200);
});

// Log In
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const stored = localStorage.getItem(email);
  if (!stored || JSON.parse(stored).password !== password) {
    loginMessage.className = "auth-message error";
    loginMessage.textContent = "Wrong email or password!";
    return;
  }

  localStorage.setItem("currentUser", stored);
  loginMessage.className = "auth-message success";
  loginMessage.textContent = "Logged in!";
  setTimeout(() => location.reload(), 800);
});

// Log Out
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  location.reload();
});

// Check login status
function checkLoginStatus() {
  const user = localStorage.getItem("currentUser");
  if (user) {
    const data = JSON.parse(user);
    welcomeText.textContent = `Welcome, ${data.name.split(" ")[0]}!`;
    logoutBtn.style.display = "block";
    authBtn.textContent = "Account";
  } else {
    welcomeText.textContent = "";
    logoutBtn.style.display = "none";
    authBtn.textContent = "Sign In";
  }
}
checkLoginStatus();
