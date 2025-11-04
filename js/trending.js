async function fetchTrending() {
  const url =
    "https://raw.githubusercontent.com/isboyjc/github-trending-api/main/data/daily/all.json";

  const req = await fetch(url);
  if (!req.ok) throw new Error(req.status);
  const repos = await req.json();
  return repos.items.slice(0, 3);
}

function renderTrending(repos) {
  const trendingContainer = document.querySelector(".trending-module");
  trendingContainer.textContent = "";

  repos.forEach((repo) => {
    const repoElemBody = document.createElement("a");
    repoElemBody.classList.add("trending-repo");

    const title = document.createElement("p");
    title.classList.add("trending-title");
    title.textContent = repo.title;

    const description = document.createElement("p");
    description.classList.add("trending-description");
    description.textContent = repo.description;

    const language = document.createElement("span");
    language.classList.add("trending-language");
    language.textContent = repo.language;
    language.style.color = repo.languageColor;

    repoElemBody.append(title, description, language);
    repoElemBody.href = repo.url;
    repoElemBody.target = "_blank";
    repoElemBody.rel = "noopener noreferrer";
    trendingContainer.append(repoElemBody);
  });
}

export async function initTrending() {
  try {
    const data = await fetchTrending();
    renderTrending(data);
  } catch (error) {
    document.querySelector(".trending-module").textContent =
      "Error while loading trending repos";
    console.error("Trending module error: ", error);
  }
}
