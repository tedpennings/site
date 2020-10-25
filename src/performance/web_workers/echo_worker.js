global.onmessage = function onmessage(msg) {
  global.postMessage(msg.data);
};
