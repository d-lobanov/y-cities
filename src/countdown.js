const MINUTE_IN_MILLISECONDS = 60 * 1000;

class Countdown {
    constructor(onTick, onRemoved, onFinished) {
        this.onTick = onTick;
        this.onRemoved = onRemoved;
        this.onFinished = onFinished;

        this.id = null;
    }

    reset() {
        this.id = setInterval(this.tick.bind(this), 500);
        this.finishAt = Date.now() + MINUTE_IN_MILLISECONDS;
    }

    remove() {
        clearInterval(this.id);
        this.onRemoved();
    }

    tick() {
        const diff = this.finishAt - Date.now();

        if (diff > 1) {
            this.onTick(parseInt(diff / 1000));
        } else {
            this.onFinished();
        }
    }

}

export default function create(onTick, onRemoved, onFinished) {
    return new Countdown(onTick, onRemoved, onFinished);
}
