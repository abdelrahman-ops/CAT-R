const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const operation = parsedUrl.pathname.slice(1);
    const { a, b } = parsedUrl.query;

    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    let result;

    switch (operation) {
        case 'add':
            result = num1 + num2;
        break;
        case 'subtract':
            result = num1 - num2;
        break;
        case 'multiply':
            result = num1 * num2;
        break;
        case 'divide':
            if (num2 === 0) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Error: Division by zero');
                return;
            }
            result = num1 / num2;
        break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Error: Operation not found');
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(result.toString());
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



// For addition: http://localhost:3000/add?a=3&b=6
// For subtraction: http://localhost:3000/subtract?a=10&b=4
// For multiplication: http://localhost:3000/multiply?a=2&b=5
// For division: http://localhost:3000/divide?a=20&b=4
