export class ClientCredentialsService {
    private url: string

    constructor() {

        this.url = process.env.URL ?? "https://swapi.dev";
    }

    getUrl(): string {
        return this.url;
    }
}
