var dashboard_template = `
<section id="party-resources-container">
  <h3>Party Resources</h3>
  <div class="flexrow">
    <div class="flexcol">
      <p>
        <span class="value">{{ inspiration }} / {{ max_inspiration }}</span><br>
        <span title="TESTING">Inspiration</span>
      </p>
    </div>
    <div class="flexcol">
      <p>
        <span class="value">{{ desperation }} / {{ max_desperation }}</span><br>
        Desperation
      </p>
    </div>
    <div class="flexcol">
      <p>
        <span class="value">{{ influence_dice }} / {{ max_influence_dice }}</span><br>
        Influence Dice
      </p>
    </div>
  </div>
</section>
`.trim()

$('body').append(`
  <script src="https://unpkg.com/@popperjs/core@2"></script>
  <script src="https://unpkg.com/tippy.js@6"></script>
`);
