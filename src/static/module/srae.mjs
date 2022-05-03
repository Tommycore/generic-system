// Import Modules
import { SraeItemModel } from "./documents/data/srae-item-data.mjs";
import { SraeActor } from "./documents/srae-actor.mjs";
import { SraeItem } from "./documents/srae-item.mjs";
import { SraeHandlebarsHelper } from "./helper/srae-handlebars-helper.mjs";
import { SraeDie } from "./misc/sraedie.mjs";
import { SraeActorSheetBase } from "./sheets/srae-actor-sheet-base.mjs";
import { SraeItemSheetBase } from "./sheets/srae-item-sheet-base.mjs";

export class SraeGameMgr {
  static get game() {
    if (game instanceof Game) {
      return game;
    }

    throw Error("Game not initialised yet!");
  }

  static loca(key, data = {}) {
    return SraeGameMgr.game.i18n.format(key, data);
  }

  static async init() {
    console.log(`SRAE | Initializing SR:AE System. Welcome to the shadows, chummer!`);

    // Register Handlebars Helper functions
    SraeHandlebarsHelper.registerHelpers();

    // Register SR-Dice
    CONFIG.Dice.types.push(SraeDie);
    CONFIG.Dice.terms["s"] = SraeDie;

    // @ts-ignore
    CONFIG.SYSNAME = 'srae';

    // @ts-ignore
    SraeGameMgr.game.srae = {
      stattypes: ["FIXED", "COMBINED"]
    };

    // Define custom Document classes
    // @ts-ignore
    CONFIG.Actor.documentClass = SraeActor;
    // @ts-ignore
    CONFIG.Item.documentClass = SraeItem;
    // CONFIG.Token.documentClass = SimpleTokenDocument;
    // CONFIG.Token.objectClass = SimpleToken;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("srae", SraeActorSheetBase, { label: "SRAE.SHEETS.TYPES.ACTOR", makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("srae", SraeItemSheetBase, { label: "SRAE.SHEETS.TYPES.ITEM", makeDefault: true });

    // @ts-ignore
    game.documentTypes.Item.forEach(type => CONFIG.Item.systemDataModels[type] = SraeItemModel);

    // Preload template partials
    await SraeGameMgr.preloadTemplates();
  }

  static async preloadTemplates() {
    // Load templates
    const list = await fetch('systems/srae/data/templateList.json');
    const files = await list.json();
    return loadTemplates(files);
  }
}

Hooks.once('init', SraeGameMgr.init);
