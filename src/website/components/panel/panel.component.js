import panelTemplate from './panel.template.html';

class PanelController {

  constructor(panelsManager, $compile, $element, $scope) {
    'ngInject';
    this.panelsManager = panelsManager;
    this.$compile = $compile;
    this.$element = $element;
    this.$scope = $scope;
  }

  $postLink() {
    if (__TEST__) return;
    var panel = this.panelsManager.getPanel(this.name);
    panel.load().then(() => {
      var element = this.$element[0];
      $(element).addClass('ng-cloak');
      this.panelName = panel.name;
      $(element).find('.box-body').html(panel.template);
      var newScope = this.$scope.$new(true, this.$scope);
      this.$compile($(element).contents())(newScope);
      $(element).removeClass('ng-cloak');
    });
  }

}

var PanelComponent = {
  template : panelTemplate,
  bindings : {
    name: '@'
  },
  require : {
    workspaceCtrl : '^workspace'
  },
  controller: PanelController
};

export default PanelComponent;
