const https = require('https');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter GitHub username: ', (username) => {
    const url = `https://api.github.com/users/${username}/repos`;

    const options = {
        headers: {
        'User-Agent': 'Node.js CLI App',
        },
    };

    https.get(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
        data += chunk;
        });

    // Handle the end of the response
        res.on('end', () => {
            const repos = JSON.parse(data);

            if (repos.length === 0) {
            console.log(`No repositories found for user: ${username}`);
            rl.close();
            return;
        }

        const repoNames = repos.map(repo => repo.name);
        fs.writeFileSync(`${username}.txt`, repoNames.join('\n'), 'utf8');
        console.log(`Repository names saved to ${username}.txt`);
        rl.close();
        });
    }).on('error', (err) => {
        console.error('Error fetching data from GitHub:', err.message);
        rl.close();
    });
});
