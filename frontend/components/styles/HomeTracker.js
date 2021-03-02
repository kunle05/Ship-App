import styled from "styled-components";

const HomeTrackerForm = styled.form`
    input {
        text-transform: uppercase;
        height: 6rem;
        font-size: 2rem;
    }
    .col-md-9 {
        padding-right: 0;
        input {
            padding-left: 3rem;
            border-radius: .5rem 0 0 .5rem;
        }
    }
    .col-md-3 {
        padding-left: 0px;
        margin-left: -10px;
        input {
            font-weight: bold;
            background: var(--blue);
            color: var(--white);
            border-radius: 0 .5rem .5rem 0;
            transition: all 0.5s;
            :hover {
                transform: scale(1.1);
            }
        }
    }
    h6 {
        text-transform: uppercase;
        font-size: 1.3rem;
        padding-left: 1rem;
    }
    @media (max-width: 875px) {
        input {
            height: initial;
        }
    }
    @media (max-width: 765px) {
        .col-md-9 {
            padding-right: 1.5rem;
            input {
                border-radius: 0;
            }
        }
        .col-md-3 {
            margin-left: initial;
            margin-top: 1rem;
            padding-left: 1.5rem;
            input {
                border-radius: .5rem;
            }
        }
    }
`;

export default HomeTrackerForm;