// Multi-page letter interaction
// - Clicking envelope opens it (show open image) and creates a flying paper clone.
// - The paper clone displays pages (array `pages`) and advances on click (wraps around).
// - Images expected at images/envelope-closed.png, images/envelope-open.png, images/letter-paper.png

document.addEventListener('DOMContentLoaded', () => {
  const envelopeBtn = document.getElementById('envelopeBtn');
  const flyContainer = document.getElementById('flyContainer');

  if (!envelopeBtn || !flyContainer) return;

  // Five pages (replace text as you like)
  const pages = [
    `<h3>你好，歡迎來到 Piaolin Atelier</h3><p>這是一封來自工作室的小信，感謝你的來訪—希望我們的作品能帶給你靈感。</p>`,
    `<h3>關於我們</h3><p>Piaolin Atelier 專注於插畫與視覺設計，提供品牌插畫與作品展示服務。</p>`,
    `<h3>服務項目</h3><p>網站視覺、專案插畫、活動視覺設計。歡迎提出合作需求！</p>`,
    `<h3>聯絡方式</h3><p>電子郵件: <a href="mailto:contact@piaolin.studio">contact@piaolin.studio</a><br>或在作品頁留下訊息。</p>`,
    `<h3>謝謝你</h3><p>感謝閱讀這封信。若想要客製內容，我們很樂意與你討論合作細節。</p>`
  ];

  function showOpen(state) {
    if (state) envelopeBtn.classList.add('open'); else envelopeBtn.classList.remove('open');
  }

  function createPaperClone() {
    const closedImg = envelopeBtn.querySelector('.envelope-img.closed');
    const rect = closedImg.getBoundingClientRect();

    const clone = document.createElement('div');
    clone.className = 'clone-paper';
    // 設定最大寬度，並確保在窄螢幕上不會超出
    const margin = 16; // 視窗邊界預留距離 (px)
    let maxWidth = Math.min(window.innerWidth - margin * 2, 520);
    // 若視窗太窄，縮小 clone
    const width = Math.min(Math.max(window.innerWidth * 0.6, 260), maxWidth);
    const height = Math.round(width * 1.0);
    clone.style.width = width + 'px';
    clone.style.height = height + 'px';
    clone.style.zIndex = 10050; // 確保在最上層

    // 初始位置設在信封附近（水平置中於信封）
    let left = rect.left + (rect.width - width) / 2;
    let top = rect.top + rect.height / 2 - height / 2;

    // Clamp 到視窗可見範圍，避免被裁切
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
    top = Math.max(margin + 40, Math.min(top, window.innerHeight - height - margin)); // +40 留出頁首區域

    clone.style.left = left + 'px';
    clone.style.top = top + 'px';

    const content = document.createElement('div');
    content.className = 'page-content';
    clone.appendChild(content);

    const indicator = document.createElement('div');
    indicator.className = 'page-indicator';
    clone.appendChild(indicator);

    let pageIndex = 0;

    function renderPage() {
      content.innerHTML = pages[pageIndex];
      indicator.textContent = `${pageIndex + 1} / ${pages.length}`;
      clone.classList.add('turning');
      setTimeout(() => clone.classList.remove('turning'), 220);
    }

    clone.addEventListener('click', (e) => {
      e.stopPropagation();
      pageIndex = (pageIndex + 1) % pages.length;
      renderPage();
    });

    clone.tabIndex = 0;
    clone.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); pageIndex = (pageIndex + 1) % pages.length; renderPage(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); pageIndex = (pageIndex - 1 + pages.length) % pages.length; renderPage(); }
      else if (e.key === 'Escape') clone.remove();
    });

    renderPage();
    flyContainer.appendChild(clone);

    // focus for keyboard navigation
    setTimeout(()=> clone.focus(), 300);

    return clone;
  }

  envelopeBtn.addEventListener('click', () => {
    // show open briefly
    showOpen(true);
    setTimeout(()=> showOpen(false), 700);

    // create flying paper
    createPaperClone();
  });

  envelopeBtn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); envelopeBtn.click(); } });
});
