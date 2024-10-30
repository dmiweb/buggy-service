import "./Preloader.css";

export default class Preloader {
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
