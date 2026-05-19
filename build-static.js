const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    if (!fs.existsSync(from)) return;
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const lStat = fs.lstatSync(path.join(from, element));
        if (lStat.isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else if (lStat.isDirectory()) {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath, { recursive: true });

// Copy top level files
const filesToCopy = [
    'index.html',
    'index.es.html',
    'Logotipo.svg',
    'favicon.svg',
    'Favicon_Kinetora.png',
    'robots.txt',
    'sitemap.xml',
    'vercel.json'
];

filesToCopy.forEach(file => {
    const src = path.join(__dirname, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(distPath, file));
        console.log(`Copied ${file} to dist/`);
    }
});

// Copy assets folder
if (fs.existsSync(path.join(__dirname, 'assets'))) {
    copyFolderSync(path.join(__dirname, 'assets'), path.join(distPath, 'assets'));
    console.log('Copied assets/ folder to dist/');
}

console.log('Static site build successfully copied to dist/ directory!');
