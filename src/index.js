import * as dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
server.on('error', (error) => console.log(`Server error: ${error}`));
