import { slugify } from "./generic-helper.mjs";

export class GsHandlebarsHelper {
  static registerHelpers() {
    Handlebars.registerHelper("slugify", hbh_slugify);
    Handlebars.registerHelper("concat2", hbh_concat);
    // Handlebars.registerHelper("keycap", hbh_key_capitalisation);
    // Handlebars.registerHelper("hasCustomTab", hbh_hasCustomTab);
    // Handlebars.registerHelper("rollData", hbh_rollData);
    Handlebars.registerHelper("template", hbh_getTemplate);
  }
}

function hbh_slugify(label) {
  return slugify(label);
}

function hbh_concat(...input) {
  return input.reduce((prev, cur) => {
    if (typeof cur === "string") {
      return prev + cur;
    }

    return prev;
  });
}

// function hbh_key_capitalisation(key) {
//   return key.toUpperCase().replace("-", "_");
// }

// function hbh_hasCustomTab(type) {
//   return !["action", "generic_item"].includes(type);
// }

// function hbh_rollData(document) {
//   return document.getRollData();
// }

function hbh_getTemplate(path) {
  return `${CONFIG.TEMPLATE_DIR}${path}`;
}
