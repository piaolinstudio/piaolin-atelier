// 點擊信封：打開翻蓋並把信件 "飛出"
document.addEventListener('DOMContentLoaded', ()=>{
  const envelope = document.getElementById('envelope');
  if(!envelope) return;
  const flap = envelope.querySelector('.flap');
  const letter = envelope.querySelector('.letter');

  function flyLetter(){
    // open flap briefly
    envelope.classList.add('open');

    // get letter position and size
    const rect = letter.getBoundingClientRect();

    // create a clone element to animate (so original remains for repeated clicks)
    const clone = document.createElement('div');
    clone.className = 'fly-away';
    // style clone to visually match .letter
    clone.style.width = Math.round(rect.width) + 'px';
    clone.style.height = Math.round(rect.height) + 'px';
    clone.style.left = (rect.left) + 'px';
    clone.style.top = (rect.top) + 'px';
    clone.style.background = window.getComputedStyle(letter).backgroundColor || '#fff';
    clone.style.border = window.getComputedStyle(letter).border || '1px solid rgba(0,0,0,0.06)';
    clone.style.borderRadius = window.getComputedStyle(letter).borderRadius || '4px';
    clone.style.boxShadow = window.getComputedStyle(letter).boxShadow || '0 6px 16px rgba(16,24,40,0.06)';

    document.body.appendChild(clone);

    // after animation ends remove clone and close flap
    clone.addEventListener('animationend', ()=>{
      clone.remove();
    });

    // close flap after a short delay so user sees it open
    setTimeout(()=> envelope.classList.remove('open'), 700);
  }

  envelope.addEventListener('click', flyLetter);
  envelope.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flyLetter(); } });
});
