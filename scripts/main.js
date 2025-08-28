// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav){
    toggle.addEventListener('click', ()=>{
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        nav.dataset.open = String(!open);
    });
}

// Smooth anchor clicks (extra-smooth over snap)
document.querySelectorAll('.nav a[href^="#"], .cta a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (el){
            e.preventDefault();
            el.scrollIntoView({ behavior:'smooth', block:'start' });
        }
    });
});

// Section-by-section keyboard navigation
const sections = [...document.querySelectorAll('.section')];
let isScrolling = false;
function scrollToIndex(i){
    if (i < 0 || i >= sections.length) return;
    isScrolling = true;
    sections[i].scrollIntoView({ behavior:'smooth', block:'start' });
    setTimeout(()=>{ isScrolling = false; }, 600);
}
function currentSectionIndex(){
    const y = window.scrollY + window.innerHeight/2;
    for (let i=0;i<sections.length;i++){
        const r = sections[i].getBoundingClientRect();
        const top = r.top + window.scrollY;
        const bottom = top + r.height;
        if (y >= top && y < bottom) return i;
    }
    return 0;
}
window.addEventListener('keydown', (e)=>{
    if (isScrolling) return;
    const i = currentSectionIndex();
    if (['PageDown','ArrowDown',' '].includes(e.key)){
        e.preventDefault(); scrollToIndex(i+1);
    }
    if (['PageUp','ArrowUp'].includes(e.key)){
        e.preventDefault(); scrollToIndex(i-1);
    }
});

// Active link highlight via IntersectionObserver
const links = document.querySelectorAll('.nav a[href^="#"]');
const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
        if(e.isIntersecting){
            links.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#'+e.target.id));
        }
    });
},{ rootMargin:"-50% 0px -45% 0px", threshold:0.01 });
sections.forEach(s=>io.observe(s));
