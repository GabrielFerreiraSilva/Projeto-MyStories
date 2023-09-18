function moveMenu(){
    const sideMenu = document.querySelector(".side-menu");
    const smStyle = window.getComputedStyle(sideMenu);
    const mainContent = document.querySelector(".main-content");


    if(smStyle.getPropertyValue("left") == "0px"){
        sideMenu.classList.toggle('open');
        mainContent.classList.toggle('open');
    }
    else{
        sideMenu.classList.toggle('open');
        mainContent.classList.toggle('open');
    }
    
}