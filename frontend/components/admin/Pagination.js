import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Table } from 'reactstrap';
import { limit } from '../../config';
import { offset } from '../../config';
import useForm from '../../lib/useForm';
import Pager from '../styles/Pager';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY($sender: String!) {
        count(sender: $sender) 
    }
`;

const Pagination = ({ sender }) => {
    const {formData, handleChange} = useForm({
        page: 1,
        limit
    })
    const {loading, data} = useQuery(PAGINATION_QUERY, { variables: {sender} })
    if(loading) return <p>loading...</p>

    const pages = Math.ceil(data.count / limit);
    
    return (
        <Table borderless striped>
            <tbody>
                <Pager>
                    <td>
                        Page
                        { formData.page > 1 ?
                            <a href="#">
                                <FontAwesomeIcon icon="caret-square-left" />
                            </a> :
                            <FontAwesomeIcon icon="caret-square-left" color="var(--lightGray)" />
                        }
                        <input type="text" name="page" value={formData.page} onChange={handleChange} />
                        { formData.page < pages ?
                            <a href="#">
                                <FontAwesomeIcon icon="caret-square-right" />
                            </a> :
                            <FontAwesomeIcon icon="caret-square-right" color="var(--lightGray)" />
                        }
                        of {pages} pages 
                        <span className="separator">|</span>
                        View
                        <select name="limit" value={formData.limit} onChange={handleChange}>
                                <option value={formData.limit}> {limit} </option>
                                <option value={limit + offset}> {limit + offset} </option>
                                <option value={limit + (2 * offset)}> {limit + (2 * offset)} </option>
                                <option value={limit + (4 * offset)}> {limit + (4 * offset)} </option>
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