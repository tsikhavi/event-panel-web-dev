import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

jest.mock('axios');

(axios.create as jest.Mock).mockReturnValue({
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
  get: (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: 'response' }),
  put: (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValue({ data: 'response' }),
  post: (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: 'response' }),
  delete: (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({ data: 'response' }),
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

// ToDo move to a better place
export const baseURL = 'http://localhost:8000/api';

export { renderHook, act };
