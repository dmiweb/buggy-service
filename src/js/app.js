import NewsAPI from "./components/api/NewsAPI";
import Preloader from "./components/Preloader/Preloader";
import NewsList from "./components/NewsList/NewsList";
import News from "./components/News/News";


if (navigator.serviceWorker) {
	window.addEventListener('load', async () => {
		try {
			if (navigator.serviceWorker) {
				await navigator.serviceWorker.register(
				'./service.worker.js', 
        {scope: './'}
				);
				console.log('Сервис-воркер зарегистрирован');
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
