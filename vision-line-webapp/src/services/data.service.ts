import { LineNodeDef } from '../types/api';

const API_ROOT = '/api/v1';

interface Result<T = any> {
  status?: number,
  value?: T,
  error?: string,
}

type ResponseType = 'text' | 'json' | 'blob';

class DataService {
  static getImageRoute() {    
    return API_ROOT + '/image/';
  }

  static getFunctions() {    
    return fetch(API_ROOT + '/function')
      .then(data => this.handleResponse(data), error => this.handleError(error));
  }

  static createImage() {    
    return fetch(API_ROOT + '/createImage', this.postOptions([]))
      .then(data => this.handleResponse(data), error => this.handleError(error));
  }

  static getLineNodes(lineId: number) {    
    return fetch(API_ROOT + '/line/' + lineId)
      .then(data => this.handleResponse(data), error => this.handleError(error));
  }

  static addNode(lineId: number, position: number, node: LineNodeDef) {    
    return fetch(API_ROOT + '/createImage/' + lineId + '/add/' + position, this.postOptions(node))
      .then(data => this.handleResponse(data, 'text'), error => this.handleError(error));
  }

  static deleteNode(lineId: number, position: number) {    
    return fetch(API_ROOT + '/createImage/' + lineId + '/delete/' + position, this.deleteOptions())
      .then(data => this.handleResponse(data, 'text'), error => this.handleError(error));
  }

  static getAllLines() {    
    return fetch(API_ROOT + '/line')
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

  static deleteOptions(): any {
    return {
      method: 'DELETE'
    }
  }

  static handleResponse(data: Response, type: ResponseType = 'json'): Promise<Result> {
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

export default DataService;