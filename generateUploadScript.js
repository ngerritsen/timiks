'use strict';

const fs = require('fs');

const files = fs.readdirSync('public');
const script = files
  .map(file => `curl -H 'X-Key: $UPLOAD_KEY' -H 'X-Filepath: timiks/${file}' -F 'data=@public/${file}' https://carehr.nl/http-upload/`)
  .join('\n');

fs.writeFileSync('./upload.sh', script, 'utf-8');
