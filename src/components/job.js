import React from 'react';

export default function Job({job, onClick, getTime}){

    return (
        <div className='flex-box' onClick={onClick}>
            <img src={job.company_logo} alt=''/>
            <div className='job'>
                <p className='job-company'>{job.company_name}</p>
                <p className='job-title'>{job.title}</p>
                <div className='job-bottom'>
                {job.job_type === "full_time" ? <p className='job-time'>Full Time</p> : <p className='job-time'>Part Time</p>}
                    <div className='job-details'>
                        <p><span className="material-icons">public</span>{job.candidate_required_location ? job.candidate_required_location : "Unknown"}</p>
                        <p><span className="material-icons">schedule</span>{getTime(job.publication_date)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}