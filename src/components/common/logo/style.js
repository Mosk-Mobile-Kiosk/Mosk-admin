import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100vh;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const LogoWrapper = styled.div`
  text-align: center;
`

export const Logo = styled.img`
  width: ${({ size }) => size}px;
  margin-top: 10%;
`
