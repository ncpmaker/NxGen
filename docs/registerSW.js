if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/ncp/sw.js', { scope: '/ncp/' })})}