// Minimal static dev server for Oopsy Ai (no dependencies).
// Usage: npm run dev [-- --port 7100] [-- --host 127.0.0.1]
// Also forwards --port/-p and --host in `npm run dev --port 7100` form,
// and honors PORT / HOST env vars.

const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function argValue(names, fallback) {
	for (let i = 0; i < args.length; i++) {
		for (const name of names) {
			if (args[i] === name && args[i + 1]) return args[i + 1];
			if (args[i].startsWith(name + '=')) return args[i].split('=')[1];
		}
	}
	return fallback;
}

const port = parseInt(argValue(['--port', '-p'], process.env.PORT || '7100'), 10);
const host = argValue(['--host'], process.env.HOST || '127.0.0.1');

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
	'.mp4': 'video/mp4',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain; charset=utf-8'
};

const root = __dirname;

const server = http.createServer((req, res) => {
	try {
		let urlPath = decodeURIComponent(req.url.split('?')[0]);
		if (urlPath === '/') urlPath = '/index.html';
		const filePath = path.normalize(path.join(root, urlPath));
		if (!filePath.startsWith(root)) {
			res.writeHead(403);
			res.end('Forbidden');
			return;
		}
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.writeHead(404);
				res.end('Not found');
				return;
			}
			res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
			res.end(data);
		});
	} catch (e) {
		res.writeHead(500);
		res.end('Server error');
	}
});

server.listen(port, host, () => {
	console.log(`Oopsy Ai dev server: http://${host}:${port}/`);
});
