import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export const Header = ({ title }) => {
  return (
    <>
      <Box m="0 auto" mt="0px" p="20px">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="2xl"
          fontWeight="extrabold"
          textAlign="center"
        >
          {title}
        </Text>
      </Box>
    </>
  );
};
