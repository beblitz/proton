import fs from 'fs-extra';

const readDir = (location: string, lf: string) => {
  if (location.includes('node_modules')) {
    return;
  }

  fs.readdirSync(location).forEach(file => {
    const path = `${location}/${file}`;
    const stat = fs.statSync(path);

    if (stat.isDirectory()) {
      readDir(path, lf);
    } else if (stat.isFile()) {
      readFile(path, lf);
    }
  });
};

const readFile = (file: string, lf: string) => {
  if (!file.endsWith(lf)) {
    return;
  }

  const fileData = import(file);

  fileData.then((data: any) => {
    console.log(data);
    if (data.default) {
      const instance = new data.default();
      console.log(instance);
    }
  });
};

export default (location: string, lf: string) => {
  readDir(location, lf);
};
