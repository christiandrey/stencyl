import 'stencyl/dist/index.css';

import {Editor, PdfPreview, generatePDFAsync} from 'stencyl';
import React, {useRef} from 'react';

export const EditorApp = () => {
	const ref = useRef<Editor>(null);
	const handleClick = () => {
		generatePDFAsync({
			nodes: ref.current?.getNodes() ?? [],
			dataset: {},
			author: 'Christian Drey',
			title: 'Sample Stencyl Document',
		});
	};
	return (
		<Editor ref={ref}>
			<div
				style={{
					backgroundColor: '#dbdfe2',
					padding: '12px 24px',
					textAlign: 'right',
				}}
			>
				<button
					style={{
						padding: '8px 8px',
						backgroundColor: '#326FF3',
						color: 'white',
						borderRadius: 5,
					}}
					onClick={handleClick}
				>
					Get PDF
				</button>
			</div>
		</Editor>
	);
};

export const PreviewApp = () => {
	return (
		<PdfPreview
			nodes={[
				{type: 'paragraph', children: [{text: 'hELLO WORLD'}]},
				{type: 'paragraph', children: [{text: ''}]},
				{
					type: 'table',
					children: [
						{
							type: 'table-row',
							children: [
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'aaa'}]}],
									width: 48,
									height: 48,
								},
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'bbb'}]}],
									width: 48,
									height: 48,
								},
							],
						},
						{
							type: 'table-row',
							children: [
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'ccc'}]}],
									width: 48,
									height: 48,
								},
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'ddd'}]}],
									width: 48,
									height: 48,
								},
							],
						},
					],
				},
				{type: 'paragraph', children: [{text: ''}]},
				{type: 'paragraph', children: [{text: ''}]},
				{type: 'paragraph', children: [{text: 'Borderless'}]},
				{
					type: 'table',
					children: [
						{
							type: 'table-row',
							children: [
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'border'}]}],
									width: 48,
									height: 48,
									borderColor: 'rgba(0,0,0,0)',
								},
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'less'}]}],
									width: 48,
									height: 48,
									borderColor: 'rgba(0,0,0,0)',
								},
							],
						},
						{
							type: 'table-row',
							children: [
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'doc'}]}],
									width: 48,
									height: 48,
									borderColor: 'rgba(0,0,0,0)',
								},
								{
									type: 'table-cell',
									children: [{type: 'paragraph', children: [{text: 'ument'}]}],
									width: 48,
									height: 48,
									borderColor: 'rgba(0,0,0,0)',
								},
							],
						},
					],
				},
				{type: 'paragraph', children: [{text: ''}]},
				{
					type: 'bulleted-list',
					children: [
						{
							type: 'list-item',
							children: [
								{type: 'list-item-container', children: [{text: 'Uni ner'}]},
								{
									type: 'bulleted-list',
									children: [
										{
											type: 'list-item',
											children: [{type: 'list-item-container', children: [{text: 'dkkfk'}]}],
										},
										{
											type: 'list-item',
											children: [
												{type: 'list-item-container', children: [{text: 'kfkf'}]},
												{
													type: 'bulleted-list',
													children: [
														{
															type: 'list-item',
															children: [
																{type: 'list-item-container', children: [{text: 'kfkfkf'}]},
															],
														},
														{
															type: 'list-item',
															children: [
																{type: 'list-item-container', children: [{text: 'kfkfkf'}]},
																{
																	type: 'bulleted-list',
																	children: [
																		{
																			type: 'list-item',
																			children: [
																				{type: 'list-item-container', children: [{text: 'kkfkf'}]},
																			],
																		},
																	],
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{type: 'paragraph', children: [{text: ''}]},
				{type: 'paragraph', children: [{text: ''}]},
				{
					type: 'numbered-list',
					children: [
						{
							type: 'list-item',
							children: [
								{type: 'list-item-container', children: [{text: 'jdjd'}]},
								{
									type: 'numbered-list',
									children: [
										{
											type: 'list-item',
											children: [{type: 'list-item-container', children: [{text: 'kfkfk'}]}],
										},
										{
											type: 'list-item',
											children: [
												{type: 'list-item-container', children: [{text: 'kfkfk'}]},
												{
													type: 'numbered-list',
													children: [
														{
															type: 'list-item',
															children: [
																{type: 'list-item-container', children: [{text: 'kfkfkf'}]},
															],
														},
														{
															type: 'list-item',
															children: [
																{type: 'list-item-container', children: [{text: 'jfjfj'}]},
																{
																	type: 'numbered-list',
																	children: [
																		{
																			type: 'list-item',
																			children: [
																				{type: 'list-item-container', children: [{text: 'kfkfkf'}]},
																			],
																		},
																	],
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							type: 'list-item',
							children: [{type: 'list-item-container', children: [{text: 'kkkd'}]}],
						},
						{
							type: 'list-item',
							children: [{type: 'list-item-container', children: [{text: 'dkdkd'}]}],
						},
					],
				},
				{type: 'paragraph', children: [{text: ''}]},
				{type: 'paragraph', children: [{text: ''}]},
				{type: 'paragraph', children: [{text: 'Indenterd text'}], indentation: 9},
				{type: 'paragraph', indentation: 9, children: [{text: ''}]},
				{
					type: 'paragraph',
					indentation: 3,
					children: [{text: 'Right aigned txt'}],
					alignment: 'right',
				},
				{type: 'paragraph', indentation: 3, alignment: 'center', children: [{text: 'Centere'}]},
				{type: 'paragraph', indentation: 3, alignment: 'justify', children: [{text: 'Justified'}]},
				{type: 'paragraph', indentation: 3, children: [{text: 'kdkdk'}]},
				{type: 'paragraph', indentation: 3, children: [{text: ''}]},
				{type: 'paragraph', indentation: 3, children: [{text: ''}]},
				{
					type: 'paragraph',
					indentation: 3,
					children: [{text: 'cO'}, {text: 'LORED T', color: '#00D084'}, {text: 'ET'}],
				},
			]}
			dataset={{
				'd69f0fc0-abf2-4659-9412-60b4949298f1':
					'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
			}}
		/>
	);
};

export default EditorApp;
