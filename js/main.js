const menuBtn = document.querySelector('.menu-icon')
const navLinks = document.querySelector('.nav-links')
const nav = document.querySelector('nav')
const currentYear = document.querySelector('.date')

//date in footer
const date = new Date()
currentYear.innerText = date.getFullYear()

//navbar links hide-show logic
menuBtn.addEventListener('click', toggleLinks)

window.addEventListener('resize', ()=>{
    if(window.innerWidth < 600){
        
        nav.classList.add('hide-links')
    }
    
});

nav.addEventListener('click', (e)=>{
    // e.preventDefault()
    if(window.innerWidth < 600 && 
        (e.target.classList.contains('nav-link') || e.target.classList.contains('cart-icon'))
        ){
        toggleLinks()
    }
})

function toggleLinks(){
    nav.classList.toggle('hide-links')
}