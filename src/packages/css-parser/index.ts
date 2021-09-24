import css, {Declaration, Rule} from 'css';

import htmlNodeNames from '../../constants/html-node-names';
import htmlNodeTypes from '../../constants/html-node-types';

export type StencylCssDeclaration = {
	property: string;
	value: string;
	priority?: 'important' | '';
};

export type StencylCssRule = {
	selectors: Array<string>;
	declarations: Array<StencylCssDeclaration>;
};

export function parseCssFromDocument(dom: Document): Array<StencylCssRule> {
	const head = dom.head;
	const styles = Array.from(head.childNodes)
		.filter((o) => o.nodeType === htmlNodeTypes.ELEMENT_NODE && o.nodeName === htmlNodeNames.STYLE)
		.map((o) => o.textContent ?? '');
	const rules: Array<Rule> = styles
		.map((o) => css.parse(o))
		.flat()
		.filter((o) => !!o.stylesheet)
		.flatMap((o) => o.stylesheet?.rules ?? [])
		.filter((o) => o.type === 'rule');

	const parsedRules: Array<StencylCssRule> = [];

	for (const rule of rules) {
		const selectors = rule.selectors;

		if (!selectors?.length || !rule.declarations?.length) {
			continue;
		}

		const declarations =
			rule.declarations
				.filter((o) => o.type === 'declaration')
				.map((o: Declaration) => {
					const property = o.property;
					const value = o.value ?? '';
					const important = value.includes('!important');
					return {
						property,
						value: value.replace('!important', ''),
						priority: important ? 'important' : undefined,
					} as StencylCssDeclaration;
				}) ?? [];

		parsedRules.push({
			selectors,
			declarations,
		});
	}

	return parsedRules;
}
