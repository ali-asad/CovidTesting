import React from 'react';
import styled from 'styled-components';
import { useAdminState, useAdminDispatch } from '../../admin/provider';
import { colors } from '../../../styles/colors';
import { AppointmentListItem } from '../../admin/models';

const ColHeaderBtn = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  color: ${colors.black};
  width: 100%;
  height: 100%;

  &.ascending::after {
    border-style: solid;
    border-width: 0.18em 0.18em 0 0;
    content: '';
    display: inline-block;
    height: 0.5em;
    left: 0.15em;
    position: relative;
    top: 0.15em;
    transform: rotate(-45deg);
    vertical-align: top;
    width: 0.5em;
    margin-top: 0.3em;
    margin-left: 0.5em;
    color: #2a5f87;
  }

  &.descending::after {
    top: 0;
    transform: rotate(135deg);
    border-style: solid;
    border-width: 0.18em 0.18em 0 0;
    content: '';
    display: inline-block;
    height: 0.5em;
    left: 0.15em;
    position: relative;
    vertical-align: top;
    width: 0.5em;
    margin-top: 0.3em;
    margin-left: 0.5em;
    color: #2a5f87;
  }
`;

interface Props {
  columnName: keyof AppointmentListItem;
  text: string;
}

const ColHeaderSortable: React.FC<Props> = ({ columnName, text }) => {
  const { sortBy, sortByDirection } = useAdminState();
  const { sortTable } = useAdminDispatch();
  let direction = sortBy == columnName ? sortByDirection : '';
  return (
    <ColHeaderBtn onClick={() => sortTable(columnName)} className={direction}>
      {text}
    </ColHeaderBtn>
  );
};

export default ColHeaderSortable;
