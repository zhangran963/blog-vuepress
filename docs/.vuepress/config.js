const path = require('path');
const { getSideBarByFile } = require('./utils/file');

/* 创建sidebar */
const sidebar = getSideBarByFile(path.join(process.cwd(), 'docs'))

console.debug('* side', sidebar);

module.exports = {
	/* Webpack相关配置 */
	configureWebpack: {
		resolve: {
			alias: {
				'@': __dirname,
			},
		},
	},
	base: '/',
	title: '四叶草',
	description: '每个人都是生活的艺术家',
	head: [
		// 改变title的图标
		[
			'link',
			{
				rel: 'icon',
				href: '/img/linktolink.png',
			},
		],
	],

	/* 主题配置 */
	themeConfig: {
		logo: '/img/logo.png',
		/* 头部 */
		navbar: true,
		nav: [
			{ text: '主页', link: '/', target: '_self' },
			// {
			// 	text: '导航2bar',
			// 	link: '/bar/',
			// 	items: [
			// 		{ text: '子项目1', link: '/bar/1/' },
			// 		{ text: '子项目2', link: '/bar/2/' },
			// 	],
			// },
			{ text: 'Google', link: 'https://www.google.com.hk/' },
		],
		/* 搜索 */
		search: false,
		searchMaxSuggestions: 10,
		sidebarDepth: 2,
		sidebar,
		// /* 侧边 */
		// sidebar: {
		//   '/tool/git/': ['debug', 'git', '开发阶段'],
		//   // '/tool/git/': ['debug', 'git', '开发阶段'],
		// 	/* 前端错误监控系统 */
		// 	'/frontend-error/': ['1-typeof-error', '2-send-to-backend', '3-others'],

		// 	/* 配置规则的记录等 */
		// 	'/how-to-write/': ['config', 'grammar'],

		// 	// fallback
		// 	'/': [{ title: '主页' }],
		// },
		/* 显示所有页面的标题链接 */
		displayAllHeaders: true,
		nextLinks: true,
		prevLinks: true,
	},
};
