function createPaperClone() {
  const closedImg = envelopeBtn.querySelector('.envelope-img.closed');
  const rect = closedImg.getBoundingClientRect();

  const clone = document.createElement('div');
  clone.className = 'clone-paper';

  const margin = 16;         // 視窗邊界預留距離 (px)
  const headerReserve = 40;  // 頁首或瀏覽器 UI 的預留空間 (px)

  // 讀取 CSS 變數 --paper-aspect（height / width 或 fallback）
  const rootStyle = getComputedStyle(document.documentElement);
  let paperAspect = parseFloat(rootStyle.getPropertyValue('--paper-aspect'));
  if (!isFinite(paperAspect) || paperAspect <= 0) paperAspect = 1.0;

  // 最大寬度限制（避免過大）
  let maxWidth = Math.min(window.innerWidth - margin * 2, 520);
  // 預設寬度（介於 260 與 maxWidth 之間）
  let width = Math.min(Math.max(Math.round(window.innerWidth * 0.6), 260), maxWidth);
  // 用寬度推算理想高度
  let height = Math.round(width * paperAspect);

  // 可用高度（視窗高度扣除 margin 與頁首保留）
  const availableHeight = window.innerHeight - margin * 2 - headerReserve;

  // 如果理想高度超出可用高度，等比例縮放寬高以適應
  if (height > availableHeight) {
    const scale = availableHeight / height;
    width = Math.max(160, Math.round(width * scale)); // 不要太小
    height = Math.round(height * scale);
  }

  clone.style.width = width + 'px';
  clone.style.height = height + 'px';
  clone.style.zIndex = 10050; // 確保在最上層

  // 初始位置：水平置中於信封，垂直以信封中間為基準
  let left = rect.left + (rect.width - width) / 2;
  let top = rect.top + rect.height / 2 - height / 2;

  // Clamp 到視窗可見範圍
  left = Math.max(margin, Math.min(left, window.innerWidth - width - margin));
  top = Math.max(margin + headerReserve, Math.min(top, window.innerHeight - height - margin));

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
