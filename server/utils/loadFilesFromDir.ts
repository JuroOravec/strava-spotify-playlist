import path from 'path';
import fromPairs from 'lodash/fromPairs';

import fspLogged from '../lib/logger/fsp';

const loadFilesFromDir = async <
  T extends Record<string, string> = Record<string, string>
>(
  dirPath: string,
  extensions: string[]
): Promise<T> => {
  const dirFiles = await fspLogged.readdir(dirPath);

  const filenamesWithContent = await Promise.all(
    dirFiles.map(
      async (fileBasename): Promise<[string, string] | undefined> => {
        const filepath = path.join(dirPath, fileBasename);

        if (!extensions.some((ext) => fileBasename.endsWith(ext))) return;

        const fileStat = await fspLogged.stat(filepath);
        if (fileStat.isDirectory()) return;

        const content = await fspLogged.readFile(filepath, 'utf-8');
        const filename = path.parse(filepath).name;

        return [filename, content];
      }
    )
  );

  return fromPairs(
    filenamesWithContent.filter(Boolean) as [string, string][]
  ) as T;
};

export default loadFilesFromDir;
