import styled from 'styled-components';

export const Item = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr;
  padding: ${props => `${props.theme.space[0]}px`};
  align-items: center;
  &:not(:last-child) {
    margin-bottom: ${props => `${props.theme.space[1]}px`};
  }
`;

export const Name = styled.p`
  margin-right: ${props => `${props.theme.space[1]}px`};
`;

export const Number = styled.p``;
