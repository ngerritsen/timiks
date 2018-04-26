import styled from 'styled-components';

const Section = styled.div`
  margin-bottom: ${props => props.margin ? props.theme.sizes[props.margin] : 0};
  position: relative;
`;

export default Section;
