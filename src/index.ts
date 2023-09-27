import {
  FetchOptions,
  FetchResponsePromise,
  FetchWithGetMethod,
  InstanceConfig
} from "../types/types";
import isEmpty from "is-empty";

class AxiosFetch {
  private readonly baseUrl: string = "";
  private readonly defaultHeaders: FetchOptions["headers"];

  constructor(baseUrl?: string, headers?: Record<string, string>) {
    this.baseUrl = baseUrl ?? "";
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

  public create(config: InstanceConfig) {
    return new AxiosFetch(config.baseUrl, config.headers);
  }

  public setHeader(key: string, value: any) {
    (this.defaultHeaders as Headers).set(key, value);
  }

  public deleteHeader(key: string) {
    (this.defaultHeaders as Headers).delete(key);
  }

  private makeRequest(
    method: FetchOptions["method"],
    path: string,
    data: any = undefined,
    options: Omit<FetchOptions, "body"> = {headers: {}}
  ): FetchResponsePromise {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${this.baseUrl}${path}`;
        const request = await fetch(url, {
          ...options,
          method: method,
          body: JSON.stringify(data),
          headers: this.defaultHeaders,
        });
        let json: any;

        const resText = await request.text();
        try {
          json = JSON.parse(resText);
        } catch (e) {
          json = resText;
        }

        const response = {
          data: json,
          headers: request.headers,
          status: request.status,
          statusText: request.statusText,
        }

        if (request.ok) {
          resolve(response);
        } else {
          reject({
            request,
            response
          });
        }
      } catch (e) {
        reject(e)
      }
    });
  }

  // REQUEST TYPES ===========================

  public get(
    path: string,
    data: FetchWithGetMethod = {params: {}},
    options: FetchOptions = {headers: {}}
  ): FetchResponsePromise {
    let queryString = "";
    if (data.params && !isEmpty(data.params)) {
      queryString = "?" + Object.entries(data.params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    }
    const url = `${path}${queryString}`;
    return this.makeRequest("GET", url, undefined, options);
  }

  public post(path: string, data?: any, options?: Omit<FetchOptions, "body">) {
    return this.makeRequest("POST", path, data, options);
  }

  public put(path: string, data?: any, options?: Omit<FetchOptions, "body">) {
    return this.makeRequest("PUT", path, data, options);
  }

  public patch(path: string, data?: any, options?: Omit<FetchOptions, "body">) {
    return this.makeRequest("PATCH", path, data, options);
  }

  public delete(path: string, data?: any, options?: Omit<FetchOptions, "body">) {
    return this.makeRequest("DELETE", path, data, options);
  }

  public execute = this.makeRequest;
}

const axiosFetch = new AxiosFetch();
export default axiosFetch;
