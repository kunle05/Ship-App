import styled from "styled-components";

const StyledFooter = styled.footer`
    padding: 0 1.5rem;
    .container {
        padding-top: 6rem;
        border-top: 2px solid var(--lightGray);
    }
    .row {
        justify-content: space-between;
    }
    h6 {
        font-size: 1.8rem;
        margin-bottom: 2rem;
    }
    p {
        margin-bottom: 0;
        font-size: 1.6rem;
    }
    a:hover {
        color: var(--blue);
    }
    svg {
        height: 3rem;
        margin-right: 2.5rem;
        color: var(--blue);
    }
    .list-group-item {
        padding: 0;
        font-size: 1.7rem;
        border-bottom: 0;
        font-weight: 300;
        line-height: 2.7rem;
        svg {
            height: 2rem;
            margin-right: .5rem;
        }
        :hover {
            svg {
                transform: rotate(360deg);
                transition: all 0.5s;
            }
        }
    }
    .row div {
        margin-right: 6rem;
    }
    .row div:last-child {
        margin-right: 0;
    }
    div.row {
        margin-right: initial;
    }
    .col-sm-12 {
        padding: 5rem 0;
        a:hover {
            text-decoration: none;
        }
        .row {
            align-items: center;
            justify-content: flex-end;
        }
        .row div {
            margin-right: 0;
        }
    }

    @media (max-width: 765px) {
        .container {
            padding-top: 3rem;
        }
        h2 {
            margin-bottom: 3rem;
        }
        .row .row {
            padding-left: 1.5rem;
        }
        .row div {
            margin-bottom: 1rem;
        }
        .col-sm-12 {
            padding: 1.5rem 0 2rem 0;
            .row {
                justify-content: space-between;
            }
        }
        svg {
            margin-right: 1rem;
        }
        .list-group-item {
            line-height: 2.4rem;
        }
        p {
            font-size: 1.4rem;
        }
    }
`;

export default StyledFooter;