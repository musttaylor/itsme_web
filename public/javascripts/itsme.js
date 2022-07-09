// Custom JS

(()=> {
    // nav_toggle
    document.querySelector('.navbar-toggler').addEventListener('click',() => {        
        nav_toggle()
    })

    // nav link-toggle
    document.getElementById('nav_button_brand').addEventListener('click',() => {        
        nav_toggle()
    })

    document.getElementById('nav_button_char').addEventListener('click',() => {        
        nav_toggle()
    })
    document.getElementById('nav_button_goods').addEventListener('click',() => {        
        nav_toggle()
    })
    document.getElementById('nav_button_faq').addEventListener('click',() => {        
        nav_toggle()
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

function nav_toggle() {
    let navBtn = document.querySelector('.navbar-collapse')
    let status = navBtn.style.display
    navBtn.style.display = (status == 'block') ? 'none' : 'block'
    
    if (navBtn.style.display == 'block') {
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