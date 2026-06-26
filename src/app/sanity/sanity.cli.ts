import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'SEU_PROJECT_ID',  // ← Substitua pelo seu
    dataset: 'production',
  },
});