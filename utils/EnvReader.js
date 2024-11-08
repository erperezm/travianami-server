const fs = require('fs');
const path = require('path');

function loadEnv(fileName) {
    const envFilePath = path.join(__dirname, '..', fileName);
    const envData = fs.readFileSync(envFilePath, 'utf8');
    
    const envVariables = {};
    const lines = envData.split('\n');

    lines.forEach(line => {

        if (line.trim() === '' || line.startsWith('#')) {
            return;
        }

        const [key, value] = line.split('=');

        if (key !== undefined && value !== undefined) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            envVariables[trimmedKey] = trimmedValue;
            process.env[trimmedKey] = trimmedValue;
        } else {
            console.warn(`Ignoring malformed line: ${line}`);
        }
    });

    return envVariables;
}

module.exports = loadEnv;
