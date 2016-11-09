import appModule from './app';

if (__PROD__) {
  appModule.config(($compileProvider, $httpProvider) => {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
  });
}

angular.element(document).ready(() => {
  $('body').addClass('layout-top-nav');
  $('body').addClass('skin-black-light');
  document.body.innerHTML = '<app> Loading... </app>';
  angular.bootstrap(document, [appModule.name], {});
});