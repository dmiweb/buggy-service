import "./News.css";

export default class News {
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
