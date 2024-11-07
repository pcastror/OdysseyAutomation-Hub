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
    console.log("Los resultados completos, sin secuencias ANSI, se han guardado en 'cucumber-console-output.txt'");

    if (error) {
        console.error(`Error ejecutando Cucumber: ${error}`);
    }
    // Extraer la URL del reporte de Cucumber
    const urlRegex = /https:\/\/reports\.cucumber\.io\/reports\/[a-f0-9-]+/g;
    const foundUrls = cleanOutput.match(urlRegex);

    let reportUrl = '';
    if (foundUrls && foundUrls.length > 0) {
        reportUrl = foundUrls[0]; // Tomamos la primera URL que coincide
        process.env.CUCUMBER_REPORT_URL = reportUrl;

        //fs.writeFileSync('../.env', envContent, { flag: 'a' });
        // leer .env para reemplazar el reporte si es que ya existe uno
        const output = fs.readFileSync('./.env', 'utf-8').match("CUCUMBER_REPORT_URL");

        if (output){
            console.log('inside .env.');
            const contenido = fs.readFileSync('./.env', 'utf8');
            const lineas = contenido.split('\n');
            const urlRegexEnv = /https:\/\/reports\.cucumber\.io\/reports\/[a-f0-9-]+/g;
            const variableReemplazar = 'CUCUMBER_REPORT_URL';
            for (let i = 0; i < lineas.length; i++) {
                const linea = lineas[i];
                if (linea.startsWith(`${variableReemplazar}=`)) {
                  //  lineas[i] = `${variableReemplazar}=${reportUrl}`;
                    fs.writeFileSync('../.env', lineas[i].replace(urlRegexEnv, reportUrl));
                    break;
                }
            }
        }
        else{
            // Guardar la URL en el archivo .env
            const envContent = `CUCUMBER_REPORT_URL=${reportUrl}\n`;
            fs.writeFileSync('../.env', envContent, { flag: 'a' }); // Flag 'a' para agregar sin sobrescribir
        }
        console.log('URL del reporte guardada en .env y en la variable de entorno CUCUMBER_REPORT_URL:', reportUrl);
        console.log('URL del reporte encontrada:', reportUrl);
    }


});
