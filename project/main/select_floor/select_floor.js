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