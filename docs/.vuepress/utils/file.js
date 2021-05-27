const path = require('path');
const fs = require('fs');

/**
 * 获取子元素
 */
function getFiles(pathStr, hasExt = false) {
	/* 合并路径 */
	pathStr = path.join(process.cwd(), 'docs', pathStr);
	/* 读取 */
	let res = fs.readdirSync(pathStr);
	if (Array.isArray(res)) {
		/* 过滤: 文件夹 或 '点'开头 */
		res = res.filter((dirname) => {
			const currPath = path.resolve(pathStr, dirname);
			/* 文件类型 */
			const stat = fs.lstatSync(currPath);
			return stat.isFile() && !dirname.startsWith('.') && dirname !== 'index.md';
		});
		if (!hasExt) {
			res = res.map((dirname) => {
				const { ext, name, root, dir } = path.parse(dirname);
				return name;
			});
		}
		return res;
	} else {
		return [];
	}
}

/* 配置文件名称 */
const configName = `config.js`;

function separateType(prevPath, arr) {
	let res = { file: [], dir: [], config: [] };
	arr
		.map((name) => ({ name, pathname: path.join(prevPath, name) }))
		.forEach(({ pathname, name }) => {
			if (name === configName) {
				res.config.push(configName);
			} else {
				const stat = fs.lstatSync(pathname);
				if (stat.isFile() && name.endsWith('.md')) {
					/* markdown文件 */
					res.file.push(name);
				} else if (stat.isDirectory() && !name.startsWith('.')) {
					/* 普通文件夹 */
					res.dir.push(name);
				} else {
					console.debug('* speaeateType.error', name);
				}
			}
		});
	return res;
}

/**
 * 文件夹中, 如若需要, 可配置sidebar.js文件, 用于生成自定义sidebar
 * 获取sideBar
 * @param {string} path 路径
 * @returns {object}
 */
function getSideBarByFile(dirpath) {
	let res = {};
	/* 键 */
	const key = dirpath.replace(path.join(process.cwd(), 'docs'), '') + '/';

	/* 配置文件 + 文件 + 文件夹 */
	let childArr = fs.readdirSync(dirpath);
	/* 给子元素分类 */
	const { dir: dirArr, file: fileArr, config: configArr } = separateType(dirpath, childArr);

	if (configArr.length > 0) {
		/* 有 自定义配置文件|string, 按文件导出的顺序处理 */
		const configStr = fs.readFileSync(path.join(dirpath, configArr[0]), { encoding: 'utf-8' });
		if (configStr) {
			/* 值 */
			let config = eval(configStr);
			if (config && Array.isArray(config.sidebar)) {
				res[key] = config.sidebar;
			}
		}
	} else if (fileArr.length > 0 && !fileArr.includes('index.md') && dirArr.length === 0) {
		/* 没有 配置文件, 随机导出所有 '.md' 文件 */
		res[key] = fileArr.map((filename) => filename.slice(0, -3));
	} else if (dirArr.length > 0) {
		/* 处理子组件 */
		dirArr
			.map((dirname) => path.join(dirpath, dirname))
			.forEach((childDirpath) => {
				// console.debug('* child', childDirpath);
				let currRes = getSideBarByFile(childDirpath);
				res = { ...res, ...currRes };
			});
	} else {
		console.debug('* 查找.error', dirArr, fileArr, configArr);
	}
	// else if(fileArr.length > 0){

	// }

	// else if (fileArr.length == 1 && fileArr[0] === 'main.md') {
	// 	/* 兼容性: 只有一个main.md时, 视作有配置文件 */
	// 	res[key] = ['main'];
	// }

	// /* 处理子组件 */
	// if (dirArr.length > 0) {
	// 	dirArr
	// 		.map((dirname) => path.join(dirpath, dirname))
	// 		.forEach((childDirpath) => {
	// 			// console.debug('* child', childDirpath);
	// 			let currRes = getSideBarByFile(childDirpath);
	// 			res = { ...res, ...currRes };
	// 		});
	// }

	return res;
}

module.exports = {
	getFiles,
	getSideBarByFile,
};
