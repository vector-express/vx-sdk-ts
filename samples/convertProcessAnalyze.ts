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

const file = fs.readFileSync(process.cwd() + '/files/drawing3.dwg');

(async function () {
	/* send file to the server */
	const convertedPdfUrl: string = await vectorExpress.convert('dwg', 'pdf', {
		file,
	});
	const filename0 = convertedPdfUrl.split('/').pop();
	console.log('filename0 : ', filename0);
	// filename0 :  0a5096c3-cf98-4f7e-8ad1-5237c2fea5b5.pdf

	/* convert existing file */
	const convertedSvgUrl = await vectorExpress.convert('pdf', 'svg', {
		params: { 'use-file': filename0 },
	});
	const filename1 = convertedSvgUrl.split('/').pop();
	console.log('filename1 : ', filename1);
	// filename1 :  9f513077-8ead-4f78-87aa-cc1d427165c4.svg

	/* process existing converted file */
	const processedUrl = await vectorExpress.process(
		'svg',
		['exclude-groups'],
		{
			params: { 'use-file': filename1 },
		},
	);
	const filename2 = processedUrl.split('/').pop();
	console.log('filename2 : ', filename2);
	// filename2 :  ac487ed0-f594-42e8-a893-dae7e417cced.svg

	/* analyze existing processed file */
	const analyzedData = await vectorExpress.analyze('svg', ['groups'], {
		params: { 'use-file': filename2 },
	});
	console.log(analyzedData);
	// [ 'surface1' ]
})();
