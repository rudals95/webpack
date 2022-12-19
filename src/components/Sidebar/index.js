import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { removeCookie } from '../../utils/cookie';
import { setLogin } from '../../store/slices/userSlice';
import { logoutApi } from '../../api';

export const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  return (
    <Box border="1px" borderColor="gray.200" mb="10px" p="20px">
      <Button>
        <Link to="/" className="pd-10">
          home
        </Link>
      </Button>
      <Button
        ml="10px"
        // onClick={logout}
      >
        <Link to="/login" className="pd-10">
          로그아웃
        </Link>
      </Button>
    </Box>
  );
};
