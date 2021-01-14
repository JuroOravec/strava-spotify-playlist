import yaml from 'js-yaml';
import type { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

import fsLogged from '../../../lib/logger/fs';

const readSpecFile = (specFilePath: string): OpenAPIV3.Document => {
  const spec = fsLogged.readFileSync(specFilePath, { encoding: 'utf-8' });
  return yaml.safeLoad(spec) as OpenAPIV3.Document;
};

export default readSpecFile;
