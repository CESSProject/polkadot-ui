// Copyright 2017-2024 @polkadot/app-broker authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { InfoRow } from '../types.js';
import React from 'react';
import { AddressMini, styled } from '@polkadot/react-components';

const StyledTableCol = styled.td<{ hideOn?: 'mobile' | 'tablet' | 'both' }>`
  width: 150px;
  vertical-align: top;

  @media (max-width: 768px) {
    /* Mobile */
    ${(props) => props.hideOn === 'mobile' || props.hideOn === 'both' ? 'display: none;' : ''}
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    /* Tablet */
    ${(props) => props.hideOn === 'tablet' || props.hideOn === 'both' ? 'display: none;' : ''}
  }
`;

const TableCol = ({
  header,
  value,
  hideOn,
}: {
  header: string;
  value: string | number | null | undefined;
  hideOn?: 'mobile' | 'tablet' | 'both';
}) => (
  <StyledTableCol hideOn={hideOn}>
    <h5 style={{ opacity: '0.6' }}>{header}</h5>
    <p>{value || <>&nbsp;</>}</p>
  </StyledTableCol>
);

function WorkInfoRow({ data }: { data: InfoRow }): React.ReactElement {
  const NoTaskAssigned = !data.taskId;

  if (NoTaskAssigned) {
    return (
      <>
        <td style={{ width: 200 }}>no task assigned</td>
        <td colSpan={5} />
      </>);
  }

  return (
    <>
      <TableCol
        header="TaskId"
        value={data.taskId}
        />
      <TableCol
        header="Block/timeslice"
        value={data.maskBits}
        />
      <TableCol
        header='Lease start'
        value={data.start}
        hideOn='both'
      />
      <TableCol
        header='Lease end'
        value={data.end}
        hideOn='both'
      />
      <TableCol
        header='Last block'
        value={data.endBlock}
      />
      <StyledTableCol hideOn='tablet'>
          <h5 style={{ opacity: '0.6' }}>{'Owner'}</h5>
          {!!data.owner ? <AddressMini
            isPadded={false}
            key={data.owner}
            value={data.owner}
          /> : <p>&nbsp;</p>}
      </StyledTableCol>
    </>
  );
}

export default React.memo(WorkInfoRow);
