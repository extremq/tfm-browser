const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.swf': 'application/x-shockwave-flash'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
    let reqUrl = req.url;
    
    if (reqUrl === '/') {
        reqUrl = '/index.html';
    }
    
    const filePath = path.join(__dirname, reqUrl);
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // File exists locally, serve it
            fs.readFile(filePath, (readErr, data) => {
                if (readErr) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                
                const mimeType = getMimeType(filePath);
                res.writeHead(200, { 
                    'Content-Type': mimeType,
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(data);
            });
        } else {
            // File doesn't exist locally, try to proxy from Transformice
            const targetUrl = `https://www.transformice.com${reqUrl}`;
            console.log(`Proxying request to: ${targetUrl}`);
            
            https.get(targetUrl, (proxyRes) => {
                const mimeType = getMimeType(reqUrl);
                res.writeHead(proxyRes.statusCode, {
                    'Content-Type': mimeType,
                    'Access-Control-Allow-Origin': '*'
                });
                proxyRes.pipe(res);
            }).on('error', (proxyErr) => {
                console.error(`Proxy error: ${proxyErr.message}`);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found locally or on remote server');
            });
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Serving local files and proxying to transformice.com');
});