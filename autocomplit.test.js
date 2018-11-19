require('dotenv').config();

const cities = require('./cities');
const path = require('path');

const modulepath = path.resolve(__dirname, process.env.ROOT_PATH);

const { createAutocomplit } = require(modulepath);

const subsearches = {
    A: require('./data/sub-search-A.json'),
    Au: require('./data/sub-search-Au.json'),
    Aus: require('./data/sub-search-Aus.json'),
    Aust: require('./data/sub-search-Aust.json'),
    Austi: require('./data/sub-search-Austi.json'),
    Austin: require('./data/sub-search-Austin.json'),
    Austins: require('./data/sub-search-Austins.json'),
};

describe('.createAutocomplit', () => {
    it('should return function', () => {
        const autocomplit = createAutocomplit([]);

        expect(typeof autocomplit === 'function').toBe(true);
    });
});

describe('.autocomplit', () => {
    it('should always return an array', () => {
        const autocomplit = createAutocomplit(['a', 'Ab']);

        expect(Array.isArray(autocomplit('sdfasdfas'))).toBe(true);
        expect(Array.isArray(autocomplit(''))).toBe(true);
        expect(Array.isArray(autocomplit('Abakan'))).toBe(true);
    });

    it('Should match by start of string', () => {
        const autocomplit = createAutocomplit([ 'a', 'ab', 'ba' ]);

        expect(autocomplit('a')).toEqual(['a', 'ab']);
        expect(autocomplit('b')).toEqual(['ba']);
    });

    it('Should be case insensentitive', () => {
        const autocomplit = createAutocomplit([ 'a', 'Ab']);

        expect(autocomplit('a')).toEqual(['a', 'Ab']);
        expect(autocomplit('A')).toEqual(['a', 'Ab']);
    });

    it('Should return empty array if input is empty or nothing matches', () => {
        const autocomplit = createAutocomplit(['a', 'Ab']);

        expect(autocomplit()).toEqual([]);
        expect(autocomplit('')).toEqual([]);
        expect(autocomplit('abra cadabra')).toEqual([]);
    });
});

describe('autocomplit perfomance', () => {
    it('should work fast enought', () => {
        const autocomplit = createAutocomplit(cities);

        for (let query in subsearches) {
            expect(autocomplit(query)).toEqual(subsearches[query]);
            expect(autocomplit(query)).toEqual(subsearches[query]);
        }
    });
});
