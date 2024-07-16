import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 16px;
  font-size: 1.2rem;
  color: #09f;
`;

export default Loading;
