import fs from 'fs-extra';
import path from 'path';
import ProtonConfig from 'src/types/ProtonConfig';

const settings: ProtonConfig = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'proton.config.json'), 'utf8')
);

export default {} as const;
