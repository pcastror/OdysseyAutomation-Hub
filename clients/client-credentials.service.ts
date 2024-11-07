export class ClientCredentialsService {
    private url: string

    constructor() {

        this.url = process.env.URL ?? "";
    }

    getUrl(): string {
        return this.url;
    }
}
