import React from 'react'
import ReactPaginate from "react-paginate";
import Job from './job'

export default function AllJobsPage({currentJobs, pageCount, checked, country, handleJobClick, handlePageClick, handleChange, getTime, onValueChange, onCountrySubmit, onSearchSubmit}){

    return (
        <div>
            <section className='search-component'>
            <form onSubmit={(e) => onSearchSubmit(e)}>
                <span className="material-icons">work_outline</span>
                <input type="text" placeholder='Title or keywords' name="search"></input>
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
                    <form className='location-search' onSubmit={(e)=>onCountrySubmit(e)}>
                        <span className="material-icons">public</span>
                        <input type="text" name="country" placeholder='Country'/>
                    </form>
                    <div className='radio-button'>
                        <input type="radio" id="USA" value="USA" checked={country === "USA"} onChange={(e) => onValueChange(e)}/>USA<br/>
                        <input type="radio" id="Canada" value="Canada" checked={country === "Canada"} onChange={(e) => onValueChange(e)}/>Canada<br/>
                        <input type="radio" id="Australia" value="Australia" checked={country === "Australia"} onChange={(e) => onValueChange(e)}/>Australia<br/>
                        <input type="radio" id="Worldwide" value="Worldwide" checked={country === "Worldwide"} onChange={(e) => onValueChange(e)}/>Worldwide
                    </div>
                </div>
                <div className='jobs'>
                    {currentJobs.map((job, key)=>{
                    return <Job job={job} key={key} onClick={() => handleJobClick(job)} getTime={getTime}/>
                    })}
                    <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<"
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