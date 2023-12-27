import express from 'express';
import bodyParser from 'body-parser'; // Middleware to parse request bodies
import helmet from 'helmet'; // Middleware for adding security headers
import cors from 'cors';
import path from 'path';
import router from './routes/index.js';

const app = express();

// Apply middleware
app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ['*'],
//         imgSrc: ["'self'", 'data:', 'blob:'],
//       },
//     },
//   })
// );
app.use(cors()); // Enable CORS for all routes

app.use('/uploads', express.static('uploads'));
app.use('/api', router); // Mount the centralized routes under the '/api' prefix

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);

// Export the Express app instance
export default app;
