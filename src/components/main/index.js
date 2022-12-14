import React from 'react';

import { Button, Box } from '@chakra-ui/react';
import { Header } from '../Header';
import { SideBar } from '../Sidebar/index';

export const Main = () => {
  return (
    <div>
      <Header />
      <Box maxW="1200px" m="0 auto" mt="20px" p="20px">
        <SideBar />
        <Box border="1px" borderColor="gray.200" p="20px">
          메인입니다
        </Box>
        <Button mt="20px">테스트 버튼</Button>
        <Button m="20px 0 0 20px">로그아웃</Button>
      </Box>
    </div>
  );
};
