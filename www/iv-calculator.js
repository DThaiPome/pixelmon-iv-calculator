"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var IVCalculator;
(function (IVCalculator) {
    function pokeApiGet(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://pokeapi.co/api/v2/${path}`;
            let response;
            let error;
            yield fetch(url, {
                method: 'GET'
            })
                .then((res) => {
                response = res;
            }).catch((err) => {
                error = err;
            });
            if (response) {
                return response.json();
            }
            else {
                console.error(error);
                throw error;
            }
        });
    }
    IVCalculator.pokeApiGet = pokeApiGet;
})(IVCalculator || (IVCalculator = {}));
var IVCalculator;
(function (IVCalculator) {
    let Stat;
    (function (Stat) {
        Stat[Stat["NONE"] = -1] = "NONE";
        Stat[Stat["HP"] = 0] = "HP";
        Stat[Stat["ATK"] = 1] = "ATK";
        Stat[Stat["DEF"] = 2] = "DEF";
        Stat[Stat["SPATK"] = 3] = "SPATK";
        Stat[Stat["SPDEF"] = 4] = "SPDEF";
        Stat[Stat["SPE"] = 5] = "SPE";
    })(Stat = IVCalculator.Stat || (IVCalculator.Stat = {}));
})(IVCalculator || (IVCalculator = {}));
var IVCalculator;
(function (IVCalculator) {
    class Stats {
        constructor() {
            this.hp = 0;
            this.atk = 0;
            this.def = 0;
            this.spatk = 0;
            this.spdef = 0;
            this.spe = 0;
        }
        *[Symbol.iterator]() {
            yield this.hp;
            yield this.atk;
            yield this.def;
            yield this.spatk;
            yield this.spdef;
            yield this.spe;
        }
        SetStat(type, stat) {
            switch (type) {
                case 'hp':
                    this.hp = stat;
                    break;
                case 'attack':
                    this.atk = stat;
                    break;
                case 'defense':
                    this.def = stat;
                    break;
                case 'special-attack':
                    this.spatk = stat;
                    break;
                case 'special-defense':
                    this.spdef = stat;
                    break;
                case 'speed':
                    this.spe = stat;
                    break;
            }
        }
        SetStatByType(type, stat) {
            switch (type) {
                case IVCalculator.Stat.HP:
                    this.SetStat('hp', stat);
                    break;
                case IVCalculator.Stat.ATK:
                    this.SetStat('attack', stat);
                    break;
                case IVCalculator.Stat.DEF:
                    this.SetStat('defense', stat);
                    break;
                case IVCalculator.Stat.SPATK:
                    this.SetStat('special-attack', stat);
                    break;
                case IVCalculator.Stat.SPDEF:
                    this.SetStat('special-defense', stat);
                    break;
                case IVCalculator.Stat.SPE:
                    this.SetStat('speed', stat);
                    break;
            }
        }
        static getPokemonBaseStats(pokemon) {
            return __awaiter(this, void 0, void 0, function* () {
                let error;
                let pokemonObj = yield IVCalculator.pokeApiGet(`pokemon/${pokemon}`)
                    .catch((err) => {
                    error = err;
                });
                if (error) {
                    console.error(error);
                    throw error;
                }
                const baseStats = new Stats();
                pokemonObj.stats.forEach(stat => {
                    let type = stat.stat.name;
                    baseStats.SetStat(type, stat.base_stat);
                });
                return baseStats;
            });
        }
    }
    IVCalculator.Stats = Stats;
})(IVCalculator || (IVCalculator = {}));
var IVCalculator;
(function (IVCalculator) {
    class Natures {
        constructor() {
            this.hardy = natureCallback(IVCalculator.Stat.NONE, IVCalculator.Stat.NONE);
            this.lonely = natureCallback(IVCalculator.Stat.ATK, IVCalculator.Stat.ATK);
            this.brave = natureCallback(IVCalculator.Stat.ATK, IVCalculator.Stat.SPE);
            this.adamant = natureCallback(IVCalculator.Stat.ATK, IVCalculator.Stat.SPATK);
            this.naughty = natureCallback(IVCalculator.Stat.ATK, IVCalculator.Stat.SPDEF);
            this.bold = natureCallback(IVCalculator.Stat.DEF, IVCalculator.Stat.ATK);
            this.docile = natureCallback(IVCalculator.Stat.NONE, IVCalculator.Stat.NONE);
            this.relaxed = natureCallback(IVCalculator.Stat.DEF, IVCalculator.Stat.SPE);
            this.impish = natureCallback(IVCalculator.Stat.DEF, IVCalculator.Stat.SPATK);
            this.lax = natureCallback(IVCalculator.Stat.DEF, IVCalculator.Stat.SPDEF);
            this.timid = natureCallback(IVCalculator.Stat.SPE, IVCalculator.Stat.ATK);
            this.hasty = natureCallback(IVCalculator.Stat.SPE, IVCalculator.Stat.DEF);
            this.serious = natureCallback(IVCalculator.Stat.NONE, IVCalculator.Stat.NONE);
            this.jolly = natureCallback(IVCalculator.Stat.SPE, IVCalculator.Stat.SPATK);
            this.naive = natureCallback(IVCalculator.Stat.SPE, IVCalculator.Stat.SPDEF);
            this.modest = natureCallback(IVCalculator.Stat.SPATK, IVCalculator.Stat.ATK);
            this.mild = natureCallback(IVCalculator.Stat.SPATK, IVCalculator.Stat.DEF);
            this.quiet = natureCallback(IVCalculator.Stat.SPATK, IVCalculator.Stat.SPE);
            this.bashful = natureCallback(IVCalculator.Stat.NONE, IVCalculator.Stat.NONE);
            this.rash = natureCallback(IVCalculator.Stat.SPATK, IVCalculator.Stat.SPDEF);
            this.calm = natureCallback(IVCalculator.Stat.SPDEF, IVCalculator.Stat.ATK);
            this.gentle = natureCallback(IVCalculator.Stat.SPDEF, IVCalculator.Stat.DEF);
            this.sassy = natureCallback(IVCalculator.Stat.SPDEF, IVCalculator.Stat.SPE);
            this.careful = natureCallback(IVCalculator.Stat.SPDEF, IVCalculator.Stat.SPATK);
            this.quirky = natureCallback(IVCalculator.Stat.NONE, IVCalculator.Stat.NONE);
        }
    }
    IVCalculator.Natures = Natures;
    function natureCallback(highStat, lowStat) {
        return (stat, val) => {
            if (stat == highStat) {
                return val / 1.1;
            }
            if (stat == lowStat) {
                return val / 0.9;
            }
            return val;
        };
    }
})(IVCalculator || (IVCalculator = {}));
var IVCalculator;
(function (IVCalculator) {
    class Pokemon {
        constructor(base, evs, current, level, nature) {
            this.base = base;
            this.evs = evs;
            this.current = current;
            this.level = level;
            this.nature = nature;
        }
        calculateIVRange(stat) {
            let base = [...this.base][stat];
            let ev = [...this.evs][stat];
            let current = [...this.current][stat];
            let lowIv = Pokemon.calculateIVSingle(stat, base, ev, current, this.level, this.nature);
            let highIv = Pokemon.calculateIVSingle(stat, base, ev, current + 1, this.level, this.nature);
            return [lowIv, highIv];
        }
        static calculateIVSingle(stat, base, ev, current, level, nature) {
            if (stat === IVCalculator.Stat.HP) {
                return Pokemon.clamp(Math.floor(((current - 10) * (100 / level) - 100) - (ev / 4) - (2 * base)), 0, 31);
            }
            else {
                return Pokemon.clamp(Math.floor(((100 * (nature(stat, current) - 5)) / level) - (2 * base) - (ev / 4)), 0, 31);
            }
        }
        static clamp(val, min, max) {
            if (val < min) {
                return min;
            }
            if (val > max) {
                return max;
            }
            return val;
        }
    }
    IVCalculator.Pokemon = Pokemon;
})(IVCalculator || (IVCalculator = {}));
var IVCalculator;
(function (IVCalculator) {
    function onPress() {
        return __awaiter(this, void 0, void 0, function* () {
            const values = yield calculateValues();
            if (values) {
                displayValues(values);
            }
            else {
                displayError("An error occured - make sure your inputs are valid");
            }
        });
    }
    IVCalculator.onPress = onPress;
    function displayError(text) {
        let div = document.querySelector('#error');
        div.textContent = text;
    }
    function displayValues(values) {
        let div = document.querySelector('#ivs');
        let spans = div.querySelectorAll('span');
        for (let i = 0; i < 6; i++) {
            spans[i].textContent = pairToString(values[i]);
        }
    }
    function pairToString(pair) {
        return `[${pair[0]} - ${pair[1]}]`;
    }
    function calculateValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const current = getStats('current-stats');
            const evs = getStats('evs');
            let base;
            let error = false;
            yield IVCalculator.Stats.getPokemonBaseStats(getStringInput('pokemon-species'))
                .then(res => {
                base = res;
            })
                .catch(err => {
                error = true;
            });
            const level = getNumberInputs('level')[0];
            const nature = (new IVCalculator.Natures())[getStringInput('nature').toLowerCase()];
            if (!validateStats(current) || !validateStats(evs) || !validateStats(base)
                || !validateNumber(level, 0, 100) || nature === undefined) {
                return undefined;
            }
            const pokemon = new IVCalculator.Pokemon(base, evs, current, level, nature);
            const result = [];
            for (let i = 0; i < 6; i++) {
                result.push(pokemon.calculateIVRange(i));
            }
            return result;
        });
    }
    function getStats(id) {
        const inputs = getNumberInputs(id);
        const stats = new IVCalculator.Stats();
        inputs.forEach((val, index) => {
            stats.SetStatByType(index, val);
        });
        return stats;
    }
    function getNumberInputs(id) {
        const div = document.querySelector(`#${id}`);
        const inputs = div.querySelectorAll(`input`);
        const result = [];
        inputs.forEach(element => {
            result.push(parseInt(element.value));
        });
        return result;
    }
    function getStringInput(id) {
        const div = document.querySelector(`#${id}`);
        const input = div.querySelector('input');
        return input.value;
    }
    function validateStats(stats) {
        let error = false;
        [...stats].forEach(val => {
            if (!validateNumber(val, 0)) {
                error = true;
            }
        });
        return !error;
    }
    function validateNumber(val, min = undefined, max = undefined) {
        if (typeof val === 'undefined') {
            return false;
        }
        if (typeof min !== 'undefined' && val < min) {
            return false;
        }
        if (typeof max !== 'undefined' && val > max) {
            return false;
        }
        return true;
    }
})(IVCalculator || (IVCalculator = {}));
function onPress() {
    IVCalculator.onPress();
}
