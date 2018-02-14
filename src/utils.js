export function toHumanReadableCase(city) {
    const toUpperCaseAfterHyphen = word => word.split('-').map(i => i[0].toUpperCase() + i.slice(1)).join('-');

    return city.split(' ').map(i => i[0].toUpperCase() + i.slice(1).toLowerCase()).map(toUpperCaseAfterHyphen).join(' ');
}

export function splitByLastValidChar(city = '') {
    const exceptions = ['ё', 'й', 'ы', 'ь', 'ъ'];

    for (let i = city.length - 1; i >= 0; i--) {
        if (!exceptions.includes(city[i])) {
            return {
                beginning: city.slice(0, i),
                char: city[i],
                end: city.slice(i + 1)
            };
        }
    }

    return null;
}
