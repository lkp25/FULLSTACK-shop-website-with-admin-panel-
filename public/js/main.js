const menuBtn = document.querySelector('.menu-icon')
const navLinks = document.querySelector('.nav-links')
const nav = document.querySelector('nav')
const currentYear = document.querySelector('.date')

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