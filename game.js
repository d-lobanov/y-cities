import createMap from './map.js';
import createBot from './bot.js';
import createSpeech from './speechFactory.js';
import createForm from './form.js';
import finalResult from './finalResult.js';
import {toHumanReadableCase} from './utils.js';

class Game {
    constructor() {
        this.cities = [];
    }

    addCity (city) {
        this.cities.push(toHumanReadableCase(city));
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

    makePlayerMove(playerCity) {
        this.form.disable();

        this.map.pinCity(playerCity)
            .then((city) => {
                this.addCity(city);

                this.bot.forget(city);
                this.form.loading();

                setTimeout(() => this.makeBotMove(city), 3000);
            })
            .catch((e) => {
                this.form.enable();
            });
    };

    makeBotMove(playerCity) {
        this.form.disable();

        const botCity = this.bot.ejectRandomPair(playerCity);

        if (!botCity) {
            return this.finish(true);
        }

        this.addCity(botCity);

        this.map.pinCity(botCity).then(() => {
            this.form.reset(botCity);
        });
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
        this.form = createForm(this.makePlayerMove.bind(this), this.onSpeech.bind(this));
        this.map = createMap(() => this.makeBotMove(city));
    }

    finish(didPlayerWin) {
        finalResult(didPlayerWin, this.cities, () => location.reload());
    }
}

export default new Game;