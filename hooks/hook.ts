import { AfterAll } from '@cucumber/cucumber';

AfterAll(() => {
console.log("AfterAll hook message")
});
