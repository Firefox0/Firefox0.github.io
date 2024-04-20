const body: HTMLBodyElement = document.getElementsByTagName("body")[0]!;
const buttons: NodeListOf<HTMLElement> = document.querySelectorAll(".btn, .btn-close") as NodeListOf<HTMLElement>;

export function updateCursor(value: number): void {
    let path: string;

    switch (value) {
        case 0:
            path = "../cursors/legacy.cur";
            break;
        case 1:
            path = "../cursors/modern.cur";
            break;
        default:
            return;
    }

    let fullString = "cursor: url('" + path + "'), auto;"
    body.style.cssText += fullString;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onmouseenter = () => {
            buttons[i].style.cssText += fullString;
        };
    }
}

export function init(value: number): void {
    updateCursor(value);
}
