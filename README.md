# 小手机

## 部署

直接把整个仓库推到 GitHub，开启 GitHub Pages（Settings → Pages → Source 选 `main` 分支根目录）。

访问 `https://你的用户名.github.io/仓库名/YIMO.html` 即可使用。

## 文件结构

```
├── YIMO.html                  ← 主文件（不需要再改动）
├── modules/
│   ├── manifest.json          ← 模块清单（添加新功能只改这里）
│   └── example.js             ← 示例模块（参考用）
└── README.md
```

## 如何添加新功能

**核心思路：永远不需要动 YIMO.html，只需要往 `modules/` 文件夹里添加文件。**

### 第一步：写一个模块

创建 `modules/my-feature.js`：

```javascript
(function(){

  // 注册一个新的 App
  XSJ.registerApp('my-app', {
    title: '新功能',
    body: '<div style="padding:20px;">这里放页面内容</div>',
    onOpen: function(root) {
      // root 是容器 DOM 元素，可以在这里执行初始化逻辑
    }
  });

  // 给聊天里的按钮绑定动作
  XSJ.addAction('red-packet', function(label) {
    XSJ.toast('红包功能开发中');
  });

  // 注入样式
  XSJ.addStyle('.my-card { background: var(--layer-1); border-radius: 20px; padding: 16px; }');

  // 监听 App 打开事件
  XSJ.onAppOpen(function(name) {
    console.log(name + ' opened');
  });

})();
```

如果需要 CSS 文件，创建 `modules/my-feature.css`。

### 第二步：注册到清单

编辑 `modules/manifest.json`：

```json
{
  "modules": [
    { "id": "my-feature", "js": "modules/my-feature.js" },
    { "id": "theme",      "js": "modules/theme.js", "css": "modules/theme.css" }
  ]
}
```

### 第三步：推到 GitHub

```bash
git add modules/
git commit -m "添加新功能"
git push
```

完成。页面刷新后自动加载新模块。

## API 参考

| 方法 | 说明 |
|------|------|
| `XSJ.registerApp(id, {title, body, icon, onOpen})` | 注册新 App |
| `XSJ.addAction(key, handler)` | 注册聊天快捷动作 |
| `XSJ.addFeature(key, handler)` | 注册功能预览页 |
| `XSJ.addStyle(cssText)` | 注入 CSS |
| `XSJ.onAppOpen(callback)` | 监听 App 被打开 |
| `XSJ.toast(message)` | 显示提示 |

## 主文件中的占位 App

以下 App 图标保留在桌面上，但点击无反应，可通过模块激活：

| App | ID | 说明 |
|-----|----|------|
| 小红书 | `redbook` | 需模块实现 |
| 直播 | `live` | 需模块实现 |
| 宠物 | `pet` | 需模块实现 |
| AO3 | `ao3` | 需模块实现 |
| 游戏 | `game` | 需模块实现 |

聊天栏的「转账」「红包」按钮同理，图标可见但无动作，通过 `XSJ.addAction` 激活。

### 激活占位 App 的示例

```javascript
// modules/redbook.js
(function(){
  // 覆盖 APPS 里 redbook 的内容
  if(typeof APPS !== 'undefined' && APPS.redbook) {
    APPS.redbook.b = '<div style="padding:20px;">小红书页面</div>';
  }

  // 给桌面图标重新绑定点击
  var icon = document.querySelector('[data-app-id="redbook"]');
  if(icon) icon.onclick = function(){ openApp('redbook'); };

  // 打开后执行自定义渲染
  XSJ.onAppOpen(function(name){
    if(name === 'redbook'){
      var ct = document.getElementById('app-content');
      if(ct) ct.querySelector('.app-title').nextSibling // ...
    }
  });
})();
```
