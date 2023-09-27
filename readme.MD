# axios-next

`axios-next` is a versatile HTTP client module for Next.js projects, inspired by Axios. It allows 
you to make HTTP requests with ease using fetch, configure global settings, and use a familiar API.

## Installation

You can install `axios-next` via npm or yarn:
```shell
npm i @adraheem/axios-next
```
or
```shell
yarn add @adraheem/axios-next
```

# Usage
## Creating an Instance
You can create an instance of `axios-next` to configure settings like baseUrl and default headers. 
Here's an example:
```javascript
import axiosFetch from "@adraheem/axios-fetch";

const instance = MyNodeModule.create({
  baseUrl: 'https://api.example.com',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
  },
});
```

## Making Requests
Once you have an instance, you can make HTTP requests using the same familiar methods as Axios: get, post, put, patch, and delete. The parameters for these methods mirror Axios as well:

```typescript
// SIGNATURE
instance.get(path, data?, options?)
  .then((response: FetchResponse<any>) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle errors
  });
```

```typescript
// GET request
import {FetchResponse} from "@adraheem/axios-next";

instance.get('/api/resource', {params: {slug: 'abcde'}}, {next: {revalidate: 5000}})
  .then((response: FetchResponse<any>) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle errors
  });

// POST request
instance.post('/api/resource', {
  data: {
    // Request data
  },
})
  .then((response: FetchResponse<any>) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle errors
  });

// PUT request, etc.
```

## Using Without Creating an Instance
If you prefer, you can also use `axios-next` without creating an instance. It provides a simple and 
convenient way to make requests directly:
```typescript
import axiosFetch, {FetchResponse} from "@adraheem/axios-next";

// GET request without an instance
axiosFetch.get('https://api.example.com/api/resource')
  .then((response: FetchResponse<any>) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle errors
  });

```

Have a look at what the FetchResponse looks like
```typescript
type FetchResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: HeadersInit;
  request?: any;
}
```

# Customization
`axios-fetch` is highly customizable, allowing you to configure various options globally or per 
request. Refer to the official documentation for more details on available configuration options.

# Contributing
If you'd like to contribute to `axios-fetch` or report issues, please check out the Contribution 
Guidelines.

# License
This project is licensed under the MIT License.

# Acknowledgments
- `axios-fetch` is inspired by the Axios library.
- [Raheem O. Adebayo (@Adraheem)](https://github.com/Adraheem)
