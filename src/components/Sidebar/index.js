import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Text } from '@chakra-ui/react';
export const SideBar = () => {
  const navigate = useNavigate();
  const goToMenu = () => {
    navigate('/test');
  };
  return (
    <Box border="1px" borderColor="gray.200" mb="10px" p="20px">
      <Button>
        <Link to="/" className="pd-10">
          home
        </Link>
      </Button>
      <Button ml="10px">
        <Link to="/join" className="pd-10">
          가입
        </Link>
      </Button>
      <Button ml="10px">
        <Link to="/login" className="pd-10">
          로그인
        </Link>
      </Button>
    </Box>
  );
};
