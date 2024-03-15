import { fireEvent, render } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import '@testing-library/jest-dom';
import 'reflect-metadata';

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

export { renderHook, act, render, fireEvent };
