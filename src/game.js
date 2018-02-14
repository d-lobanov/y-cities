import createMap from './map.js';
import createBot from './bot.js';
import createSpeech from './speechFactory.js';
import createForm from './form.js';
import {DUPLICATION_ERROR, NOT_FOUND_ERROR, ONLY_CYRILLIC_ERROR, WRONG_FIRST_CHAR} from './form.js';
import finalModal from './finalModal.js';
import createTimer from './countdown.js';
import {toHumanReadableCase, splitByLastValidChar} from './utils.js';

const MINUTE_IN_MILICESONDS = 60 * 1000;

class Game {
    constructor() {
        this.cities = [];
    }

    addCity(city) {
        this.cities.push(city);
    }

    onSpeechFinished(word) {
        this.form.deactivateMic();
        this.form.setCity(word);

        this.makePlayerMove(word);
    };

    onSpeechError(word) {
        this.form.deactivateMic();
        this.form.setCity(word);

        this.makePlayerMove(word);
    };

    isPairWithLastCity(playerCity) {
        const lastCity = this.cities.slice(-1).pop();
        const parts = splitByLastValidChar(lastCity);

        return !parts || parts.char === playerCity[0].toLowerCase();
    }

    wasAlreadyInGame(playerCity) {
        return this.cities.indexOf(playerCity) !== -1;
    }

    makePlayerMove(playerCity) {
        playerCity = toHumanReadableCase(playerCity.trim());

        if (!this.isPairWithLastCity(playerCity)) {
            return this.form.setError(WRONG_FIRST_CHAR);
        }

        if (this.wasAlreadyInGame(playerCity)) {
            return this.form.setError(DUPLICATION_ERROR);
        }

        this.form.disable();

        this.map.pinCity(playerCity)
            .then((city) => {
                this.timer.remove();

                this.addCity(city);

                this.bot.forget(city);
                this.form.loading();

                setTimeout(() => this.makeBotMove(city), 3000);
            })
            .catch((e) => {
                this.form.setError(NOT_FOUND_ERROR);
                this.form.enable();
            });
    };

    makeBotMove(playerCity) {
        this.form.disable();

        const botCity = this.bot.ejectRandomPair(playerCity);

        if (!botCity) {
            return this.finish(true);
        }

        this.map.pinCity(botCity)
            .then(() => {
                this.addCity(botCity);

                this.form.reset(botCity);
                this.timer.reset();
            }).catch(() => this.finish(true));
    };

    onSpeech(isListening) {
        if (isListening) {
            this.form.activateMic();
            this.speech.start();
        } else {
            this.form.deactivateMic();
            this.speech.stop();
        }
    };

    start(city) {
        this.bot = createBot();
        this.speech = createSpeech(this.onSpeechFinished.bind(this));
        this.map = createMap(() => this.makePlayerMove(city));

        let form = this.form = createForm(this.makePlayerMove.bind(this), this.onSpeech.bind(this));

        this.timer = createTimer(form.updateTimer.bind(form), form.removeTimer.bind(form), () => this.finish(false));
    }

    finish(didPlayerWin) {
        this.timer.remove();
        finalModal(didPlayerWin, this.cities, () => location.reload());
    }
}

export default new Game;