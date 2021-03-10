import styled from "styled-components";

const StyledLocation = styled.div`
    margin: 8rem auto;
    h4 {
        font-size: 2rem;
        color: var(--blue);
    }
    h6 {
        font-size: 1.5rem;
    }
    p {
        font-size: 1.8rem;
        margin: 2rem auto;
    }
    .col-md-6 {
        margin-bottom: 5rem;
    }
    .card {
        min-height: 45rem;
    }
    .card-text {
        /* min-height: 10rem; */
        a {
            color: var(--blue);
        }
        span {
            font-weight: 600;
        }
    }
    p:nth-child(2) {
        position: absolute;
        bottom: 0rem;
    }
    @media (min-width: 1026px) {
        .card {
            :hover {
                p:first-child {
                    display: block;
                }
                .cardImage {
                    height: 10rem;
                }
                .card-body {
                    background: var(--white);
                    transition: all 0.6s;
                }
            }
        }
        p:first-child {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            /* bottom: 5rem; */
        }
    }
    @media (max-width: 820px) {
        margin: 5rem auto;
    }
`;

export default StyledLocation;