import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100vh;
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  /* background-color: red; */
`

export const LogoWrapper = styled.div`
  text-align: center;
`
// export const Logo = styled.div`
//   justify-content: flex-end;
//   align-items: flex-end;
//   background-image: url("/img/logo.png");
//   background-position: right;
//   background-size: contain;
//   background-repeat: no-repeat;
//   width: 80%;
//   height: 50vh;
//   padding-top: 50%;
//   margin-right: 20px;
// `

export const Logo = styled.img`
  width: ${({ size }) => size}px;
  margin-top: 15%;
  /* height: ${({ size }) => size}px; */
  /* width: 2%;
  margin: 0 3%; */
`
