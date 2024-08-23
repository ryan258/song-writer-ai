require('dotenv').config();
const { execSync } = require('child_process');

console.log('API_URL:', process.env.API_URL);
console.log('MODEL_NAME:', process.env.MODEL_NAME);

try {
  execSync('npm run test:integration', { stdio: 'inherit' });
} catch (error) {
  console.error('Test execution failed');
  process.exit(1);
}