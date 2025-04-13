// styled.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 0.5rem;
  background: ${props => props.active ? '#007bff' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  cursor: pointer;
  transition: 0.3s;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  input, button {
    padding: 0.6rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
`;
