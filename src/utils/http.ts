import axios from 'axios';

export async function pokeApiGet(path: string): Promise<any> {
    const url = `https://pokeapi.co/api/v2/${path}`;
    let response: any;
    let error: any;
    await axios.get(url)
    .then((res: any) => {
        response = res;
    }).catch((err: any) => {
        error = err;
    });
    if (response) {
        return response;
    } else {
        console.error(error);
        throw error;
    }
}