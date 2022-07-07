import React from 'react';

export default function Job({job, onClick}){
    const randomColor = () => {
        return Math.floor(Math.random()*16777215).toString(16)
    }
    const getTime = () => {
        const newTime = new Date().getTime() / 1000 //seconds
        const days = Math.floor(Math.floor(newTime-job.created_at)/86400)
        if (days===0) { return "Just Now" }
        else {
            return days + "days ago"
        }
    }
    return (
        <div className='flex-box' onClick={onClick}>
            <img src={`https://via.placeholder.com/120.png/${randomColor()}/FFFFFF?Text=${job.company}`} alt=''/>
            <div className='job'>
                <p className='job-company'>{job.company_name}</p>
                <p className='job-title'>{job.title}</p>
                <div className='job-bottom'>
                    {job.job_types.includes("full time") ? <p className='job-time'>Full Time</p> : <p className='job-time'>Part Time</p>}
                    <div className='job-details'>
                        <p><span className="material-icons">public</span>{job.location}</p>
                        <p><span className="material-icons">schedule</span>{getTime()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}