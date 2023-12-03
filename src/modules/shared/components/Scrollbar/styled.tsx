import styled from 'styled-components';

import { colors } from '../../../../styles/colors';

export const Container = styled.div`
  position: relative !important;
` as any;

export const Wrapper = styled.div`
  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
` as any;

export const Scroller = styled.div`
  position: absolute !important;
` as any;

export const TrackX = styled.div`
  display: none;
` as any;

export const ThumbX = styled.div`
  display: none;
` as any;

export const TrackYEl = styled.div`
  position: absolute;
  border-radius: 0.25rem;
  width: 0.375rem;
  top: 0.2rem;
  right: 0.2rem;
  bottom: 0.2rem;
  background: none;
  z-index: 10;
` as any;

export const ThumbYEl = styled.div`
  background: ${colors.grey80};
  cursor: pointer;
  border-radius: 0.25rem;
` as any;
