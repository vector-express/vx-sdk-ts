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

/* convert file from .svg to .pdf using these converters : 'librsvg', 'eps', 'gs' */
vectorExpress
	.convert('svg', 'pdf', { file, transformers: ['librsvg', 'eps', 'gs'] })
	.then(console.log);

/*
    link to the converted version of the original file :
    https://vector.express/api/v2/public/files/0f7f9a9e-bf4a-4201-8898-c4cb7941e13d.pdf
*/
