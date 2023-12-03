import React, { useState, useCallback } from 'react';
import ReactScrollbarsCustom from 'react-scrollbars-custom';

import {
  Container,
  Wrapper,
  Scroller,
  TrackX,
  ThumbX,
  TrackYEl,
  ThumbYEl,
} from './styled';

interface Props {
  autoHide?: boolean;
  children: React.ReactNode;
  height?: string;
}

const Scrollbar: React.FC<Props> = React.memo(({ children, autoHide, height }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const showScrollbar = isScrolling || isMouseOver;

  const onScrollStart = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollStop = useCallback(() => {
    setIsScrolling(false);
  }, []);
  const onMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  return (
    <ReactScrollbarsCustom
      style={{ height, width: '100%' }}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      noDefaultStyles
      scrollDetectionThreshold={500}
      renderer={({ elementRef, ...restProps }) => (
        <Container {...restProps} ref={elementRef} />
      )}
      wrapperProps={{
        renderer: ({ elementRef, ...restProps }) => (
          <Wrapper {...restProps} ref={elementRef} />
        ),
      }}
      scrollerProps={{
        renderer: ({ elementRef, ...restProps }) => (
          <Scroller {...restProps} ref={elementRef} />
        ),
      }}
      contentProps={{
        renderer: ({ elementRef, ...restProps }) => (
          <div {...restProps} ref={elementRef} />
        ),
      }}
      trackXProps={{
        renderer: ({ elementRef, ...restProps }) => (
          <TrackX {...restProps} ref={elementRef} />
        ),
      }}
      thumbXProps={{
        renderer: ({ elementRef, ...restProps }) => (
          <ThumbX {...restProps} ref={elementRef} />
        ),
      }}
      trackYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <TrackYEl
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              opacity: !autoHide || showScrollbar ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ),
      }}
      thumbYProps={{
        renderer: ({ elementRef, ...restProps }) => (
          <ThumbYEl {...restProps} ref={elementRef} />
        ),
      }}
    >
      {children}
    </ReactScrollbarsCustom>
  );
});

Scrollbar.defaultProps = {
  autoHide: false,
  height: '100%',
};

export default Scrollbar;
