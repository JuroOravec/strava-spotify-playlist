import type { Tunnel, TunnelConfig } from 'localtunnel';

interface HostExternalData {
  localtunnelEnabled: boolean;
  localtunnelOptions: TunnelConfig;
  port?: number;
  origin?: string | null;
}

interface HostInternalData {
  localtunnel: Tunnel | null;
}

type HostData = HostExternalData & HostInternalData;

export { HostData, HostExternalData };
