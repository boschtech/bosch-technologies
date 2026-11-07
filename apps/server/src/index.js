import 'dotenv/config';
import { createApp } from './app.js';

const port = process.env.PORT || 4000;
const app = createApp();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`bosch-technologies API listening on port ${port}`);
});
