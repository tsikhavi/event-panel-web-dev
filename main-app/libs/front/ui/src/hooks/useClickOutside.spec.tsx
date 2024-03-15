import { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { customRender, fireEvent } from '../test-utils';

import { useClickOutside } from './useClickOutside';

const inner = 'Inner';
const outer = 'Outer';
describe('useClickOutside', () => {
  it('should call callback', () => {
    const { result } = renderHook(() => useRef<HTMLDivElement | null>(null));
    const callback = jest.fn();

    renderHook(() => useClickOutside(result.current, callback));

    const { getByText } = customRender(
      <div>
        <div ref={result.current}>{inner}</div>
        <div>{outer}</div>
      </div>
    );

    fireEvent.click(getByText(inner));
    expect(callback).not.toHaveBeenCalled();

    fireEvent.click(getByText(outer));
    expect(callback).toHaveBeenCalled();
  });
});
