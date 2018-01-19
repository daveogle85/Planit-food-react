const assert = require('chai').assert;
const expect = require('chai').expect;
const to = require('../utils/to').to;

describe('Utils', function () {

    describe('to', function () {
        it('should return data from an awaited promise', async function () {
            const promise = new Promise((res) =>
                setTimeout(() => res('data'), 300)
            );
            const [err, data] = await to(promise);
            assert.strictEqual(data, 'data');
            expect(err).to.be.null;
        });

        it('should return an error from a failed awaited promise', async function () {
            const promise = new Promise((res, rej) =>
                setTimeout(() => rej('error'), 300)
            );
            const [err, data] = await to(promise);
            assert.strictEqual(err, 'error');
            expect(data).to.be.undefined;
        });
    });
});