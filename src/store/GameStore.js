import { makeAutoObservable } from "mobx";


export default class GameStore {
    birdLeft = 220;
    birdBottom = 300;
    gravity = 2.2;
    gameTimerId = null;
    pillars = [];
    createPillarTimerId = null;
    gap = 430;
    score = 0;
    isStartGame= false

    constructor() {
        makeAutoObservable(this);

    }

    jump() {
        if (this.birdBottom > 0 && this.isStartGame ) {
            this.birdBottom += 11;
            setTimeout(() => {
                this.birdBottom += 11;
            }, 6);
            setTimeout(() => {
                this.birdBottom += 11;
            }, 12);
            setTimeout(() => {
                this.birdBottom += 11;
            }, 18);
        }
    }

    createPillar() {
        this.pillars = this.pillars.filter((a) => a.left > -150);

        let left = 500;
        let randomHeight = 1 + Math.floor((100 - 1) * Math.random()) - 100;
        let pillarBottom = randomHeight;

        this.pillars.push({
            id: Math.random().toString() + Math.random().toString(),
            left: left,
            topBottom: pillarBottom + this.gap,
            bottom: pillarBottom
        });
    }

    movePillars() {
        this.pillars.forEach((pillar) => {
            pillar.left -= 2;
            if (
                (pillar.left > 200 &&
                    pillar.left < 280 &&
                    this.birdLeft === 220 &&
                    (this.birdBottom < pillar.bottom + 296 ||
                        this.birdBottom > pillar.bottom + this.gap - 45)) ||
                this.birdBottom === 1
            ) {
                this.gameOver();
                // || this.birdBottom > pillar.bottom + this.gap - 200
            } else if (pillar.left == 200) {
                this.score++;
            }
        });
    }

    gameOver() {
        clearInterval(this.gameTimerId);
        clearInterval(this.createPillarTimerId);
        this.createPillarTimerId = null;
        this.gameTimerId = null;
        this.isGameOver = true;
    }

    startGame() {
        if (this.gameTimerId === null) {
            this.createPillar();
            const createPillarId = setInterval(() => {
                this.createPillar();
            }, 3000);
            this.createPillarTimerId = createPillarId;

            const timerID = setInterval(() => {
                this.birdBottom -= this.gravity;
                this.movePillars();
            }, 20);
            this.gameTimerId = timerID;
            this.isGameOver = false;
            this.isStartGame = true;
            this.score = 0;
        }
    }

    stop() {
        clearInterval(this.gameTimerId);
        clearInterval(this.createPillarTimerId);
        this.createPillarTimerId = null;
        this.gameTimerId = null;
        this.birdBottom = 300;
        this.pillars = [];
        this.isGameOver = true;
    }
}