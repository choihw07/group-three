const menuButton = document.querySelector('.menu');
const menuBar = document.querySelector('.menu-bar');

menuButton.addEventListener('click', () => {
    if (menuBar.style.display === 'none' || menuBar.style.display === '') {
        menuBar.style.display = 'block';
    } else {
        menuBar.style.display = 'none';
    }
});

const isLoggedIn = false; // 로그인 상태: true / false
const authButton = document.getElementById('auth-button');

if (isLoggedIn) {
   authButton.textContent = '로그아웃';
   authButton.addEventListener('click', () => {
      alert('로그아웃되었습니다.');
      // 로그아웃 처리 로직 추가
   });
} else {
   authButton.textContent = '로그인';
   authButton.addEventListener('click', () => {
      alert('로그인 페이지로 이동합니다.');
      // 로그인 처리 로직 추가
   });
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button[data-url]");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const url = button.getAttribute("data-url");
            if (url) {
                window.location.href = url; // URL로 이동
            }
        });
    });
});

