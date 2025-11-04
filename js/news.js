async function fetchNews() {
  const timestamp = Date.now();
  const cached = JSON.parse(localStorage.getItem("newsData")) || null;
  if (cached && timestamp - cached.timestamp < 15 * 60 * 1000) {
    return cached.data;
  }

  const apiKey = "d1e3c73330634ac98e45c1533ca3235f";
  const url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us&pageSize=4&category=technology&category=science
  `;
  const req = await fetch(url);
  if (!req.ok) throw new Error(req.status);
  const news = await req.json();

  localStorage.setItem(
    "newsData",
    JSON.stringify({
      timestamp,
      data: news.articles,
    })
  );

  return news.articles;
}

function renderNews(articles) {
  const newsContainer = document.querySelector(".news-module");
  newsContainer.textContent = "";

  articles.forEach((article) => {
    const articleItem = document.createElement("a");
    articleItem.classList.add("news-article");
    articleItem.href = article.url;
    articleItem.target = "_blank";

    const image = document.createElement("img");
    image.classList.add("news-image");
    image.src = article.urlToImage || "./assets/images/news-placeholder.png";

    const title = document.createElement("h3");
    title.classList.add("news-title");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.classList.add("news-description");
    description.textContent =
      article.description || article.content || "No description available.";

    const textContainer = document.createElement("div");
    textContainer.classList.add("news-text");
    textContainer.append(title, description);

    articleItem.append(image, textContainer);
    newsContainer.appendChild(articleItem);
  });
}

export async function initNews() {
  try {
    const articles = await fetchNews();
    renderNews(articles);
  } catch (error) {
    document.querySelector(".news-module").textContent =
      "Error while loading news";
    console.error("News module error: ", error);
  }
}
