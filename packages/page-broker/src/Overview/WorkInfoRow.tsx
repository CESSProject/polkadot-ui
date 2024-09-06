// Copyright 2017-2024 @polkadot/app-broker authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Occupancy, type InfoRow } from '../types.js';

import React from 'react';

import { AddressMini, styled } from '@polkadot/react-components';

const StyledTableCol = styled.td<{ hide?: 'mobile' | 'tablet' | 'both' }>`
  width: 150px;
  vertical-align: top;

  @media (max-width: 768px) {
    /* Mobile */
    ${(props) => props.hide === 'mobile' || props.hide === 'both' ? 'display: none;' : ''}
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    /* Tablet */
    ${(props) => props.hide === 'tablet' || props.hide === 'both' ? 'display: none;' : ''}
  }
`;

const TableCol = ({ header,
  hide,
  value }: {
    header: string;
    value: string | number | null | undefined;
    hide?: 'mobile' | 'tablet' | 'both';
  }) => (
  <StyledTableCol hide={hide}>
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

  switch (data.type) {
    case (Occupancy.Reservation): {
      return (
        <>
          <TableCol
            header='TaskId'
            value={data.taskId}
          />
          <TableCol
            header='Block/timeslice'
            value={data.maskBits}
          />
          <TableCol
            header="type"
            value={'Reservation'}
          />
          <td colSpan={3} />
        </>
      )
    }


    case (Occupancy.Lease): {
      return <></>
    }

    default: {
      return <>
        <TableCol
          header='TaskId'
          value={data.taskId}
        />
        <TableCol
          header='Block/timeslice'
          value={data.maskBits}
        />
        <TableCol
          header='Start'
          hide='both'
          value={data.start}
        />
        <TableCol
          header='End'
          hide='both'
          value={data.end}
        />
        <TableCol
          header='Last block'
          value={data.endBlock}
        />
        <StyledTableCol hide='mobile'>
          <h5 style={{ opacity: '0.6' }}>{'Owner'}</h5>
          {data.owner
            ? <AddressMini
              isPadded={false}
              key={data.owner}
              value={data.owner}
            />
            : <p>&nbsp;</p>}
        </StyledTableCol></>
    }
  }
}

  export default React.memo(WorkInfoRow);
