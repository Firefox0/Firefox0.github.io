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

export function inAndOut(element: Element): Animation {
    return new Animation(
        new KeyframeEffect(
            element,
            [
            { transform: "scale(1)" },
            { transform: "scale(0.9)" },
            { transform: "scale(1.1)" },
            { transform: "scale(1)"}
            ],
            { duration: 200 }
        ),
        document.timeline
    );
}

export function settingsContentActivate(element: Element): Animation {
    return new Animation(
        new KeyframeEffect(
            element,
            [
            { transform: "scale(1)" },
            { transform: "scale(0.85)" },
            { transform: "scale(1.15)" },
            ],
            { duration: 100, fill: "forwards" }
        ),
        document.timeline
    );
}

export function settingsContentDeactivate(element: Element): Animation {
    return new Animation(
        new KeyframeEffect(
            element,
            [
            { transform: "scale(1.15)" },
            { transform: "scale(1)" }
            ],
            { duration: 200, fill: "forwards" }
        ),
        document.timeline
    );
}
