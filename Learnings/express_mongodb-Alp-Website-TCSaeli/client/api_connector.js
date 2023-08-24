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
    li.innerHTML = `${user.id} - ${user.name} - ${user.email} - ${user.nachricht}`;
    usersList.appendChild(li);
  }
};

const postUser = async () => {
  const id = users[users.length - 1].id + 1;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const nachricht = document.getElementById("nachricht").value;

  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, email, nachricht }),
  });
  await getUsers();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("nachricht").value = "";
};

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    postUser();
  });
});
