namespace IVCalculator {
    export class Pokemon {
        private base: Stats;
        private evs: Stats;
        private current: Stats;
        private level: number;
        private nature: Nature;
    
        public constructor(base: Stats, evs: Stats, current: Stats, level: number, nature: Nature) {
            this.base = base;
            this.evs = evs;
            this.current = current;
            this.level = level;
            this.nature = nature;
        }
    
        public calculateIVRange(stat: Stat): [number, number] {
            let base = [...this.base][stat as number];
            let ev = [...this.evs][stat as number];
            let current = [...this.current][stat as number];
    
            let lowIv = Pokemon.calculateIVSingle(stat, base, ev, current, this.level, this.nature);
            let highIv = Pokemon.calculateIVSingle(stat, base, ev, current + 1, this.level, this.nature);
    
            return [lowIv, highIv];
        }
    
        private static calculateIVSingle(stat: Stat, base: number, ev: number, current: number, level: number, nature: Nature): number {
            if (stat === Stat.HP) {
                return Pokemon.clamp(Math.floor(((current - 10) * (100 / level) - 100) - (ev / 4) - (2 * base)), 0, 31);
            } else {
                return Pokemon.clamp(Math.floor(((100 * (nature(stat, current) - 5)) / level) - (2 * base) - (ev / 4)), 0, 31);
            }
        } 
    
        private static clamp(val: number, min: number, max: number) {
            if (val < min) {
                return min;
            }
            if (val > max) {
                return max;
            }
            return val;
        }
    }
}