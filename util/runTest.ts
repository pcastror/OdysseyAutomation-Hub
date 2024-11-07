import { exec } from 'child_process';
import fs from 'fs';

// Función para eliminar secuencias ANSI
function removeAnsiCodes(text: string): string {
    return text.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
}
exec('npm run test:cucumber', (error, stdout, stderr) => {
    // Combina stdout y stderr para capturar toda la salida
    const output = stdout + stderr;

    // Elimina secuencias ANSI antes de guardar
    const cleanOutput = removeAnsiCodes(output);

    // Guardar toda la salida limpia en un archivo
    fs.writeFileSync('cucumber-console-output.txt', cleanOutput, 'utf-8');
    //console.log("Los resultados completos, sin secuencias ANSI, se han guardado en 'cucumber-console-output.txt'");

    if (error) {
        console.error(`Error ejecutando Cucumber: ${error}`);
    }

    const urlRegex = /https:\/\/reports\.cucumber\.io\/reports\/[a-f0-9-]+/g;
    const foundUrls = cleanOutput.match(urlRegex);

    let reportUrl = '';
    if (foundUrls && foundUrls.length > 0) {
        reportUrl = foundUrls[0]; // Tomamos la primera URL que coincide
        process.env.CUCUMBER_REPORT_URL = reportUrl;
        console.log(reportUrl);

    }

});
