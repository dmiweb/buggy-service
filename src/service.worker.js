self.addEventListener("install", (event) => {
  console.log("Установлен");

  event.waitUntil(
    caches.open("CACHE").then(
      (cache) => {
        cache.addAll(["./", "./index.html", "./index.css", "./fallback.html"]);
      },
      (error) => {
        console.log(error);
      }
    )
  );
});

self.addEventListener("activate", () => {
  console.log("Активирован");
});

async function fetchPriorityThenCache(event) {
  let response;

  try {
    response = await fetch(event.request);
  } catch (err) {
    response = await caches.match("./fallback.html");
  }

  if (response.status === 500) {
    const cacheResponse = await caches.match(event.request);

    if (cacheResponse) {
      return cacheResponse;
    }
  }

  const cache = await caches.open("CACHE");

  cache.put(event.request, response.clone());

  return response;
}

self.addEventListener("fetch", (event) => {
  console.log("Происходит запрос на сервер");

  event.respondWith(fetchPriorityThenCache(event));
});
