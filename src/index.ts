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

/*
    Basic API :

    https://vector.express/api/v2/public/convert/svg/auto/pdf/ - paths

    https://vector.express/api/v2/public/convert/dxf/cadlib/svg/svgo/svg - convert

    https://vector.express/api/v2/public/convert/svg/librsvg/pdf?use-file=4b89f780-0092-4de6-af11-8fb7f2467a28.svg - convert using existing file

    https://vector.express/api/v2/public/convert/ai/gs/pdf/pdf2svg/svg/svgo/svg?pdf2svg-page=1&svgo-pretty=true - convert with config
  */

import fs from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';

const basePath = 'https://vector.express';
const publicPath = 'https://vector.express/api/v2/public';
const meteredPath = 'https://vector.express/api/v2/metered';

/**
 * Sends request to a url, returns Promise.
 */

const get_ = async <T extends 'full'>(
	url: string | URL,
	format?: T,
): Promise<T extends 'full' ? Response : ReturnType<typeof JSON.parse>> => {
	if (!url)
		throw new TypeError('Please provide all obligatory args: url, format');

	if (typeof url !== 'string' && !(url instanceof URL))
		throw new TypeError('Please provide url string as a parameter');

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(
			`Error fetching ${url}: unexpected response code ${res.status}`,
		);
	}

	if (format === 'full') return res;

	return res.json();
};

/**
 * Sends data to the url, returns Promise.
 */

const post_ = async (url: string | URL, data: BodyInit): Promise<Response> => {
	if (!url)
		throw new TypeError('Please provide all obligatory args: url, data');

	if (typeof url !== 'string' && !(url instanceof URL))
		throw new Error('Please provide url string as a parameter');

	const res = await fetch(url, { method: 'POST', body: data });
	if (!res.ok) {
		throw new Error(
			`Error fetching ${url}: unexpected response code ${res.status}`,
		);
	}

	return res;
};

const convert_ = async <
	T extends
		| {
				['transformers']?: string[];
				['params']:
					| string
					| URLSearchParams
					| string[][]
					| Record<string, string>;
				['token']?: string | null;
				['save']?: boolean | null;
				['path']?: string | null;
		  }
		| {
				['file']: BodyInit;
				['transformers']?: string[];
				['params']?:
					| string
					| URLSearchParams
					| string[][]
					| Record<string, string>
					| undefined
					| null;
				['token']?: string | null;
				['save']?: boolean | null;
				['path']?: string | null;
		  },
>(
	inputFormat: string,
	outputFormat: string,
	options: T,
) => {
	/*
      obligatory :
        inputFormat
        outputFormat

      optional :
        options
        options.file
        options.transformers
        options.params
        options.token
        options.save
        options.path

      either options.file or options.params[ 'use-file' ] must be specified
    */

	if (!inputFormat || !outputFormat) {
		throw new TypeError(
			'Please provide all obligatory args : inputFormat, outputFormat',
		);
	}

	const params = options['params']
		? new URLSearchParams(options['params'])
		: null;

	if (
		Object.prototype.hasOwnProperty.call(options, 'file') ===
		!!params?.get('use-file')
	) {
		throw new TypeError(
			"Please provide a file or specify file on a server through 3d arg : options( options.params[ 'use-file' ] field )",
		);
	}

	let url: string;
	let transformers: string;

	if (!options.transformers) {
		let paths;

		if (options['token']) {
			paths = await fetch(
				`${meteredPath}/convert/${inputFormat}/auto/${outputFormat}/`,
				{
					['headers']: [['authorization', `Bearer ${options.token}`]],
				},
			);
		} else {
			paths = await fetch(
				`${publicPath}/convert/${inputFormat}/auto/${outputFormat}/`,
			);
		}

		if (!paths.ok) {
			if (!paths.ok) {
				throw new Error(
					`Error fetching possible transformers: unexpected response code ${paths.status}`,
				);
			}
		}

		paths = (await paths.json())['alternatives'].map(
			(el: { ['path']: string }) => el.path,
		);
		url = `${basePath}${paths[0]}${params ? `?${params}` : ''}`;
	} else {
		transformers = options.transformers.join('/');

		url = `${
			options.token ? meteredPath : publicPath
		}/convert/${inputFormat}/${transformers}/${outputFormat}${
			params ? `?${params}` : ''
		}`;
	}

	/* - config - */

	const config: RequestInit = Object.create(null);

	config['method'] = 'POST';

	if (Object.prototype.hasOwnProperty.call(config, 'file'))
		config['body'] = (options as unknown as { ['file']: BodyInit })['file'];

	if (options['token'])
		config['headers'] = [['authorization', `Bearer ${options.token}`]];

	/* - config - */

	const res = await fetch(url, config);
	if (!res.ok) {
		throw new Error(
			`Error fetching ${url}: unexpected response code ${res.status}`,
		);
	}

	const result = await res.json();
	if (options['save']) {
		const path = options.path || join(cwd(), `file.${result['format']}`);
		return downloadAndSave_(result['resultUrl'], path);
	} else {
		return result['resultUrl'];
	}
};

/* */

const analyze_ = async <
	T extends
		| {
				['params']:
					| string
					| URLSearchParams
					| string[][]
					| Record<string, string>;
				['token']?: string | null;
		  }
		| {
				['file']: BodyInit;
				['params']?:
					| string
					| URLSearchParams
					| string[][]
					| Record<string, string>
					| undefined
					| null;
				['token']?: string | null;
		  },
>(
	format: string,
	analyzers: string | string[],
	options: T,
) => {
	/*
      obligatory :
        format
        analyzers

      optional :
        options
        options.file
        options.params
        options.token

      either options.file or options.params[ 'use-file' ] must be specified
    */

	if (!format || !analyzers) {
		throw new TypeError(
			'Please provide all mandatory args : format, analyzers',
		);
	}

	const params = options['params']
		? new URLSearchParams(options['params'])
		: null;

	if (
		Object.prototype.hasOwnProperty.call(options, 'file') ===
		!!params?.get('use-file')
	) {
		throw new TypeError(
			"Please provide a file or specify file on a server through 3d arg : options( options.params[ 'use-file' ] field )",
		);
	}

	if (Array.isArray(analyzers)) {
		analyzers = analyzers.join('/');
	} else if (!(Object(analyzers) instanceof String)) {
		throw new Error('Analyzers can either be an array or string');
	}

	/* - config - */

	const config: RequestInit = Object.create(null);

	config['method'] = 'POST';

	if (Object.prototype.hasOwnProperty.call(config, 'file'))
		config['body'] = (options as unknown as { ['file']: BodyInit })['file'];

	if (options['token'])
		config['headers'] = [['authorization', `Bearer ${options.token}`]];

	const url = `${
		options['token'] ? meteredPath : publicPath
	}/analyze/${format}/${analyzers}${params ? `?${params}` : ''}`;
	/* - config - */

	const res = await fetch(url, config);
	if (!res.ok) {
		throw new Error(
			`Error fetching ${url}: unexpected response code ${res.status}`,
		);
	}

	const result = await res.json();
	const analytics = await fetch(result['resultUrl']);
	if (!analytics.ok) {
		throw new Error(
			`Error fetching result: unexpected response code ${res.status}`,
		);
	}

	return analytics.json();
};

/* */

const process_ = async <
	T extends
		| {
				['params']:
					| string
					| URLSearchParams
					| string[][]
					| Record<string, string>;
				['token']?: string | null;
				['save']?: boolean | null;
				['path']?: string | null;
		  }
		| {
				['file']: BodyInit;
				['params']?:
					| string
					| URLSearchParams
					| string[][]
					| Record<string, string>
					| undefined
					| null;
				['token']?: string | null;
				['save']?: boolean | null;
				['path']?: string | null;
		  },
>(
	format: string,
	processors: string | string[],
	options: T,
) => {
	/*
      obligatory :
        format
        processors

      optional :
        options
        options.file
        options.params
        options.token
        options.save
        options.path

      either options.file or options.params[ 'use-file' ] must be specified
    */

	if (!format || !processors) {
		throw new TypeError(
			'Please provide all obligatory args : file, format, processors',
		);
	}

	if (Array.isArray(processors)) processors = processors.join('/');
	else if (!(Object(processors) instanceof String)) {
		throw new TypeError('Processors can either be an array or string');
	}

	const params = options['params']
		? new URLSearchParams(options['params'])
		: null;

	if (
		Object.prototype.hasOwnProperty.call(options, 'file') ===
		!!params?.get('use-file')
	) {
		throw new TypeError(
			"Please provide a file or specify file on a server through 3d arg : options( options.params[ 'use-file' ] field )",
		);
	}

	/* - config - */

	const config: RequestInit = Object.create(null);

	config['method'] = 'POST';

	if (Object.prototype.hasOwnProperty.call(config, 'file'))
		config['body'] = (options as unknown as { ['file']: BodyInit })['file'];

	if (options['token'])
		config['headers'] = [['authorization', `Bearer ${options.token}`]];

	const url = `${
		options['token'] ? meteredPath : publicPath
	}/process/${format}/${processors}${params ? `?${params}` : ''}`;

	/* - config - */

	const res = await fetch(url, config);
	if (!res.ok) {
		throw new Error(
			`Error fetching ${url}: unexpected response code ${res.status}`,
		);
	}

	const result = await res.json();
	if (options['save']) {
		const path = options.path || join(cwd(), `file.${result['format']}`);
		return downloadAndSave_(result['resultUrl'], path);
	} else {
		return result['resultUrl'];
	}
};

/* */

const downloadAndSave_ = async (url: string | URL, path: string) => {
	if (!url) throw new Error('Please provide all obligatory args : url');

	if (!path) path = join(cwd(), 'file');

	const response = await fetch(url);

	// create directories
	const dirPath = path.split('/').slice(0, -1).join('/') + '/';
	await fs.mkdir(dirPath, { recursive: true });

	const data = await response.arrayBuffer();

	await fs.writeFile(path, new Uint8Array(data));
};

export {
	analyze_ as analyze,
	convert_ as convert,
	downloadAndSave_ as downloadAndSave,
	get_ as get,
	post_ as post,
	process_ as process,
};
