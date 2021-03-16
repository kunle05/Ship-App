import styled from 'styled-components';

const Pager = styled.tr`
    :hover {
        background: #f2f2f2 !important;
    }
    svg {
        margin: 0 1.2rem;
        height: 2rem !important;
        vertical-align: text-top;
    }
    input, select {
        height: 2rem;
        width: 5rem;
        vertical-align: text-top;
    }
    select {
        width: 6.5rem;
        margin: 0 1rem;
    }
    .separator {
        margin: 0 1.8rem;
        font-weight: lighter;
    }
`;

export default Pager;