import Random from "./random.js";
import Ultimate from "./ultimate.js";

export default class Hp {

    static currentHp = 0;
    static maximumHp = 0;
    static width = 750;
    static height = 150;
    static canvas = document.getElementById("hpBar");
    static context = this.canvas.getContext("2d");
    static startButton = document.getElementById("startButton");

    static {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.drawHpBar();
    }

    static drawHpBar() {
        this.context.rect(0, 0, this.width, this.height);
    }
    
    static updateHpBar() {
        if (this.currentHp > this.maximumHp) {
            return;
        }
        
        let visibleLineAmount = Math.trunc(this.currentHp / 100);
        let totalLineAmount = Math.trunc(this.maximumHp / 100);
        let step = this.canvas.width / totalLineAmount;

        this.drawHpColors(visibleLineAmount, totalLineAmount, step);
        this.drawHpLines(visibleLineAmount, step);
    }

    static drawRectGradient(x, y, width, height, colors, direction) {
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

    static drawRectFill(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
    }

    static drawHpColors(visibleLineAmount, totalLineAmount, step) {
        this.drawRectGradient(0, 1, visibleLineAmount * step, this.canvas.height, ["#dd4f52", "#870a0e"], "down");
        this.drawRectFill(visibleLineAmount * step, 1, (totalLineAmount - visibleLineAmount) * step, this.height, "black");
    }

    static drawHpLines(visibleLineAmount, step) {
        this.context.beginPath();
        for (let i = 1; i <= visibleLineAmount; i++) {
            let currentStep = i * step;
            this.context.moveTo(currentStep, 0);
            if (i % 10 === 0) {
                this.context.lineTo(currentStep, this.canvas.height);
            } else {
                this.context.lineTo(currentStep, this.canvas.height / 2);
            }
        }
        this.context.closePath();
        this.context.stroke();
    }

    static generateHealth(ultLevel) {
        switch(ultLevel) {
            case 1:
                this.currentHp = Random.getRandomInt(500, 3000);
                this.maximumHp = Random.getRandomInt(this.currentHp * 2.75, this.currentHp * 3.75);
                break;
            case 2:
                this.currentHp = Random.getRandomInt(750, 3000);
                this.maximumHp = Random.getRandomInt(this.currentHp * 2.5, this.currentHp * 3.5);
                break;
            case 3:
                this.currentHp = Random.getRandomInt(1000, 3000);
                this.maximumHp = Random.getRandomInt(this.currentHp * 2.25, this.currentHp * 3.25);
                break;
        }

        let ultDamage = Ultimate.calculateUltDamage(this.currentHp, this.maximumHp);
        let remainingHP = this.currentHp - ultDamage;
        if ((remainingHP < 0 && remainingHP >= -200) || remainingHP <= -500 || 
            (remainingHP >= 0 && remainingHP <= 200) || remainingHP >= 500) {
                this.generateHealth(ultLevel, ultDamage);
        }
    }

    static newHealth(ultLevel) {
        this.generateHealth(Ultimate.ultLevel);
        this.updateHpBar();
    }

    static toggleUI() {
        this.canvas.style = "display: block";
        startButton.style = "display: none";
    }
}
