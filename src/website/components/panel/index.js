import PanelComponent from './panel.component';

var panelModule = angular.module('app.directives.panel', [])
  .component('panel', PanelComponent);

export default panelModule;