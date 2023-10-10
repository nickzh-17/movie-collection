var AWS = require("aws-sdk");
const fs = require("fs").promises;
var s3 = new AWS.S3({ endpoint: "https://s3.filebase.com", signatureVersion: "v4" });

class ImageService {
	async uploadFile(file) {
		const data = await fs.readFile(file.path);
		const dataBuffer = Buffer.from(data);

		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: file.filename,
			ContentType: file.mimetype,
			Body: dataBuffer,
		};

		const request = s3.putObject(params);

		var headersPromise = new Promise(function (resolve) {
			request.on("httpHeaders", (statusCode, headers) => resolve(headers));
			request.send();
		});

		const headers = await headersPromise;
		await fs.unlink(file.path);

		return `https://ipfs.filebase.io/ipfs/${headers["x-amz-meta-cid"]}`;
	}
}

module.exports = new ImageService();
