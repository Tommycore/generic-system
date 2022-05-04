export class GsItemSheet extends ItemSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["gs", "sheet", "item"],
      template: "systems/gs/templates/sheets/gs-item-sheet.hbs",
      width: 400,
      height: 700,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find('.stat-ctrl').on("click", this._onStatAction.bind(this));
  }

  /**
   * 
   * @param {MouseEvent} ev
   */
  _onStatAction(ev) {
    ev.preventDefault();

    const target = ev.currentTarget;
    if ((!target) || !(target instanceof HTMLElement)) {
      throw new Error("Unable to work with event.");
    }

    const action = target.dataset.action;

    switch (action) {
      case "addStat": this._addStat(); break;
      case "removeStat": this._removeStat(target.dataset.index); break;

      default: throw new Error("No action specified.");
    }
  }

  _removeStat(index) {
    ui.notifications.warn("Nope. Not implemented yet.");
    //this.item.update({system: {stats: {[`-=${index}`]: null}}});
  }

  async _addStat() {
    // NOTE: My reasoning here is that I want to create a new array element and then
    // just tell Foundry "Hey, here's the updated version of the array."
    this.document.system.stats.push({ key: "New Stat", value: 0 });
    await this.document.update({ system: { stats: this.document.system.stats } });

    console.log(`GS | Validating item '${this.document.name}' after calling document.update() in _addStat().\n` +
      ` Document appears to be ${this.document.validate() ? "valid" : "invalid"}.`);
  }
}