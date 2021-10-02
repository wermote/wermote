import fastify, { FastifyInstance } from 'fastify';
import fastifyCookie from 'fastify-cookie';

import { ProxyHandler } from 'aws-lambda';
import { proxy } from 'aws-serverless-fastify';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AllExceptionsFilter } from './filters/allExceptionsFilter';
import { AppModule } from './app.module';

let cacheServer: FastifyInstance;

export async function bootstrapServer(): Promise<FastifyInstance> {
  const instance = fastify({ logger: true });

  const nestApp = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
  );

  console.log(process.env);

  nestApp.register(fastifyCookie);
  nestApp.setGlobalPrefix('api/v1');
  nestApp.useGlobalFilters(new AllExceptionsFilter());
  nestApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.IS_OFFLINE !== 'true',
    }),
  );

  await nestApp.init();

  return instance;
}

export const handler: ProxyHandler = async (event, context) => {
  if (!cacheServer) {
    cacheServer = await bootstrapServer();
  }

  return proxy(cacheServer, event, context);
};
