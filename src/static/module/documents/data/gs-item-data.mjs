const fields = foundry.data.fields;

export class GsItemModel extends foundry.abstract.DataModel {
  static defineSchema() {
    const key = new fields.StringField({ required: true, blank: false, nullable: false, label: 'Key' });
    const value = new fields.NumberField({ required: true, nullable: false, label: 'Val' });
    const keyValuePairDataSchema = { key, value };
    const keyValuePairSchemaField = new fields.SchemaField(keyValuePairDataSchema);

    return {
      stats: new fields.ArrayField(keyValuePairSchemaField, { nullable: false, initial: [] })
    };
  }
}
