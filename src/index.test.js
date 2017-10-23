import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('a test', () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});

describe('index.html', () => {
	it('should say hello', () => {
		const index = fs.readFileSync('./src/index.html', "utf-8");
		jsdom.env(index,function(err, window) {
			const h1 = window.document.getElementByTagName('h1')[0];
			expect(h1.innerHTML).to.equal("HELLO");
			window.close();
		});
	})
})

describe('index.html', () => {
	it('should be in h1', () => {
		const index = fs.readFileSync('.src/index.html', "utf-8");
		jsdom.env(index,function(err, window) {
			const h2 = window.document.getElementByTagName('h1')[0];
			expect(h2.outerHTML).to.equal("h1");
			window.close();
		});
	})
})
