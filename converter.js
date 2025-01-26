const fs = require('fs');
const nbt = require('prismarine-nbt');
const zlib = require('zlib');

/**
 * Converts an NBT file to JSON, handling compressed files automatically.
 * @param {string} inputFile - Path to the NBT file.
 * @param {string} outputFile - Path to save the JSON file.
 */
async function convertNBTtoJSON(inputFile, outputFile) {
    try {
        const binData = fs.readFileSync(inputFile);

        // Try to decompress (if compressed, it will succeed; otherwise, it fails)
        zlib.gunzip(binData, async (err, decompressed) => {
            const dataToParse = err ? binData : decompressed; // Use decompressed if possible
            const parsedData = await nbt.parse(dataToParse);
            const jsonData = JSON.stringify(parsedData.parsed, null, 2);

            fs.writeFileSync(outputFile, jsonData, 'utf8');
            console.log(`NBT data successfully converted to ${outputFile}`);
        });
    } catch (error) {
        console.error('Error converting NBT to JSON:', error);
    }
}

/**
 * Converts a JSON file back to NBT format and compresses it.
 * @param {string} inputFile - Path to the JSON file.
 * @param {string} outputFile - Path to save the NBT file.
 * @param {boolean} compressed - Whether to compress the NBT file.
 */
async function convertJSONtoNBT(inputFile, outputFile, compressed = true) {
    try {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        const nbtData = nbt.writeUncompressed(jsonData); // Convert JSON to NBT buffer

        // Compress NBT if needed
        if (compressed) {
            zlib.gzip(nbtData, (err, compressedData) => {
                if (err) throw err;
                fs.writeFileSync(outputFile, compressedData);
                console.log(`JSON successfully converted to compressed NBT: ${outputFile}`);
            });
        } else {
            fs.writeFileSync(outputFile, nbtData);
            console.log(`JSON successfully converted to uncompressed NBT: ${outputFile}`);
        }
    } catch (error) {
        console.error('Error converting JSON to NBT:', error);
    }
}

// Example usage:
// convertNBTtoJSON('spiraldungeonofbabel.nbt', 'spiraldungeonofbabel.json');
convertJSONtoNBT('spiraldungeonofbabel_black.json', 'spiraldungeonofbabel_black.nbt', true); // Uses compression
