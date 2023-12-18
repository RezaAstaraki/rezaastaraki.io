//**********************/ menu*********************************************
document.getElementById('toggle-menu').addEventListener('click', (e) => {
    e.target.style.display = 'none'
    let nav_bar = document.querySelector('#nav-bar').classList.add('toggle-nav-bar--show')
})
function close_toggle_menu() {
    document.querySelector('#nav-bar').classList.remove('toggle-nav-bar--show')
    document.getElementById('toggle-menu').style.display = 'block'
}
document.querySelectorAll('.toggle-nav-bar li a').forEach(menu=>{
    menu.addEventListener('click',close_toggle_menu)
})

// *******************resize window event******************
function check_row_social() {
    let social_row_home = document.querySelector('.home .col2-social')
    let home_section = document.querySelector('section.home')
    if (home_section.getBoundingClientRect().bottom < social_row_home.getBoundingClientRect().bottom) {
        social_row_home.style.display='none'
        
    } else {
        social_row_home.style.display='flex'
    }
}
check_row_social()
window.addEventListener('resize', () => {
    check_row_social()


})

//**************read more **********************/
document.querySelector('section.qualifications .read-more button').addEventListener('click', (e) => {
    document.querySelector('section.qualifications  .read-more').style.display='none'
    document.querySelector('section.qualifications').style.height='100%'
})

// ***********************type effext******************
function type(querySelector,delay=0,typing_speed=150){
   
    let typing_el = document.querySelector(querySelector)
    let text = typing_el.textContent.trim().split('')
    typing_el.style.width=typing_el.getBoundingClientRect().width+'px'
    typing_el.style.height=typing_el.getBoundingClientRect().height+'px'
    typing_el.innerHTML=''
    let text_step= ''
    let n = 0
    setTimeout(()=>{
     let interval = setInterval(()=>{
     if(text[n] !== undefined){typing_el.innerHTML+=text[n]}else{

   
     clearInterval(interval)
     typing_el.style.height = 'unset'
     typing_el.style.width= 'unset'
    }
     n+=1
    },typing_speed)
    },delay)
 
 }
 type('.name-logo',1200,100)
 type('.effect-explanation p.explanation',5500,30)

//**********************/ observer*********************************************

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let entry_id = entry.target.id;

            // change active menu
            let active_menu = document.querySelector(`.toggle-nav-bar [data-name="${entry_id}"]`)
            document.querySelector(`.toggle-nav-bar li.active`).classList.remove('active')
            active_menu.classList.add('active')


            let els = document.querySelectorAll(`#${entry_id} [class*="effect-"]`);

            els.forEach(el => {
                el.classList.forEach(className => {
                    if (className.startsWith("effect-") && !(className.endsWith('__active'))) {
                        const activeClassName = className + '__active';
                        el.classList.add(activeClassName);
                    }
                });
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ***********intro svg*******************
let paths = document.getElementById('intro-text').children;
for (let i = 0;i<paths.length;i++){
    paths[i].style.setProperty('--i',i);
    paths[i].style.setProperty('--length',paths[i].getTotalLength());
}

let signature_paths = document.querySelectorAll('#signature path');

for (let i = 0;i<signature_paths.length;i++){
    signature_paths[i].style.setProperty('--i',i);
    signature_paths[i].style.setProperty('--length',signature_paths[i].getTotalLength());

}
// ***************send email*****************************
const contactForm = document.getElementById('contact_form'),
    contactMessage = document.getElementById('message');

const message_dialog_box = document.getElementById('dialog_message')
const ok_button = document.querySelector('#dialog_message button')
const message_for_submit = document.querySelector('#dialog_message h1')
ok_button.addEventListener('click',()=>message_dialog_box.close())




const sendEmail = (e) => {
    e.preventDefault()
    // serviceID - templateID #form  publickey
    emailjs.sendForm('service_ju33ish', 'template_lbxhsji', '#contact_form', 'EBs9mp-cXQ7WTKn7o')
        .then(() => {
            // if sended suscessfullly
            message_for_submit.innerHTML='your message sended succesfuly<br>Thank you '
            message_dialog_box.showModal()
            contactForm.reset()
        
        }, () => {
            // if not sended
            message_for_submit.innerHTML='something is wrong!<br>please try again later'
            message_dialog_box.showModal()
            
    })
    
}


contactForm.addEventListener('submit',sendEmail)
// message_dialog_box.showModal()