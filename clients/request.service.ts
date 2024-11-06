import axios, {AxiosInstance} from 'axios';
import {ClientCredentialsService} from "./client-credentials.service";


export class RequestService {
    private axiosInstance: AxiosInstance;
    private clientCredentialsService: ClientCredentialsService;
    constructor() {
        this.clientCredentialsService = new ClientCredentialsService();
        this.axiosInstance = axios.create({
            baseURL: this.clientCredentialsService.getUrl()
        });
    }
    async get(id: number): Promise<any> {
        try {
            return await this.axiosInstance.get(`/api/people/${id}`);
        } catch (error) {
            console.error('Error en la llamada a la API:', error);
        }
    }
}



