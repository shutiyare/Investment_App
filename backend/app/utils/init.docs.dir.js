import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
global.__basedir = __dirname;
global.__investmentdir = global.__basedir+'/../investment_files';
global.__profiledir = __dirname+'/../profile_files';

export default function initDocsDir() {
    // console.log('initdir: ',__dirname);
    // const docsFolder = __dirname+'/../investment_files';
    // const profileFolder = __dirname+'/../profile_files';
    // mkdir(docsFolder);
    // mkdir(profileFolder);
    mkdir(global.__investmentdir);
    mkdir(global.__profiledir);
    
}

function mkdir(dir){
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(`${dir} Created Successfully.`);
    }
}