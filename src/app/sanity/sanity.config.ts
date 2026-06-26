import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Meu Site Premium',

  projectId: 'SEU_PROJECT_ID',  // ← Substitua pelo seu
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});