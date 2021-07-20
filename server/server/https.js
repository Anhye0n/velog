const fs = require('fs');
const prod = process.env.NODE_ENV === 'production';

if (prod) {
    const options = {
        ca: fs.readFileSync('/etc/letsencrypt/live/anhye0n.me/fullchain.pem'),
        key: fs.readFileSync('/etc/letsencrypt/live/anhye0n.me/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/anhye0n.me/cert.pem'),
    };
    https.createServer(options, app).listen(443, () => {
        console.log('443port open');
    });
} else {
    app.listen(app.get(80), () => {
        console.log(app.get(80), '번 포트에서 대기중');
    });
}