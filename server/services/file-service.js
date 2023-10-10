const fs = require("fs").promises;

class FileSevice {
	//  Read
	async readFile(path) {
		const fileJson = await fs.readFile(path, "utf8");
		const fileObj = await JSON.parse(fileJson);
		return fileObj;
	}

	// Create, Update, Delete
	async writeToFile(path, newObject) {
		const jsonStr = JSON.stringify(newObject, null, 2);
		await fs.writeFile(path, jsonStr);
	}
}

module.exports = new FileSevice();
