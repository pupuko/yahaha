import React from 'react';
import styled from 'styled-components';
import WindowSize from './ WindowSize';
import VirtualList from './VirtualList';

const TextDiv = styled('div')`
  width: 1000px;
  height: 500px;
`;

export default function index() {
  return (
    <>
      <VirtualList />
    </>
  );
}
