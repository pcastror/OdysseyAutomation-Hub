import {binding, given, then, when} from 'cucumber-tsflow';
import {assert} from 'chai';
import {setDefaultTimeout} from "@cucumber/cucumber";
import * as url from "url";

setDefaultTimeout(60 * 1000);

@binding()
export class BankAccountSteps {
    private accountBalance: number = 0;

    @given("A bank account with starting balance of {string}")
    public givenAnAccountWithStartingBalance(amount: string) {
        this.accountBalance = parseInt(amount);
    }

    @when("{string} is deposited")
    public deposit(amount: string) {
        this.accountBalance = Number(this.accountBalance) + parseInt(amount);
    }

    @then("The bank account balance should be {string}")
    public async accountBalanceShouldEqual(expectedAmount: string) {
        assert.equal(this.accountBalance, parseInt(expectedAmount));
        let UrlPath = process.env.URL_PATH;

        if (UrlPath == "actions_test") {
            console.log("Variable rescatada con éxito" + UrlPath)
        } else {
            throw ("Si ves este mensaje es porque fallamos" +UrlPath)
        }

    }
}
