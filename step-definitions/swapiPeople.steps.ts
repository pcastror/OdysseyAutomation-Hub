import {binding, given, then, when} from 'cucumber-tsflow';
import {assert, expect} from 'chai';
import {setDefaultTimeout} from "@cucumber/cucumber";
//import {config} from "dotenv";
import {RequestService} from '../clients/request.service';


//config();

setDefaultTimeout(60 * 1000);
//let respuesta: any;
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
        //  expect(ExpectedName).equal(name);
        assert.equal(this.respuesta.data.name, name);


        /* assert.equal(this.accountBalance, parseInt(expectedAmount));
         const UrlPath = process.env.URL_NOT_SECRET;

         if (UrlPath == "actions_test") {
             console.log("Variable rescatada con éxito" + " " + UrlPath)
         } else {
             throw ("Si ves este mensaje es porque fallamos" + " " + UrlPath)
         }
 */
    }
}
