import { slugify } from "./generic-helper.mjs";

export class GsHandlebarsHelper {
  static registerHelpers() {
    Handlebars.registerHelper("slugify", hbh_slugify);
    Handlebars.registerHelper("concat2", hbh_concat);
    Handlebars.registerHelper("template", hbh_getTemplate);
    Handlebars.registerHelper("keyFromStat", hbh_getKeyFromStat);
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

function hbh_getTemplate(path) {
  return `${CONFIG.TEMPLATE_DIR}${path}`;
}

function hbh_getKeyFromStat(stat) {
  return stat.key || slugify(stat.label);
}
