import { pokeApiGet } from "../utils/http";

export default class Stats {
    public hp: number;
    public atk: number;
    public def: number;
    public spatk: number;
    public spdef: number;
    public spe: number;

    public Statss() {
        this.hp = 0;
        this.atk = 0;
        this.def = 0;
        this.spatk = 0;
        this.spdef = 0;
        this.spe = 0;
    }

    *[Symbol.iterator](): IterableIterator<number> {
        yield this.hp;
        yield this.atk;
        yield this.def;
        yield this.spatk;
        yield this.spdef;
        yield this.spe;
    }

    public SetStat(type: string, stat: number): void {
        switch(type) {
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

    public static async getPokemonBaseStats(pokemon: string): Promise<Stats> {
        let error: any;
        let pokemonObj = await pokeApiGet(`pokemon/${pokemon}`)
        .catch((err: any) => {
            error = err;
        });
        if (error) {
            console.error(error);
            throw error;
        }
    
        const baseStats = new Stats();
        for(let stat in pokemonObj.stats) {
            let type: string = ((stat as any).stat.type as string);
            baseStats.SetStat(type, (stat as any).base_stat);
        }
    
        return baseStats;
    }
}