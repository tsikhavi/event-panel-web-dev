import { useState } from 'react';

import { ErrorType } from '../api/base.api';

type Statuses = 'idle' | 'pending' | 'success' | 'failed';

export function useRequest<Resp, Req>(requestFn: (data: Req) => Promise<Resp>) {
  const [status, setStatus] = useState<Statuses>('idle');
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<Resp | null>(null);

  const makeRequest = async (data: Req) => {
    setStatus('pending');

    try {
      const response = await requestFn(data);
      setResponse(response);
      setStatus('success');
      setError(null);
    } catch (error) {
      const { message } = error as ErrorType;
      setStatus('failed');
      setError(message);
    }
  };

  return { makeRequest, response, error, status, isLoading: status === 'pending' };
}
