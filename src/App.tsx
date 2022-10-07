import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";

const AppWrapper = styled.div`
  text-align: center;
`;

const StyledAppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const StyledAppLink = styled.a`
  color: #61dafb;
`;

const StyledAppLogo = styled.img`
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

function App() {
  return (
    <AppWrapper>
      <StyledAppHeader>
        <StyledAppLogo src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <StyledAppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </StyledAppLink>
      </StyledAppHeader>
    </AppWrapper>
  );
}

export default App;
