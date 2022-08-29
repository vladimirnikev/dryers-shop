import { IsExistNotEmptyValuePipe } from './is-exist-not-empty-value.pipe';

describe('IsExistNotEmptyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new IsExistNotEmptyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
