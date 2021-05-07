import path from 'path';

export default {
    publicRoot: path.join(process.cwd(), 'public'),
    filesRoot: path.join(process.cwd(), 'files'),
    limitFileSize: 10e6,
}
