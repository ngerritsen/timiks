import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: ${props => props.theme.sizes[props.margin || 'sm']};
`;

export default Section;
