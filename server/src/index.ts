import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import healthRoutes from './routes/health.routes';
import advisoryRoutes from './routes/advisory.routes';
import emergencyRoutes from './routes/emergency.routes';
import resourceRoutes from './routes/resource.routes';
import profileRoutes from './routes/profile.routes';

const app = express();

// Security and utility middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allows cross-origin API usage with Vite dev server
}));

app.use(cors({
  origin: [
    config.clientUrl,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Logging middleware in development
if (config.nodeEnv === 'development') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/advisories', advisoryRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/profile', profileRoutes);

// 404 Fallback
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `API Route ${req.originalUrl} does not exist.`,
  });
});

// Central Error Handling
app.use(errorHandler);

// Start Server
const server = app.listen(config.port, () => {
  console.log(`=======================================================`);
  console.log(`🌾 Rural Emergency & Livelihood Assistant API`);
  console.log(`🚀 Server running on port ${config.port} [${config.nodeEnv}]`);
  console.log(`📡 URL: http://localhost:${config.port}`);
  console.log(`🤖 Gemini API Status: ${config.gemini.apiKey ? 'ACTIVE' : 'READY (Configurable via .env)'}`);
  console.log(`=======================================================`);
});

export default app;
