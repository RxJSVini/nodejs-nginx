import fastify from 'fastify';
import { AppRoutes } from './routes';
import jwt from '@fastify/jwt';
import 'dotenv/config';

export const app = fastify({
    logger: true
});


app.register(jwt, {
    secret: process.env.JWT_SECRET || '03c7c0ace395d80182db07ae2c30f034'// Só pra testar kkkkkkkk 😂
});


app.register(AppRoutes);
