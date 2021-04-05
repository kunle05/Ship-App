import styled from 'styled-components';

const StyledSideNav = styled.div`
    background: var(--blue);
    min-height: 100vh;
    max-width: 29rem;
    padding-top: 2rem;
    padding-right: 0;
    color: var(--white);
    p {
        color: #6f7782;
        padding-left: 2rem;
    }
    .bar-item {
        margin: 2rem 0 4rem;
        font-size: 2.5rem;
        :hover {
            text-decoration: none;
            background: #2a4773;
        }
    }
    svg {
        height: 2.2rem;
        width: 2.2rem !important;
        margin: 0 1rem 0.2rem 1.5rem;
        color: var(--lightGray);
        vertical-align: text-bottom;
    }
    .collapse {
        padding-left: 2rem;
        border-top: 1px solid #2a4773;
        border-bottom: 1px solid #2a4773;
        margin-top: -3rem;
        height: auto !important;
    }
    .collapsing {
        display: none;
    }
`;

export default StyledSideNav;