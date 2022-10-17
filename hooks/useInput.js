import { useState, useCallback } from 'react';

//인풋 value hook
const useInput = (initialData) => {
  const [value, setValue] = useState('');
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
