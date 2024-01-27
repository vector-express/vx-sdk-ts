/* Copyright © 2023 Vector Express Ltd. All rights limited.
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

import * as vectorExpress from '../src/index.js';

/* get data */
vectorExpress
	.get('https://vector.express/api/v2/public/convert/svg/auto/pdf/')
	.then((res) => {
		console.log(res);
		/*
    {
      alternatives:
      [
        { path: '/api/v2/public/convert/svg/librsvg/pdf', length: 1 },
        { path: '/api/v2/public/convert/svg/librsvg/eps/gs/pdf',
          length: 2 },
        { path: '/api/v2/public/convert/svg/librsvg/pdf/gs/pdf',
          length: 2 },
        { path: '/api/v2/public/convert/svg/librsvg/ps/gs/pdf',
          length: 2 },
        { path: '/api/v2/public/convert/svg/svgo/svg/librsvg/pdf',
          length: 2 },
        { path: '/api/v2/public/convert/svg/svgo/svg/librsvg/eps/gs/pdf',
          length: 3 },
        { path: '/api/v2/public/convert/svg/svgo/svg/librsvg/pdf/gs/pdf',
          length: 3 },
        { path: '/api/v2/public/convert/svg/svgo/svg/librsvg/ps/gs/pdf',
          length: 3 },
        { path: '/api/v2/public/convert/svg/uniconvertor/pdf',
          length: 1 },
        { path: '/api/v2/public/convert/svg/librsvg/eps/uniconvertor/pdf',
          length: 2 },
        { path: '/api/v2/public/convert/svg/svgo/svg/uniconvertor/pdf',
          length: 2 },
        { path: '/api/v2/public/convert/svg/uniconvertor/pdf/gs/pdf',
          length: 2 },
        { path: '/api/v2/public/convert/svg/uniconvertor/svg/librsvg/pdf',
          length: 2 },
        { path:
            '/api/v2/public/convert/svg/librsvg/eps/gs/eps/uniconvertor/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/librsvg/eps/uniconvertor/pdf/gs/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/librsvg/pdf/gs/eps/uniconvertor/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/librsvg/pdf/pdf2svg/svg/uniconvertor/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/librsvg/ps/gs/eps/uniconvertor/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/svgo/svg/librsvg/eps/uniconvertor/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/svgo/svg/uniconvertor/pdf/gs/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/svgo/svg/uniconvertor/svg/librsvg/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/uniconvertor/pdf/pdf2svg/svg/librsvg/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/uniconvertor/plt/hp2xx/eps/gs/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/uniconvertor/plt/hp2xx/svg/librsvg/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/uniconvertor/svg/librsvg/eps/gs/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/uniconvertor/svg/librsvg/pdf/gs/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/uniconvertor/svg/librsvg/ps/gs/pdf',
          length: 3 },
        { path:
            '/api/v2/public/convert/svg/uniconvertor/svg/svgo/svg/librsvg/pdf',
          length: 3 }
      ]
    }
  */
	});

/* with 'full' parameter - get detailed information about communication with a particular url and data */
vectorExpress
	.get('https://vector.express/api/v2/public/convert/svg/auto/pdf/', 'full')
	.then(console.log);

/*
 log :
   { status: 200,
  statusText: 'OK',
  headers:
   { date: 'Tue, 23 Mar 2021 21:36:01 GMT',
     'content-type': 'application/json; charset=utf-8',
     'content-length': '2239',
     connection: 'close',
     'x-powered-by': 'Express',
     'x-ratelimit-limit': '60',
     'x-ratelimit-remaining': '23',
     'x-ratelimit-reset': '1616536243',
     etag: 'W/"8bf-RB1sijP7idJd69MAOaTY+n0OVZU"' },
  config:
   { url: 'https://vector.express/api/v2/public/convert/svg/auto/pdf/',
     method: 'get',
     headers:
      { Accept: 'application/json, text/plain,',
      'User-Agent': 'axios/0.21.1' },
      transformRequest: [ [Function: transformRequest] ],
      transformResponse: [ [Function: transformResponse] ],
      ...
    },
   request:
    ClientRequest {
      _events:
       [Object: null prototype] {
         socket: [Function],
         abort: [Function],
         ...
        },
      _eventsCount: 7,
      _maxListeners: undefined,
      output: [],
      outputEncodings: [],
      outputCallbacks: [],
      outputSize: 0,
      writable: true,
      _last: true,
      chunkedEncoding: false,
      shouldKeepAlive: false,
      useChunkedEncodingByDefault: false,
      sendDate: false,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: 0,
      _hasBody: true,
      _trailer: '',
      finished: true,
      _headerSent: true,
      socket:
       TLSSocket {
         _tlsOptions: [Object],
         _secureEstablished: true,
         ...
        },
      connection:
       TLSSocket {
         _tlsOptions: [Object],
         _secureEstablished: true,
         ...
        },
        ...
       Agent {
         _events: [Object],
         _eventsCount: 1,
         _maxListeners: undefined,
         defaultPort: 443,
         protocol: 'https:',
         options: [Object],
         requests: {},
         sockets: [Object],
         freeSockets: {},
         keepAliveMsecs: 1000,
         keepAlive: false,
         maxSockets: Infinity,
         maxFreeSockets: 256,
         maxCachedSessions: 100,
         _sessionCache: [Object] },
      socketPath: undefined,
      timeout: undefined,
      method: 'GET',
      insecureHTTPParser: undefined,
      path: '/api/v2/public/convert/svg/auto/pdf/',
      _ended: true,
      res:
       IncomingMessage {
         _readableState: [ReadableState],
         readable: false,
         _events: [Object],
         _eventsCount: 3,
         _maxListeners: undefined,
         socket: [TLSSocket],
         connection: [TLSSocket],
         ...
      aborted: undefined,
      timeoutCb: null,
      upgradeOrConnect: false,
      parser: null,
      maxHeadersCount: null,
      _redirectable:
       Writable {
         _writableState: [WritableState],
         writable: true,
         _events: [Object],
         ....
       [Object: null prototype] { accept: [Array], 'user-agent': [Array], host: [Array] } },
   data:
    { alternatives:
       [ [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object],
         [Object] ] } }
*/
