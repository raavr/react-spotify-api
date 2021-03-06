import { SERVER_URL } from "../constants";

// https://gist.github.com/gauravtiwari/2ae9f44aee281c759fe5a66d5c2721a2
const SpotifyOAuth = (uri = `${SERVER_URL}/login`) => {
  const windowArea = {
    width: Math.floor(window.outerWidth * 0.5),
    height: Math.floor(window.outerHeight * 0.5),
  };

  if (windowArea.width < 800) { windowArea.width = 800; }
  if (windowArea.height < 630) { windowArea.height = 630; }
  windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
  windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));

  const sep = (uri.indexOf('?') !== -1) ? '&' : '?';
  const url = `${uri}${sep}`;
  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
      width=${windowArea.width},height=${windowArea.height},
      left=${windowArea.left},top=${windowArea.top}`;

  const authWindow = window.open(url, 'producthuntPopup', windowOpts);
  // Create IE + others compatible event handler
  const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  const eventer = window[eventMethod];
  const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

  // Listen to message from child window
  const authPromise = new Promise((resolve, reject) => {
    eventer(messageEvent, (e) => {
      if (e.origin.indexOf(`${window.location.protocol}//${window.location.host}`) === -1) {
        authWindow.close();
        reject(new Error('Not allowed'));
      }

      if (e.data.auth) {
        authWindow.close();
        resolve(e.data.auth);
      } else {
        authWindow.close();
        reject(new Error('Unauthorised'));
      }
    }, false);
  });

  return authPromise;
};

export default SpotifyOAuth;
