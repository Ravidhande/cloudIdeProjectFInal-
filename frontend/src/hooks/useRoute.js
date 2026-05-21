import { useState, useCallback } from 'react';

export function useRoute() {
  const [route, setRoute] = useState(() => {
    const p = window.location.pathname;
    if (p === '/verify-email') return 'verify-email';
    if (p === '/reset-password') return 'reset-password';
    return 'signin';
  });

  const navigate = useCallback((r) => {
    const pathMap = {
      signin: '/',
      signup: '/',
      forgot: '/',
      'verify-email': '/verify-email',
      'reset-password': '/reset-password',
    };
    window.history.pushState({}, '', pathMap[r] || '/');
    setRoute(r);
  }, []);

  return { route, navigate };
}
