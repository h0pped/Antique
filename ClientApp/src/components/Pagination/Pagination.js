import React from 'react';
import './Pagination.css'

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length !== 1) {
        return (

            <div>
                <nav className="pagination is-centered is-medium" role="navigation" aria-label="pagination">
                    <a className="pagination-previous" onClick={() => paginate(currentPage - 1)}>Предыдущая</a>
                    <a className="pagination-next" onClick={() => paginate(currentPage + 1)}>Следующая</a>
                    <ul className="pagination-list">
                        {pageNumbers.map(number => (

                            <li key={number}><a className={"pagination-link " + (currentPage == number ? "active" : ' ')} aria-label={'Goto page ' + number} onClick={() => paginate(number)}>{number}</a></li>
                        ))}
                    </ul>
                </nav>
            </div>
        )
    }
    else{
        return(<div></div>)
    }
}
export default Pagination;