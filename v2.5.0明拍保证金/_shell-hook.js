/**
 * 中古优品 · APP 原型 shell 钩子
 * 注入到每个设计稿页面,iframe 内部点击委托 → postMessage 给 app-preview shell
 * file:// 友好(不依赖父页面访问 iframe DOM)
 */
(function () {
  if (window.parent === window) return; // 单页直接打开,不启用

  var currentPage = (window.location.pathname.split('/').pop() || '').toLowerCase();

  // ─────────── 路由 helper ───────────
  function postNav(page)  { if (page) window.parent.postMessage({ type: 'shell-nav', page: page }, '*'); }
  function postToast(msg) { window.parent.postMessage({ type: 'shell-toast', msg: msg }, '*'); }
  function postBack()     { window.parent.postMessage({ type: 'shell-back' }, '*'); }

  // 把 toast / back 暴露给 ctxMap 内的箭头函数使用
  var toast = postToast;
  var back  = postBack;

  // ─────────── 上下文化跳转规则 ───────────
  // value:
  //   string                  → 跳转该页面
  //   null                    → 让 iframe 内部处理(skip)
  //   function(el) → string   → 动态决定目标
  var ctxMap = {
    // ─── 首页 ───
    'home_v0.2.html': {
      '.icon-btn[title="消息"]':  function () { toast('消息页 v0.4'); return null; },
      '.icon-btn[title="购物袋"]':'cart_v0.2.html',
      '.banner-slide':   function () { toast('Banner 落地页待配置'); return null; },
      '.announce-item':  function () { toast('公告详情 v0.4'); return null; },
      '.quick-item': function (el) {
        var label = (el.querySelector('.quick-label') || {}).textContent || '';
        label = label.trim();
        if (label === '我的中拍') return 'cart_v0.2.html';
        if (label === '待付款')   return 'my-orders_v0.2.html';
        if (label === '待发货')   return 'my-orders_v0.2.html';
        if (label === '保证金')   return 'deposit_v0.2.html';
        return null;
      },
      '.channel.mingpai-ch': 'mingpai_v0.2.html',
      '.channel.anpai-ch':   'anpai_v0.2.html',
      '.channel.live-ch':    function () { toast('直播 v0.4'); return null; },
      '.mp-item':            'mingpai-detail_v0.2.html',
      '.mp-go':              'mingpai-detail_v0.2.html',
      '.mp-more':            'mingpai_v0.2.html',
      '.anpai-stage':        'anpai_v0.2.html',
      '.anpai-mine':         'anpai_v0.2.html',
      '.session-item':       function () { toast('直播间 v0.4'); return null; },
      '.hot-item': function (el) {
        if (el.querySelector('.hot-channel-tag.anpai'))   return 'anpai-detail_v0.2.html';
        if (el.querySelector('.hot-channel-tag.mingpai')) return 'mingpai-detail_v0.2.html';
        if (el.querySelector('.hot-channel-tag.live'))    { toast('直播间 v0.4'); return null; }
        return 'mingpai-detail_v0.2.html';
      },
      '.hot-rule':           function () { toast('热门排序规则'); return null; },
      '.section-head .section-all': function () { toast('查看全部'); return null; }
    },

    // ─── 明拍主页 ───
    'mingpai_v0.2.html': {
      '.lot':        'mingpai-detail_v0.2.html',
      '.bid-btn':    'mingpai-bid_v0.2.html',
      '.remind-btn': function () { toast('已设开拍提醒'); return null; },
      '.star-btn':   function () { toast('已切换收藏'); return null; },
      '.tab-link':   null,
      'a[href*="rules"]':  'mingpai-rules_v0.2.html'
    },

    // ─── 我的竞拍 ───
    'favorites_v0.2.html': {
      '.ch-tab': null,
      '.item': function (el) {
        if (el.closest && el.closest('#pane-anpai')) return 'anpai-detail_v0.2.html';
        return 'mingpai-detail_v0.2.html';
      },
      '.go-detail': function () { return 'mingpai-detail_v0.2.html'; },
      '.fav-btn':   function () { toast('已切换收藏'); return null; }
    },

    // ─── 明拍详情 ───
    'mingpai-detail_v0.2.html': {
      '.bid-quick-add':       'mingpai-bid_v0.2.html',
      '.bid-proxy-btn':       'mingpai-proxy_v0.2.html',
      '#openProxy':           'mingpai-proxy_v0.2.html',
      '.my-status-edit':      'mingpai-proxy_v0.2.html',
      '.my-status-card':      'mingpai-proxy_v0.2.html',
      'a[href*="bid-history"]':'mingpai-bid-history_v0.2.html',
      'a[href*="rules"]':     'mingpai-rules_v0.2.html',
      '.bid-icon.fav':        function () { toast('已切换收藏'); return null; },
      '.title-tool.star':     function () { toast('已切换收藏'); return null; },
      '.title-tool.note':     function () { toast('打开笔记编辑'); return null; }
    },

    // ─── 暗拍主页 ───
    'anpai_v0.2.html': {
      '.goods':     'anpai-detail_v0.2.html',
      '.quick-bid': 'anpai-detail_v0.2.html',
      '.star-corner': function () { toast('已切换收藏'); return null; },
      '.anpai-rule': 'anpai-rules_v0.2.html',
      '.chip':      null,
      '.layout-toggle .lt-btn': null,
      '.sort-item': null
    },

    // ─── 暗拍详情 ───
    'anpai-detail_v0.2.html': {
      'a[href*="rules"]':  'anpai-rules_v0.2.html'
    },

    // ─── 购物袋 ───
    'cart_v0.2.html': {
      '.submit-btn, .checkout-btn, .pay-btn': 'order-confirm_v0.2.html',
      '.item-row, .cart-item':                'mingpai-detail_v0.2.html'
    },

    // ─── 订单确认 ───
    'order-confirm_v0.2.html': {
      '.submit-btn, .pay-btn, .confirm-btn':  'pay_v0.2.html',
      '.addr-card, .addr-head':               'address_v0.2.html'
    },

    // ─── 收银台 ───
    'pay_v0.2.html': {
      '.pay-now-btn, .confirm-pay, .submit-btn, .footer-btn': 'pay-result_v0.2.html'
    },

    // ─── 支付结果 ───
    'pay-result_v0.2.html': {
      '.go-orders, .btn-orders, [data-go="orders"]': 'my-orders_v0.2.html',
      '.go-home, .btn-home, [data-go="home"]':       'home_v0.2.html'
    },

    // ─── 个人中心 ───
    'profile_v0.2.html': {
      '.asset-card.deposit, .asset-card.deposit .asset-cta': 'deposit_v0.2.html',
      '.asset-card.ub': function () { toast('优币页 v0.4'); return null; },
      '.order-cell': function (el) {
        var lbl = (el.querySelector('.order-label') || {}).textContent || '';
        lbl = lbl.trim();
        if (lbl === '退款售后') { toast('退款售后 v0.4'); return null; }
        return 'my-orders_v0.2.html';
      },
      '.section-all': 'my-orders_v0.2.html',
      '.bid-entry, .bid-single, .bs-arrow': 'favorites_v0.2.html',
      '.tool': function (el) {
        var lbl = (el.querySelector('.tool-label') || {}).textContent || '';
        lbl = lbl.trim();
        if (lbl === '实名认证') return 'cert_v0.2.html';
        if (lbl === '地址管理') return 'address_v0.2.html';
        if (lbl === '意见反馈') { toast('意见反馈 v0.4'); return null; }
        if (lbl === '电话客服') { toast('客服 hotline'); return null; }
        return null;
      },
      '.menu-row, .row[data-go]': function (el) {
        var g = el.getAttribute('data-go');
        if (g === 'orders')  return 'my-orders_v0.2.html';
        if (g === 'deposit') return 'deposit_v0.2.html';
        if (g === 'address') return 'address_v0.2.html';
        if (g === 'bids')    return 'favorites_v0.2.html';
        if (g === 'cert')    return 'cert_v0.2.html';
        return null;
      },
      '.hero, .user-card, .avatar': function () { toast('账户资料 v0.4'); return null; },
      '.tag-credit': function () { toast('信用分详情 v0.4'); return null; }
    },

    // ─── 我的订单 ───
    'my-orders_v0.2.html': {
      '.act-btn.primary, .act-btn.danger-fill': 'pay_v0.2.html',
      '.act-btn': function (el) {
        var txt = (el.textContent || '').trim();
        if (txt.indexOf('支付') >= 0)    return 'pay_v0.2.html';
        if (txt.indexOf('物流') >= 0)    return 'logistics_v0.2.html';
        if (txt.indexOf('详情') >= 0)    return 'mingpai-detail_v0.2.html';
        if (txt.indexOf('证书') >= 0)    return 'cert_v0.2.html';
        if (txt.indexOf('地址') >= 0)    return 'address_v0.2.html';
        if (txt.indexOf('取消') >= 0)    { toast('取消订单'); return null; }
        if (txt.indexOf('确认收货') >= 0){ toast('已确认收货'); return null; }
        return null;
      },
      '.order-body, .order-img, .order-info': 'mingpai-detail_v0.2.html',
      '.o-tab': null
    },

    // ─── 保证金 ───
    'deposit_v0.2.html': {
      '.bond-recharge, .recharge-btn, .btn-recharge, .btn-pay': 'deposit-pay_v0.2.html',
      '.history-row, .record-row': function () { toast('扣款记录详情'); return null; }
    },

    // ─── 补交保证金 ───
    'deposit-pay_v0.2.html': {
      '.submit-btn, .pay-btn, button[type="submit"], .footer button': 'pay_v0.2.html'
    },

    // ─── 物流详情 ───
    'logistics_v0.2.html': {
      '.copy-btn': function () { toast('已复制单号'); return null; }
    },

    // ─── 收货地址 ───
    'address_v0.2.html': {
      '.addr-row, .addr-item': function () { toast('编辑地址 v0.4'); return null; },
      '.add-btn, .btn-add':    function () { toast('新增地址 v0.4'); return null; }
    }
  };

  var rules = ctxMap[currentPage] || {};
  var skipSelectors = [];
  var actionRules = [];
  Object.keys(rules).forEach(function (sel) {
    var target = rules[sel];
    if (target === null) skipSelectors.push(sel);
    else actionRules.push([sel, target]);
  });

  // ─────────── 是否主 tab 页 ───────────
  var TAB_PAGES = ['home_v0.2.html','favorites_v0.2.html','cart_v0.2.html','profile_v0.2.html'];
  var isTabPage = TAB_PAGES.indexOf(currentPage) >= 0;

  // ─────────── 注入 CSS:隐藏原 tabbar / 加 cursor:pointer ───────────
  function buildCss(tabbarVisible) {
    var pad = tabbarVisible ? 64 : 0;
    var css = '.tabbar{display:none !important;}\n' +
              '.phone{padding-bottom:' + pad + 'px !important;min-height:100vh !important;}\n' +
              'body{padding-bottom:' + pad + 'px;}\n' +
              // back / close 兜底 cursor 提示
              '.nav-back,.back-btn,.back-link,.back,.sheet-close,.modal-close,.close-btn,.close,' +
              '[data-close],[data-back],[data-dismiss],[aria-label*="返回"],[aria-label*="关闭"]' +
              '{cursor:pointer !important;}\n';
    if (actionRules.length) {
      actionRules.forEach(function (r) {
        css += r[0] + '{cursor:pointer !important;}\n';
      });
    }
    return css;
  }
  function applyStyles() {
    var style = document.querySelector('style[data-shell-hook]');
    if (!style) {
      style = document.createElement('style');
      style.setAttribute('data-shell-hook', 'true');
      (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = buildCss(isTabPage);
  }
  if (document.head) applyStyles();
  else document.addEventListener('DOMContentLoaded', applyStyles);

  // 监听 shell 通知 tabbar 显隐
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (d && d.type === 'tabbar-mode') {
      isTabPage = !!d.visible;
      applyStyles();
    }
  });

  // ─────────── 点击委托 ───────────
  document.addEventListener('click', function (e) {
    var el = e.target;
    var root = document.body || document.documentElement;
    var depth = 0;
    while (el && el !== root && depth++ < 30) {
      if (!el.matches) { el = el.parentElement; continue; }

      // skip:让 iframe 内部 tab 切换继续生效
      for (var s = 0; s < skipSelectors.length; s++) {
        try { if (el.matches(skipSelectors[s])) return; } catch (_) {}
      }

      // action
      for (var i = 0; i < actionRules.length; i++) {
        var sel = actionRules[i][0], target = actionRules[i][1];
        var matched = false;
        try { matched = el.matches(sel); } catch (_) {}
        if (!matched) continue;
        e.preventDefault();
        e.stopPropagation();
        var dest = null;
        try { dest = typeof target === 'function' ? target(el) : target; }
        catch (err) { console.warn('[hook]', err); }
        if (dest) postNav(dest);
        console.log('[hook] hit', sel, '→', dest || '(no-op)');
        return;
      }

      // a[href*.html] 兜底
      if (el.tagName === 'A') {
        var href = el.getAttribute('href');
        if (href && /\.html(\?|#|$)/.test(href) && !/^https?:\/\//.test(href)) {
          e.preventDefault();
          e.stopPropagation();
          postNav(href.replace(/[?#].*$/, ''));
          return;
        }
      }

      // 硬兜底:头部返回箭头 — capture 阶段直接 postBack
      // 这些是"返回上一页"的明确意图,不会和 inline modal 冲突
      var HARD_BACK = ['nav-back', 'back-btn', 'back-link', 'back'];
      if (el.classList) {
        for (var bi = 0; bi < HARD_BACK.length; bi++) {
          if (!el.classList.contains(HARD_BACK[bi])) continue;
          e.preventDefault();
          e.stopPropagation();
          postBack();
          return;
        }
      }
      // [data-back] / [aria-label*=返回] 也算硬兜底
      if (el.matches) {
        try {
          if (el.matches('[data-back]') || el.matches('[aria-label*="返回"]')) {
            e.preventDefault();
            e.stopPropagation();
            postBack();
            return;
          }
        } catch (_) {}
      }

      el = el.parentElement;
    }
  }, true);

  // ─────────── 软兜底:modal/sheet 关闭按钮(bubbling + 异步检测)───────────
  // 思路:页面 JS 优先关 modal;若 80ms 后 modal 仍显示,说明无 JS 处理 → 兜底 postBack
  var SOFT_CLOSE = ['modal-close', 'sheet-close', 'close-btn', 'close'];
  function matchesAnyClass(el, list) {
    if (!el || !el.classList) return false;
    for (var i = 0; i < list.length; i++) if (el.classList.contains(list[i])) return true;
    return false;
  }
  function findAncestor(el, depth, predicate) {
    var n = el; var d = 0;
    while (n && d++ < depth) { if (predicate(n)) return n; n = n.parentElement; }
    return null;
  }
  function ancestorModal(el) {
    return findAncestor(el, 12, function (n) {
      var c = n.className || '';
      if (typeof c !== 'string') return false;
      return /\b(modal|sheet|popup|dialog|bid-modal|proxy-modal|note-modal|anpai-bid-modal|drawer)\b/.test(c);
    });
  }
  function modalVisible(m) {
    if (!m) return false;
    if (m.classList && (m.classList.contains('show') || m.classList.contains('open') || m.classList.contains('active'))) return true;
    var s = window.getComputedStyle(m);
    return s && s.display !== 'none' && s.visibility !== 'hidden';
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    var el = e.target, root = document.body || document.documentElement, depth = 0, hit = null;
    while (el && el !== root && depth++ < 20) {
      if (matchesAnyClass(el, SOFT_CLOSE) ||
          (el.matches && (el.matches('[data-close]') || el.matches('[data-dismiss]') || el.matches('[aria-label*="关闭"]')))) {
        hit = el; break;
      }
      el = el.parentElement;
    }
    if (!hit) return;
    var modal = ancestorModal(hit);
    var wasVisible = modalVisible(modal);
    setTimeout(function () {
      // 80ms 后 modal 仍可见 → 页面 JS 没处理 → 兜底
      if (!modal || !wasVisible || modalVisible(modal)) postBack();
    }, 80);
  }, false);

  // 通知 shell 加载完成
  window.parent.postMessage({ type: 'shell-ready', page: currentPage, hooks: actionRules.length }, '*');
  console.log('[hook] active on', currentPage, '· actions:', actionRules.length, '· skips:', skipSelectors.length);
})();
