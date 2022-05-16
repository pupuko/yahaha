import React, { useEffect, useState } from 'react';

interface IState {
  width: number;
  height: number;
}

export default function useWindowSize(
  initialWidth = Infinity,
  initialHeight = Infinity
): IState {
  const [state, setState] = useState<IState>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handler() {
      setState({
        width: window.innerWidth || initialWidth,
        height: window.innerHeight || initialHeight
      });
    }

    window.addEventListener('resize', handler);

    return () => window.removeEventListener('resize', handler);
  }, []);

  return state;
}
