namespace IVCalculator {
    export async function onPress(): Promise<void> {
        const values = await calculateValues();
        if (values) {
            displayValues(values);
        } else {
            displayError("An error occured - make sure your inputs are valid");
        }
    }
    
    function displayError(text: string) {
        let div = document.querySelector('#error');
        div.textContent = text;
    }
    
    function displayValues(values: Array<[number, number]>): void {
        let div = document.querySelector('#ivs');
        let spans = div.querySelectorAll('span');
        for(let i = 0; i < 6; i++) {
            spans[i].innerHTML = pairToString(values[i]);
        }
    }
    
    function pairToString(pair: [number, number]): string {
        return `<b>[${pair[0]} - ${pair[1]}]</b>`;
    }

    async function calculateValues(): Promise<Array<[number, number]>> {
        const current = getStats('current-stats');
        const evs = getStats('evs');
    
        let base;
        let error = false;
        await Stats.getPokemonBaseStats(getStringInput('pokemon-species'))
        .then(res => {
            base = res;
        })
        .catch(err => {
            error = true;
        });
        const level = getNumberInputs('level')[0];
        const nature = ((new Natures())[getStringInput('nature').toLowerCase()] as Nature);
    
        if (!validateStats(current) || !validateStats(evs) || !validateStats(base)
            || !validateNumber(level, 0, 100) || nature === undefined) {
            return undefined;
        }
    
        const pokemon = new Pokemon(base, evs, current, level, nature);
        const result = [];
        for(let i = 0; i < 6; i++) {
            result.push(pokemon.calculateIVRange((i as Stat)));
        }
        return result;
    }
    
    function getStats(id: string): Stats {
        const inputs = getNumberInputs(id);
        const stats = new Stats();
        inputs.forEach((val, index) => {
            stats.SetStatByType((index as Stat), val);
        });
        return stats;
    }
    
    function getNumberInputs(id: string): Array<number> {
        const div = document.querySelector(`#${id}`);
        const inputs = div.querySelectorAll(`input`);
        const result: Array<number> = [];
        inputs.forEach(element => {
            result.push(parseInt(element.value));
        });
        return result;
    }
    
    function getStringInput(id: string): string {
        const div = document.querySelector(`#${id}`);
        const input = div.querySelector('input');
        return input.value;
    }
    
    function validateStats(stats: Stats): boolean {
        let error = false;
        [...stats].forEach(val => {
            if (!validateNumber(val, 0)) {
                error = true;
            }
        });
        return !error;
    }
    
    function validateNumber(val: number, min: number = undefined, max: number = undefined) {
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
}
