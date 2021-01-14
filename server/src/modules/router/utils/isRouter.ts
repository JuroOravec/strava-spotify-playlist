import type { Router } from 'express';

const isRouter = (value: unknown): value is Router => {
  const anyVal = value as any;
  return anyVal?.use && anyVal?.route;
};

export default isRouter;
