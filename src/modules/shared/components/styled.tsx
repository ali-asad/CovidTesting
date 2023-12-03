import styled from 'styled-components';

import { colors } from '../../../styles/colors';
import { Breakpoints } from '../../../dictionaries';

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  noPadding?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  & > * {
    &:nth-child(2) {
      flex-grow: 1;
    }
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: ${({ size }: ContainerProps) => {
    if (size === 'md') {
      return '760px';
    }

    if (size === 'lg') {
      return '920px';
    }

    if (size === 'xl') {
      return '1110px';
    }

    if (size === 'xxl') {
      return '1400px';
    }

    return '540px';
  }};
  padding: ${({ noPadding }: ContainerProps) => (noPadding ? '0px' : '0 15px')};
`;

export const WideContainer = styled.div`
  margin: 0 auto;
  max-width: 2500px;
  padding: ${({ noPadding }: ContainerProps) => (noPadding ? '0px' : '0 25px')};
`;

export const Content = styled.div`
  padding: 60px 0;

  @media (min-width: ${Breakpoints.md}) {
    padding: 88px 0;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 40px;
`;

export const PageTitle = styled.h2`
  color: ${colors.darkBlue};
  font-size: 28px;
  margin: 0;
  text-align: ${({ textAlign }: { textAlign?: string }) => textAlign || 'left'};

  @media (min-width: ${Breakpoints.md}) {
    font-size: 32px;
  }
`;

export const PageSubTitle = styled.div`
  margin: 10px 0 0 0;
`;

export const Text = styled.p``;

interface ButtonProps {
  libraryType: 'primary' | 'default';
  accentColor?: string;
  size?: 'sm' | 'lg';
}

export const Button = styled.button`
  border: 1px solid
    ${({ accentColor }: ButtonProps) => accentColor || colors.darkBlue};
  font-size: ${({ size }: ButtonProps) => (size === 'sm' ? '14px' : '20px')};
  line-height: 1.6;
  border-radius: 5px;
  padding: ${({ size }: ButtonProps) =>
    size === 'sm' ? '4px 15px' : '9px 20px'};
  font-weight: ${({ size }: ButtonProps) =>
    size === 'sm' ? 'normal' : 'bold'};
  width: 100%;
  color: ${({ libraryType, accentColor }: ButtonProps) => {
    return libraryType === 'primary'
      ? colors.white
      : accentColor || colors.darkBlue;
  }};
  background: ${({ libraryType, accentColor }: ButtonProps) =>
    libraryType === 'primary' ? accentColor || colors.darkBlue : colors.white};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:disabled {
    background: ${({ libraryType, accentColor }: ButtonProps) =>
      libraryType === 'primary'
        ? accentColor || colors.darkBlue50
        : colors.white};
    border: 1px solid transparent;
    color: ${({ libraryType, accentColor }: ButtonProps) => {
      return libraryType === 'primary'
        ? colors.white
        : accentColor || colors.darkBlue50;
    }};
  }
`;

export const ErrorText = styled.div`
  font-size: 13px;
  color: ${colors.red};
  opacity: ${({ hasError }: { hasError: boolean }) => (hasError ? 1 : 0)};
  transition: opacity 0.15s ease-in-out;
`;

export const SubHeaderDescription = styled.p`
  margin-bottom: 30px;
`;

export const ResponsiveTable = styled.div`
  margin: 0;
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
  overflow-y: hidden;
  max-width: 2500px;

  table {
    margin: 0;

    td,
    th {
      border: ${colors.white};
      padding: 0.7rem;
      min-width: 90px;
    }

    th {
      text-align: left;
      border-top: none;
      background: ${colors.blue8};
      color: ${colors.black};
    }

    td {
      border-bottom: none;
      border-bottom: 1px solid ${colors.grey20};
    }

    tr:last-child {
      td {
        border-bottom: 0;
      }
    }
  }
`;