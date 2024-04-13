declare let bootstrap;

export function init(): void {
    const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle='tooltip']");
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}
