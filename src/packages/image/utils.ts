export type ImageDimensions = {
	width: number;
	height: number;
};

export function getImageSizeAsync(url: string): Promise<ImageDimensions | null> {
	return new Promise((resolve) => {
		const img = document.createElement('img');

		img.onload = () => {
			resolve({width: img.naturalWidth, height: img.naturalHeight});
		};

		img.onerror = () => {
			resolve(null);
		};

		img.src = url;
	});
}
