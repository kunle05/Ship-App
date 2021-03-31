import styled from 'styled-components';

const StyledModal = styled.div`
    .input-group:first-child {
        margin-bottom: 2rem;
    }
    .input-group-text {
        font-size: 2rem;
        padding: 1rem 1.5rem;
        font-weight: bold;
    }
    input, .modal-title {
        font-size: 2.2rem;
        height: auto;
        text-align: right;
        -webkit-appearance: none;
        -moz-appearance: textfield;
    }
    .modal-title {
        font-size: 2.8rem;
    }
    .modal-footer {
        border-top: 0;
    }
    button {
        margin-top: 1rem;
    }
`;

export default StyledModal;