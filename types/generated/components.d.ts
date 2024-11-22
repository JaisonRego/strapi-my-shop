import type { Schema, Struct } from '@strapi/strapi';

export interface CategoryCategory extends Struct.ComponentSchema {
  collectionName: 'components_category_categories';
  info: {
    description: '';
    displayName: 'category';
    icon: 'command';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    linkname: Schema.Attribute.String;
    linkpath: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'category.category': CategoryCategory;
    }
  }
}
