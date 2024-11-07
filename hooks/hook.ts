import fs from 'fs';
import { AfterAll } from '@cucumber/cucumber';

AfterAll(() => {
    // Leer el archivo de salida generado
    const output = fs.readFileSync('./util/cucumber-console-output.txt', 'utf-8');

    // Expresión regular para encontrar la URL de reporte de Cucumber
    const urlRegex = /https:\/\/reports\.cucumber\.io\/reports\/[a-f0-9-]+/g;
    const foundUrls = output.match(urlRegex);

    if (foundUrls && foundUrls.length > 0) {
        // Guardar la primera URL encontrada en una variable de entorno
        process.env.CUCUMBER_REPORT_URL = foundUrls[0];
        console.log('URL del reporte guardada en variable de entorno:', process.env.CUCUMBER_REPORT_URL);
    } else {
        console.log('No se encontró ninguna URL de reporte en el archivo.');
    }
});
