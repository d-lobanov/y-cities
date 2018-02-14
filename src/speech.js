export default function create(onResult, onStop, onError) {
    const recognition = new webkitSpeechRecognition();

    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onspeechend = () => recognition.stop();

    recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const result = event.results[last][0].transcript;

        onResult(result);
    };

    recognition.onnomatch = onStop;
    recognition.onerror = onError;

    return recognition;
}
