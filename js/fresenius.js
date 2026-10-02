const Request = function () {
    this.getParameter = function (name) {
        var rtnval = '';
        var nowAddress = unescape(location.href);
        var parameters = (
            nowAddress.slice(nowAddress.indexOf('?') + 1, nowAddress.length)
        ).split('&');
        for (var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == name.toUpperCase()) {
                rtnval = parameters[i].split('=')[1];
                break;
            }
        }
        return rtnval;
    }
}

const request = new Request();
const url_page = request.getParameter('page');

// 페이지 로딩 및 에러 처리를 위한 함수
function loadPage(pageFileName) {
    $('.content_group').load(pageFileName + ".html", function(response, status, xhr) {
        // 파일이 존재하지 않거나 로드 실패 시 guide.html을 대신 로드
        if (status == "error") {
            console.log(pageFileName + ".html 파일이 없어 guide.html로 대체 로드합니다.");
            if (pageFileName !== "guide") {
                loadPage("guide");
            }
            return;
        }

        // ==========================================
        // 페이지 로드가 완전히 끝난 뒤에 실행되어야 하는 스크립트들
        // ==========================================

        // STL 시뮬레이션 제품 클릭 토글
        const listItems = document.querySelectorAll('.product_select li');
        listItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('on');
            });
        });

        const arrowBtn = document.querySelector('.btn_hide');
        const tableList = document.querySelector('.table_list');
        if (arrowBtn && tableList) {
            arrowBtn.addEventListener('click', () => {
                tableList.classList.toggle('on');
                arrowBtn.classList.toggle('on');
            });
        }

        // 레인지 슬라이더 그라데이션 인터랙션
        const rangeInput = document.getElementById('rangeInput');
        if (rangeInput) {
            // 그라데이션 업데이트 함수
            const updateRangeBackground = (input) => {
                const value = input.value;
                const max = input.max || 100;
                const min = input.min || 0;
                const percentage = ((value - min) / (max - min)) * 100;
                input.style.background = `linear-gradient(to right, #0033A0 ${percentage}%, #ddd ${percentage}%)`;
            };

            // 페이지 로드 직후 초기값 설정
            updateRangeBackground(rangeInput);

            // 값이 바뀔 때
            rangeInput.addEventListener('input', (e) => {
                updateRangeBackground(e.target);
            });
        }

        //장비선택/필요대수에서 체크박스 클릭했을때 li에 선택표시
        const checkboxEls = document.querySelectorAll('.product_num li input[type="checkbox"]');
        checkboxEls.forEach(checkbox => {
            const parentLi = checkbox.closest('li');
            if (parentLi && checkbox.checked) {
                parentLi.classList.add('on');
            }
            checkbox.addEventListener('change', function() {
                const li = this.closest('li');
                if (li) {
                    if (this.checked) {
                        li.classList.add('on');
                    } else {
                        li.classList.remove('on');
                    }

                }
            });
        });

        //테이블의 체크박스를 체크했을때  tr에 선택표시
        const  TREls = document.querySelectorAll('.table_list.small input[type="checkbox"]');
        TREls.forEach(checkbox => {
            const parentTr = checkbox.closest('tr');
            if (parentTr && checkbox.checked) {
                parentTr.classList.add('on');
            }
            checkbox.addEventListener('change', function() {
                const Tr = this.closest('tr');
                if (Tr) {
                    if (this.checked) {
                        Tr.classList.add('on');
                    } else {
                        Tr.classList.remove('on');
                    }

                }
            });
        });

        //테이블의 전체선택 전체해제 스크립트
        const checkAll = document.querySelector('#checkAll');
        const items = document.querySelectorAll('.table_list.small tbody input[type="checkbox"]');


        checkAll?.addEventListener('change', () => {
            items.forEach(chk => {
                chk.checked = checkAll.checked;
                chk.closest('tr')?.classList.toggle('on', checkAll.checked);
            });
        });

        items.forEach(chk => {
            chk.addEventListener('change', () => {
                checkAll.checked = items.length === document.querySelectorAll('.table_list tbody input[type="checkbox"]:checked').length;
            });
        });

    });
}

//페이지로딩
$(function(){
    let targetPage = "guide"; // 기본값 (확장자 제외)

    if (url_page != "") {
        const split_page = url_page.split("/");
        const page = split_page[0];

        targetPage = page;

        // GNB 활성화 처리
        if(page == 'ClientList'){
            $('#gnb_01').addClass('on');
        } else if(page == 'STLSimulation' || page == 'STL_step01' || page == 'STL_step02' || page == 'STL_step03'){
            $('#gnb_02').addClass('on');
        } else if(page == 'QuoteList'){
            $('#gnb_03').addClass('on');
        } else if(page == 'ContractList'){
            $('#gnb_04').addClass('on');
        } else if(page == 'BillingList'){
            $('#gnb_05').addClass('on');
        }
    }

    // 페이지 로드 실행
    loadPage(targetPage);

    // --- 메뉴 닫고 열기 토글---
    const mainMeun = document.querySelector('.btn_menu');
    const leftGnbEl = document.querySelector('.left_gnb');
    const contentWrapEl = document.querySelector('.content_wrap');

    if (mainMeun) {
        mainMeun.addEventListener('click', () => {
            mainMeun.classList.toggle('on');
            if (leftGnbEl) leftGnbEl.classList.toggle('on');
            if (contentWrapEl) contentWrapEl.classList.toggle('on');
        });
    }

    //나의정보 클릭 레이어 토클
    const myInfo = document.querySelector('.btn_setting');
    const subMyInfoEl = document.querySelector('.myinfo_menu');
    const layerLinks = subMyInfoEl.querySelectorAll('a');
    myInfo.addEventListener('click',()=>{
    subMyInfoEl.classList.toggle('on')
    });
    const subMyInfoMenuEl = document.querySelector('.myinfo_menu a');
    subMyInfoMenuEl.addEventListener('click',()=>{
    subMyInfoEl.classList.remove('on');
    });
    layerLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            subMyInfoEl.classList.remove('on');
        });
    });
});


// 팝업
function openPop(url,w,h){
    window.open(url,"openpopup","width="+w+", height="+h+", top=10, left=10");
}

// 레이어팝업 불러오기
function ly_popup(url){
    $(".ly_popup").addClass('on');
    $('.ly_contents').load(url);$('body').css('overflow','hidden');
}
function ly_close() {
    $(".ly_popup").removeClass('on');
    $('body').css('overflow','auto');$('.alert_wrap').removeClass('on');
}

// 알럿
function alert(msg,bturl,btnN){
    $('.alert_wrap').addClass('on');$('.alert_wrap .content').html(msg);

    if ('' == bturl || null == bturl || undefined == bturl) {
        $('.alert_wrap .btn_area a.submit').attr("href", "javascript:alert_close();");
    } else {
        $('.alert_wrap .btn_area a.submit').attr("href", bturl);
    }

    if('' == btnN || null == btnN || undefined == btnN){
        $('.alert_wrap  .btn_area a.cancel').hide();$('.alert_wrap  .btn_area a.submit').addClass('one');
    } else {
        $('.alert_wrap  .btn_area a.cancel').show();$('.alert_wrap  .btn_area a.submit').removeClass('one');
    }   
}

// 알럿닫기
function alert_close(){
    $('.alert_wrap').removeClass('on');$('.alert_wrap .content').html('');
}

//파일업로드
function fileChange() {
	const curEl = document.querySelector('#fileUpload').value.split("\\").pop();
	const fileNameEl = document.querySelector('#fileNm');
	fileNameEl.value = curEl;
}