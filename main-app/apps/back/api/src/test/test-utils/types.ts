import { INestApplication } from '@nestjs/common';

export type ErrorType = {
  message: string | string[];
};

export type UseProps = {
  app: INestApplication;
  header?: [string, string];
};
