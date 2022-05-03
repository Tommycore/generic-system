// @ts-nocheck
const fields = foundry.data.fields;

export class SraeItemModel extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      stats: new fields.ArrayField(new fields.SchemaField({
        key: new fields.StringField({ required: true, label: 'Key' }),
        value: new fields.NumberField({ required: true, label: 'Val' })
      }))
    };
  }
}
