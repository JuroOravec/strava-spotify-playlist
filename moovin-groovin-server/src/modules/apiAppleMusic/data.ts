import type AppleMusicApi from './lib/AppleMusicApi';
import type { AppleMusicApiOptions } from './types';

type ApiAppleMusicExternalData = AppleMusicApiOptions;

type ApiAppleMusicInternalData = {
  appleMusicClient: AppleMusicApi | null;
};

type ApiAppleMusicData = ApiAppleMusicExternalData & ApiAppleMusicInternalData;

export { ApiAppleMusicData, ApiAppleMusicExternalData };
