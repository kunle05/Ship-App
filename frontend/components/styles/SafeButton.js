import styled from "styled-components";

const SafeButton = styled.button`
    background: var(--blue);
    background: ${props => props.active ? 'var(--red)' : null};
    color: var(--white);
    font-weight: bold;
    padding: 1rem;
    text-transform: uppercase;
    font-size: 1.5rem;
    border-radius: .5rem;
    border: 0;
    transition: all 0.5s;
    :hover {
        transform: scale(1.1);
    }
    &:disabled {
        opacity: 0.8;
    }
`;

export default SafeButton;