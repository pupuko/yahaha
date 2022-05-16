import React, { useEffect, useState } from 'react';

interface IState {
  x: number;
  y: number;
}

export default function useWindowScroll(): IState {
  const [state, setState] = useState<IState>({
    x: window.scrollX,
    y: window.scrollY
  });

  useEffect(() => {
    function handler() {
      setState({
        x: window.scrollX,
        y: window.scrollY
      });
    }

    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return state;
}
