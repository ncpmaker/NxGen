if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const o=s=>i(s,l),u={module:{uri:l},exports:t,require:o};e[l]=Promise.all(n.map((s=>u[s]||o(s)))).then((s=>(r(...s),t)))}}define(["./workbox-7cfec069"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/CasesPage-2Lf6dJ7D.js",revision:null},{url:"assets/DashboardPage-cMj5tE0c.js",revision:null},{url:"assets/EditCasePage-TsTfqPg-.js",revision:null},{url:"assets/HomePage-5wi8Gdik.js",revision:null},{url:"assets/HomePage-jkQBcPLx.css",revision:null},{url:"assets/html2canvas.esm-Ry1SfrtC.js",revision:null},{url:"assets/index-0rX5x8U8.js",revision:null},{url:"assets/index-UyLWeLdY.css",revision:null},{url:"assets/index.es-1h0-9JhX.js",revision:null},{url:"assets/LoginPage-1dxkkmNZ.js",revision:null},{url:"assets/purify.es-zHtM-7sw.js",revision:null},{url:"index.html",revision:"7a8f98c83c4fa44a156bf9a7eab01246"},{url:"registerSW.js",revision:"826d5f592bd66092116d9b74df01bfa5"},{url:"manifest.webmanifest",revision:"10073a7672b9a356159e1c23a8b6440f"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
