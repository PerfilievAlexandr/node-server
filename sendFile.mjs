import { createReadStream } from 'fs';
import mime from 'mime';

import { resWithStatus } from './utils/index.mjs';

const sendFile = (filePath, res) => {
    const fileStream = createReadStream(filePath);

    fileStream.pipe(res);

    fileStream
        .on('open', () => {
            res.setHeader('Content-Type', mime.getType(filePath));
        })
        .on('error', (error) => {
            console.error('error', error);
            if (error.code === 'ENOENT') {
                resWithStatus(404, res);
            } else {
                resWithStatus(500, res);
            }
        });

    res
        .on('close', () => {
            fileStream.destroy();
        });
};

export default sendFile;
