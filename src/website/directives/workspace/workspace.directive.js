import 'gridstack/dist/gridstack.css';
import 'gridstack';

import './workspace.css';

import workspaceTemplate from './workspace.template.html';

class WorkspaceDirective {

  constructor($compile, panelsManager) {
    'ngInject';
    this.$compile = $compile;
    this.restrict = 'E';
    this.controller = 'workspaceController';
    this.template = workspaceTemplate;
    this.panelsManager = panelsManager;
    this.scope = {
      datasetId: '@'
    };
  }

  link(scope, element) {

    var options = {
      cellHeight: 200,
      verticalMargin: 10,
      float: true
    };

    var grid = $('.grid-stack').gridstack(options);

    var gridApi = grid.data('gridstack');

    grid.on('resizestop', (event, ui) => {
      var element = event.target;
      setTimeout(() => {
        scope.resizeGridItemContent(element);
      }, 10);
    });

    scope.getPanelName = function(panelId) {
      return this.panelsManager.getPanelName(panelId).name;
    };

    scope.addPanel = (panelName) => {
      var panelContent = $(
        '<div class="grid-stack-item" data-gs-width="4" data-gs-height="2">\
        <div class="grid-stack-item-content">\
        <panel data-name="' + panelName + '"/>\
        </div>\
        </div>'
      );
      grid.append(panelContent);
      var gridItem = gridApi.makeWidget(panelContent)[0];
      this.$compile($(gridItem).contents())(scope);

      $('.grid-stack-item-content').css("overflow", "hidden");

      setTimeout(() => {
        scope.resizeGridItemContent(gridItem);
      }, 500);

    };

    scope.addSelectedPanel = function() {
      var panelNameWoSpaces = $('.panel-button').text().replace(/ /g, "");
      scope.addPanel(scope.panelNameToId[panelNameWoSpaces]);
    };

    scope.isFullScreenMode = false;

    scope.resizeGridItemContent = function(gridItem) {
      var newHeight = $(gridItem).height();
      var boxHeader = $(gridItem).find('.box-header');
      var boxBody = $(gridItem).find('.box-body');
      boxBody.height(newHeight-3.1*boxHeader.height());
    };

    var fullscreenPanel = function (domElement) {
      scope.fullscreenElt = domElement;
      if (scope.isFullScreenMode === true) {
        // exit fullscreen
        scope.isFullScreenMode = false;

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        return;
      }

      scope.isFullScreenMode = true;
      if (domElement.requestFullscreen) {
        domElement.requestFullscreen();
      } else if (domElement.msRequestFullscreen) {
        domElement.msRequestFullscreen();
      } else if (domElement.mozRequestFullScreen) {
        domElement.mozRequestFullScreen();
      } else if (domElement.webkitRequestFullscreen) {
        domElement.webkitRequestFullscreen();
      }
    };

    function exitHandler() {
      var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen; // This will return true or false depending on if it's full screen or not.
      scope.isFullScreenMode = isFullScreen;
      scope.resizeGridItemContent(scope.fullscreenElt);
    }

    $('body').on('click', '.panel-fullscreen', function(e) {
      e.preventDefault();
      var box = $(this).closest(".grid-stack-item");
      fullscreenPanel(box.get(0));
    });

    $('body').on('click', '.panel-remove', function(e) {
      e.preventDefault();
      var box = $(this).closest(".grid-stack-item");
      gridApi.removeWidget(box);
    });

    if (document.addEventListener) {
      document.addEventListener('webkitfullscreenchange', exitHandler, false);
      document.addEventListener('mozfullscreenchange', exitHandler, false);
      document.addEventListener('fullscreenchange', exitHandler, false);
      document.addEventListener('MSFullscreenChange', exitHandler, false);
    }
  }

}

export default WorkspaceDirective;
