import { lazy, Suspense, FC } from 'react';
import styled from '@emotion/styled';
const AppRoutes = lazy(() => import('./AppRoutes'));

const Container = styled('div')({
    width: '100%',
    height: '100%'
});

interface iMainView {
    location: string;
};
  
const MainView: FC<iMainView> = ({location}) => {
    return (
        <Container className='fade-in'>
            <Suspense fallback={<div />}>
                <AppRoutes location={location} />
            </Suspense>
        </Container>
    );
};

export default MainView;