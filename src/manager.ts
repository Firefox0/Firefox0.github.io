import * as MainUI from "./mainUI";
import * as Ultimate from "./ultimate";
import * as Timer from "./timer";
import * as Score from "./score";
import * as Hp from "./hp";
import * as Explanation from "./explanation";
import * as Storage from "./storage";
import * as Sound from "./sound";
import * as Theme from "./theme";
import * as Difficulty from "./difficulty";
import * as Cursor from "./cursor";
import * as Settings from "./settings";
import * as Help from "./help";

export let mainPageDisplayed: boolean = true;

let highscore: number;
let currentScore: number = 0;

let theme: number;
let difficulty: number;
let cursor: number;

let currentDifficultySelection: number;
let currentThemeSelection: number;
let currentCursorSelection: number;
let recentlySelectedElement: HTMLElement;

let currentRow: number = 0;
const maxRows: number = 2;

export enum Direction {
    Left,
    Up,
    Right,
    Down
}

export function yesClick(): void {
    if (MainUI.isYesDisabled()) {
        return;
    }
    MainUI.yesClick();
}

export function noClick(): void {
    if (MainUI.isNoDisabled()) {
        return;
    }
    MainUI.noClick();
}

export function escapePress(): void {
    if (Settings.isSettingsDisplayed()) {
        closeClicked();
        return;
    }

    if (Help.isHelpDisplayed()) {
        Help.closeModal();
        return;
    }

    if (!mainPageDisplayed) {
        backButtonClicked();
        return;
    }
}

export function settingsClick(): void {
    if (!mainPageDisplayed || Help.isHelpDisplayed() || Settings.isSettingsDisplayed()) {
        return;
    }
    Settings.settingsButtonClicked();
    switch (currentRow) {
        case 0:
            recentlySelectedElement = Settings.difficultyButtons[currentDifficultySelection];
            break;
        case 1:
            recentlySelectedElement = Settings.themeButtons[currentThemeSelection];
            break;
        case 2:
            recentlySelectedElement = Settings.cursorButtons[currentCursorSelection];
            break;
    }
    Settings.selectButton(recentlySelectedElement, "red");
}

export function helpClick(): void {
    if (!mainPageDisplayed || Settings.isSettingsDisplayed() || Help.isHelpDisplayed()) {
        return;
    }
    Help.helpButtonClicked();
}

export function chooseBykey(direction: Direction): void {
    if (!Settings.isSettingsDisplayed()) {
        return;
    }

    switch (direction) {
        case Direction.Left:
            moveSelectionHorizontally(-1);
            break;
        case Direction.Up:
            moveSelectionVertically(-1);
            break;
        case Direction.Right:
            moveSelectionHorizontally(1);
            break;
        case Direction.Down:
            moveSelectionVertically(1);
            break;
    }
}

export function moveSelectionHorizontally(offset: number): void {
    switch (currentRow) {
        case 0:
            Settings.deselectButton(Settings.difficultyButtons[currentDifficultySelection]);
            currentDifficultySelection = setbackOperation(currentDifficultySelection, offset, Settings.difficultyButtons.length - 1)
            recentlySelectedElement = Settings.difficultyButtons[currentDifficultySelection];
            Settings.selectButton(recentlySelectedElement, "red");
            applyDifficulty();
            break;
        case 1:
            Settings.deselectButton(Settings.themeButtons[currentThemeSelection]);
            currentThemeSelection = setbackOperation(currentThemeSelection, offset, Settings.themeButtons.length - 1)
            recentlySelectedElement = Settings.themeButtons[currentThemeSelection];
            Settings.selectButton(recentlySelectedElement, "red");
            Theme.changeTheme(currentThemeSelection);
            break;
        case 2:
            Settings.deselectButton(Settings.cursorButtons[currentCursorSelection]);
            currentCursorSelection = setbackOperation(currentCursorSelection, offset, Settings.cursorButtons.length - 1);
            recentlySelectedElement = Settings.cursorButtons[currentCursorSelection];
            Settings.selectButton(recentlySelectedElement, "red");
            Cursor.updateCursor(currentCursorSelection);
            break;
    }
}

export function moveSelectionVertically(offset: number): void {
    if (offset === 0) {
        return;
    }

    if (offset > 0) {
        switch (currentRow) {
            case 0:
                Settings.selectButton(Settings.difficultyButtons[currentDifficultySelection]);
                Settings.selectButton(Settings.themeButtons[currentThemeSelection], "red");
                applyDifficulty();
                break;
            case 1:
                Settings.selectButton(Settings.themeButtons[currentThemeSelection]);
                Settings.selectButton(Settings.cursorButtons[currentCursorSelection], "red");
                Theme.changeTheme(currentThemeSelection);
                break;
            case 2:
                Settings.selectButton(Settings.cursorButtons[currentCursorSelection]);
                Settings.selectButton(Settings.difficultyButtons[currentDifficultySelection], "red");
                Cursor.updateCursor(currentCursorSelection);
                break;
        }
    } else {
        switch (currentRow) {
            case 0:
                Settings.selectButton(Settings.difficultyButtons[currentDifficultySelection]);
                Settings.selectButton(Settings.cursorButtons[currentCursorSelection], "red");
                applyDifficulty();
                break;
            case 1:
                Settings.selectButton(Settings.themeButtons[currentThemeSelection]);
                Settings.selectButton(Settings.difficultyButtons[currentDifficultySelection], "red");
                Theme.changeTheme(currentThemeSelection);
                break;
            case 2:
                Settings.selectButton(Settings.cursorButtons[currentCursorSelection]);
                Settings.selectButton(Settings.themeButtons[currentThemeSelection], "red");
                Cursor.updateCursor(currentCursorSelection);
                break;
        }
    }
    currentRow = setbackOperation(currentRow, offset, maxRows);
}

export function setbackOperation(value: number, operand: number, limit: number): number {
    if (operand === 0) {
        return value;
    }

    if (operand < 0) {
        return setbackDecrement(value, limit);
    }
    return setbackIncrement(value, limit)
}

export function setbackDecrement(value: number, limit: number): number {
    value--;
    if (value < 0) {
        value = limit;
    }
    return value;
}

export function setbackIncrement(value: number, limit: number): number {
    value++;
    if (value > limit) {
        value = 0;
    }
    return value;
}

export function closeClicked(): void {
    restoreSettings();
    Settings.closeModal();
}

export function applyClicked(): void {
    saveSettings();
    Settings.closeModal();
}

export function restoreSettings(): void {
    selectNewThemeButton(theme);
    selectNewDifficultyButton(difficulty);
    selectNewCursorButton(cursor);
}

export function saveSettings(): void {
    saveTheme();
    saveDifficulty();
    saveCursor();
}

export function getTheme(): number {
    return theme;
}

export function getDifficulty(): number {
    return difficulty;
}

export function getCursor(): number {
    return cursor;
}

export function applyDifficulty(): void {
    Difficulty.refreshTitle(currentDifficultySelection);
    difficultyChanged(currentDifficultySelection);
}

export function selectNewDifficultyButton(newIndex: number): void {
    if (currentDifficultySelection === newIndex) {
        return;
    }
    
    if (currentRow !== 0) {
        Settings.selectButton(recentlySelectedElement);
        currentRow = 0;
    }

    Settings.deselectButton(Settings.difficultyButtons[currentDifficultySelection]);
    currentDifficultySelection = newIndex;
    recentlySelectedElement = Settings.difficultyButtons[currentDifficultySelection];
    Settings.selectButton(recentlySelectedElement, "red");
    applyDifficulty();
}

export function selectNewThemeButton(newIndex: number): void {
    if (currentThemeSelection === newIndex) {
        return;
    }

    if (currentRow !== 1) {
        Settings.selectButton(recentlySelectedElement);
        currentRow = 1;
    } 

    Settings.deselectButton(Settings.themeButtons[currentThemeSelection]);
    currentThemeSelection = newIndex;
    recentlySelectedElement = Settings.themeButtons[currentThemeSelection];
    Settings.selectButton(recentlySelectedElement, "red");
    Theme.changeTheme(currentThemeSelection);
}

export function selectNewCursorButton(newIndex: number): void {
    if (currentCursorSelection === newIndex) {
        return;
    }

    if (currentRow !== 2) {
        Settings.selectButton(recentlySelectedElement);
        currentRow = 2;
    }

    Settings.deselectButton(Settings.cursorButtons[currentCursorSelection]);
    currentCursorSelection = newIndex;
    recentlySelectedElement = Settings.cursorButtons[currentCursorSelection];
    Settings.selectButton(recentlySelectedElement, "red");
    Cursor.updateCursor(currentCursorSelection);
}

function saveTheme(): void {
    theme = currentThemeSelection;
    Storage.setTheme(theme);
}

function saveDifficulty(): void {
    difficulty = currentDifficultySelection;
    Storage.setDifficulty(difficulty);
}

function saveCursor(): void {
    cursor = currentCursorSelection;
    Storage.setCursor(cursor);
}

export function difficultyChanged(difficulty: number): void {
    highscore = Storage.getHighscore(difficulty);
    Score.updateHighscore(highscore);
}

export function updateScore(newScore: number): void {
    currentScore = newScore;
    Score.updateScore(newScore);
}

export function updateHighscore(newHighscore?: number): void {
    if (newHighscore === undefined) {
        newHighscore = currentScore;
        if (newHighscore < highscore) {
            return;
        }
    }

    if (newHighscore === highscore) {
        return;
    }
    
    highscore = newHighscore;
    Score.updateHighscore(newHighscore);
    Storage.setHighscore(newHighscore, Storage.getDifficulty());
}

export function handleConfirmation(): void {
    if (MainUI.startButtonVisible() && 
        !Settings.isSettingsDisplayed() && 
        !Help.isHelpDisplayed()) {
        MainUI.startClick();
        return;
    } 
    
    if (MainUI.explanationVisible()) {
        MainUI.explanationClick();
        return;
    }
    
    if (Settings.isSettingsDisplayed()) {
        applyClicked();
        return;
    } 
    
    if (Help.isHelpDisplayed()) {
        Help.closeModal();
        return;
    }
}

export function keyPressed(key: string): void {
    switch (key) {
        case "1":
            yesClick();
            break;
        case "2":
            noClick();
            break;
        case " ":
        case "Enter":
            handleConfirmation();
            break;
        case "r":
            updateHighscore(0);
            break;
        case "Escape":
            escapePress();
            break;
        case "s":
            settingsClick();
            break;
        case "h":
            helpClick();
            break;
        case "ArrowLeft":
            chooseBykey(Direction.Left);
            break;
        case "ArrowUp":
            chooseBykey(Direction.Up);
            break;
        case "ArrowRight":
            chooseBykey(Direction.Right);
            break;
        case "ArrowDown":
            chooseBykey(Direction.Down);
            break;
    }
}

export function detectedWord(word: string): void {
    switch (word) {
        case "demacia":
            updateHighscore(999999999);
            break;
        case "darius":
            updateHighscore(-999999999);
            break;
    }
}

export function resetButtonClicked(): void {
    highscore = 0;
    Storage.setHighscore(highscore, Storage.getDifficulty());
    Score.updateHighscore(highscore);
}

export function yesButtonClicked(): void {
    progress(true);
}

export function noButtonClicked(): void {
    progress(false);
}

export function startButtonClicked(): void {
    mainPageDisplayed = false;
    MainUI.showGamePage();
    Hp.showHpBar();
    newGame();
}

export function backButtonClicked(): void {
    if (!MainUI.backButtonVisible()) {
        return;
    }
    back();
}

export function explanationClicked(): void {
    MainUI.hideExplanation();
    updateHighscore();
    updateScore(0);
    Timer.restoreTimer();
    newGame();
}

export function newGame(): void {
    Sound.stop();
    updateScore(0);
    setButtons(true);
    Timer.restoreTimer();
    nextRound();
}

function progress(answer: boolean): void {
    Timer.stopTimer();
    
    let currentHp: number = Hp.getCurrentHp();
    let maximumHp: number = Hp.getMaximumHp();
    let ultDamage: number = Ultimate.calculateUltDamage(currentHp, maximumHp);
    if ((ultDamage >= currentHp) === answer) {
        Sound.correctPlay();
        Timer.decreaseDuration(0.25);
        Timer.resetTimer();
        currentScore++;
        updateScore(currentScore);
        nextRound();
    } else {
        gameOver(ultDamage);
    }
}

function nextRound(): void {
    let difficulty = Storage.getDifficulty();
    Ultimate.randomizeUltLevel();
    Hp.newHealth(difficulty);

    Timer.startTimer(() => gameOver(Ultimate.calculateUltDamage(Hp.getCurrentHp(), Hp.getMaximumHp())));
}

function gameOver(ultDamage: number): void {
    Sound.incorrectPlay();
    setButtons(false);
    let explanation: string = Explanation.getExplanation(Hp.getCurrentHp(), Hp.getMaximumHp(), ultDamage);
    MainUI.updateExplanation(explanation);
    MainUI.showExplanation();
}

function setButtons(bool: boolean): void {
    if (bool) {
        MainUI.enableDecisionButtons();
    } else {
        MainUI.disableDecisionButtons();
    }
}

function back(): void {
    mainPageDisplayed = true;
    MainUI.showMainPage();
    Timer.stopTimer();
    Timer.resetTimer();
    updateScore(0);
    setButtons(false);
    Hp.hideHpBar();
    MainUI.hideExplanation();
    Ultimate.reset();
}

export async function init(): Promise<void> {
    let tempHighscore = Storage.getHighscore(Storage.getDifficulty());
    updateHighscore(tempHighscore);
    await Hp.init();

    theme = Storage.getTheme();
    difficulty = Storage.getDifficulty();
    cursor = Storage.getCursor();
    currentThemeSelection = theme;
    currentDifficultySelection = difficulty;
    currentCursorSelection = cursor;
    Theme.init(theme);
    Difficulty.refreshTitle(difficulty);
    Cursor.init(cursor);
    Settings.init();
}
