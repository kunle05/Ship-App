import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { defaultLimit } from '../../config';
import Pager from '../styles/Pager';

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY($sender: String!) {
        count(sender: $sender) 
    }
`;

const Pagination = ({ sender, page, limit }) => {
    const [showPage, setShowPage] = useState(page);
    const [pageLimit, setPageLimit] = useState(limit);
    const router = useRouter();

    const {loading, data} = useQuery(PAGINATION_QUERY, { variables: {sender} })
    if(loading) return <p>loading...</p>

    const pages = Math.ceil(data.count / limit);

    const handleChange = e => {
        const {name, value} = e.target;
        if(name === "page") {
            if(value > pages) {
                setShowPage(pages);
                return;
            }
            if(value < 0) {
                setShowPage(1);
                return;
            }  
            setShowPage(value);
        }
        if(name === "limit") {
            if(value >= pages) {
                setShowPage(1);
            }
            setPageLimit(value);
            router.push(`/admin/${sender}?page=${showPage}&limit=${value}`);
        }
    }

    const makeRequest = () => {
        router.push(`/admin/${sender}?page=${showPage}&limit=${pageLimit}`);
    }
    const handleKeyPress = e => {
        if(e.keyCode === 13) {
            makeRequest();
        }
    }
    
    return (
        <Table borderless striped>
            <tbody>
                <Pager>
                    <td>
                        Page
                        { page > 1 ?
                            <Link href={`/admin/${sender}?page=${page-1}&limit=${limit}`}>
                                <a>
                                    <FontAwesomeIcon icon="caret-square-left" />
                                </a>
                            </Link> :
                            <FontAwesomeIcon icon="caret-square-left" color="var(--lightGray)" />
                        }
                        <input 
                            type="number" 
                            name="page" 
                            value={showPage} 
                            onChange={handleChange} 
                            onBlur={makeRequest}
                            onKeyUp={handleKeyPress}
                        />
                        { page < pages ?
                            <Link href={`/admin/${sender}?page=${page+1}&limit=${limit}`}>
                                <a>
                                    <FontAwesomeIcon icon="caret-square-right" />
                                </a>
                            </Link> :
                            <FontAwesomeIcon icon="caret-square-right" color="var(--lightGray)" />
                        }
                        of {pages} pages 
                        <span className="separator">|</span>
                        View
                        <select name="limit" value={pageLimit} onChange={handleChange}>
                            <option value={defaultLimit}> {defaultLimit} </option>
                            <option value={defaultLimit * 2}> {defaultLimit * 2} </option>
                            <option value={defaultLimit * 3}> {defaultLimit * 3} </option>
                            <option value={defaultLimit * 5}> {defaultLimit * 5} </option>
                        </select>
                        per page 
                        <span className="separator">|</span>
                        Total {data.count} records found
                    </td>
                </Pager>
            </tbody>
        </Table>
    );
};

export default Pagination;