import { Game } from './game.js';

describe('game tests', () => {

    it('should init game ', async () => {
        const game = new Game();

        game.setSettings({
            gridSize: {
                rows: 4,
                columns: 5,
            }
        });

        const settings = game.getSettings();

        expect(settings.gridSize.columns).toBe(5);
        expect(settings.gridSize.rows).toBe(4);

        // expect(game.status).toBe('pending');
        // await game.start();
        //
        // expect(game.status).toBe('in-progress');
    });

    it('should start game ', async () => {
        const game = new Game();

        game.setSettings({
            gridSize: {
                rows: 4,
                columns: 5,
            }
        });
        expect(game.status).toBe('pending');
        await game.start();
        expect(game.status).toBe('in progress');
    });

    it('game units should have unique coordinates', async () => {
        for (let i = 0; i < 10; i++) {

            const game = new Game();

            game.setSettings = { gridSize: { rows: 3, columns: 1 } };

            await game.start();

            console.log('player 1', game.player1.position);
            console.log('player 2', game.player2.position);
            console.log('google ', game.google.position);

            const units = [game.player1, game.player2, game.google];
            const coordinates = units.map(u => u.position);
            const uniqueCoordinates = Array.from(new Set(coordinates.map(obj => JSON.stringify(obj))), str => JSON.parse(str));

            expect(uniqueCoordinates.length).toBe(units.length);
        }

    });
});
