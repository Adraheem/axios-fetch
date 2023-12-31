export type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  headers?: HeadersInit;
  body?: BodyInit | null;
  mode?: 'cors' | 'no-cors' | 'same-origin';
  credentials?: 'include' | 'same-origin' | 'omit';
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
  redirect?: 'follow' | 'error' | 'manual';
  referrer?: string;
  referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'unsafe-url';
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
  next?: {
    revalidate?: number;
  };
};

export type FetchWithGetMethod = {
  params?: Record<string, string | number | boolean>
}

export type FetchResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: HeadersInit;
  request?: any;
}

export type FetchResponsePromise<T = any> = Promise<FetchResponse<T>>;

export type InstanceConfig = {
  baseUrl?: string;
  headers?: Record<string, string>
}

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
