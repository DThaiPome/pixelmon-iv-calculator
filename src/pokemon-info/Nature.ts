import { Stat } from './Stat';

export type Nature = (s: Stat, n: number) => number;

export const Natures {
    
}

function natureCallback(highStat: Stat, lowStat: Stat): Nature {
    return (stat: Stat, val: number): number => {
        if (stat == highStat) {
            return val * 1.1;
        }
        if (stat == lowStat) {
            return val * 0.9;
        }
        return val;
    }
}