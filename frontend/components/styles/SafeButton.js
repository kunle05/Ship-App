import styled from "styled-components";

const SafeButton = styled.button`
    background: var(--blue);
    color: var(--white);
    font-weight: bold;
    padding: 1rem;
    text-transform: uppercase;
    font-size: 1.5rem;
    border-radius: .5rem;
    transition: all 0.5s;
    :hover {
        transform: scale(1.1);
    }
`;

export default SafeButton;