// Import Modules
import { GsItemModel } from "./documents/data/gs-item-data.mjs";
import { GsItem } from "./documents/gs-item.mjs";
import { GsItemSheet } from "./sheets/gs-item-sheet.mjs";
import { GsHandlebarsHelper } from "./helper/gs-handlebars-helper.mjs";

Hooks.once('init', init);

async function init() {
  console.log(`GS | Initializing Generic System.`);

  // Register Handlebars Helper functions
  GsHandlebarsHelper.registerHelpers();

  // Define some constants that will be reused throughout the system
  CONFIG.SYS_NAME = 'gs';
  CONFIG.SYS_DIR = `systems/${CONFIG.SYS_NAME}/`;
  CONFIG.TEMPLATE_DIR = `${CONFIG.SYS_DIR}templates/`;

  // Register custom Document classes
  CONFIG.Item.documentClass = GsItem;

  // Register custom Sheet classes
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet(CONFIG.SYS_NAME, GsItemSheet, { label: "GS.SHEETS.TYPES.ITEM", makeDefault: true });

  game.documentTypes.Item.forEach(type => {
    const oldModel = CONFIG.Item.systemDataModels[type];
    // NOTE: If you uncomment the debugger line below, you can see in the inspector that oldModel is still undefined at this point.
    // I'm not sure if this is relevant and/or intentional, but wanted to point it out.
    //debugger;
    CONFIG.Item.systemDataModels[type] = GsItemModel
  });

  // Preload template partials
  await preloadTemplates();
}

async function preloadTemplates() {
  // When running the gulp pipeline to build this project, it creates a json array that enumerates all
  // partials found by the glob. Here we just load that array and then use it to load all partials.
  const list = await fetch(`${CONFIG.SYS_DIR}data/templateList.json`);
  const files = await list.json();
  return loadTemplates(files);
}
