export default class DashboardDirections {
  static container_html() {
    return $('<div id="fvtt-party-goodies-directions">&rarr;</div>')
  }

  static render() {
    if($('body').find('#fvtt-party-goodies-directions').length == 0) {
      $('body').append(this.container_html())
    }

    $('[data-tab="actors"].item')[0].click()
    $('#btn-dashboard').addClass('highlight')
    return $('#fvtt-party-goodies-directions')
  }

  static remove() {
    $('#btn-dashboard').removeClass('highlight')
    $('#fvtt-party-goodies-directions').remove()
  }
}
