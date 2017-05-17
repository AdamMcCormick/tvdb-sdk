const fetch = require('node-fetch');

const baseUrl = 'https://api.thetvdb.com';

const apikey = '22185428934E2370';
const userkey = '4E213DAC89ABA9E2';
const username = 'alanbly';

const authBody = {
    apikey,
    userkey,
    username,
};

let activeToken;

const fetchJson = (url, init) => fetch(`${baseUrl}/${url}`, init)
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status} ${resp.statusText}`)
        }

        return resp.json();
    });

const getToken = () =>
    fetchJson('login', {
        method: 'POST',
        body: JSON.stringify(authBody),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(({token}) => {
            activeToken = token;
            return activeToken;
        });

const requestWithToken = (path, method = 'GET', headers = {}) => {
    if (!activeToken) {
        return getToken().then(requestWithToken.bind(null, path, method, headers));
    }

    return fetchJson(path, {
        method,
        headers: Object.assign({
            authorization: `Bearer ${activeToken}`,
            accept: 'application/json',
            'Content-Type': 'application/json',
        }, headers),
    });
};


module.exports = {
    fetchJson,
    getToken,
    requestWithToken,
};
