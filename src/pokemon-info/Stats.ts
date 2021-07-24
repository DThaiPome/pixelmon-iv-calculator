namespace IVCalculator {
    export  class Stats {
        public hp: number;
        public atk: number;
        public def: number;
        public spatk: number;
        public spdef: number;
        public spe: number;
    
        public constructor() {
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
    
        public SetStatByType(type: Stat, stat: number): void {
            switch(type) {
                case Stat.HP:
                    this.SetStat('hp', stat);
                    break;
                case Stat.ATK:
                    this.SetStat('attack', stat);
                    break;
                case Stat.DEF:
                    this.SetStat('defense', stat);
                    break;
                case Stat.SPATK:
                    this.SetStat('special-attack', stat);
                    break;
                case Stat.SPDEF:
                    this.SetStat('special-defense', stat);
                    break;
                case Stat.SPE:
                    this.SetStat('speed', stat);
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
            (pokemonObj.stats as Array<any>).forEach(stat => {
                let type: string = ((stat as any).stat.name as string);
                baseStats.SetStat(type, (stat as any).base_stat);
            });
        
            return baseStats;
        }
    }
}