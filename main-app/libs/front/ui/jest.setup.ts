import { act, renderHook } from '@testing-library/react-hooks';

import '@testing-library/jest-dom';
import 'reflect-metadata';

afterEach(() => {
  jest.clearAllMocks();
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

export { renderHook, act };
