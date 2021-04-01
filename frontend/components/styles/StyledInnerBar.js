import styled from 'styled-components';

const StyledInnerBar = styled.div`
    margin: 1.2rem 0;
    .inner-bar-item {
        font-size: 1.6rem;
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
        border-top: 0;
        margin-top: .5rem;
        padding-top: 0;
        padding-bottom: 0;
    }
    ul {
        padding-left: 3rem;
        margin: 0;
        li {
            font-size: 1.4rem;
            padding: .6rem 0;
            :last-child {
                margin-bottom: 1rem;
            }
        }
    }
    p {
        padding-left: 1.4rem;
        margin: 0;
        font-size: 1.4rem;
    }
`;

export default StyledInnerBar;