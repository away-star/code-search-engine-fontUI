import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
 /*   { path: "/docs", component: "docs" },*/
  ],
  npmClient: 'yarn',

  // todo 跨域配置
  proxy: {
    '/api/': {
      'target': 'http://localhost:5000',
      'changeOrigin': true,
      'pathRewrite': { 'api' : '' },
    }
  }
});
