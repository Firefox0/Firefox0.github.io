const modal: HTMLElement = document.getElementById("helpModal")!;
const modalClose: HTMLElement = document.getElementById("helpModalClose")!;
const closeButton: HTMLElement = document.getElementById("helpModalCloseButton")!;

export function helpButtonClicked(): void {
    modal.classList.add("show");
    modal.style.display = "block";
}

function closeModal(): void {
    modal.classList.remove("show");
    modal.style.display = "";
}

function initializeButtons(): void {
    modalClose.onclick = () => {
        closeModal();
    }

    closeButton.onclick = () => {
        closeModal();
    }
}

export function init(): void {
    initializeButtons();
}
