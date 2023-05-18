/* Copyright © 2023 Exact Realty Limited. All rights reserved.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	env: { node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	rules: {
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				prefix: ['T'],
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				prefix: ['I'],
			},
			{
				selector: 'enumMember',
				format: ['UPPER_CASE'],
				trailingUnderscore: 'require',
			},
			{
				selector: 'variable',
				modifiers: ['exported'],
				format: ['camelCase', 'PascalCase'],
				trailingUnderscore: 'require',
			},
			{
				selector: 'typeProperty',
				format: ['camelCase'],
				trailingUnderscore: 'require',
			},
			{
				selector: 'method',
				format: ['camelCase'],
				trailingUnderscore: 'require',
			},
		],
	},
	overrides: [
		{
			files: ['*.js', '*.schema.json', 'package.json', '*.d.ts'],
			rules: {
				'@typescript-eslint/naming-convention': 'off',
			},
		},
	],
};
