module.exports = {
	images: {
		domains: ["i.scdn.co"],
	},
	eslint: {
		dirs: [
			"pages",
			"components",
			"hooks",
			"lib",
			"middleware",
			"providers",
			"styled",
			"templates",
			"util",
		],
	},
	webpack: (config) => {
		// Unset client-side javascript that only works server-side
		config.resolve.fallback = { fs: false, module: false };

		return config;
	},
};
