import {getCities, addCity} from './cityStorage.js';

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
        const firstChar = playerCity[playerCity.length - 1].toLowerCase();
        const botCities = this.cities[firstChar];

        if (botCities.length === 0) {
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
