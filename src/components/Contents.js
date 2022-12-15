import React from 'react';
import { Box } from '@chakra-ui/react';

export const Contents = ({ children }) => {
  return (
    <Box border="1px" borderColor="gray.200" p="20px">
      {children}
    </Box>
  );
};
