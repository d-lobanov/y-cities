import {getCities, addCity} from './cityStorage.js';
import {splitByLastValidChar} from './utils.js';

const random = set => {
    let limit = Math.floor(Math.random() * set.size);

    for (let i of set) {
        if (limit === 0) {
            return i;
        }

        limit -= 1;
    }
};

class Bot {
    constructor(cities) {
        this.cities = cities;
    }

    ejectRandomPair(playerCity) {
        const firstChar = splitByLastValidChar(playerCity).char;
        const botCities = this.cities[firstChar];

        addCity(playerCity);

        if (!botCities || botCities.length === 0) {
            return null;
        }

        const city = random(botCities);

        this.cities[firstChar].delete(city);

        return city;
    }

    forget(city) {
        const firstChar = city[0].toLowerCase();

        this.cities[firstChar].delete(city);
    }
}

export default function () {
    return new Bot(getCities());
};
