import express from 'express';
import { connectDB } from './config/config';
import { clerkMiddleware } from '@clerk/express';
const app = express();


connectDB();
const PORT = 3000;

app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
