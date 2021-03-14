export default class ModuleSettings {
  static register() {
    window.pr.api.register('resource_list')

    game.settings.register(
      'fvtt-party-goodies',
      'first-time-startup-notification-shown',
      { scope: "client", config: false, type: Boolean, default: false }
    )
  }
}
