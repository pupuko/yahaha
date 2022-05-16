import React, { useRef, memo, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';

const VirtualListDiv = styled('div')`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 500px;
  width: 500px;
`;

const ListBoxDiv = styled('div')<{ height?: string }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height};
  background-color: pink;
`;

const ItemDiv = styled('div')<{ top?: string }>`
  position: absolute;
  top: ${({ top }) => top};
  height: 50px;
  width: 100%;
  border-bottom: 1px solid white;
`;

function Item({
  data,
  top,
  ...props
}: {
  data: any;
  top: number;
  [props: string]: any;
}) {
  return <ItemDiv top={top + 'px'}>{data}</ItemDiv>;
}

export default function VirtualList() {
  const virListRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [arrData, setArrData] = useState(() => Array(10000).fill(1));

  const itemHeight = 50;
  const containerHeight = 500;

  const wraperHeight = useMemo(
    () => arrData.length * itemHeight,
    [arrData, itemHeight]
  );

  const limit = useMemo(
    () => Math.ceil(containerHeight / itemHeight),
    [containerHeight, itemHeight]
  );

  const endIndex = useMemo(
    () => Math.min(startIndex + limit, arrData.length - 1),
    [startIndex, limit, arrData]
  );

  const handleScroll = useCallback(
    (e) => {
      if (e.target !== virListRef.current) return;
      const { scrollTop } = e.target;
      const currentIndex = Math.floor(scrollTop / itemHeight);
      if (currentIndex !== startIndex) {
        setStartIndex(currentIndex);
      }
    },
    [virListRef, itemHeight, startIndex]
  );

  function renderList() {
    const rows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      rows.push(<Item data={i} key={i} top={i * itemHeight} />);
    }
    return rows;
  }

  return (
    <VirtualListDiv ref={virListRef} onScroll={handleScroll}>
      <ListBoxDiv height={wraperHeight + 'px'}>{renderList()}</ListBoxDiv>
    </VirtualListDiv>
  );
}
