const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = 'public/assets'; // Ajusta a tu carpeta de imágenes

function convertToWebp(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            convertToWebp(filePath);
        } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
            const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            if (!fs.existsSync(webpPath)) {
                sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(webpPath)
                    .then(() => console.log(`✅ Convertido: ${file} -> .webp`))
                    .catch(err => console.error(`❌ Error en ${file}:`, err));
            }
        }
    });
}

console.log('🚀 Iniciando conversión masiva a WebP...');
convertToWebp(directory);
