import { GsItemModel } from "../documents/data/gs-item-data.mjs";

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
    const stats = this.document.toObject().system.stats;
    stats.splice(index, 1);
    this.document.update({ "system.stats": stats });
  }

  _addStat() {
    const stats = this.document.toObject().system.stats;
    stats.push({ label: "New Stat", value: 0 });
    this.document.update({ "system.stats": stats });
  }

  _getSubmitData(updateData) {
    const formData = super._getSubmitData(updateData);
    formData.system = { stats: Array.from(Object.values(expandObject(formData).system.stats)) };
    return formData;
  }
}
