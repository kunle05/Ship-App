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
    /* margin-top: 3rem; */
    padding: 3rem;
    .text-muted {
        font-size: 1.2rem;
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
    button.cancel {
        margin-right: 3rem;
        background: var(--white);
        color: var(--blue);
        border: 1px solid var(--blue);
    }
    input, textarea {
        font-size: 1.3rem;
    }
    .form-check {
        margin-bottom: .5rem;
        label {
            margin-left: 2rem;
        }
        input {
            height: 2rem;
            width: 2rem;
        }
    }
    .notify {
        background: var(--bgBlue);
        margin: 0;
        padding: 1.5rem;
        border-radius: .5rem;
        margin-bottom: 2rem;
        align-items: center;
        svg {
            height: 5rem;
            color: var(--blue);
            margin-right: 2rem;
        }
        p {
            margin-bottom: .5rem;
            line-height: 2.2rem;
            color: var(--blue);
        }
    }
    .justify-content-between {
        align-items: baseline;
        p {
            margin-bottom: 0;
            font-size: 1.6rem;
        }
    }
    .safelink {
        color: var(--blue);
        font-size: 1.6rem;
        svg {
            height: 1.7rem;
            vertical-align: text-bottom;
            margin-right: .5rem;
        }
    }
    @media (max-width: 875px) {
        max-width: 90%;
    }
    @media (max-width: 600px) {
        max-width: 100%;
    }
    @media (max-width: 380px) {
        padding: 1rem;
        .notify {
            padding: .5rem;
            svg {
                height: 3rem;
            }
            p {
                font-size: 1.6rem;
                margin-bottom: 0
            }
        }
    }
`;

export default Form;