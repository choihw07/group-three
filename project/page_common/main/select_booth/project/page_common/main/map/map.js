// JavaScript for handling the modal
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelectorAll(".gallery img");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.getElementById("closeModal");
    const buttons = document.querySelectorAll(".back-button[data-url]");

    // Open modal on image click
    gallery.forEach(img => {
        img.addEventListener("click", () => {
            const fullSrc = img.getAttribute("data-full");
            modalImage.src = fullSrc;
            modal.style.display = "flex";
        });
    });

    // Close modal on close button click
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal on clicking outside the image
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const url = button.getAttribute("data-url");
            if (url) {
                window.location.href = url; // URL로 이동
            }
        });
    });
});