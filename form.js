class Form {
    constructor(onSearch, onSpeech) {
        this.onSearch = onSearch;
        this.onSpeech = onSpeech;

        this.isListening = false;
        this.formBlock = document.getElementById('form');

        this.render();
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
        this.fieldSet.disabled = true;
    }

    enable() {
        this.fieldSet.disabled = false;
    }

    reset(botCity = '') {
        this.enable();
        this.setCity('');
        this.botCity.classList.remove('loading');
        this.botCity.innerText = botCity;
    }

    activateMic() {
        this.isListening = true;
        this.mic.classList.add('fa-microphone__active');
    }

    setCity(word) {
        this.city.value = word;
    }

    deactivateMic() {
        this.isListening = false;
        this.mic.classList.remove('fa-microphone__active');
    }

    get city() {
        return this.formBlock.querySelector('input[name=city]');
    }

    get botCity() {
        return this.formBlock.querySelector('#bot-city');
    }

    get mic() {
        return this.formBlock.getElementsByClassName('fa-microphone')[0];
    }

    get fieldSet() {
        return this.formBlock.querySelector('fieldset');
    }

    get form() {
        return this.formBlock.querySelector('form');
    }

    render() {
        this.formBlock.innerHTML = `
            <div class="bot-city-block">
               <span class="bot-city loading" id="bot-city"></span>                
            </div>
            <form>
                <fieldset>
                    <i class="fa fa-microphone"></i>
                    <input name="city" placeholder="Введите город" autocomplete="off" class="input-field"/>
                </fieldset>
            </form>
        `;

        this.form.onsubmit = this.onSubmit.bind(this);

        this.mic.onclick = () => this.onSpeech(this.isListening = !this.isListening);
    }
}

export default function create(onSearch, onSpeech) {
    return new Form(onSearch, onSpeech);
}
