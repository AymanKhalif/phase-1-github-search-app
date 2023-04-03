const form = document.querySelector("#github-form");
const userList = document.querySelector("#user-list");
const reposList = document.querySelector("#repos-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = form.elements.search.value;
  if (!searchValue) return;
  searchUsers(searchValue);
  form.reset();
});

userList.addEventListener("click", (e) => {
  if (!e.target.matches("li")) return;
  const username = e.target.dataset.username;
  if (!username) return;
  getUserRepos(username);
});

function searchUsers(query) {
  fetch(`https://api.github.com/search/users?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      userList.innerHTML = "";
      data.items.forEach((user) => {
        const li = document.createElement("li");
        const avatar = document.createElement("img");
        avatar.src = user.avatar_url;
        avatar.alt = `${user.login}'s avatar`;
        const username = document.createElement("span");
        username.textContent = user.login;
        li.append(avatar, username);
        li.dataset.username = user.login;
        userList.append(li);
      });
    })
    .catch((error) => console.error(error));
}

function getUserRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => response.json())
    .then((data) => {
      reposList.innerHTML = "";
      data.forEach((repo) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.textContent = repo.name;
        li.append(link);
        reposList.append(li);
      });
    })
    .catch((error) => console.error(error));
}
