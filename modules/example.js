/* ═══════════════════════════════════════════════════════
   示例模块 — 展示所有可用 API
   ═══════════════════════════════════════════════════════
   启用方法: 在 modules/manifest.json 里添加:
   {
     "modules": [
       { "id": "example", "js": "modules/example.js" }
     ]
   }
   ═══════════════════════════════════════════════════════ */

(function(){
  'use strict';

  /* ─────────────────────────────────────────────
     1. 注册新 App（会出现在桌面可打开的列表里）
     ───────────────────────────────────────────── */
  /*
  XSJ.registerApp('myapp', {
    title: '我的App',

    // body: 打开后直接渲染的 HTML
    body: '<div style="padding:20px;text-align:center;">'
        + '<div style="font-size:18px;font-weight:600;">Hello World</div>'
        + '<div style="font-size:13px;color:var(--text-secondary);margin-top:8px;">这是一个外部模块</div>'
        + '</div>',

    // onOpen(root): 可选回调，打开后执行，root 是容器元素
    onOpen: function(root) {
      console.log('myapp 被打开了', root);
    }
  });
  */


  /* ─────────────────────────────────────────────
     2. 注册聊天快捷动作
     ───────────────────────────────────────────── */
  /*
  XSJ.addAction('red-packet', function(label) {
    // label = '红包'
    XSJ.toast('红包功能即将上线');
  });
  */


  /* ─────────────────────────────────────────────
     3. 注入自定义 CSS
     ───────────────────────────────────────────── */
  /*
  XSJ.addStyle(`
    .my-custom-card {
      background: var(--layer-1);
      border-radius: 20px;
      padding: 16px;
    }
  `);
  */


  /* ─────────────────────────────────────────────
     4. 监听任意 App 被打开
     ───────────────────────────────────────────── */
  /*
  XSJ.onAppOpen(function(appName) {
    console.log('[模块] ' + appName + ' 被打开了');
  });
  */

})();
