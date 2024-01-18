import { tmdb } from "../config.js";
import { getAdult } from "../store/adult.js";

export function getApiUrl() {
    return `${tmdb.api.url}/${tmdb.api.version}`;
}

export function getImageUrl(path, type = "poster") {
    return path ? `${tmdb.image.url}/${tmdb.image[type]}${path}` : null;
}

export function sortByPopularity(obj) {
    return obj.sort((a, b) => b.popularity - a.popularity);
}

export async function sendRequest(path, parameters = {}, method = "GET") {
    const apiUrl = getApiUrl();
    const url = new URL(`${apiUrl}/${path}`);

    url.searchParams.append("api_key", tmdb.api.key);
    url.searchParams.append("language", tmdb.language);
    url.searchParams.append("include_adult", getAdult());

    Object.entries(parameters).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    let response;

    try { response = await fetch(url, { method, headers : { accept: "application/json" } }) }
    catch { return };

    if (response.status !== 200) return;

    let json;

    try { json = await response.json() }
    catch { return };

    return json;
}