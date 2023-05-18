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
import axios, { AxiosRequestConfig } from 'axios';

const APIWrapper_ = Object.create(null);

APIWrapper_.basePath = 'https://vector.express';
APIWrapper_.publicPath = 'https://vector.express/api/v2/public';
APIWrapper_.meteredPath = 'https://vector.express/api/v2/metered';

/**
 * Sends request to a url, returns Promise.
 */

APIWrapper_.get = async function (url: string, format: string) {
	if (!url)
		throw new Error('Please provide all obligatory args : url, format');

	if (typeof url !== 'string')
		throw new Error('Please provide url string as a parameter');

	const res = await axios.get(url);

	if (format === 'full') return res;

	return res.data;
};

/**
 * Sends data to the url, returns Promise.
 */

APIWrapper_.post = async function (url: string, data: Uint8Array) {
	if (!url) throw new Error('Please provide all obligatory args : url, data');

	if (typeof url !== 'string')
		throw new Error('Please provide url string as a parameter');

	const res = await axios({ url, method: 'post', data });

	return res;
};

APIWrapper_.convert = async function (
	inputFormat: string,
	outputFormat: string,
	options?: {
		['file']?: Buffer | null;
		['transformers']?: string[];
		['params']?: Record<string, unknown> | null;
		['token']?: string | null;
		['save']?: boolean | null;
		['path']?: string | null;
	},
) {
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

	if (!inputFormat || !outputFormat)
		throw new Error(
			'Please provide all obligatory args : inputFormat, outputFormat',
		);

	if (!options) {
		options = {};
	}

	if (!options.file && (!options.params || !options.params['use-file']))
		throw new Error(
			"Please provide a file or specify file on a server through 3d arg : options( options.params[ 'use-file' ] field )",
		);

	let url: string;
	let transformers: string;

	if (!options.transformers) {
		let paths;

		if (options.token) {
			paths = await axios({
				url: `${this.meteredPath}/convert/${inputFormat}/auto/${outputFormat}/`,
				method: 'get',
				headers: { Authorization: `Bearer ${options.token}` },
			});
		} else {
			paths = await axios.get(
				`${this.publicPath}/convert/${inputFormat}/auto/${outputFormat}/`,
			);
		}

		paths = paths.data.alternatives.map(
			(el: { ['path']: string }) => el.path,
		);
		url = `${this.basePath}${paths[0]}`;
	} else {
		transformers = options.transformers.join('/');

		url = `${
			options.token ? this.meteredPath : this.publicPath
		}/convert/${inputFormat}/${transformers}/${outputFormat}`;
	}

	/* - config - */

	const config = Object.create(null);

	config.url = url;
	config.method = 'post';

	if (options.params) config.params = options.params;

	if (options.params && options.params['use-file']) config.data = undefined;
	else config.data = options.file;

	if (options.token)
		config.headers = { Authorization: `Bearer ${options.token}` };

	/* - config - */

	const res = await axios(config);

	if (options.save) {
		const path = options.path || `${__dirname}/file.${res.data.format}`;
		return APIWrapper_.downloadAndSave(res.data.resultUrl, path);
	} else {
		return res.data.resultUrl;
	}
};

/* */

APIWrapper_.analyze = async function (
	format: string,
	analyzers: string | string[],
	options?: {
		['file']?: Buffer | null;
		['params']?: Record<string, unknown> | null;
		['token']?: string | null;
	},
) {
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

	if (!format || !analyzers)
		throw new Error(
			'Please provide all mandatory args : format, analyzers',
		);

	if (Array.isArray(analyzers)) {
		analyzers = analyzers.join('/');
	} else if (!(Object(analyzers) instanceof String)) {
		throw new Error('Analyzers can either be an array or string');
	}

	if (!options) {
		options = {};
	}

	if (!options.file && (!options.params || !options.params['use-file']))
		throw new Error(
			"Please provide a file or specify file on a server through 3d arg : options( options.params[ 'use-file' ] field )",
		);

	/* - config - */

	const config = Object.create(null);

	config.method = 'post';

	if (options.params) config.params = options.params;

	if (options.params && options.params['use-file']) config.data = undefined;
	else config.data = options.file;

	let url: string;

	if (options.token) {
		config.headers = { Authorization: `Bearer ${options.token}` };
		url = `${this.meteredPath}/analyze/${format}/${analyzers}`;
	} else {
		url = `${this.publicPath}/analyze/${format}/${analyzers}`;
	}

	config.url = url;

	/* - config - */

	const res = await axios(config);
	const analytics = await axios.get(res.data.resultUrl);

	return analytics.data;
};

/* */

APIWrapper_.process = async function (
	format: string,
	processors: string | string[],
	options?: {
		['file']?: Buffer | null;
		['params']?: Record<string, unknown> | null;
		['token']?: string | null;
		['save']?: boolean | null;
		['path']?: string | null;
	},
) {
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

	if (!format || !processors)
		throw new Error(
			'Please provide all obligatory args : file, format, processors',
		);

	if (Array.isArray(processors)) processors = processors.join('/');
	else if (!(Object(processors) instanceof String))
		throw new Error('Processors can either be an array or string');

	if (!options) {
		options = {};
	}

	if (!options.file && (!options.params || !options.params['use-file']))
		throw new Error(
			"Please provide a file or specify file on a server through 3d arg : options( options.params[ 'use-file' ] field )",
		);

	let url;

	/* - config - */

	const config: AxiosRequestConfig = Object.create(null);

	config.method = 'post';

	if (options.params) config.params = options.params;

	if (options.params && options.params['use-file']) config.data = undefined;
	else config.data = options.file;

	if (options.token) {
		config.headers = { Authorization: `Bearer ${options.token}` };
		url = `${this.meteredPath}/process/${format}/${processors}`;
	} else {
		url = `${this.publicPath}/process/${format}/${processors}`;
	}

	config.url = url;

	/* - config - */

	const res = await axios(config);

	if (options.save) {
		const path = options.path || `${process.cwd()}/file.${res.data.format}`;
		return APIWrapper_.downloadAndSave(res.data.resultUrl, path);
	} else {
		return res.data.resultUrl;
	}
};

/* */

APIWrapper_.downloadAndSave = async (url: string, path: string) => {
	if (!url) throw new Error('Please provide all obligatory args : url');

	if (!path) path = __dirname + '/file';

	const response = await axios({
		url,
		method: 'get',
		responseType: 'stream',
	});

	// create directories
	const dirPath = path.split('/').slice(0, -1).join('/') + '/';
	await fs.mkdir(dirPath, { recursive: true });

	await fs.writeFile(path, response.data);
};

export default APIWrapper_;
