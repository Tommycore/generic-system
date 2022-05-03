import { attemptNumberCast, slugify } from "../helper/generic-helper.mjs";

export class SraeActor extends Actor {
  // getRollData() {
  //   return mergeObject(super.getRollData(), this.getItemData());
  // }

  // getItemData() {
  //   const result = {actor: {}, items: {}};

  //   //debugger;
  //   const itemStats = this.itemStats;
  //   for(let i of Object.values(itemStats))
  //   {
  //     if(!i)
  //     {
  //       continue;
  //     }

  //     // @ts-ignore
  //     const itemSlug = slugify(i.label);
  //     // @ts-ignore
  //     const statList = Object.values(i.stats);
  //     // If there's at least a single stat on the item that is not propagated,
  //     // then prepare an object to put these values.
  //     if(statList.find(el => !el.propagate))
  //     {
  //       // @ts-ignore
  //       result.items[itemSlug] = {label: i.label, stats: {}};
  //     }
  //     for(let v of statList) {
  //       const statSlug = slugify(v.label);
  //       const root = v.propagate? result.actor : result.items;
  //       if(v.propagate)
  //       {
  //         if (root[statSlug]) {
  //           root[statSlug].value += attemptNumberCast(v.value);
  //           // @ts-ignore
  //           root[statSlug].sources.push(`${i.label}: ${v.value}`)
  //         }
  //         else {
  //           // @ts-ignore
  //           root[statSlug] = { label: v.label, value: attemptNumberCast(v.value), sources: [`${i.label}: ${v.value}`] }
  //         }
  //       }
  //       else {
  //         if (root[itemSlug].stats[statSlug]) {
  //           root[itemSlug].stats[statSlug].value += attemptNumberCast(v.value);
  //         }
  //         else {
  //           root[itemSlug].stats[statSlug] = { label: v.label, value: attemptNumberCast(v.value) }
  //         }
  //       }
  //     }
  //   }

  //   return result;
  // }

  // get itemStats() {
  //   // @ts-ignore
  //   return this.stattedItems.map(item => item.getFlag(CONFIG.SYSNAME, "isEquipped")? item.getRollData() : null);
  // }

  // get stattedItems() {
  //   // @ts-ignore
  //   return this.items.filter(item => item.data.data.stats !== undefined);
  // }
}
