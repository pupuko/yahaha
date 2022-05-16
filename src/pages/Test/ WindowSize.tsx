import React from 'react';
import useWindowScroll from '../../hooks/custom/useWindowScroll';
import useWindowSize from '../../hooks/custom/useWindowSize';

export default function WindowSize() {
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();
  return (
    <>
      <div>
        {' '}
        window wdith: {width}, window height: {height}
      </div>
      <div>
        scroll x: {x}, scroll y: {y}
      </div>
    </>
  );
}
