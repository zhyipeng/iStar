import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
import App from './App.vue';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App);
app.use(ElementPlus);
app.use(VMdPreview);
app.mount('#app');
