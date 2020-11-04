import ResourcesApi from "./../resources_api.mjs";

export default class ResourcesDashboard extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-party-resources",
      classes: ["fvtt-party-resources"],
      template: "modules/fvtt-party-resources/templates/resources_dashboard.html",
      minimizable: true,
      title: game.i18n.localize("FvttPartyResources.Title")
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.on('click', '.change-value.add', event => {
      this.setup_calculation(event, setting => { ResourcesApi.increment(setting) })
    })

    html.on('click', '.change-value.subtract', event => {
      this.setup_calculation(event, setting => { ResourcesApi.decrement(setting) })
    })
  }

  getData() {
    return mergeObject(ResourcesApi.resources(), { is_gm: game.user.isGM })
  }

  setup_calculation(event, process) {
    event.stopPropagation()
    event.preventDefault()
    process($(event.currentTarget).data('setting'))
  }
}
