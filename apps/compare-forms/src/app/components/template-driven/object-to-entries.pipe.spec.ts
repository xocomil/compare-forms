import { ObjectToKeysPipe } from './object-to-entries.pipe';

describe('ObjectToKeysPipe', () => {
  it('create an instance', () => {
    const pipe = new ObjectToKeysPipe();
    expect(pipe).toBeTruthy();
  });
});
