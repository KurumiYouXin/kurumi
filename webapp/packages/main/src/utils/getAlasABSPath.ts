import {app} from 'electron';
import {isMacintosh} from './env';

/**
 * Get the absolute path of the project root directory
 * @param files
 * @param defineWord
 */
const getAlasABSPath = (
  files: string[] = ['**/config/deploy.yaml', '**/config/deploy.template.yaml'],
  defineWord = 'AzurLaneAutoScript',
) => {
  const path = require('path');
  const sep = path.sep;
  const fg = require('fast-glob');
  let appAbsPath = process.cwd();
  if (isMacintosh && import.meta.env.PROD) {
    appAbsPath = app?.getAppPath() || process.execPath;
  }
  const appAbsPathArr = appAbsPath.split(sep);
  let flag = false;
  let alasABSPath = '';
  while (appAbsPathArr.includes(defineWord) && !flag) {
    appAbsPathArr.pop();
    const entries = fg.sync(files, {
      dot: true,
      cwd: appAbsPathArr.join(sep) as string,
    });
    if (entries.length > 0) {
      flag = true;
      alasABSPath = appAbsPathArr.join(sep);
    }
  }
  return alasABSPath.endsWith(sep) ? alasABSPath : alasABSPath + sep;
};

export default getAlasABSPath;
