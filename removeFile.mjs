import { unlink } from 'fs';
import { resWithStatus } from './utils/index.mjs';

const deleteFile = (filePath, res) => {
    unlink(filePath, error => {
        if (error) {
            if (error.code === 'ENOENT') {
                return resWithStatus(404, res);
            }

            return resWithStatus(500, res);
        } else {
            resWithStatus(200, res);
        }
    });
};

export default deleteFile;
