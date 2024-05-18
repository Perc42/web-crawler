const { crawlpg } = require('./crawl.js')

async function main() {
	if (process.argv.length < 3) {
		console.log("no website")
		process.exit(1)
	}
	const baseurl = process.argv[2]
	console.log('starting crawl: ' + baseurl)
	const pages = await crawlpg(baseurl, baseurl, {})
	for (const page of Object.entries(pages)) {
		console.log(page)
	}
}
main()
