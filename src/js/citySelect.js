const cityArray = [
    'Москва',
    'Санкт-Петербург',
    'Архангельск',
    'Владивосток',
    'Волгоград',
    'Воронеж',
    'Екатеринбург',
    'Ижевск',
    'Иркутск',
    'Казань',
    'Кемерово',
    'Краснодар',
    'Красноярск',
    'Мурманск',
];

const cityFilter = $('.js-example');
cityFilter.select2({
    data: cityArray
});

export default cityFilter;