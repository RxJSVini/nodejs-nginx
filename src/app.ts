import fastify from 'fastify';
import { AppRoutes } from './routes';

export const app = fastify({
    logger: true
});


app.register(AppRoutes);
