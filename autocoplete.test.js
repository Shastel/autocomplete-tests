require('dotenv').config();

const cities = require('./cities');
const path = require('path');

const modulepath = path.resolve(__dirname, process.env.ROOT_PATH);

const { createAutoComplete } = require(modulepath);

const subsearches = {
    A: require('./data/sub-search-A.json'),
    Au: require('./data/sub-search-Au.json'),
    Aus: require('./data/sub-search-Aus.json'),
    Aust: require('./data/sub-search-Aust.json'),
    Austi: require('./data/sub-search-Austi.json'),
    Austin: require('./data/sub-search-Austin.json'),
    Austins: require('./data/sub-search-Austins.json'),
};

describe('.createAutoComplete', () => {
    it('should return function', () => {
        const autocomplete = createAutoComplete([]);

        expect(typeof autocomplete === 'function').toBe(true);
    });
});

describe('.autocomplete', () => {
    it('should always return an array', () => {
        const autocomplete = createAutoComplete(['a', 'Ab']);

        expect(Array.isArray(autocomplete('sdfasdfas'))).toBe(true);
        expect(Array.isArray(autocomplete(''))).toBe(true);
        expect(Array.isArray(autocomplete('Abakan'))).toBe(true);
    });

    it('Should match by start of string', () => {
        const autocomplete = createAutoComplete([ 'a', 'ab', 'ba' ]);

        expect(autocomplete('a')).toEqual(['a', 'ab']);
        expect(autocomplete('b')).toEqual(['ba']);
    });

    it('Should be case insensentitive', () => {
        const autocomplete = createAutoComplete([ 'a', 'Ab']);

        expect(autocomplete('a')).toEqual(['a', 'Ab']);
        expect(autocomplete('A')).toEqual(['a', 'Ab']);
    });

    it('Should return empty array if input is empty or nothing matches', () => {
        const autocomplete = createAutoComplete(['a', 'Ab']);

        expect(autocomplete()).toEqual([]);
        expect(autocomplete('')).toEqual([]);
        expect(autocomplete('abra cadabra')).toEqual([]);
    });
});

describe('autocomplete perfomance', () => {
    it('should work fast enought', () => {
        const autocomplete = createAutoComplete(cities);

        for (let query in subsearches) {
            expect(autocomplete(query)).toEqual(subsearches[query]);
            expect(autocomplete(query)).toEqual(subsearches[query]);
        }
    });
});
