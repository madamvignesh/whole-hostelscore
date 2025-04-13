import styled from "styled-components";

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

export const CardDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
`;

export const CardContent = styled.div`
  margin-top: 1rem;
`;

export const CardFooter = styled.div`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #666;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-weight: 500;
`;

export const FormControl = styled.div``;

export const FormMessage = styled.p`
  font-size: 0.75rem;
  color: red;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;
