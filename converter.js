const fs = require('fs');
const nbt = require('prismarine-nbt');

async function convertNBTtoJSON(inputFile, outputFile) {
    try {
        const binData = fs.readFileSync(inputFile);
        const parsedData = await nbt.parse(binData);
        const jsonData = JSON.stringify(parsedData.parsed, null, 2);

        fs.writeFileSync(outputFile, jsonData, 'utf8');
        console.log(`NBT data successfully converted to ${outputFile}`);
    } catch (error) {
        console.error('Error converting NBT to JSON:', error);
    }
}


async function convertJSONtoNBT(inputFile, outputFile) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        const nbtData = nbt.writeUncompressed(jsonData);

        fs.writeFileSync(outputFile, nbtData);
        console.log(`JSON data successfully converted to ${outputFile}`);
    } catch (error) {
        console.error('Error converting JSON to NBT:', error);
    }
}

// Example usage:
// convertNBTtoJSON('spiraldungeonofbabel.nbt', 'spiraldungeonofbabel.json');
// convertJSONtoNBT('spiraldungeonofbabel.json', 'spiraldungeonofbabel2.nbt');
