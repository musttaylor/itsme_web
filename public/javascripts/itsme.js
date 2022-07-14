// Custom JS

var g_lang = 'ko';

(()=> {
    console.clear();

    var type = navigator.appName;

    var lang;
    if (type=="Netscape") {
        lang = navigator.language;
    } else {
        lang = navigator.userLanguage;
    }

    // 국가코드에서 앞 2글자만 자름
    g_lang = lang.substr(0,2)

    //reloc();
    
    /* show & hide func  Test 
    document.getElementById('testButton').addEventListener('click',() => {   
        console.log('clicked_test');  
        var testEl = document.getElementById('text_intro');
        console.log('clicked_test - text_intro =' + testEl);     
        console.log('clicked_test - text_intro.style.display =' + testEl.style.display);
        if (testEl.style.display == "none") {
            testEl.style.display = "block";    
        } else {
            testEl.style.display = "none";
        }
        
    })
    */

    document.getElementById('testButton').addEventListener('click',() => {   
        console.log('clicked_test');  
        g_lang = ('ko' == g_lang) ? 'en' : 'ko';
        console.log('clicked_test - g_lang =' + g_lang);     

        reloc();
    })

    /*
    // animation on scroll
    AOS.init({
        //once:true,
        duration:800,
        easing: 'ease',
    });
    */


    // 3차 visual stroy slick 적용

    var screenWidth = (1116 < window.innerWidth) ? 1116 : window.innerWidth;
    var video_width = (575 < window.innerWidth) ? 546 : 356;
    var video_center_padding = (575 < window.innerWidth) ? (screenWidth - video_width - 50) / 2 : 0;

    //console.log(window.innerWidth);
    //console.log(screenWidth);
    //console.log(video_width);
    //console.log(video_center_padding);

    

    $('.v-story-slider').slick({
        dots:false,
        draggable:true,
        arrows:true,
        adaptiveHeight:true,
        centerMode:true,
        //centerPadding:'20vw',
        centerPadding: video_center_padding.toString() + 'px',
        responsive: [
            /*
            {
            breakpoint: 575,
            settings: {
                centerPadding:'0',
                //arrows:false,
            }
            },
            */
        ],
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        /* 자바스크립트
        if (currentSlide !== nextSlide) {
            document.querySelectorAll('.slick-center + .slick-cloned').forEach((next) => {
                // timeout required or Slick will overwrite the classes
                setTimeout(() => next.classList.add('slick-current', 'slick-center'));
            });
        }
        */
        // IE 호환성을 고려한 제이쿼리
        if (currentSlide !== nextSlide) {
            $('.slick-center + .slick-cloned').each(function(index, node) {
                var $node = $(node);
                
                setTimeout(function() {
                    $node.addClass('slick-current');
                    $node.addClass('slick-center');
                });
            });
        }
    }); // 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때도 트랜지션이 적용되기 위한 코드입니다. (centerMode 에서)

    // nav_toggle
    document.querySelector('.navbar-toggler').addEventListener('click',() => {        
        nav_toggle()
    })

    // nav link-toggle
    document.getElementById('nav_button_brand').addEventListener('click',() => {        
        nav_menu_click()
    })

    document.getElementById('nav_button_char').addEventListener('click',() => {        
        nav_menu_click()
    })
    document.getElementById('nav_button_goods').addEventListener('click',() => {        
        nav_menu_click()
    })
    document.getElementById('nav_button_faq').addEventListener('click',() => {        
        nav_menu_click()
    })
    

    // 기본으로 첫 번째 탭 선택
    char_selected('tab_char_01')

    document.getElementById('tab_char_01').addEventListener('click',() => {        
        char_selected('tab_char_01')
    })
    document.getElementById('tab_char_02').addEventListener('click',() => {        
        char_selected('tab_char_02')
    })
    document.getElementById('tab_char_03').addEventListener('click',() => {        
        char_selected('tab_char_03')
    })
    document.getElementById('tab_char_04').addEventListener('click',() => {        
        char_selected('tab_char_04')
    })
    document.getElementById('tab_char_05').addEventListener('click',() => {        
        char_selected('tab_char_05')
    })
    
    document.forms["contact-form"].addEventListener("submit", async (event) => {        
        event.preventDefault() // 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정
        
        // 내부 서버에 입력 데이터 전송
        let resp = await fetch(event.target.action, {
          method: "POST",
          body: new URLSearchParams(new FormData(event.target)),
        })
        
        const body = await resp.json() // 응답데이터 확인
        if(body.result == "success") {
            alert("전송 완료")
        }else {
            alert("전송 오류")
        }
      })
    })()

function reloc() {
    var arrHref = window.location.href.split('/');
    var curLoc = arrHref[arrHref.length-1]
    console.log(curLoc);

    // 한글인 경우 한글페이지로 이동
    if (g_lang.toString() == "ko")
    {
        var newLoc = 'index.html'
        if (curLoc != newLoc) {
            window.location.replace(newLoc);
        }
    }
    // 다른 언어인 경우 영문페이지로 이동
    else {
        var newLoc = 'index_en.html'
        if (curLoc != newLoc) {
            window.location.replace(newLoc);
        }
    }

}

function nav_menu_click() {
    if (992 <= window.innerWidth) {
        return;
    }

    nav_toggle()
}

function nav_toggle() {
    let navCol = document.querySelector('.navbar-collapse')
    let status = navCol.style.display
    navCol.style.display = (status == 'block') ? 'none' : 'block'
    
    if (navCol.style.display == 'block') {
        // toggled
        document.getElementById('toggle-btn').setAttribute('src','./resources/button_nav_toggle_x.png');
        document.getElementById('nav_container').setAttribute('style','background-color: #ffffff; background-image: url("./resources/nav_bg__toggled.png"); background-repeat: no-repeat; background-position: right top;');
        document.getElementById('nav_inner_container').setAttribute('style','position: relative; margin-top: 50px;');
    } else {
        // default
        document.getElementById('toggle-btn').setAttribute('src','./resources/button_nav_toggle.png');
        document.getElementById('nav_container').setAttribute('style','background-color: transparent; background-image: none');
        document.getElementById('nav_inner_container').setAttribute('style','position: absolute; margin-top: 0px; right: 0px;');
    }
}

function char_selected(id) {
    var tabList = [
        ['tab_char_01', 'char_default_01', 'char_selected_01'],
        ['tab_char_02', 'char_default_02', 'char_selected_02'],
        ['tab_char_03', 'char_default_03', 'char_selected_03'],
        ['tab_char_04', 'char_default_04', 'char_selected_04'],
        ['tab_char_05', 'char_default_05', 'char_selected_05']
    ];
     
     //   'list-profile-list', 'list-messages-list', 'list-settings-list', 'list-settings2-list'];

    for (var idx in tabList) {
        var tempData = tabList[idx]
        var tempId = tempData[0]; 
        //console.log(tempId);
        let charTab = document.getElementById(tempId.toString());
        let charImg = charTab.querySelector('#list-tab-item');

        if (tempId == id) {
            //charImg.setAttribute('style','background-image: url("./resources/char_selected_s.png"); background-repeat: no-repeat; background-position: center;');
            charImg.setAttribute('src','./resources/' + tempData[2].toString() + '.png');
        } else {
            charImg.setAttribute('src','./resources/' + tempData[1].toString() + '.png');
        }
    }
}