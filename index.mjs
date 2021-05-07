import server from './server.mjs';

server.listen(8080, '127.0.0.1', () => {
    console.log('Server is running on http://127.0.0.1:3000/');
});
