class PanelsManager {

  constructor() {
    this.panels = {};
  }

  registerPanel(panelName, panel) {
    this.panels[panelName] = panel;
  }

  getPanelsList() {
    return _.keys(this.panels);
  }

  getPanel(panelName) {
    return this.panels[panelName];
  }

}

export default {
  serviceName: 'panelsManager',
  serviceClass: PanelsManager
};