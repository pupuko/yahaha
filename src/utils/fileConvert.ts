export function urlToFile(url: string): Promise<any> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.crossOrigin = "";
		image.src = url;
		image.onload = () => {
			const base64ImageSrc = getBase64Image(image);
			const file = dataURLToFile(base64ImageSrc, "image");
			resolve(file);
		};
		image.onerror = (e) => reject(e);
	});
}

export function getBase64Image(img: any): string {
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) return "";
	ctx.drawImage(img, 0, 0, img.width, img.height);
	const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
	const dataURL = canvas.toDataURL("image/" + ext);
	return dataURL;
}

export function dataURLToFile(dataUrl: string, fileName: string) {
	const arr = dataUrl.split(",");
	const bstr = window.atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], fileName, {
		type: "image/jpeg",
	});
}
