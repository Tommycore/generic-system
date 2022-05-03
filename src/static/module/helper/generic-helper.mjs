/**
 * @param {String} label 
 * @returns Slugified label.
 */
export function slugify(label)
{
  return label.slugify({strict: true});
}

export function attemptNumberCast(val) {
  const numeric = Number(val);
  const isNumber = !(numeric.toString() !== val);
  
  return isNumber? numeric : val;
}
