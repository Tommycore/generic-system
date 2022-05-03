export class SraeActorSheetBase extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["srae", "sheet", "actor"],
      template: "systems/srae/templates/sheets/srae-actor-sheet.hbs",
      width: 400,
      height: 700,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "tests"}],
      scrollY: [".sheet-body"]
      // dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }

  activateListeners(html)
  {
    super.activateListeners(html);

    html.find('.edit-item').on("click", this._openItemSheet.bind(this));
    html.find('.inventory-toggle').on("change", this._onToggleEquipment.bind(this));
  }

  _openItemSheet(ev)
  {
    ev.preventDefault();

    const item = this._getItemListElement(ev);

    const sheet = item.sheet;
    if(!sheet) {
      throw new Error(`No sheet for item of type ${item.data.type} found.`);
    }

    sheet.render(true);
  }

  _onToggleEquipment(ev)
  {
    ev.preventDefault();

    const item = this._getItemListElement(ev);

    // @ts-ignore
    item.setFlag(CONFIG.SYSNAME, "isEquipped", !(item.data.flags[CONFIG.SYSNAME]?.isEquipped?? false));
  }

  _getItemListElement(ev)
  {
    const target = ev.currentTarget;
    if((!target) || !(target instanceof HTMLElement)) {
      throw new Error("Event target not found.");
    }

    const li = target.closest('li');
    if(!li)
    {
      throw new Error("Ancestorial <li> tag not found.");
    }

    const id = li.dataset.id;
    if(!id)
    {
      throw new Error("ID not found.");
    }

    const item = this.actor.items.get(id);
    if(!item)
    {
      throw new Error("Item not found.");
    }

    return item;
  }

  getData()
  {
    const result = super.getData();
    
    // @ts-ignore
    result.inventory = this.actor.stattedItems;

    return result;
  }
}
