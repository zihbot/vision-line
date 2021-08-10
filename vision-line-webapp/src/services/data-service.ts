declare global {
  interface Window {
    configuraion: {vl_base_url: string}
  }
}
const API_ROOT = window.configuraion.vl_base_url;

export function getLineNodes(lineId: number) {    
  return fetch(API_ROOT + '/line/' + lineId)
    .then(data => handleResponse(data), error => handleError(error));
}

function handleResponse(data: Response, type: ResponseType = 'json'): Promise<Result> {
  const result: Result = {status: data.status};
  if (data.ok) {
    switch (type) {
      case 'json':
        return data.json().then(d => {
          result.value = d;
          return Promise.resolve(result);
        });
      case 'text':
        return data.text().then(d => {
          result.value = d;
          return Promise.resolve(result);
        });
      default:
        return data.blob().then(d => {
          result.value = d;
          return Promise.resolve(result);
        });
    }
  } else {
    return data.text().then(d => {
      result.error = d;
      return Promise.reject(result);
    });
  }
}

function handleError(error: any): Promise<Result> {
  const result: Result = {error: error};    
  return Promise.reject(result);
}

interface Result<T = any> {
  status?: number,
  value?: T,
  error?: string,
}

type ResponseType = 'text' | 'json' | 'blob';
