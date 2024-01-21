if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
const socket = io('http://localhost:3000');
socket.on('notification', (message) => {
  showNotification(message);
});

// Function to show a notification
function showNotification(message) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('Socket.io Notification', {
        body: message,
        icon: 'path/to/icon.png',
      });
    });
  } else {
    console.error('Notification permission denied');
  }
}
