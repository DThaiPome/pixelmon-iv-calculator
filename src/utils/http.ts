namespace IVCalculator {
    export async function pokeApiGet(path: string): Promise<any> {
        const url = `https://pokeapi.co/api/v2/${path}`;
        let response: any;
        let error: any;
        await fetch(url, {
            method: 'GET'
        })
        .then((res: any) => {
            response = res;
        }).catch((err: any) => {
            error = err;
        });
        if (response) {
            return response.json();
        } else {
            console.error(error);
            throw error;
        }
    }
}