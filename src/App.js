import './App.css';
import React from 'react';
import JobPage from './components/jobPage';
import AllJobsPage from './components/allJobsPage';

function App() {
  const [jobs, setJobs] = React.useState([])
  const [copyJobs, setCopyJobs] = React.useState([])
  const [selectedJob, setSelectedJob] = React.useState(null)
  const [jobPage, setJobPage] = React.useState(false)
  const [currentJobs, setCurrentJobs] = React.useState([])
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (jobs.length === 0){
      fetch('https://www.arbeitnow.com/api/job-board-api', {mode: 'cors'})
      .then(response => response.json())
      .then(result=>{
        const endOffset = itemOffset + 5;
        setJobs(result.data)
        setCopyJobs(result.data)
        setCurrentJobs(result.data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(result.data.length / 5));
      })
    } else{
        const endOffset = itemOffset + 5;
        setCurrentJobs(jobs.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(jobs.length / 5));
    }
  }, [itemOffset, jobs]);

  React.useEffect(()=> {
    if (checked){
      const filteredArray = jobs.filter(job => job.job_types.includes("full time"))
      setJobs(filteredArray)
    }
    else{
      setJobs(copyJobs)
    }
  }, [checked])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % jobs.length;
    setItemOffset(newOffset);
  };
  const handleJobClick = (job) => {
    setJobPage(true)
    setSelectedJob(job)
  };
  const getTime = () => {
    const newTime = new Date().getTime() / 1000 //seconds
    const days = Math.floor(Math.floor(newTime-selectedJob.created_at)/86400)
    if (days===0) { return "Just Now" }
    else {
        return days + "days ago"
    }
  };
  const handleChange = () => {
    setChecked(!checked)
  };

  return (
    <div className="App">
      <header>
        <h1><strong>Github</strong> Jobs</h1>
      </header>
      {jobPage ? 
      <JobPage job={selectedJob} getTime={getTime} setJobPage={setJobPage}/>
      :
      <AllJobsPage currentJobs={currentJobs} pageCount={pageCount} checked={checked} handleJobClick={handleJobClick} handlePageClick={handlePageClick} handleChange={handleChange}/>
      }
    </div>
  );
}

export default App;
