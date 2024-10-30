import "./NewsList.css";

export default class NewsList {
  constructor(container, api, preloader, news) {
    this.container = container;

    this.api = api;
    this.preloader = preloader;
    this.news = news;

    this.reload = this.reload.bind(this);

    this.container
      .querySelector(".news-widget__reload-btn")
      .addEventListener("click", this.reload);
  }

  static get markup() {
    return `
      <div class="news-widget">
        <h2 class="news-widget__title">Новости мира кино</h2>
        <button class="news-widget__reload-btn">Обновить</button>
        <ul class="news-widget__news-list news-list"></ul>
      </div>
    `;
  }

  init() {
    // this.bindToDOM();
    this.reload();
  }

  bindToDOM() {
    this.render();

    const reloadNewsBtn = this.container.querySelector(
      ".news-widget__reload-btn"
    );

    reloadNewsBtn.addEventListener("click", this.reload);
  }

  render() {
    this.container.insertAdjacentHTML("beforeEnd", NewsList.markup);
  }

  getNews() {
    return this.api.request();
  }

  async reload() {
    const newsList = this.container.querySelector(".news-list");

    newsList.innerHTML = "";

    this.preloader.renderSkeletNews(newsList, 3);

    try {
      const { news } = await this.getNews();

      newsList.innerHTML = "";

      news.forEach((item) => {
        newsList.insertAdjacentHTML(
          "afterBegin",
          this.news.create(item.title, item.image, item.content)
        );
      });
    } catch (err) {
      setTimeout(() => {
        this.preloader.renderWidgetNoConnect(newsList);
      }, 1000);
    }
  }
}
