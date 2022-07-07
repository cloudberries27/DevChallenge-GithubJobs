import React from 'react';

export default function JobPage({job, getTime, setJobPage}){

    React.useEffect(()=>{
        document.getElementById('description').innerHTML = job.description
    },[job])
    
    return (
        <section className='body-component'>
            <div className='apply'>
                <p onClick={() => setJobPage(false)}><span className="material-icons">west</span>Back to search</p>
                <p>How to Apply</p>
                <p>Follow the link to the company website and their job posting</p>
                <a href={job.url}>JOB POSTING</a>
            </div>
            <div className='job-page'>
                <div style={{display:'flex'}}>
                    <p className='job-title'>{job.title}</p>
                    {job.job_types.includes("full time") ? <p className='job-time'>Full Time</p> : <p className='job-time'>Part Time</p>}
                </div>
                <p><span className="material-icons">schedule</span>{getTime()}</p>
                <div id="description"></div>
            </div>
        </section>
    )
}