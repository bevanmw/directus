import type { AbstractQueryFieldNodeFn } from '@directus/data';
import { randomAlpha, randomIdentifier } from '@directus/random';
import { describe, expect, test } from 'vitest';
import type { AbstractSqlQueryFnNode } from '../types.js';
import { parameterIndexGenerator } from '../utils/param-index-generator.js';
import { convertFn } from './functions.js';

describe('Convert function', () => {
	test('With no args', () => {
		const sampleField = randomIdentifier();
		const idGen = parameterIndexGenerator();

		const sampleFn: AbstractQueryFieldNodeFn = {
			type: 'fn',
			fn: 'month',
			targetNode: {
				type: 'primitive',
				field: sampleField,
			},
		};

		const res = convertFn('randomCollection', sampleFn, idGen);

		const sampleSqlFn: AbstractSqlQueryFnNode = {
			type: 'fn',
			fn: 'month',
			input: {
				type: 'primitive',
				table: 'randomCollection',
				column: sampleField,
			},
			arguments: {
				type: 'value',
				parameterIndexes: [],
			},
		};

		expect(res).toStrictEqual({
			fn: sampleSqlFn,
			parameters: [],
		});
	});

	test('With args', () => {
		const sampleField = randomIdentifier();
		const idGen = parameterIndexGenerator();
		const randomArgument1 = randomAlpha(5);
		const randomArgument2 = randomAlpha(5);

		const sampleFn: AbstractQueryFieldNodeFn = {
			type: 'fn',
			fn: 'month',
			targetNode: {
				type: 'primitive',
				field: sampleField,
			},
			args: [randomArgument1, randomArgument2],
		};

		const res = convertFn('sakjfhdl', sampleFn, idGen);

		const sampleSqlFn: AbstractSqlQueryFnNode = {
			type: 'fn',
			fn: 'month',
			input: {
				type: 'primitive',
				table: 'sakjfhdl',
				column: sampleField,
			},
			arguments: {
				type: 'value',
				parameterIndexes: [0, 1],
			},
		};

		expect(res).toStrictEqual({
			fn: sampleSqlFn,
			parameters: [randomArgument1, randomArgument2],
		});
	});
});
