export const resWithStatus = (statusCode, res) => {
    res.statusCode = statusCode;

    switch (statusCode) {
        case 200:
            return res.end('OK');
        case 400:
            return res.end('Bad request');
        case 404:
            return res.end('Not found');
        case 409:
            return res.end('Conflict');
        case 500:
            return res.end('Server error');
        case 501:
            return res.end('Not implemented');
        default:
            return 'Unknown error';
    }
}

