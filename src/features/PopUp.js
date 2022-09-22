// import React from 'react';
// import styled from '@emotion/styled';
// import Text from './Text';
// import { useSelector, useDispatch } from 'react-redux';
// import { openPopup } from '../components/itemSlice';
// import close from '../assets/images/close.svg';
// import { mq } from '../assets/mediaQueries';

// const Container = styled('div')(({ isOpen }) => ({
//     height: '100vh',
//     width: '100vw',
//     backgroundColor: '#0000009e',
//     display: isOpen ? 'flex' : 'none',
//     position: 'fixed',
//     zIndex: 9,
//     alignItems: 'center',
//     justifyContent: 'center'
// }));

// const Content = styled('div')(mq({
//     background: '#FFFFFF',
//     borderRadius: 8,
//     // padding: '20px 35px 45px',
//     width: [327, 598],
//     height: 'auto'
// }));

// const ContentMargin = styled('div')(mq({
//     margin: [24, '20px 35px 45px']
// }));

// const Close = styled('span')(mq({
//     marginLeft: [260, 586],
//     cursor: 'pointer',
//     display: 'flex'
// }));

// const DisplayImg = styled('div')(({ bg, width='100%', height }) => ({
//     width,
//     height,
//     backgroundImage: `url(${bg})`,
//     backgroundRepeat: 'no-repeat',
//     margin: 'auto'
// }));

// const Popup = () => {
//     const dispatch = useDispatch();
//     const isOpen = useSelector(state => state.reducers.item.openPopup);
//     return isOpen && (
//         <Container isOpen={isOpen}>
//             <Content>
//                 <ContentMargin>
//                     <Close onClick={() => dispatch(openPopup(false))}><DisplayImg height={12} bg={close} /></Close>
//                     <Text marginBottom={26} color='#404040' fontSize={24} lineHeight='29px' fontWeight={600} >Reset your old device</Text>
//                     <Text marginBottom={9} color='#333333' fontSize={18} fontWeight={500} lineHeight='32px'>Here’s how:</Text>
//                     <Text left={4} color='#333333' fontSize={18} fontWeight={500} lineHeight='32px'>1. On your iPhone, open the Settings app.</Text>
//                     <Text left={4} color='#333333' fontSize={18} fontWeight={500} lineHeight='32px'>2. On your iPhone, open the Settings app. Scroll down and select General, then select Reset.</Text>
//                     <Text left={4} color='#333333' fontSize={18} fontWeight={500} lineHeight='32px'>3. Look for Erase All Content and Settings.</Text>
//                 </ContentMargin>
//             </Content>
//         </Container>
//     );
// };

// export default Popup;