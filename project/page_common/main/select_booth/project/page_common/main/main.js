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
      authButton.addEventListener('click', () => {
        // 로그아웃 확인
        const confirmLogout = confirm('정말 로그아웃하시겠습니까?');
        if (confirmLogout) {
           fetch('/api/logout', {
              method: 'POST',
              credentials: 'include', // 쿠키 기반 인증 시 사용
           })
              .then(response => {
                 if (response.ok) {
                    alert('로그아웃되었습니다.');
                    localStorage.removeItem('authToken'); // 인증 토큰 삭제
                    window.location.href = '/login'; // 로그인 페이지로 이동
                 } else {
                    alert('로그아웃에 실패했습니다.');
                 }
              })
              .catch(error => {
                 console.error('로그아웃 요청 중 오류 발생:', error);
                 alert('네트워크 오류로 로그아웃에 실패했습니다.');
              });
        }
     });     
   });
} else {
   authButton.textContent = '로그인';
   authButton.addEventListener('click', () => {
      alert('로그인 페이지로 이동합니다.');
      window.location.href = "./login_page/login.html";
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

