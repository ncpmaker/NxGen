if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/NxGen/sw.js', { scope: '/NxGen/' })})}