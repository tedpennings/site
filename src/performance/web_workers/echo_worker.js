/* eslint-disable */
function onmessage(...args) {
  console.log('worker received message - TODO remove this')
  postMessage(...args)
}
