// home-styled.js
import styled from "styled-components"

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const HeroSection = styled.section`
  width: 100%;
  padding: 6rem 0;
  background-color: #f7f7f7;
`

export const HeroText = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  
  h1 {
    font-size: 3rem;
    font-weight: bold;
  }

  p {
    margin: 1rem 0;
    color: #666;
    font-size: 1.25rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
`

export const RoleSection = styled.section`
  width: 100%;
  padding: 6rem 0;
`

export const RoleCard = styled.div`
  text-align: center;
  max-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  p {
    color: #666;
  }
`

export const IconWrapper = styled.div`
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6f0ff;
  border-radius: 50%;
  
  svg {
    color: #007bff;
    width: 32px;
    height: 32px;
  }
`

