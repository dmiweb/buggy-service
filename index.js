/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/js/components/api/createRequest.js
const createRequest = async (options = {}) => {
  return await fetch("https://buggy-service-backend.vercel.app/news", options);
};
/* harmony default export */ const api_createRequest = (createRequest);
;// ./src/js/components/api/NewsAPI.js

class NewsAPI {
  async request() {
    try {
      const response = await api_createRequest();
      const news = await response.json();
      return news;
    } catch (err) {
      return;
    }
  }
}
;// ./src/js/components/Preloader/Preloader.js

class Preloader {
  constructor() {}
  static get markupSkelet() {
    return `
      <li class="news-list__skelet-item skelet-item">
        <h3 class="skelet-item__title"></h3>
        <div class="skelet-item__img"></div>
        <p class="skelet-item__content"></p>
        <p class="skelet-item__content"></p>
      </li>
    `;
  }
  static get markupWidgetNoConnect() {
    return `
      <div class="news-widget__no-network no-network">
        <span class="no-network__message">Не удалось загрузить данные <br> Проверьте подключение <br> и обновите страницу</span>
      </div>
    `;
  }
  renderSkeletNews(container, count) {
    for (let i = 0; i < count; i++) {
      container.insertAdjacentHTML("beforeEnd", Preloader.markupSkelet);
    }
  }
  renderWidgetNoConnect(container) {
    container.insertAdjacentHTML("beforeEnd", Preloader.markupWidgetNoConnect);
  }
}
;// ./src/js/components/NewsList/NewsList.js

class NewsList {
  constructor(container, api, preloader, news) {
    this.container = container;
    this.api = api;
    this.preloader = preloader;
    this.news = news;
    this.reload = this.reload.bind(this);
    this.container.querySelector(".news-widget__reload-btn").addEventListener("click", this.reload);
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
    const reloadNewsBtn = this.container.querySelector(".news-widget__reload-btn");
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
      const {
        news
      } = await this.getNews();
      newsList.innerHTML = "";
      news.forEach(item => {
        newsList.insertAdjacentHTML("afterBegin", this.news.create(item.title, item.image, item.content));
      });
    } catch (err) {
      setTimeout(() => {
        this.preloader.renderWidgetNoConnect(newsList);
      }, 1000);
    }
  }
}
;// ./src/js/components/News/News.js

class News {
  constructor() {}
  static markup(title, image, content) {
    return `
      <li class="news-list__news-item news-item">
        <h3 class="news-item__title">${title}</h3>
        <img src="${image}" class="news-item__img">
        <p class="news-item__content">${content}</p>
      </li>
    `;
  }
  create(title, image, content) {
    return News.markup(title, image, content);
  }
}
;// ./src/js/app.js




if (navigator.serviceWorker) {
  window.addEventListener("load", async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register("./service.worker.js", {
          scope: "./"
        });
        console.log("Сервис-воркер зарегистрирован");
      }
    } catch (e) {
      console.log(e);
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#root");
  const api = new NewsAPI();
  const preloader = new Preloader();
  const news = new News();
  const newsList = new NewsList(container, api, preloader, news);
  newsList.init();
});
;// ./src/index.js


/******/ })()
;