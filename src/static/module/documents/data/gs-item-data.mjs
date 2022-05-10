const fields = foundry.data.fields;

export class GsItemModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const label = new fields.StringField({ required: true, blank: false, nullable: false, initial: 'New Stat', label: 'Label' });
    const key = new fields.StringField({ required: false, blank: true, nullable: true, label: 'Key' });
    const value = new fields.NumberField({ required: true, nullable: false, label: 'Value' });

    const statDataSchema = { key, label, value };
    const StatSchemaField = new fields.SchemaField(statDataSchema);

    return {
      stats: new fields.ArrayField(StatSchemaField, { nullable: false, initial: [] })
    };
  }
}
