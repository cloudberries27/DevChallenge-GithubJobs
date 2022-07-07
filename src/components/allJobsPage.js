import React from 'react'
import ReactPaginate from "react-paginate";
import Job from './job'

export default function AllJobsPage({currentJobs, pageCount, checked, handleJobClick, handlePageClick, handleChange}){

    return (
        <div>
            <section className='search-component'>
            <form>
                <span className="material-icons">work_outline</span>
                <input type="text" placeholder='Title or keywords'></input>
                <button type="submit">Search</button>
            </form>
            </section>
            <section className='body-component'>
                <div className='filters'>
                    <div className='time-checkbox'>
                        <input type="checkbox" id="full-time" name="full-time" checked={checked} onChange={() => handleChange()}/>
                        <label className="time-label" htmlFor="full-time">Full Time</label>
                    </div>
                    <p className='location-title'>Location</p>
                    <div className='location-search'>
                        <span className="material-icons">public</span>
                        <input type="text" placeholder='City'/>
                    </div>
                    <div className='radio-button'>
                        <input type="radio" id="Berlin" name="Berlin"/>
                        <label htmlFor="Berlin">Berlin</label>
                    </div>
                    <div className='radio-button'>
                        <input type="radio" id="Hamburg" name="Hamburg"/>
                        <label htmlFor="Hamburg">Hamburg</label>
                    </div>
                    <div className='radio-button'>
                        <input type="radio" id="Cologne" name="Cologne"/>
                        <label htmlFor="Cologne">Cologne</label>
                    </div>
                    <div className='radio-button'>
                        <input type="radio" id="Mannheim" name="Mannheim"/>
                        <label htmlFor="Mannheim">Mannheim</label>
                    </div>
                </div>
                <div className='jobs'>
                    {currentJobs.map((job, key)=>{
                    return <Job job={job} key={key} onClick={() => handleJobClick(job)}/>
                    })}
                    <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    />
                </div>
            </section>
        </div>
    )
}