const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const profileContainer = document.getElementById("profileContainer");
const loading = document.getElementById("loading");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

searchBtn.addEventListener("click", () => {
  const username = searchInput.value.trim();

  if (username !== "") {
    fetchGitHub(username);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

async function fetchGitHub(username) {

  loading.classList.remove("hidden");
  loading.classList.add("show");
  profileContainer.innerHTML = "";

  try {

    const userRes = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!userRes.ok) {
      throw new Error("GitHub user not found");
    }

    const user = await userRes.json();

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated`
    );

    const repos = await repoRes.json();

    displayProfile(user, repos);

  } catch (err) {

    profileContainer.innerHTML = `
      <div class="error">
        ${err.message}
      </div>
    `;

  } finally {

    loading.classList.remove("show");
    loading.classList.add("hidden");
  }
}

function displayProfile(user, repos) {

  profileContainer.innerHTML = `

    <div class="profile-card">

      <div class="profile-top">

        <img
          src="${user.avatar_url}"
          class="avatar"
        >

        <div class="user-info">

          <h2>${user.name || user.login}</h2>

          <p class="username">
            @${user.login}
          </p>

          <p class="bio">
            ${user.bio || "No bio available"}
          </p>

          <p>
            <i class="fa-solid fa-location-dot"></i>
            ${user.location || "Unknown"}
          </p>

          <p>
            <i class="fa-solid fa-building"></i>
            ${user.company || "No company"}
          </p>

          <div class="stats">

            <div class="stat">
              <h3>${user.followers}</h3>
              <p>Followers</p>
            </div>

            <div class="stat">
              <h3>${user.following}</h3>
              <p>Following</p>
            </div>

            <div class="stat">
              <h3>${user.public_repos}</h3>
              <p>Repos</p>
            </div>

            <div class="stat">
              <h3>${user.public_gists}</h3>
              <p>Gists</p>
            </div>

          </div>

          <div class="actions">

            <a
              href="${user.html_url}"
              target="_blank"
              class="btn"
            >
              View Profile
            </a>

            <button
              class="btn"
              onclick="copyProfile('${user.html_url}')"
            >
              Copy Link
            </button>

          </div>

        </div>

      </div>

      <div class="repo-section">

        <h3>Top Repositories</h3>

        <div class="repo-grid">

          ${repos.slice(0, 8).map(repo => `

            <div class="repo-card">

              <a
                href="${repo.html_url}"
                target="_blank"
              >
                ${repo.name}
              </a>

              <p>
                ${repo.description || "No description"}
              </p>

              <span class="language">
                ${repo.language || "Unknown"}
              </span>

            </div>

          `).join("")}

        </div>

      </div>

    </div>
  `;
}

function copyProfile(link) {

  navigator.clipboard.writeText(link);

  alert("Profile link copied!");
}