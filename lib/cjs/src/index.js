"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_empty_1 = __importDefault(require("is-empty"));
class AxiosFetch {
    constructor(baseUrl, headers) {
        this.baseUrl = "";
        this.execute = this.makeRequest;
        this.baseUrl = baseUrl !== null && baseUrl !== void 0 ? baseUrl : "";
        this.defaultHeaders = new Headers();
        this.defaultHeaders.set("Content-Type", "application/json");
        if (headers) {
            const entries = Object.entries(headers);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                this.defaultHeaders.set(key, value);
            }
        }
    }
    create(config) {
        return new AxiosFetch(config.baseUrl, config.headers);
    }
    setHeader(key, value) {
        this.defaultHeaders.set(key, value);
    }
    deleteHeader(key) {
        this.defaultHeaders.delete(key);
    }
    makeRequest(method, path, data = undefined, options = { headers: {} }) {
        return new Promise(async (resolve, reject) => {
            try {
                const url = `${this.baseUrl}${path}`;
                const request = await fetch(url, Object.assign(Object.assign({}, options), { method: method, body: JSON.stringify(data), headers: this.defaultHeaders }));
                let json;
                const resText = await request.text();
                try {
                    json = JSON.parse(resText);
                }
                catch (e) {
                    json = resText;
                }
                const response = {
                    data: json,
                    headers: request.headers,
                    status: request.status,
                    statusText: request.statusText,
                };
                if (request.ok) {
                    resolve(response);
                }
                else {
                    reject({
                        request,
                        response
                    });
                }
            }
            catch (e) {
                reject(e);
            }
        });
    }
    // REQUEST TYPES ===========================
    get(path, data = { params: {} }, options = { headers: {} }) {
        let queryString = "";
        if (data.params && !(0, is_empty_1.default)(data.params)) {
            queryString = "?" + Object.entries(data.params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');
        }
        const url = `${path}${queryString}`;
        return this.makeRequest("GET", url, undefined, options);
    }
    post(path, data, options) {
        return this.makeRequest("POST", path, data, options);
    }
    put(path, data, options) {
        return this.makeRequest("PUT", path, data, options);
    }
    patch(path, data, options) {
        return this.makeRequest("PATCH", path, data, options);
    }
    delete(path, data, options) {
        return this.makeRequest("DELETE", path, data, options);
    }
}
const axiosFetch = new AxiosFetch();
exports.default = axiosFetch;
