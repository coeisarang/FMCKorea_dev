(function () {
    'use strict';

    const fileName = (location.pathname.split('/').pop() || '').toLowerCase();
    if (!fileName || fileName === 'index.html') return;

    const adminMenu = [
        { id: 'gnb_01', label: '거래처 승인', href: 'fmc4.html' },
        { id: 'gnb_02', label: '거래처 관리', href: 'fmc5.html' },
        { id: 'gnb_03', label: 'STL 완료 리스트', href: 'fmc6.html' },
        { id: 'gnb_04', label: 'STL 시뮬레이션', href: 'fmc9.html' },
        { id: 'gnb_05', label: '견적 리스트', href: 'fmc14.html' },
        { id: 'gnb_06', label: '계약 리스트', href: 'fmc15.html' },
        { id: 'gnb_07', label: 'Billing 리스트', href: 'fmc16.html' }
    ];

    const salesMenu = [
        { id: 'gnb_03', label: 'STL 완료 리스트', href: 'fmc6.html' },
        { id: 'gnb_04', label: 'STL 시뮬레이션', href: 'fmc9.html' },
        { id: 'gnb_05', label: 'Open price 시뮬레이션', href: 'fmc25.html' }
    ];

    const mode = sessionStorage.getItem('fmcLoginMode') === 'admin' ? 'admin' : 'sales';
    const menu = mode === 'admin' ? adminMenu : salesMenu;
    const currentMenu = adminMenu.concat(salesMenu).find(function (item) {
        return fileName === item.href.toLowerCase();
    });
    const currentPageLabel = currentMenu ? currentMenu.label : (document.title || '현재 페이지');

    function menuHtml() {
        return menu.map(function (item) {
            const on = fileName === item.href.toLowerCase() ? ' class="on"' : '';
            return '<li><a href="' + item.href + '" id="' + item.id + '"' + on +
                ' title="' + item.label + '">' + item.label + '</a></li>';
        }).join('');
    }

    function init() {
        if (document.body.classList.contains('fmc-layout-ready')) return;

        const movableNodes = Array.from(document.body.childNodes).filter(function (node) {
            return !(node.nodeType === 1 && node.tagName === 'SCRIPT');
        });

        const wrap = document.createElement('article');
        wrap.className = 'fre_wrap fl';
        wrap.innerHTML =
            '<section class="left_gnb">' +
                '<h1>프레제니우스메디컬케어</h1>' +
                '<a href="javascript:void(0)" class="btn_menu" title="메뉴 숨기기">메뉴 숨기기</a>' +
                '<ul class="gnb_group">' + menuHtml() + '</ul>' +
            '</section>' +
            '<section class="content_wrap">' +
                '<header>' +
                    '<ul class="info_group fl-right">' +
                        '<li>글로벌마케팅팀</li>' +
                        '<li><strong>김민수</strong>님</li>' +
                        '<li class="myinfo">' +
                            '<a href="javascript:void(0)" class="btn_setting" title="마이인포">마이인포</a>' +
                            '<ul class="myinfo_menu">' +
                                '<li><a href="javascript:void(0)" class="my_info fl-center">내정보</a></li>' +
                                '<li><a href="javascript:void(0)" class="pass_change fl-center">비밀번호 변경</a></li>' +
                                '<li><a href="javascript:void(0)" class="mode_change fl-center">모드 전환</a></li>' +
                                '<li><button type="button" class="logout fl-center">로그아웃</button></li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</header>' +
                '<div class="top_title common-top-title">' +
                    '<div class="guide_depth">' +
                        '<a href="fmc4.html" class="home">HOME</a>' +
                        '<span class="navi">' + currentPageLabel + '</span>' +
                    '</div>' +
                '</div>' +
                '<section class="content_group"></section>' +
            '</section>';

        const footer = document.createElement('footer');
        footer.className = 'footer fl-center';
        footer.textContent = 'Copyright (주)프레제니우스메디칼케어코리아 2026. all rights reserved.';

        document.body.insertBefore(wrap, document.body.firstChild);
        document.body.appendChild(footer);

        const contentGroup = wrap.querySelector('.content_group');
        movableNodes.forEach(function (node) { contentGroup.appendChild(node); });

        document.body.classList.add('fmc-layout-ready');

        const leftGnb = wrap.querySelector('.left_gnb');
        const contentWrap = wrap.querySelector('.content_wrap');
        const menuButton = wrap.querySelector('.btn_menu');

        if (localStorage.getItem('fmcMenuCollapsed') === '1') {
            leftGnb.classList.add('on');
            contentWrap.classList.add('on');
            menuButton.classList.add('on');
        }

        menuButton.addEventListener('click', function () {
            leftGnb.classList.toggle('on');
            contentWrap.classList.toggle('on');
            menuButton.classList.toggle('on');
            localStorage.setItem('fmcMenuCollapsed', leftGnb.classList.contains('on') ? '1' : '0');
        });

        const settingButton = wrap.querySelector('.btn_setting');
        const myInfoMenu = wrap.querySelector('.myinfo_menu');
        settingButton.addEventListener('click', function (e) {
            e.stopPropagation();
            myInfoMenu.classList.toggle('on');
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.myinfo')) myInfoMenu.classList.remove('on');
        });

        wrap.querySelector('.mode_change').addEventListener('click', function () {
            const nextMode = mode === 'admin' ? 'sales' : 'admin';
            sessionStorage.setItem('fmcLoginMode', nextMode);
            location.reload();
        });

        wrap.querySelector('.logout').addEventListener('click', function () {
            sessionStorage.removeItem('fmcLoginMode');
            location.href = 'index.html';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
