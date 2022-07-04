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
})()