import fs from 'fs';

export default function (basedir, fname, data) {
    if (data) {
        fs.writeFileSync(basedir + '/' + fname, data);
    }
}