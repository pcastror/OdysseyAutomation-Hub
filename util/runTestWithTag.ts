import {exec} from 'child_process';
import fs from 'fs';
function removeAnsiCodes(text: string): string {
    return text.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
}

exec('npm run test-tag:cucumber-report' , (error, stdout, stderr) => {
    const FilePath = 'cucumber-console-output.txt';
    if (error) {
        console.error(`Error execution Cucumber: ${error}`);
    } else {
        const output = stdout + stderr;
        const cleanOutput = removeAnsiCodes(output);
        fs.writeFileSync(FilePath, cleanOutput, 'utf-8');
        const urlRegex = /https:\/\/reports\.cucumber\.io\/reports\/[a-f0-9-]+/g;
        const foundUrls = cleanOutput.match(urlRegex);

        let reportUrl = '';

        if (foundUrls && foundUrls.length > 0) {
            reportUrl = foundUrls[0];
            process.env.CUCUMBER_REPORT_URL = reportUrl;
            console.log(stdout, '\n' + stderr);

            const NumLinesToDelete = 6;

            try {
                const FileContent = fs.readFileSync(FilePath, 'utf-8');
                const lines = FileContent.split('\n');
                const ContentModified = lines.slice(NumLinesToDelete).join('\n');
                fs.writeFileSync(FilePath, ContentModified, 'utf-8');
            } catch (error) {
                console.error(`Eror: ${error.message}`);
            }
        }
    }
});
