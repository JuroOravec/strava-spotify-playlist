import express from 'express';
import tmp, { FileResult } from 'tmp';
import yaml from 'js-yaml';
import * as OpenApiValidator from 'express-openapi-validator';

import logger from '../../lib/logger';
import fspLogged from '../../lib/logger/fsp';
import type {
  ServerModule,
  ModuleContext,
  Installer,
} from '../../lib/ServerModule';
import mergeSpecs from './utils/mergeSpecs';
import type { OpenApiData } from './data';

const createOpenApiInstaller = (): Installer => {
  const install: Installer = async function install(
    this: ServerModule<any, any, OpenApiData>,
    ctx: ModuleContext
  ) {
    const { app } = ctx;

    const validateResponses = Boolean(
      process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION?.toLowerCase() === 'true'
    );

    const apiSpecsInput =
      typeof this.data.apiSpecs === 'function'
        ? // Allow user decide how the modules should be joined
          this.data.apiSpecs(ctx)
        : this.data.apiSpecs;

    if (!apiSpecsInput) return;

    const apiSpec = mergeSpecs(apiSpecsInput);

    logger.info(`Creating temp file for merged OpenAPI specs`);
    const {
      name: apiSpecFile,
      removeCallback: removeTempFile,
    } = await new Promise<FileResult>((res, rej) =>
      tmp.file((err, name, fd, removeCallback) =>
        err ? rej(err) : res({ name, fd, removeCallback })
      )
    );

    // Store these so we can use them on close
    this.data.removeTempFile = removeTempFile;
    this.data.apiSpecFile = apiSpecFile;

    logger.info(
      `Created temp file for merged OpenAPI specs at "${apiSpecFile}"`
    );

    await fspLogged.writeFile(apiSpecFile, yaml.safeDump(apiSpec), 'utf-8');

    app.use(
      this.data.specEndpoint,
      express.static(apiSpecFile, {
        setHeaders: (res) => res.setHeader('Content-Type', 'text'),
      })
    );

    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
        ...this.data.validatorOptions,
      })
    );
  };

  return install;
};

export { createOpenApiInstaller as default };
