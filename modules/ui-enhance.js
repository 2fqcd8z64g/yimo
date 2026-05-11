/* ═══════════════════════════════════════════════════════
   UI Enhancement Module — 聊天 & 设置界面增强
   ═══════════════════════════════════════════════════════
   功能清单（只增不减）:

   【聊天界面】
   ① 新消息入场动画（气泡滑入）
   ② 滚动到底部浮动按钮（FAB）
   ③ 恢复时间戳显示（优雅折叠式）
   ④ 输入框焦点发光 + 字数统计
   ⑤ 发送按钮脉冲反馈
   ⑥ 导航栏随滚动渐变（微视差）
   ⑦ Plus 面板弹出弹簧动画增强

   【设置界面】
   ⑧ 行项目交错入场动画
   ⑨ 设置搜索真正可用（实时过滤）
   ⑩ 开关切换弹性动画增强
   ⑪ API 手风琴面板平滑过渡
   ⑫ 存储进度条动画
   ⑬ 关于页面呼吸光效
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ═══════════════════════════════════════
  // 样式注入
  // ═══════════════════════════════════════
  XSJ.addStyle([

    /* ── ① 气泡入场动画 ── */
    '@keyframes xBubbleIn{',
    '  0%{opacity:0;transform:translateY(12px) scale(.96);}',
    '  100%{opacity:1;transform:translateY(0) scale(1);}',
    '}',
    '.conv-group{animation:xBubbleIn .32s cubic-bezier(.22,.68,.36,1.0) both;}',
    '.conv-group:nth-last-child(1){animation-delay:0s;}',
    '.conv-group:nth-last-child(2){animation-delay:0s;}',

    /* ── ② 滚动到底部 FAB ── */
    '.x-scroll-fab{',
    '  position:absolute;right:16px;bottom:calc(120px + env(safe-area-inset-bottom,0));',
    '  z-index:15;width:36px;height:36px;border-radius:50%;',
    '  background:rgba(255,255,255,.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);',
    '  border:0.5px solid rgba(0,0,0,.06);',
    '  box-shadow:0 2px 12px rgba(0,0,0,.08);',
    '  display:flex;align-items:center;justify-content:center;',
    '  cursor:pointer;opacity:0;pointer-events:none;',
    '  transition:opacity .25s ease,transform .25s cubic-bezier(.34,1.56,.64,1);',
    '  transform:scale(.8) translateY(8px);',
    '}',
    '.x-scroll-fab.show{opacity:1;pointer-events:auto;transform:scale(1) translateY(0);}',
    '.x-scroll-fab:active{transform:scale(.88) translateY(0)!important;opacity:.7;}',
    '.x-scroll-fab svg{width:18px;height:18px;color:#888;}',
    '@media(prefers-color-scheme:dark){',
    '  .x-scroll-fab{background:rgba(35,35,35,.82);border-color:rgba(255,255,255,.08);box-shadow:0 2px 12px rgba(0,0,0,.3);}',
    '  .x-scroll-fab svg{color:#999;}',
    '}',

    /* ── ③ 时间戳恢复：点击可展开 ── */
    '.conv-group-time{',
    '  display:block!important;',
    '  max-height:0;overflow:hidden;opacity:0;',
    '  transition:max-height .3s ease,opacity .25s ease,margin .3s ease;',
    '  margin-top:0;',
    '}',
    '.conv-group.x-time-open .conv-group-time{',
    '  max-height:24px;opacity:1;margin-top:4px;',
    '}',
    '.conv-day-divider{',
    '  display:flex!important;',
    '  opacity:0;max-height:0;overflow:hidden;margin:0!important;padding:0!important;',
    '  transition:all .3s ease;',
    '}',
    '.conv-overlay.x-time-all .conv-day-divider{',
    '  opacity:1;max-height:40px;margin:8px 0!important;padding:8px 0 4px!important;',
    '}',
    '.conv-overlay.x-time-all .conv-group-time{',
    '  max-height:24px;opacity:1;margin-top:4px;',
    '}',

    /* ── ④ 输入框焦点发光 + 字数统计 ── */
    '.conv-input-wrap.x-focused{',
    '  box-shadow:0 4px 24px rgba(0,0,0,.06), 0 1px 4px rgba(0,0,0,.04), 0 0 0 1.5px rgba(120,120,120,.15);',
    '}',
    '@media(prefers-color-scheme:dark){',
    '  .conv-input-wrap.x-focused{box-shadow:0 4px 24px rgba(0,0,0,.25), 0 1px 4px rgba(0,0,0,.15), 0 0 0 1.5px rgba(200,200,200,.12);}',
    '}',
    '.x-char-count{',
    '  position:absolute;right:52px;bottom:100%;margin-bottom:6px;',
    '  font-size:9px;letter-spacing:.3px;color:var(--text-muted);',
    '  opacity:0;transition:opacity .2s ease;pointer-events:none;',
    '  font-variant-numeric:tabular-nums;',
    '}',
    '.x-char-count.show{opacity:1;}',
    '.x-char-count.warn{color:#cc6b4f;}',

    /* ── ⑤ 发送脉冲 ── */
    '@keyframes xSendPulse{',
    '  0%{transform:scale(1);}',
    '  30%{transform:scale(.82);}',
    '  60%{transform:scale(1.1);}',
    '  100%{transform:scale(1);}',
    '}',
    '.conv-send-btn.x-pulse{animation:xSendPulse .35s cubic-bezier(.34,1.56,.64,1);}',

    /* ── ⑥ 导航栏滚动渐变 ── */
    '.conv-nav{transition:box-shadow .25s ease,border-color .25s ease;}',
    '.conv-nav.x-scrolled{',
    '  box-shadow:0 1px 8px rgba(0,0,0,.04)!important;',
    '}',
    '@media(prefers-color-scheme:dark){',
    '  .conv-nav.x-scrolled{box-shadow:0 1px 8px rgba(0,0,0,.2)!important;}',
    '}',

    /* ── ⑦ Plus 面板弹簧增强 ── */
    '.conv-plus-panel{',
    '  transition:transform .34s cubic-bezier(.34,1.4,.64,1)!important;',
    '}',
    '.conv-plus-item{',
    '  opacity:0;transform:translateY(14px);',
    '}',
    '.conv-plus-panel.show .conv-plus-item{',
    '  animation:xPlusItemIn .3s cubic-bezier(.22,.68,.36,1.0) both;',
    '}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(1){animation-delay:.02s;}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(2){animation-delay:.05s;}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(3){animation-delay:.08s;}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(4){animation-delay:.11s;}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(5){animation-delay:.14s;}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(6){animation-delay:.17s;}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(7){animation-delay:.20s;}',
    '.conv-plus-panel.show .conv-plus-item:nth-child(8){animation-delay:.23s;}',
    '@keyframes xPlusItemIn{',
    '  0%{opacity:0;transform:translateY(14px) scale(.92);}',
    '  100%{opacity:1;transform:translateY(0) scale(1);}',
    '}',

    /* ── ⑧ 设置行交错入场 ── */
    '@keyframes xSettingsRowIn{',
    '  0%{opacity:0;transform:translateY(10px);}',
    '  100%{opacity:1;transform:translateY(0);}',
    '}',
    '.settings-row,.settings-toggle-item{',
    '  animation:xSettingsRowIn .35s cubic-bezier(.22,.68,.36,1.0) both;',
    '}',
    '.settings-section:nth-child(1) .settings-row:nth-child(1){animation-delay:.05s;}',
    '.settings-section:nth-child(1) .settings-row:nth-child(2){animation-delay:.08s;}',
    '.settings-section:nth-child(1) .settings-row:nth-child(3){animation-delay:.11s;}',
    '.settings-section:nth-child(1) .settings-row:nth-child(4){animation-delay:.14s;}',
    '.settings-section:nth-child(2) .settings-row:nth-child(1){animation-delay:.17s;}',
    '.settings-section:nth-child(2) .settings-row:nth-child(2){animation-delay:.20s;}',
    '.settings-section:nth-child(3) .settings-row:nth-child(1){animation-delay:.23s;}',
    '.settings-section:nth-child(3) .settings-row:nth-child(2){animation-delay:.26s;}',
    '.settings-section:nth-child(3) .settings-row:nth-child(3){animation-delay:.29s;}',
    '.settings-section:nth-child(3) .settings-row:nth-child(4){animation-delay:.32s;}',

    /* ── ⑨ 设置搜索 — 过滤效果 ── */
    '.settings-row.x-hidden{display:none!important;}',
    '.settings-section.x-hidden{display:none!important;}',
    '.settings-search input{transition:box-shadow .2s ease;}',
    '.settings-search input:focus{box-shadow:0 0 0 1.5px rgba(120,120,120,.12);}',

    /* ── ⑩ 开关弹性动画 ── */
    '.settings-switch{transition:background .25s cubic-bezier(.34,1.56,.64,1)!important;}',
    '.settings-switch::after{',
    '  transition:transform .28s cubic-bezier(.34,1.56,.64,1), background .2s ease!important;',
    '}',

    /* ── ⑪ 手风琴平滑展开 ── */
    '.sapi-block-body{',
    '  transition:max-height .4s cubic-bezier(.25,.8,.35,1), opacity .3s ease!important;',
    '  opacity:0;',
    '}',
    '.sapi-block.open .sapi-block-body{opacity:1;}',
    '.sapi-block-arrow{transition:transform .3s cubic-bezier(.34,1.56,.64,1)!important;}',

    /* ── ⑫ 存储进度条动画 ── */
    '@keyframes xBarGrow{',
    '  0%{width:0;}',
    '}',
    '.settings-bar-fill{animation:xBarGrow .8s cubic-bezier(.25,.8,.35,1) both;animation-delay:.3s;}',

    /* ── ⑬ 关于页面呼吸光 ── */
    '@keyframes xAboutGlow{',
    '  0%,100%{opacity:.35;transform:scale(1);}',
    '  50%{opacity:.7;transform:scale(1.08);}',
    '}',
    '.settings-about-mark{animation:xAboutGlow 3s ease-in-out infinite;}',
    '.settings-about-meta span{opacity:0;animation:xSettingsRowIn .4s ease both;}',
    '.settings-about-meta span:nth-child(1){animation-delay:.2s;}',
    '.settings-about-meta span:nth-child(2){animation-delay:.3s;}',
    '.settings-about-meta span:nth-child(3){animation-delay:.4s;}',
    '.settings-about-meta span:nth-child(4){animation-delay:.5s;}',
    '.settings-about-meta span:nth-child(5){animation-delay:.6s;}',

    /* ── 时间戳切换按钮样式 ── */
    '.x-time-toggle{',
    '  width:28px;height:28px;border-radius:14px;',
    '  display:flex;align-items:center;justify-content:center;',
    '  color:var(--text-tertiary);cursor:pointer;',
    '  transition:opacity .2s ease,background .2s ease,color .2s ease;',
    '}',
    '.x-time-toggle:active{opacity:.4;}',
    '.x-time-toggle.active{color:var(--text);background:var(--layer-2);}',

    /* ── 新消息指示小圆点 ── */
    '.x-new-msg-dot{',
    '  position:absolute;top:-3px;right:-3px;',
    '  width:8px;height:8px;border-radius:50%;',
    '  background:var(--text-tertiary);',
    '  opacity:0;transition:opacity .25s ease;',
    '}',
    '.x-scroll-fab .x-new-msg-dot.show{opacity:1;}',

  ].join('\n'));


  // ═══════════════════════════════════════
  // 聊天界面增强逻辑
  // ═══════════════════════════════════════

  // ── 滚动到底部 FAB ──
  function injectScrollFab(overlay) {
    if (!overlay || overlay.querySelector('.x-scroll-fab')) return;
    var fab = document.createElement('div');
    fab.className = 'x-scroll-fab';
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg><div class="x-new-msg-dot"></div>';
    fab.addEventListener('click', function () {
      var body = document.getElementById('conv-body');
      if (body) body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
    });
    overlay.appendChild(fab);
  }

  // ── 监听滚动显示/隐藏 FAB + 导航阴影 ──
  function attachScrollWatcher(overlay) {
    var body = document.getElementById('conv-body');
    var nav = overlay.querySelector('.conv-nav');
    var fab = overlay.querySelector('.x-scroll-fab');
    if (!body) return;
    var ticking = false;
    body.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var dist = body.scrollHeight - body.scrollTop - body.clientHeight;
        if (fab) fab.classList.toggle('show', dist > 150);
        if (nav) nav.classList.toggle('x-scrolled', body.scrollTop > 20);
      });
    }, { passive: true });
  }

  // ── 输入框焦点/字数 ──
  function enhanceInput(overlay) {
    var wrap = overlay.querySelector('.conv-input-wrap');
    var field = document.getElementById('conv-input-field');
    if (!wrap || !field) return;

    // 字数统计
    var counter = document.createElement('div');
    counter.className = 'x-char-count';
    wrap.style.position = 'relative';
    // Place it outside the flow above the wrap
    wrap.parentElement.insertBefore(counter, wrap);
    counter.style.position = 'absolute';
    counter.style.right = '28px';
    counter.style.bottom = (wrap.offsetHeight + 6) + 'px';
    counter.style.zIndex = '11';

    // 监听焦点
    field.addEventListener('focus', function () { wrap.classList.add('x-focused'); });
    field.addEventListener('blur', function () { wrap.classList.remove('x-focused'); });

    // 监听输入
    field.addEventListener('input', function () {
      var len = field.value.length;
      if (len > 20) {
        counter.textContent = len;
        counter.classList.add('show');
        counter.classList.toggle('warn', len > 500);
      } else {
        counter.classList.remove('show');
      }
    });
  }

  // ── 发送脉冲 ──
  function enhanceSendBtn(overlay) {
    var btn = overlay.querySelector('.conv-send-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      btn.classList.remove('x-pulse');
      void btn.offsetWidth; // force reflow
      btn.classList.add('x-pulse');
    });
    btn.addEventListener('animationend', function () { btn.classList.remove('x-pulse'); });
  }

  // ── 时间戳切换 ──
  function injectTimeToggle(overlay) {
    var actions = overlay.querySelector('.conv-nav-actions');
    if (!actions || actions.querySelector('.x-time-toggle')) return;
    var btn = document.createElement('div');
    btn.className = 'x-time-toggle';
    btn.title = '显示/隐藏时间';
    btn.setAttribute('aria-label', '显示/隐藏时间');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.4l-3.7 2.2a.8.8 0 01-.8-1.4L12 11V6.5a.8.8 0 011.6 0v4.5l.2.1a.8.8 0 01-.8 1.3z"/></svg>';
    btn.addEventListener('click', function () {
      overlay.classList.toggle('x-time-all');
      btn.classList.toggle('active', overlay.classList.contains('x-time-all'));
    });
    // Insert before the last button (settings dots)
    var settingsBtn = actions.children[actions.children.length - 1];
    actions.insertBefore(btn, settingsBtn);
  }

  // ── 气泡点击展开单条时间 ──
  function attachBubbleTimeToggle() {
    document.addEventListener('click', function (e) {
      var bubble = e.target.closest && e.target.closest('.conv-bubble');
      if (!bubble) return;
      var group = bubble.closest('.conv-group');
      if (!group) return;
      // 如果按住了长按菜单相关状态则不触发
      if (document.querySelector('.conv-msg-menu')) return;
      group.classList.toggle('x-time-open');
    }, true);
  }


  // ═══════════════════════════════════════
  // 设置界面增强逻辑
  // ═══════════════════════════════════════

  // ── 搜索实时过滤 ──
  function enhanceSettingsSearch() {
    var root = document.getElementById('settings-home-root');
    if (!root) return;
    var input = root.querySelector('.settings-search input');
    if (!input || input._xBound) return;
    input._xBound = true;

    input.addEventListener('input', function () {
      var q = (input.value || '').trim().toLowerCase();
      var sections = root.querySelectorAll('.settings-section');
      sections.forEach(function (sec) {
        var rows = sec.querySelectorAll('.settings-row');
        var anyVisible = false;
        rows.forEach(function (row) {
          var nameEl = row.querySelector('.settings-name');
          var valEl = row.querySelector('.settings-value');
          var text = ((nameEl ? nameEl.textContent : '') + ' ' + (valEl ? valEl.textContent : '')).toLowerCase();
          var match = !q || text.indexOf(q) !== -1;
          row.classList.toggle('x-hidden', !match);
          if (match) anyVisible = true;
        });
        sec.classList.toggle('x-hidden', !anyVisible && !!q);
      });
    });
  }

  // ── 开关切换增强（点击后微弹） ──
  function enhanceToggles() {
    document.addEventListener('click', function (e) {
      var sw = e.target.closest && e.target.closest('.settings-switch');
      if (!sw) return;
      // 已有原始 toggle 逻辑 (onclick)
      // 加一个微弹效果
      sw.style.transform = 'scale(.92)';
      setTimeout(function () { sw.style.transform = ''; }, 150);
    });
  }


  // ═══════════════════════════════════════
  // 生命周期挂载
  // ═══════════════════════════════════════

  // 监听聊天对话打开
  var _observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      for (var i = 0; i < m.addedNodes.length; i++) {
        var node = m.addedNodes[i];
        if (!node.classList) continue;

        // 聊天对话 overlay 被添加
        if (node.classList.contains('conv-overlay') || (node.querySelector && node.querySelector('.conv-overlay'))) {
          var overlay = node.classList.contains('conv-overlay') ? node : node.querySelector('.conv-overlay');
          if (overlay) {
            setTimeout(function () {
              injectScrollFab(overlay);
              attachScrollWatcher(overlay);
              enhanceInput(overlay);
              enhanceSendBtn(overlay);
              injectTimeToggle(overlay);
            }, 80);
          }
        }
      }
    });
  });
  _observer.observe(document.body, { childList: true, subtree: true });

  // 监听设置 App 打开
  XSJ.onAppOpen(function (name) {
    if (name === 'settings') {
      setTimeout(enhanceSettingsSearch, 100);
    }
  });

  // 全局：气泡时间点击、开关增强
  attachBubbleTimeToggle();
  enhanceToggles();

  console.log('[模块] ui-enhance 已加载');
})();
