import 'stencyl/dist/index.css';

import {DomPreview} from 'stencyl';
import React from 'react';

// import React, {useRef} from 'react';

// import {Editor} from 'stencyl';

// const App = () => {
// 	const ref = useRef<Editor>(null);
// 	const handleClick = () => {
// 		console.log('nodes', JSON.stringify(ref.current?.getNodes()));
// 	};
// 	return <Editor headerComponent={<button onClick={handleClick}>Get nodes</button>} ref={ref} />;
// };

const App = () => {
	return (
		<DomPreview
			nodes={[
				{
					type: 'paragraph',
					children: [
						{text: ''},
						{
							dataType: 'image',
							defaultValue: 'djjfk',
							label: 'dddd',
							type: 'editable',
							id: 'd69f0fc0-abf2-4659-9412-60b4949298f1',
							children: [{text: ''}],
							editable: true,
							marks: {},
							width: 100,
							height: 100,
						},
						{text: ',d,d,dd'},
					],
				},
				{type: 'paragraph', children: [{text: ''}]},
				{type: 'paragraph', children: [{text: 'DATED', bold: true}]},
				{type: 'paragraph', children: [{text: '------------'}]},
				{type: 'paragraph', children: [{text: 'LOAN AGREEMENT ', bold: true}]},
				{type: 'paragraph', children: [{text: 'Between'}]},
				{type: 'paragraph', children: [{text: 'Borrower', bold: true}]},
				{type: 'paragraph', children: [{text: 'and'}]},
				{type: 'paragraph', children: [{text: 'Lender', bold: true}]},
			]}
			dataset={{
				'd69f0fc0-abf2-4659-9412-60b4949298f1':
					'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
			}}
		/>
	);
};

export default App;
