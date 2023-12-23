// service-worker.js
const CACHE_NAME="static_cache2"
const STATIC_ASSETS = [
  'hackathon.html',
  'about.html',
  'e1.html',
  'e2.html',
  'e3.html',
  'm1.html',
  'm2.html',
  'm3.html',
  's1.html',
  's2.html',
  's3.html',
  'language.html',
  'login.html',
  'math.html',
  'quizzes.html',
  'register.html',
  'science.html',
  'subjects.html',
  'style.css',
  'lq1.html',
  'lquiz.html',
  'mq1.html',
  'mquiz.html',
  'sq1.html',
  'squiz.html'
];
async function preCache(){
  const cache = await caches.open(CACHE_NAME)
  return cache.addAll(STATIC_ASSETS)
}
self.addEventListener('install', (event) => {
  console.log("[SW] installed")
  self.skipWaiting()
  event.waitUntil(preCache())
});

async function cleanupCache() {
  const keys = await caches.keys();
  const keysToDelete = keys.map(key => {
    if (key !== CACHE_NAME) {
      return caches.delete(key);
    }
  });
  return Promise.all(keysToDelete);
}


self.addEventListener('activate', (event) => {
  console.log("[SW] activated")
  event.waitUntil(cleanupCache())
});

async function fetchAssets(event){
  try{
    const response= await fetch(event.request)
    return response
  }catch(err){
    const cache=await caches.open(CACHE_NAME)
    return cache.match(event.request)
  }
}

self.addEventListener('fetch', (event) => {
  console.log("[SW] fetched")
  event.respondWith(fetchAssets(event))
});

  
