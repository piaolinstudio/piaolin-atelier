// 啟用 Bootstrap 表單驗證並處理送出（範例：不會實際傳送）
document.addEventListener('DOMContentLoaded', function () {
  // Bootstrap 原生表單驗證
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (form.checkValidity()) {
        // 顯示成功訊息（可改成 fetch() 傳到後端）
        const alertEl = document.getElementById('submitAlert');
        if (alertEl) {
          alertEl.classList.remove('d-none');
          // 自動隱藏
          setTimeout(() => alertEl.classList.add('d-none'), 4000);
        }
        form.reset();
        form.classList.remove('was-validated');
      } else {
        form.classList.add('was-validated');
      }
    }, false);
  });
});
