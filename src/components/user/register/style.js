import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100vh;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background: black; */
`

export const FormContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  width: 100%;
  background: #b2e3ed;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* background-color: #ccc; */
`

export const FormTitle = styled.h2`
  margin-bottom: 20px;
`

export const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`

export const SubmitButton = styled.button`
  background-color: #0077ff;
  color: #fff;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #005bcc;
  }
`
