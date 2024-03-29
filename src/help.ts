const helpButton: HTMLElement = document.getElementById("helpButton")!;
const modal: HTMLElement = document.getElementById("helpModal")!;
const modalClose: HTMLElement = document.getElementById("helpModalClose")!;
const closeButton: HTMLElement = document.getElementById("helpModalCloseButton")!;

export function hide(): void {
    helpButton.classList.add("d-none");
}

export function show(): void {
    helpButton.classList.remove("d-none");
}

function closeModal(): void {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons(): void {
    helpButton.onclick = () => {
        modal.classList.add("show");
        modal.style.display = "block";
    }

    modalClose.onclick = () => {
        closeModal();
    }

    closeButton.onclick = () => {
        closeModal();
    }
}

(() => {
    initializeButtons();
})();
