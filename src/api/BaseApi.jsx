const BASE_URL = 'http://localhost:8080/api/v1'; // process.env.REACT_APP_API_BASE_URL ||

// 공통 fetch wrapper
async function request(method, url, { data, params, headers = {}, ...customConfig } = {}) {
  let fullUrl = BASE_URL + url;

  // GET, DELETE params
  if ((method === 'GET' || method === 'DELETE') && params) {
    const query = new URLSearchParams(params).toString();
    if (query) fullUrl += (url.includes('?') ? '&' : '?') + query;
  }

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include', // 쿠키 자동 첨부
    ...customConfig,
  };

  if (data && (method !== 'GET' && method !== 'DELETE')) {
    config.body = JSON.stringify(data);
  }
  if (data && method === 'DELETE') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(fullUrl, config);

  // 굳이 안필요하지만 예외 처리를 위해 keep
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const result = isJson ? await response.json() : await response.text(); 

  if (!response.ok) {
    throw { status: response.status, message: result, response };
  }

  return result;
}

// 메서드 export
export const get = (url, params, config) => request('GET', url, { params, ...config });
export const post = (url, data, config) => request('POST', url, { data, ...config });
export const put = (url, data, config) => request('PUT', url, { data, ...config });
export const patch = (url, data, config) => request('PATCH', url, { data, ...config });
export const del = (url, config) => request('DELETE', url, { ...config });

const api = { get, post, put, patch, delete: del };
export default api;
