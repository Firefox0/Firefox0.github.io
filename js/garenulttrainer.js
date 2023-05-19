class GarenUltTrainer {

    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.width = 750;
        this.height = 150;
        this.halfHeight = this.height / 2;
        this.score = 0;
        this.scoreElement = document.getElementById("score");
        this.ultLevel = 0;
        this.ultLevelElement = document.getElementById("ultLevel");
        this.currentHp = 0;
        this.maximumHp = 0;
        this.explanationButtonElement = document.getElementById("explanationButton");
        this.explanationTextElement = document.getElementById("explanationText");
        this.yesButton = document.getElementById("yes");
        this.noButton = document.getElementById("no");
        this.timerBar = document.getElementById("timerBar");
        this.timerBar.style.transition = "none";
        this.intervalId = null;
        this.highscore = 0;
        this.highscoreElement = document.getElementById("highscore");
        this.barWidth = 100;
        this.difficultySubtractor = 1;
    }

    drawHpBar() {
        this.context.rect(0, 0, this.width, this.height);
    }
    
    updateHpBar() {
        if (this.currentHp > this.maximumHp) {
            console.error("Current HP can't be greater than maximum HP");
            return;
        }
        
        let visibleLineAmount = Math.trunc(this.currentHp / 100);
        let totalLineAmount = Math.trunc(this.maximumHp / 100);
        let step = this.width / totalLineAmount;

        this.drawHpColors(visibleLineAmount, totalLineAmount, step);
        this.drawHpLines(visibleLineAmount, step);

    }

    drawRectGradient(x, y, width, height, colors, direction) {
        let gradient = null;

        switch (direction) {
            case "up":
                gradient = this.context.createLinearGradient(0, height, 0, 0);
                break;
            case "right":
                gradient = this.context.createLinearGradient(0, 0, height, 0);
                break;
            case "down":
                gradient = this.context.createLinearGradient(0, 0, 0, height);
                break;
            case "left":
                gradient = this.context.createLinearGradient(height, 0, 0, 0);
                break;
            default:
                gradient = this.context.createLinearGradient(0, 0, 0, 0);
                break;
        }

        for (let i = 0; i < colors.length; i++) {
            gradient.addColorStop(i / (colors.length - 1), colors[i]);
        }

        this.drawRectFill(x, y, width, height, gradient);
    }

    drawRectFill(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    drawHpColors(visibleLineAmount, totalLineAmount, step) {
        this.drawRectGradient(0, 0, visibleLineAmount * step, this.height, ["#dd4f52", "#870a0e"], "down");
        this.drawRectFill(visibleLineAmount * step, 1, (totalLineAmount - visibleLineAmount) * step, this.height, "black");
    }

    drawHpLines(visibleLineAmount, step) {
        this.context.beginPath();
        for (let i = 1; i <= visibleLineAmount; i++) {
            let currentStep = i * step;
            this.context.moveTo(currentStep, 0);
            if (i % 10 === 0) {
                this.context.lineTo(currentStep, this.height);
            } else {
                this.context.lineTo(currentStep, this.halfHeight)
            }
        }
        this.context.closePath();
        this.context.stroke();
    }

    getRandomInt(min, max) {
        return Math.floor(min + Math.random() * max);
    }

    updateUltLevel(newUltLevel) {
        this.ultLevel = newUltLevel;
        this.ultLevelElement.innerText = this.ultLevel;
    }

    resetInterval() {
        if (this.resetIntervalId === null) {
            return;
        }
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    updateTimerBar() {
        this.barWidth -= this.difficultySubtractor;
        this.timerBar.style.width = this.barWidth + "%";

        if (this.barWidth <= 0) {
            this.stopTimer();
            this.gameOver(this.calculateUltDamage());
        }
    }

    newGame() {
        this.currentHp = this.getRandomInt(250, 3000);
        this.maximumHp = this.getRandomInt(this.currentHp + 500, 5000);
        let newUltLevel = this.getRandomInt(1, 3);

        this.updateHpBar();
        this.updateUltLevel(newUltLevel);

        this.resetTimer();
        this.startTimer();
    }

    calculateUltDamage() {
        switch (this.ultLevel) {
            case 1:
                return 150 + 0.25 * (this.maximumHp - this.currentHp);
            case 2:
                return 300 + 0.30 * (this.maximumHp - this.currentHp);
            case 3:
                return 450 + 0.35 * (this.maximumHp - this.currentHp);
        }
    }

    updateScore(newScore) {
        this.score = newScore;
        this.scoreElement.innerText = newScore;
    }

    progress(answer) {
        let ultDamage = this.calculateUltDamage();
        this.stopTimer();
        this.difficultySubtractor += 0.25;
        if ((ultDamage >= this.currentHp) === answer) {
            this.updateScore(this.score + 1)
            this.newGame();
        } else {
            this.gameOver(ultDamage);
        }
    }

    startTimer() {
        this.intervalId = setInterval(() => this.updateTimerBar(), 1000 / 60);
    }

    stopTimer() {
        this.difficultySubtractor = 1;
        this.resetInterval();
    }

    resetTimer() {
        this.barWidth = 100;
        this.timerBar.style.width = "100%";
    }

    toggleUI() {
        this.yesButton.disabled = !this.yesButton.disabled;
        this.noButton.disabled = !this.noButton.disabled;
        if (this.explanationButtonElement.style.visibility === "") {
            this.explanationButtonElement.style.visibility = "hidden";
            this.explanationTextElement.style.visibility = "hidden";
        } else {
            this.explanationButtonElement.style.visibility = "";
            this.explanationTextElement.style.visibility = "";
        }
    }

    gameOver(ultDamage) {
        this.explanationTextElement.innerHTML = "Enemy current HP: " + this.currentHp + "<br>" +
                                                "Enemy maximum HP: " + this.maximumHp + "<br>" +
                                                "Ult damage: " + Math.trunc(ultDamage) + "<br>" +
                                                "Remaining HP: " + Math.trunc(this.currentHp - ultDamage); 
        this.toggleUI();
    }

    initializeButtons() {
        this.yesButton.onclick = () => this.progress(true);
        this.noButton.onclick = () => this.progress(false);
        this.explanationButtonElement.onclick = () => {
            this.stopTimer();
            this.toggleUI();
            if (this.score > this.highscore) {
                this.highscore = this.score;
                this.saveHighscore();
            }
            this.updateScore(0);
            this.newGame();
        }
        document.getElementById("resetHighscoreButton").onclick = () => this.resetHighscore();
    }

    saveHighscore() {
        localStorage.setItem("highscore", this.highscore);
        this.highscoreElement.innerText = this.highscore;
    }

    loadHighscore() {
        let highscore = localStorage.getItem("highscore");
        if (highscore === null) {
            return;
        }
        this.highscore = highscore;
        this.highscoreElement.innerText = highscore;
    }

    resetHighscore() {
        if (this.highscore === 0) {
            return;
        }
        this.highscore = 0;
        this.saveHighscore();
    }

    main() {
        this.initializeButtons();
        this.loadHighscore();
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.drawHpBar();
        this.newGame();
    }
}

window.onload = () => {
    let canvas = document.getElementById("hpBar");
    let context = canvas.getContext("2d");
    new GarenUltTrainer(canvas, context).main();
}
