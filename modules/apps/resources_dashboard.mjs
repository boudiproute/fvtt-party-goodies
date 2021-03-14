import ResourceForm from "./resource_form.mjs";
import ResourcesList from "./../resources_list.mjs";
import DashboardDirections from "./../dashboard_directions.mjs";
import CursorTooltip from "./../cursor_tooltip.mjs";

export default class ResourcesDashboard extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "fvtt-party-goodies-dashboard",
      classes: ["fvtt-party-goodies"],
      template: "modules/fvtt-party-goodies/templates/resources_dashboard.html",
      minimizable: true,
      resizable: true,
      title: game.i18n.localize("FvttPartyResources.Title")
    })
  }

  activateListeners(html) {
    super.activateListeners(html)

    html.on('click', '.change-value', e => {
      this.setup_calculation(e, (setting, jump) => {
        if($(e.currentTarget).hasClass('add')) {
          window.pr.api.increment(setting, jump)
        } else {
          window.pr.api.decrement(setting, jump)
        }
      })
    })

    html.on('mousemove', '.change-value', e => {
      let jump = this.increment_jump(e)
      if(jump == 1) return
      let operation = $(e.currentTarget).hasClass('add') ? '+' : '-'
      CursorTooltip.show(operation.concat(new String(jump)))
    })

    html.on('mouseout', '.change-value', e => {
      CursorTooltip.hide()
    })

    html.on('click', '.delete', e => {
      this.setup_calculation(e, setting => { ResourcesList.remove(setting) })
    })

    html.on('click', '.invisible, .visible', e => {
      this.setup_calculation(e, setting => { this.toggle_visiblity(setting) })
    })

    html.on('click', '.new-resource-form-btn', e => {
      new ResourceForm(
        {},
        {
          id: "add-resource-form",
          title: game.i18n.localize("FvttPartyResources.ResourceForm.AddFormTitle")
        }
      ).render(true)
    })

    html.on('click', '.edit', e => {
      e.stopPropagation()
      e.preventDefault()

      new ResourceForm(
        this.resource_data($(e.currentTarget).data('setting')),
        {
          id: "edit-resource-form",
          title: game.i18n.localize("FvttPartyResources.ResourceForm.EditFormTitle")
        }
      ).render(true)
    })
  }

  increment_jump(event) {
    if(event.ctrlKey || event.metaKey) return 10
    if(event.shiftKey) return 100
    return 1
  }

  getData() {
    return mergeObject(window.pr.api.resources(), {
      is_gm: game.user.isGM,
      version: window.pr.version
    })
  }

  setup_calculation(event, process) {
    event.stopPropagation()
    event.preventDefault()
    process(
      $(event.currentTarget).data('setting'),
      this.increment_jump(event)
    )
  }

  toggle_visiblity(setting) {
    window.pr.api.set(
      setting.concat('_visible'),
      !window.pr.api.get(setting.concat('_visible'))
    )
  }

  // Deprecated and no longer in use since v1.1
  // Leaving it here as a means to a "reset window size" button or something.
  recalculate_height() {
    $('#fvtt-party-goodies-dashboard').css({
      width: 'auto',
      height: 'auto'
    })
  }

  redraw(force) {
    DashboardDirections.remove()
    this.render(force)
  }

  resource_data(id) {
    return {
      identifier: id,
      default_value: window.pr.api.get(id),
      name: window.pr.api.get(id.concat('_name')),
      max_value: window.pr.api.get(id.concat('_max')),
      min_value: window.pr.api.get(id.concat('_min')),
      player_managed: window.pr.api.get(id.concat('_player_managed')),
      allowed_to_modify_settings: game.permissions.SETTINGS_MODIFY.includes(1),
      visible: window.pr.api.get(id.concat('_visible'))
    }
  }

}
