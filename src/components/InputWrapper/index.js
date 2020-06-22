import styled from "styled-components";
import {Input} from "reactstrap";
import {PHONE_LANDSCAPE_VIEWPORT_WIDTH} from "utils/rwd";

const InputWrapper = styled(Input)`
  @media screen and (min-width: ${PHONE_LANDSCAPE_VIEWPORT_WIDTH}) {
    width: ${props => (props.large ? '315px' : '17rem')};
  }
`;

export default InputWrapper;