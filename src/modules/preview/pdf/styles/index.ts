import {StyleSheet} from '@react-pdf/renderer';
import {THEME_COLORS} from '../../../../constants/colors';

export const styles = StyleSheet.create({
	page: {
		paddingTop: 35,
		paddingHorizontal: 35,
		paddingBottom: 65,
		fontSize: 12,
	},
	blockquote: {
		marginLeft: 40,
	},
	list: {
		paddingLeft: 24,
	},
	listItem: {},
	listItemSymbol: {
		position: 'absolute',
		left: -12,
	},
	pre: {
		backgroundColor: THEME_COLORS.gray[100],
		borderRadius: 5,
		padding: 12,
	},
	code: {
		fontFamily: 'monospace',
	},
	h1: {
		fontSize: 42,
		lineHeight: 57 / 42,
	},
	h2: {
		fontSize: 32,
		lineHeight: 42 / 32,
	},
	h3: {
		fontSize: 20,
		lineHeight: 25 / 20,
	},
	h4: {
		fontSize: 18,
		lineHeight: 23 / 18,
	},
	h5: {
		fontSize: 16,
		lineHeight: 20 / 16,
	},
	h6: {
		fontSize: 14,
		lineHeight: 18 / 14,
	},
	image: {
		maxWidth: '100%',
		borderRadius: 5,
		alignSelf: 'baseline',
	},
	link: {
		textDecoration: 'underline',
	},
	tableRow: {
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	tableCell: {
		borderStyle: 'solid',
		padding: 2,
	},
	leaf: {
		lineHeight: 1.25,
	},
});
