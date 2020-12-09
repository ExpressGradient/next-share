module.exports = {
	async redirects() {
		return [{
			source: "/firebase_config",
			destination: "/",
			permanent: true
		}]
	}
}
