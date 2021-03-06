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
        margin-bottom: 2rem;
    }
    .card {
        min-height: 52rem;
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
    .card-text {
        min-height: 21rem;
        a {
            color: var(--blue);
        }
        span {
            font-weight: 600;
        }
    }
    p:first-child {
        margin-top: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        bottom: 10rem;
    }
    p:nth-child(2) {
        position: absolute;
        bottom: 4rem;
    }
    button {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-radius: 0;
        :hover {
            transform: none
        }
    }
`;

export default StyledLocation;