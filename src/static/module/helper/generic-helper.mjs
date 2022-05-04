export function loca(key, data = {}) {
  return game.i18n.format(key, data);
}

export function slugify(term) {
  // Slugification can either be called through handlebars or in the code directly.
  // In order to pipe terms through the same process, this function serves as a global
  // docking point, so to speak. Should I ever decide to alter the slugification process,
  // for example removing the dashes to make slugs valid variable names, or something alike,
  // I only have to make that change here.
  return term.slugify({ strict: true });
}
