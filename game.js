export class Game {
    #settings = {
        gridSize: {
            rows: 4,
            columns: 4
        }
    };
    #status = 'pending';
    #player1;
    #player2;
    #google;

    constructor() {
    }

    #getRandomPosition(coordinates) {
        let newX;
        let newY;

        do {
            newX = NumberUtils.getRandomNumber(this.#settings.gridSize.columns);
            newY = NumberUtils.getRandomNumber(this.#settings.gridSize.rows);
        } while (coordinates.some((el) => el.x === newX && el.y === newY));

        return new Position(newX, newY);
    }

    #createUnits() {
        const randomPositionForPlayer1 = this.#getRandomPosition([]);
        this.#player1 = new Player(randomPositionForPlayer1, 2);


        const randomPositionForPlayer2 = this.#getRandomPosition([randomPositionForPlayer1]);
        this.#player2 = new Player(randomPositionForPlayer2, 2);

        const randomPositionForGoogle = this.#getRandomPosition(
            [randomPositionForPlayer1, randomPositionForPlayer2],
        );
        this.#google = new Google(randomPositionForGoogle);
    }

    async start() {
        if (this.#status === 'pending') {
            this.#createUnits();
            this.#status = 'in progress';
        }
    }

    get player1() {
        return this.#player1;
    }

    get player2() {
        return this.#player2;
    }

    get google() {
        return this.#google;
    }

    setSettings(settings) {
        if (settings.gridSize.columns * settings.gridSize.rows < 3) {
            throw new Error("grid size too small");
        }
        this.#settings = settings;
    }

    getSettings() {
        return this.#settings;
    }

    get status() {
        return this.#status;
    }
}

class Unit {
    constructor(position) {
        this.position = position;
    }
}


class Google extends Unit {
    constructor(position) {
        super(position);
        this.position = position;
    }
}


class Player extends Unit {
    constructor(position, id) {
        super(position);
        this.position = position;
        this.id = id;
    }
}

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class NumberUtils {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1);
    }
}
