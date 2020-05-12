interface Options {
  method: string,
  url: string,
  params?: string | any,
  headers?: any
}

export default function http(opts: Options) {
  return new Promise(function (resolve, reject) {
    var params = opts.params;
    if (params && typeof params === 'object') {
      params = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
    }
    if (opts.method === 'GET' || opts.method === 'get' && params) {
      opts.url = opts.url + '?' + params
    }
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach((key) => {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }
    console.log(params)
    xhr.send(params);
  });
}