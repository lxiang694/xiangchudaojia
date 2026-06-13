const navToggle = document.querySelector('#navToggle');
const navMenu = document.querySelector('#navMenu');
const topbar = document.querySelector('#topbar');
const priceText = document.querySelector('#priceText');
const quoteText = document.querySelector('#quoteText');
const bookingForm = document.querySelector('#bookingForm');
const submitDemo = document.querySelector('#submitDemo');
const toast = document.querySelector('#toast');

function setDefaultDate(){
  const input = document.querySelector('#dateInput');
  if(!input) return;
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  input.value = tomorrow.toISOString().slice(0,10);
}

function updateQuote(){
  const people = Number(document.querySelector('#peopleInput')?.value || 4);
  const type = document.querySelector('#typeInput')?.value || 'daily';
  const food = document.querySelector('#foodInput')?.value || 'self';

  const baseMap = { daily: 198, health: 298, party: 588 };
  const typeName = { daily:'家常饭', health:'健康餐', party:'家宴酒席' };
  const peopleFee = people > 4 ? (people - 4) * 42 : 0;
  const foodFee = food === 'buy' ? 80 : 0;
  const total = baseMap[type] + peopleFee + foodFee;

  priceText.textContent = `¥${total} 起`;
  quoteText.textContent = `${people}人${typeName[type]}，${food === 'buy' ? '厨师代买食材' : '自备食材'}，可提前沟通口味、忌口与菜单。`;
}

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navMenu?.addEventListener('click', event => {
  if(event.target.tagName === 'A'){
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded','false');
  }
});

window.addEventListener('scroll', () => {
  topbar.style.boxShadow = window.scrollY > 8 ? '0 14px 34px rgba(124,65,18,.08)' : 'none';
});

bookingForm?.addEventListener('input', updateQuote);
submitDemo?.addEventListener('click', () => {
  updateQuote();
  showToast('预约方案已生成：下一步可进入厨师匹配与菜单确认。');
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{ threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(item => io.observe(item));

setDefaultDate();
updateQuote();
