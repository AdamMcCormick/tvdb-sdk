const auth = require('./auth');

const getSeries = id =>
    auth.requestWithToken(`series/${id}`);

const getSeasons = id =>
    auth.requestWithToken(`series/${id}/episodes/summary`);

const getEpisodes = (id, page) =>
    auth.requestWithToken(`series/${id}/episodes${page ? `?page=${page}` : ''}`);

module.exports = {
    getSeries,
    getSeasons,
    getEpisodes,
};
