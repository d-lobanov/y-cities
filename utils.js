export function toHumanReadableCase(city) {
    const toUpperCaseAfterHyphen = word => word.split('-').map(i => i[0].toUpperCase() + i.slice(1)).join('-');

    return city.split(' ').map(i => i[0].toUpperCase() + i.slice(1).toLowerCase()).map(toUpperCaseAfterHyphen).join(' ');
}