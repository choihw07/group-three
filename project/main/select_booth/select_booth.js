// DOMContentLoaded 이벤트 후 실행
document.addEventListener("DOMContentLoaded", () => {
    // data-url 속성을 가진 모든 버튼 가져오기
    const buttons = document.querySelectorAll(".button[data-url]");

    // 각 버튼에 클릭 이벤트 추가
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const url = button.getAttribute("data-url"); // data-url 값 읽기
            if (url) {
                window.location.href = url; // 해당 URL로 이동
            }
        });
    });
});
