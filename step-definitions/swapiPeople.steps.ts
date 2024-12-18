import {binding, given, then, when} from 'cucumber-tsflow';
import {assert, expect} from 'chai';
import {setDefaultTimeout} from "@cucumber/cucumber";
import {RequestService} from '../clients/request.service';
/*import dotenv from 'dotenv';
//use in local test with .env file
dotenv.config();*/

setDefaultTimeout(60 * 1000);

let id: number;

@binding()
export class StarWarsCharactersSteps {
    private respuesta: any;

    constructor(private requestService: RequestService) {
        this.requestService = new RequestService();
    }

    @given("A Character id {int}")
    public async CharacterID(idParam: number) {
        id = idParam;
    }

    @when("get swapi is call")
    public async SwAPIRequestGet() {
        this.respuesta = await this.requestService.get(id);
    }

    @then("return {string} in name field")
    public async SwapiNameResponse(name: string) {
        assert.equal(this.respuesta.data.name, name);


    }
}
