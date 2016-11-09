import WorkspaceComponent from './workspace.component';

var workspaceModule = angular.module('app.workspace', ['app.panels'])
  .component('workspace', WorkspaceComponent);


export default workspaceModule;