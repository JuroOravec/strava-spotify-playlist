import logger from '../../lib/logger';
import type { ServerModule, Closer } from '../../lib/ServerModule';
import type { OpenApiData } from './data';

const createOpenApiCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<any, any, OpenApiData>
  ) {
    if (!this.data.removeTempFile) return;

    logger.info(
      `Deleting temp file at "${this.data.apiSpecFile || 'UNKNOWN'}"`
    );
    await this.data.removeTempFile();
  };

  return close;
};

export default createOpenApiCloser;
