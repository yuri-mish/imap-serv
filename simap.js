var ImapServer = require('imap-server');
const fs = require('fs');
var server = ImapServer();
 
// use plugin
var plugins = require('imap-server/plugins');
server.use(plugins.announce);
server.use(plugins.debug);

const key = fs.readFileSync('/etc/letsencrypt/live/tst.starsam.net/privkey.pem');
const cert = fs.readFileSync('/etc/letsencrypt/live/tst.starsam.net/fullchain.pem');

server.use(plugins.starttls, {
    /* mandatory hash of options for crypto.createCredentials
     * http://nodejs.org/api/crypto.html#crypto_crypto_createcredentials_details
     * with at least key & cert
     */
    key: key,
    cert: cert
});
/* use more builtin or custom plugins... */
 
var WrapAuthPlain = require('imap-server/util/auth_plain_wrapper');
 
//const auth_plain = WrapAuthPlain(function(connection, username, password, next) {
//    console.log('***:',username);
//    if(username == "john.doe@example.com" && password == "foobar") {
//        next(null, 'OK');
//    }
//    else {
//        next(null, 'NO');
//    }
//});

var net = require('net');
net.createServer(server).listen(143);