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

import fs from 'node:fs';
import * as vectorExpress from '../src/index.js';

const file = fs.readFileSync(process.cwd() + '/files/drawing1.svg');

/* post data */
vectorExpress
	.post(
		'https://vector.express/api/v2/public/convert/svg/librsvg/eps/gs/pdf/',
		file,
	)
	.then(console.log);

/*
    {
      id: '1070962b-4670-4268-9abb-8f9841debb2e',
      inputUrl:
      'https://vector.express/api/v2/public/files/dfcdf36e-bff5-48f3-a877-27851f7e9999.svg',
      resultUrl:
      'https://vector.express/api/v2/public/files/36460eba-4c6c-4cc5-af0a-ff7d8307d305.pdf',
      time: 669,
      format: 'pdf',
      tasks:
      [ { resultUrl:
            'https://vector.express/api/v2/public/files/db45816a-24d8-4b90-b2af-8c7aef55b0fc.eps',
          format: 'eps',
          time: 133 },
        { resultUrl:
            'https://vector.express/api/v2/public/files/36460eba-4c6c-4cc5-af0a-ff7d8307d305.pdf',
          format: 'pdf',
          time: 110 }
      ] 
    }
*/
