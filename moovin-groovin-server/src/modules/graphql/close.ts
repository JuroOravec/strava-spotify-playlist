import type {
  ServerModule,
  Closer,
  Services,
  Handlers,
} from '../../lib/ServerModule';
import type { GraphqlData } from './data';

const createGraphqlCloser = (): Closer => {
  const close: Closer = async function close(
    this: ServerModule<Services, Handlers, GraphqlData>
  ) {
    await this.data.apolloServer?.stop();
  };

  return close;
};

export default createGraphqlCloser;
