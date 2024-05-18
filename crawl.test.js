import { expect, test } from "bun:test";
const { normalizeURL } = require('./crawl.js')
const { geturls } = require('./crawl.js')

test('normalizeURL strp prot', () => {
	expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('normalizeURL strp slh', () => {
	expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('normalizeURL cptl', () => {
	expect(normalizeURL('https://bLog.BOOT.Dev/path/')).toBe('blog.boot.dev/path')
})

test('geturl', () => {
	const in1 =
		`<html>
	< body >
		<a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body >
</html >`;
	const in2 = "https://blog.boot.dev"
	expect(geturls(in1, in2)).toEqual(['https://blog.boot.dev/'])
})

test('geturl rel', () => {
	const in1 =
		`<html>
			< body >
				<a href="/path/"><span>Go to Boot.dev</span></a>
			</body >
		</html >`;
	const in2 = "https://blog.boot.dev"
	expect(geturls(in1, in2)).toEqual(['https://blog.boot.dev/path/'])
})

test('geturl inval', () => {
	const in1 =
		`<html>
			< body >
				<a href="invalid"><span>Invalid</span></a>
			</body >
		</html >`;
	const in2 = "https://blog.boot.dev"
	expect(geturls(in1, in2)).toEqual([])
})
