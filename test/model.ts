import * as assert from 'power-assert';
import Log from '../logger/model/logModel';
describe('logModel', () => {
  const log = new Log();
  it('propathy time, arch', () => {
    assert.ok(log.arch);
    assert.ok(log.time);
  });
  it('toCSV method', () => {
    assert.equal(log.toCSV(), `${log.time},${log.arch}\n`);
  })
})