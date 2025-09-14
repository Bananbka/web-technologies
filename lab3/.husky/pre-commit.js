const { execSync } = require('child_process');

try {
    execSync('npm test', { stdio: 'inherit' });
} catch (error) {
    process.exit(1);
}