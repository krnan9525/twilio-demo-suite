// add push listener for web worker
// this will not work in development environment

self.addEventListener('push', function(event) {
  console.log('something');
  if (event.data) {
    console.log('Push event!! ', event.data.text());
    showLocalNotification('Yolo', event.data.text(), self.registration);
  } else {
    console.log('Push event but no data');
  }
});
const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
    // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
};
