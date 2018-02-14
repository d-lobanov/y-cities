import {splitByLastValidChar} from './utils.js';

export const DUPLICATION_ERROR = 1;
export const NOT_FOUND_ERROR = 2;
export const ONLY_CYRILLIC_ERROR = 3;
export const WRONG_FIRST_CHAR = 4;

class Form {
    constructor(onSearch, onSpeech) {
        this.onSearch = onSearch;
        this.onSpeech = onSpeech;

        this.isListening = false;
        this.formBlock = document.getElementById('form');

        this.disabled = false;

        this.render();
    }

    get city() {
        return this.formBlock.querySelector('input[name=city]');
    }

    get botCity() {
        return this.formBlock.querySelector('.bot-city');
    }

    get mic() {
        return this.formBlock.getElementsByClassName('fa-microphone')[0];
    }

    get fieldSet() {
        return this.formBlock.querySelector('fieldset');
    }

    onSubmit(e) {
        e.preventDefault();

        this.onSearch(this.city.value);
    }

    loading() {
        this.disable();
        this.botCity.classList.add('loading');
        this.botCity.innerText = 'Думаю';
    }

    disable() {
        this.disabled = true;
        this.fieldSet.disabled = true;
    }

    enable() {
        this.disabled = false;
        this.fieldSet.disabled = false;
    }

    reset(botCity = '') {
        this.enable();
        this.setCity('');
        this.setError('');

        botCity = splitByLastValidChar(botCity);

        this.botCity.classList.remove('loading');
        this.botCity.innerHTML = `${botCity.beginning}<span class="bot-city__last">${botCity.char}</span>${botCity.end}`;
    }

    activateMic() {
        this.isListening = true;
        this.setError('');
        this.mic.classList.add('fa-microphone__active');
    }

    deactivateMic() {
        this.isListening = false;
        this.mic.classList.remove('fa-microphone__active');
    }

    setCity(word) {
        this.city.value = word;
    }

    updateTimer(time) {
        const timer = this.formBlock.querySelector('.timer');
        const priorityClass =
            time < 10 ? 'timer__dangerous' :
                time < 20 ? 'timer__hot' :
                    time < 30 ? 'timer__warm' : '';

        time = time.toString().padStart(2, 0);
        timer.innerText = `00:${time}`;
        timer.className = `timer ${priorityClass}`;
    }

    removeTimer() {
        this.formBlock.querySelector('.timer').innerText = '';
    }

    setError(error) {
        let message = '';

        switch (error) {
            case DUPLICATION_ERROR:
                message = 'Этот город уже был';
                break;
            case NOT_FOUND_ERROR:
                message = 'Не могу найти такой город :(';
                break;
            case ONLY_CYRILLIC_ERROR:
                message = 'Вводите только кирилические символы';
                break;
            case WRONG_FIRST_CHAR:
                message = 'Город должен начинаться с другой буквы';
                break;
        }

        this.formBlock.querySelector('.validation-error').innerText = message;
    }

    render() {
        this.formBlock.innerHTML = `
            <div class="info-block">
               <span class="bot-city"></span><span class="timer"></span>               
            </div>
            <form>
                <fieldset>
                    <i class="fa fa-microphone"></i>
                    <input name="city" placeholder="Введите город" autocomplete="off" class="city-input" id="city-input"/>
                    <div class="validation-error"></div>
                </fieldset>
            </form>
        `;

        this.formBlock.querySelector('form').onsubmit = this.onSubmit.bind(this);

        this.city.onkeyup = e => e.keyCode !== 13 && this.setError('');

        this.mic.onclick = () => !this.disabled && this.onSpeech(this.isListening = !this.isListening);
    }
}

export default function create(onSearch, onSpeech) {
    return new Form(onSearch, onSpeech);
}
