import styled from 'styled-components';

export const LoginForm = styled.div`
  background: #dddddd8a;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  & > h2 {
    margin: 10px 0;
    font-size: 20px;
    color: #6a6363;
    font-weight: bold;
  }
  & > form {
    display: flex;
    flex-direction: column;
  }
  & > form > input {
    width: 200px;
    border-radius: 5px;
    margin: 10px 0;
  }
  & > form > button {
    margin: 0 50px 0;
    height: 50px;
    background: #b6b3b37d;
  }
  & > form > p {
    color: red;
  }
`;
