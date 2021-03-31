import styled from 'styled-components';

const ShipDiv = styled.div`
    padding: .5rem;
    max-width: 60%;
    margin: 1.5rem auto;
    font-size: 1.8rem;
    .title_header {
        padding: 0 3rem;
        h2 {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 0;
            a {
                color: var(--blue);
            }
            svg {
                height: 2rem;
                margin: auto 1.5rem;
            }
        }
        p {
            font-size: 1.8rem;
            font-weight: 300;
            margin-bottom: 1rem;
        }
    }
    form {
        margin-top: 0;
        fieldset:before {
            margin-bottom: 1rem;
        }
    }
    .row, label {
        margin: auto 0;
    }
    h2 {
        font-size: 3.5rem;
    }
    .section-1 {
        border-left: .3rem solid var(--lightGray);
    }
    .section {
        border-right: .3rem solid var(--lightGray);
        border-top: .3rem solid var(--lightGray);
        padding: 2rem;
    }
    input, select {
        font-size: 1.3rem;
    }
    .pkgCount, svg {
        display: inline-block;
        margin: 0 .8rem;
        height: 2rem;
        padding: 0;
        vertical-align: text-bottom;
    }
    .pkgCount {
        margin: 0;
    }
    .bottom {
        padding: 1rem;
        border-bottom: 0;
        .form-row {
            align-items: flex-end;
        }
    }
    .sides {
        border-bottom: .3rem solid var(--lightGray);
    }
    button {
        margin: 0;
    }
    label span {
        color: var(--blue);
    }
    .cta {
        justify-content: space-between;
    }
    .safelink {
        margin-top: 1.5rem;
    }
`;

export default ShipDiv;