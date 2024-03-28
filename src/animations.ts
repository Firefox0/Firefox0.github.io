export function upAndDown(element: Element): Animation {
    return new Animation(
        new KeyframeEffect(
            element,
            [
            { transform: "translateY(0px)" },
            { transform: "translateY(-10px)" },
            { transform: "translateY(0px)" }
            ],
            { duration: 200 }
        ),
        document.timeline
    );
}
