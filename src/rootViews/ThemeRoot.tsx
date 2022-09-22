import React, { FC, ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled';
import themes from '../styles/theme';

const Container = styled('div')({
  userSelect: 'auto',
  width: '100%'
});

interface ThemeProps {
  children: ReactNode;
}

const ThemeRoot: FC<ThemeProps> = ({ children }): ReactElement => (
  <ThemeProvider theme={themes.default}>
    <Container>
      {children}
    </Container>
  </ThemeProvider>
);

export default ThemeRoot;
