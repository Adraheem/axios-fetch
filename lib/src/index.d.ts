import { FetchOptions, FetchResponsePromise, FetchWithGetMethod, InstanceConfig } from "../types/types";
declare class AxiosFetch {
    private readonly baseUrl;
    private readonly defaultHeaders;
    constructor(baseUrl?: string, headers?: Record<string, string>);
    create(config: InstanceConfig): AxiosFetch;
    setHeader(key: string, value: any): void;
    deleteHeader(key: string): void;
    private makeRequest;
    get(path: string, data?: FetchWithGetMethod, options?: FetchOptions): FetchResponsePromise;
    post(path: string, data?: any, options?: Omit<FetchOptions, "body">): FetchResponsePromise;
    put(path: string, data?: any, options?: Omit<FetchOptions, "body">): FetchResponsePromise;
    patch(path: string, data?: any, options?: Omit<FetchOptions, "body">): FetchResponsePromise;
    delete(path: string, data?: any, options?: Omit<FetchOptions, "body">): FetchResponsePromise;
    execute: (method: FetchOptions["method"], path: string, data?: any, options?: Omit<FetchOptions, "body">) => FetchResponsePromise;
}
declare const axiosFetch: AxiosFetch;
export default axiosFetch;
