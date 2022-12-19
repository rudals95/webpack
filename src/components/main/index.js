import React from 'react';

import { Box } from '@chakra-ui/react';
import { Header } from '../Header';
import { SideBar } from '../Sidebar/index';
import { Routes, Route } from 'react-router-dom';
import { Contents } from './../Contents';

export const Main = () => {
  return (
    <div>
      <Header />
      <Box maxW="1200px" m="0 auto" mt="20px" p="20px">
        <SideBar />
        <Contents>
          <Routes>
            <Route path="/1" element={<div> 1</div>} />
            <Route path="/2" element={<div> 2</div>} />
            <Route path="/3" element={<div> 3</div>} />
          </Routes>
        </Contents>
      </Box>
    </div>
  );
};
