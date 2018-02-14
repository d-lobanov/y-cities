import {toHumanReadableCase} from './utils.js';

const DEFAULT_ZOOM = 5;

const sanitizeCityName = city => city.trim().toLowerCase().replace(/-/, ' ').replace('ё', 'е');

class Map {
    constructor(map = null) {
        this.map = map;
    }

    geoCode(city) {
        return ymaps.geocode(city, {results: 1});
    }

    addGeoObject(geoObject) {
        geoObject.options.set('preset', 'islands#darkBlueCircleIcon');

        this.map.geoObjects.add(geoObject);
        this.map.panTo(geoObject.geometry.getCoordinates(), {flying: true, duration: 1000});
    };

    isSameCity(geoObject, city) {
        const name = sanitizeCityName(geoObject.properties.get('name')).replace(/^город\s*/, '');
        const type = geoObject.properties.get('metaDataProperty.GeocoderMetaData.kind');

        return ['province', 'locality'].includes(type) && name == city;
    };

    pinCity(city) {
        city = sanitizeCityName(city);

        return new Promise((resolve, reject) => {
            this.geoCode(city + ' город').then(response => {
                const geoObject = response.geoObjects.get(0);

                if (!this.isSameCity(geoObject, city)) {
                    reject();
                    return;
                }

                this.addGeoObject(geoObject);
                resolve(toHumanReadableCase(city));
            }).catch((e) => {
                reject('error');
                console.log(e);
            });
        });
    }
}

export default function init(onLoaded) {
    let map = new Map;

    ymaps.ready(() => {
        map.map = new ymaps.Map('map', {
            center: [30, 20],
            zoom: DEFAULT_ZOOM,
            controls: []
        }, {
            suppressMapOpenBlock: true,
        });

        map.map.behaviors.disable('scrollZoom');

        onLoaded();
    });

    return map;
}
