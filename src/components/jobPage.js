import React from 'react';

export default function JobPage({job, getTime, setJobPage}){

    React.useEffect(()=>{
        document.getElementById('description').innerHTML = job.description
    },[job])
    
    return (
        <section className='body-component'>
            <div className='apply'>
                <p className="back-arrow" onClick={() => setJobPage(false)}><span className="material-icons">west</span>Back to Search</p>
                <p className='subtitle'>How to Apply</p>
                <p>Follow the link to the company website and their job posting:</p>
                <a className="job-link" href={job.url} target="_blank">JOB POSTING</a>
            </div>
            <div className='job-page'>
                <div className='job-page-top'>
                    <p className='job-page-title'>{job.title}</p>
                    {job.job_type === "full_time" ? <p className='job-time'>Full Time</p> : <p className='job-time'>Part Time</p>}
                </div>
                <p><span className="material-icons">schedule</span>{getTime(job.publication_date)}</p>
                <div className='more-info'>
                    <img src={job.company_logo} alt=""/>
                    <div>
                        <p><strong>{job.company_name}</strong></p>
                        <p className='job-location'><span className="material-icons">public</span>{job.candidate_required_location ? job.candidate_required_location : "Unknown"}</p>
                    </div>
                </div>

                <div id="description"></div>
            </div>
        </section>
    )
}