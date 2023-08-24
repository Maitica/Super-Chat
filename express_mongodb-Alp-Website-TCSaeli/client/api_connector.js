let users = [];

const getUsers = async () => {
  // API Stuff
  const response = await fetch("http://localhost:3000/users");
  users = await response.json();
  // UI stuff
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";
  for (const user of users) {
    const li = document.createElement("li");
    li.innerHTML = `${user.id} - ${user.username} - ${user.active}`;
    usersList.appendChild(li);
  }
};

const postUser = async () => {
  const id = users[users.length - 1].id + 1;
  const username = document.getElementById("username").value;
  const active = document.getElementById("active").checked;

  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, username, active }),
  });
  await getUsers();

  document.getElementById("username").value = "";
  document.getElementById("active").checked = true;
};

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postUser();
  });
});
