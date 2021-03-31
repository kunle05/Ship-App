import styled from 'styled-components';

const StyledInnerBar = styled.div`
    .inner-bar-item {
        font-size: 1.8rem;
        :hover {
            text-decoration: none;
            background: #2a4773;
        }
        svg {
            margin-left: .5rem;
            margin-bottom: 0;
        }
    }
    .collapse, .collapsing {
        border-bottom: 0;
        margin-top: 1rem;
        padding-top: 0;
        padding-bottom: 0;
    }
    ul {
        padding-left: 2.3rem;
        margin: 0;
        li {
            font-size: 1.5rem;
            padding: .6rem 0;
        }
    }
`;

export default StyledInnerBar;