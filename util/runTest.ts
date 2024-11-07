import {exec} from 'child_process';
import fs from 'fs';

function removeAnsiCodes(text: string): string {
    return text.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
}

exec('npm run test:cucumber', (error, stdout, stderr) => {

    if (error) {
        console.error(`Error ejecutando Cucumber: ${error}`);
    } else {
        const output = stdout + stderr;
        const cleanOutput = removeAnsiCodes(output);
        fs.writeFileSync('cucumber-console-output.txt', cleanOutput, 'utf-8');
        const urlRegex = /https:\/\/reports\.cucumber\.io\/reports\/[a-f0-9-]+/g;
        const foundUrls = cleanOutput.match(urlRegex);

        let reportUrl = '';

        if (foundUrls && foundUrls.length > 0) {
            reportUrl = foundUrls[0]; // Tomamos la primera URL que coincide
            process.env.CUCUMBER_REPORT_URL = reportUrl;
            console.log(stdout);
            console.log(stderr);
            //console.log(reportUrl);
        }
    }
});
