import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    from {
        background-position: 0 0;
    }
    to {
        background-position: 100% 100%;
    }
`;

const Form = styled.form`
    margin-top: 5rem;
    padding: 3rem;
    box-shadow: var(--bs);
    h2 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 2rem;
        color: var(--blue);
    }
    fieldset {
        &:before {
            height: 10px;
            content: '';
            display: block;
            margin-bottom: 3rem;
            background-image: linear-gradient(to right, #002f60 0%, #e2b04a 50%, #ff3019 100%);
        }
        &[aria-busy='true']::before {
            background-size: 50% auto;
            animation: ${loading} 0.5s linear infinite;
        }
    }
    button {
        margin-top: 2rem;
    }
    input, textarea {
        font-size: 1.3rem;
    }
    svg, .close {
        height: 2rem;
        font-size: 2rem;
        line-height: 3.6rem;
        margin-right: .8rem;
        color: var(--red);
        margin-top: 0;
        opacity: 1;
    }
    @media (max-width: 875px) {
        max-width: 90%;
    }
    @media (max-width: 600px) {
        max-width: 100%;
        h2, .close {
            font-size: 2.1rem;
        }
        .close {
            line-height: initial;
        }
    }
`;

export default Form;