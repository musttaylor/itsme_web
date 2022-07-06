// Custom JS

/*
const firstTabEl = document.querySelector('#myTab a')
const firstTab = new bootstrap.Tab(firstTabEl)

firstTab.show()
*/


(()=> {
    document.querySelector('.navbar-toggler').addEventListener('click',() => {        
        let navBtn = document.querySelector('.navbar-collapse')
        let status = navBtn.style.display
        navBtn.style.display = (status == 'block') ? 'none' : 'block'
        
        if (navBtn.style.display == 'block') {
            // toggled
            document.getElementById('toggle-btn').setAttribute('src','./resources/button_nav_toggle_x.png');
            document.getElementById('nav_container').setAttribute('style','background-color: #ffffff; background-image: url("./resources/nav_bg__toggled.png");');
            document.getElementById('nav_inner_container').setAttribute('style','position: relative; margin-top: 50px;');
        } else {
            // default
            document.getElementById('toggle-btn').setAttribute('src','./resources/button_nav_toggle.png');
            document.getElementById('nav_container').setAttribute('style','background-color: transparent; background-image: none');
            document.getElementById('nav_inner_container').setAttribute('style','position: absolute; margin-top: 0px; right: 0px;');
        }
    })

    document.getElementById('list-home-list').addEventListener('click',() => {        
        char_selected('list-home-list')
    })
    document.getElementById('list-profile-list').addEventListener('click',() => {        
        char_selected('list-profile-list')
    })
    document.getElementById('list-messages-list').addEventListener('click',() => {        
        char_selected('list-messages-list')
    })
    document.getElementById('list-settings-list').addEventListener('click',() => {        
        char_selected('list-settings-list')
    })
    document.getElementById('list-settings2-list').addEventListener('click',() => {        
        char_selected('list-settings2-list')
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


function char_selected(id) {
    var tabList = ['list-home-list', 'list-profile-list', 'list-messages-list', 'list-settings-list', 'list-settings2-list'];

    for (var idx in tabList) {
        var tempId = tabList[idx]; 
        //console.log(tempId);
        let charTab = document.getElementById(tempId.toString());
        let charImg = charTab.querySelector('#list-tab-item');

        if (tempId == id) {
            charImg.setAttribute('style','background-image: url("./resources/char_selected_s.png"); background-repeat: no-repeat; background-position: center;');
        } else {
            charImg.setAttribute('style','background-image: none;');
        }
    }
}