namespace IVCalculator {
    export type Nature = (s: Stat, n: number) => number;

    export class Natures {
        public readonly hardy: Nature = natureCallback(Stat.NONE, Stat.NONE);
        public readonly lonely: Nature = natureCallback(Stat.ATK, Stat.ATK);
        public readonly brave: Nature = natureCallback(Stat.ATK, Stat.SPE);
        public readonly adamant: Nature = natureCallback(Stat.ATK, Stat.SPATK);
        public readonly naughty: Nature = natureCallback(Stat.ATK, Stat.SPDEF);
        public readonly bold: Nature = natureCallback(Stat.DEF, Stat.ATK);
        public readonly docile: Nature = natureCallback(Stat.NONE, Stat.NONE);
        public readonly relaxed: Nature = natureCallback(Stat.DEF, Stat.SPE);
        public readonly impish: Nature = natureCallback(Stat.DEF, Stat.SPATK);
        public readonly lax: Nature = natureCallback(Stat.DEF, Stat.SPDEF);
        public readonly timid: Nature = natureCallback(Stat.SPE, Stat.ATK);
        public readonly hasty: Nature = natureCallback(Stat.SPE, Stat.DEF);
        public readonly serious: Nature = natureCallback(Stat.NONE, Stat.NONE);
        public readonly jolly: Nature = natureCallback(Stat.SPE, Stat.SPATK);
        public readonly naive: Nature = natureCallback(Stat.SPE, Stat.SPDEF);
        public readonly modest: Nature = natureCallback(Stat.SPATK, Stat.ATK);
        public readonly mild: Nature = natureCallback(Stat.SPATK, Stat.DEF);
        public readonly quiet: Nature = natureCallback(Stat.SPATK, Stat.SPE);
        public readonly bashful: Nature = natureCallback(Stat.NONE, Stat.NONE);
        public readonly rash: Nature = natureCallback(Stat.SPATK, Stat.SPDEF);
        public readonly calm: Nature = natureCallback(Stat.SPDEF, Stat.ATK);
        public readonly gentle: Nature = natureCallback(Stat.SPDEF, Stat.DEF);
        public readonly sassy: Nature = natureCallback(Stat.SPDEF, Stat.SPE);
        public readonly careful: Nature = natureCallback(Stat.SPDEF, Stat.SPATK);
        public readonly quirky: Nature = natureCallback(Stat.NONE, Stat.NONE);
    }
    
    function natureCallback(highStat: Stat, lowStat: Stat): Nature {
        return (stat: Stat, val: number): number => {
            if (stat == highStat) {
                return val / 1.1;
            }
            if (stat == lowStat) {
                return val / 0.9;
            }
            return val;
        }
    }
}

