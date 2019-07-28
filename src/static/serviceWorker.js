/* globals importScripts, workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  cacheGoogleAnalytics();
  cacheAssets();
  cacheHtml();
  cacheFonts();
}

function cacheGoogleAnalytics() {
  workbox.googleAnalytics.initialize();
}

function cacheAssets() {
  workbox.routing.registerRoute(
    /\.(?:js|png|css)$/,
    new workbox.strategies.CacheFirst({ cacheName: 'assets' })
  );
}

function cacheFonts() {
  workbox.routing.registerRoute(
    /\/fonts\//,
    new workbox.strategies.CacheFirst({ cacheName: 'fonts' })
  );
}

function cacheHtml() {
  workbox.precaching.precacheAndRoute(['/', '/trainer', '/archive']);
}
