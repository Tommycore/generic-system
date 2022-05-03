import { SraeGameMgr } from "../srae.mjs";

export class SraeItemSheetBase extends ItemSheet {
  
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["srae", "sheet", "item"],
      template: "systems/srae/templates/sheets/srae-item-sheet.hbs",
      width: 400,
      height: 700,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats"}],
      // dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
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
    if((!target) || !(target instanceof HTMLElement)) {
      throw new Error("Unable to work with event.");
    }

    const action = target.dataset.action;

    switch(action)
    {
      case "addStat": this._addStat(); break;
      case "removeStat": this._removeStat(target.dataset.index); break;

      default: throw new Error("No action specified.");
    }
  }

  _removeStat(index) {
    ui.notifications?.warn("Nope. Not implemented yet.");
    //this.item.update({system: {stats: {[`-=${index}`]: null}}});
  }

  _addStat() {
    let i = 0;
    // @ts-ignore
    while(this.document.system.stats[i])
    {
      i++;
    }

    // @ts-ignore
    this.document.system.stats[i] = {label: `${SraeGameMgr.loca("SRAE.SHEETS.LABELS.NEW_STAT")} ${i}`, value: 0, propagate: false};
    // @ts-ignore
    this.document.update({system: this.document.system});
  }
}