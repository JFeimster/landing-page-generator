import express from 'express';
import { router } from './routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use('/', router);

app.listen(port, () => {
  console.log(`Landing Page Generator Action service running on port ${port}`);
});
