import { store, providers } from "../config.js";

function get() {
    const provider = localStorage.getItem(store.names.provider);
    return provider;
}

function set(data) {
    localStorage.setItem(store.names.provider, data);
}

export function getProvider() {
    const provider = get();

    if (provider) {
        return provider;
    } else {
        const defaultProvider = Object.keys(providers)[0];
        setProvider(defaultProvider);
        return defaultProvider;
    }
}

export function setProvider(provider) {
    set(provider);
}