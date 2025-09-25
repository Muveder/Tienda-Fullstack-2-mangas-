// js/users-init.js

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      { email: "admin@admin.com", password: "1234", role: "admin" }
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }
});
