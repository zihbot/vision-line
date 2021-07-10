export interface Result<T = any> {
  status?: number,
  value?: T,
  error?: string,
}

export class DataService {
  static getFunctions() {    
    return fetch('/function')
      .then(data => this.handleResponse(data), error => this.handleError(error));
  }

  static createImage() {    
    return fetch('/createImage', this.postOptions([]))
      .then(data => this.handleResponse(data), error => this.handleError(error));
  }

  // Util functions
  static postOptions(body: any): any {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  }

  static handleResponse(data: Response, type: string = 'json'): Promise<Result> {
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

  static handleError(error: any): Promise<Result> {
    const result: Result = {error: error};    
    return Promise.reject(result);
  }
}