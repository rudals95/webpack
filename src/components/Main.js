import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Test from '../page/Test';
import Content from './../page/Content';

const Main = () => {
  //   const [test, setTest] = useState('');
  const navigate = useNavigate();
  const 이동 = () => {
    navigate('/test');
  };
  return (
    <>
      <button onClick={이동}> 이동 </button>
      <p>메인</p>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </>
  );
};
export default Main;
