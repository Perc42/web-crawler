const { JSDOM } = require('jsdom')

function geturls(htmlbody, baseurl) {
	const urls = []
	const a = new JSDOM(htmlbody)
	const linelem = a.window.document.querySelectorAll('a')
	for (const lel of linelem) {
		if (lel.href.slice(0, 1) === '/') {
			try {
				const urlob = new URL(baseurl + lel.href)
				urls.push(urlob.href)
			} catch (er) {
				console.log(er.message)
			}
		} else {
			try {
				const urlob = new URL(lel.href)
				urls.push(urlob.href)
			} catch (er) {
				console.log(er.message)
			}
		}
	}
	return urls
}

function normalizeURL(urlString) {
	const urlobj = new URL(urlString)
	const res = urlobj.hostname + urlobj.pathname
	if (res.length > 0 && res.slice(-1) === '/') {
		return res.slice(0, -1)
	}
	return res
}

async function crawlpg(baseurl, currurl, pages) {
	const baseurlobj = new URL(baseurl)
	const currurlobj = new URL(currurl)
	if (baseurlobj.hostname != currurlobj.hostname) {
		return pages
	}
	const norcurrurl = normalizeURL(currurl)
	if (pages[norcurrurl] > 0) {
		pages[norcurrurl]++
		return pages
	}
	pages[norcurrurl] = 1
	console.log('crawling:' + currurl)
	try {
		const resp = await fetch(currurl)
		if (resp.status > 399) {
			console.log(resp.status)
			return pages
		}
		const contype = resp.headers.get("content-type")
		if (!contype.includes("text/html")) {
			return pages
		}
		const htmlBody = await resp.text()
		const nexurls = geturls(htmlBody, baseurl)
		for (const nexu in nexurls) {
			pages = await crawlpg(baseurl, nexu, pages)
		}
	} catch (er) {
		console.log(er)
	}
	return pages
}

module.exports = {
	normalizeURL,
	geturls,
	crawlpg
}

