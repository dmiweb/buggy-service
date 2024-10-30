import createRequest from "./createRequest";

export default class NewsAPI {
  async request() {
    try {
      const response = await createRequest();

      const news = await response.json();
      return news;
    } catch (err) {
      return;
    }
  }
}
