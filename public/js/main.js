const menuBtn = document.querySelector('.menu-icon')
const navLinks = document.querySelector('.nav-links')
const nav = document.querySelector('nav')
const currentYear = document.querySelector('.date')

let bubbleMaker = true
//animate body
setTimeout(() => {
    
    document.body.classList.add('body-fade-in')
    
}, 150);

window.onbeforeunload = function() {
    myfun()
    alert('Bye.');
}
function myfun(){
    // Write your business logic here
    console.log('hello');
}
//date in footer
const date = new Date()
currentYear.innerText = date.getFullYear()

//currency formatter
const currencyFormatter = new Intl.NumberFormat(undefined, {style: "currency", currency: "USD"})

//navbar links hide-show logic
menuBtn.addEventListener('click', toggleLinks)

window.addEventListener('resize', ()=>{
    if(window.innerWidth < 600){
        
        nav.classList.add('hide-links')
    }
    
});

nav.addEventListener('click', (e)=>{
    
    if(window.innerWidth < 600 && 
        (e.target.classList.contains('nav-link') )
        ){
        toggleLinks()
    }
})

function toggleLinks(){
    nav.classList.toggle('hide-links')
}



function makeBubble(){
    if(!bubbleMaker){
        return
    }
    const bubble = document.createElement('div')
    bubble.innerHTML = `<svg class="bubble" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="39.5664" cy="39.5664" r="28.1867" transform="rotate(141.982 39.5664 39.5664)" fill="url(#paint0_radial)"/>
    <circle cx="39.5664" cy="39.5664" r="27.1867" transform="rotate(141.982 39.5664 39.5664)" stroke="url(#paint1_linear)" stroke-opacity="0.3" stroke-width="2"/>
    <defs>
    <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.6 40.8388) rotate(-150.406) scale(47.8277 47.3846)">
    <stop stop-color="#FEFEFE" stop-opacity="0.61"/>
    <stop offset="0.536458" stop-color="#EDD1D1" stop-opacity="0.61"/>
    <stop offset="0.645833"/>
    </radialGradient>
    <linearGradient id="paint1_linear" x1="11.3797" y1="11.3797" x2="79.1504" y2="34.8666" gradientUnits="userSpaceOnUse">
    <stop offset="0.0182856" stop-color="white" stop-opacity="0"/>
    <stop offset="1" stop-color="white" stop-opacity="0.13"/>
    </linearGradient>
    </defs>
    </svg>
    
    `
    function getRandomInt(min, max) {      
        return Math.random() * (max - min) + min;
      }
    const radius = getRandomInt(0.6,2,4)
    console.log(radius);
    const left = Math.floor(Math.random() * window.innerWidth - 100)
    // bubble.style.background = 'url(../img/deco/Ellipse3.svg)'
    
    bubble.style.position = `absolute`
    bubble.style.transform = `scale(${radius})`
    bubble.children[0].style.left = left + 'px'
    document.body.querySelector('.bubble-birth').appendChild(bubble)

    setTimeout(() => {
        bubble.remove()
    }, 11000);
    setTimeout(() => {
        makeBubble()
    }, getRandomInt(100, 700));
}
function stopBubbles(){
    bubbleMaker = false
}
document.querySelector('.stop-bubbles').onclick = stopBubbles

makeBubble()