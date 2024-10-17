/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
document.addEventListener('DOMContentLoaded', function () {
  // eslint-disable-next-line prefer-arrow-callback, prefer-arrow/prefer-arrow-functions
  document.getElementById('popup-icon').addEventListener('click', function () {
      browser.runtime.sendMessage({ action: 'open-popup' });
  });
});
