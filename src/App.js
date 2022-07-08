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
  const [country, setCountry] = React.useState("");

  React.useEffect(() => {
    if (jobs.length === 0){
      fetch('https://remotive.com/api/remote-jobs', {mode: 'cors'})
      .then(response => response.json())
      .then(result=>{
        const endOffset = itemOffset + 5;
        setJobs(result.jobs)
        setCopyJobs(result.jobs)
        setCurrentJobs(result.jobs.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(result.jobs.length / 5));
      })
    } else{
        const endOffset = itemOffset + 5;
        setCurrentJobs(jobs.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(jobs.length / 5));
    }
  }, [itemOffset, jobs]);

  React.useEffect(()=> {
    if (checked){
      const filteredArray = jobs.filter(job => job.job_type==="full_time")
      setJobs(filteredArray)
    }
    //this is really in place so I don't need to call the API again
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
  const getTime = (time) => {
    const created = Math.floor(new Date(time).getTime()/1000) //seconds
    const now = Math.floor(new Date().getTime()/1000)
    const days = Math.floor((now-created)/86400)
    if (days===0) { return "Just Now" }
    else if (days===1){
        return days + " day ago"
    }
    else{
      return days + " days ago"
    }
  };
  const handleChange = () => {
    setChecked(!checked)
  };
  const onValueChange = (e) => {
    setCountry(e.target.value)
    filterCountry(e.target.value)
  }
  const onCountrySubmit = (e) => {
    e.preventDefault();
    setCountry("")
    filterCountry(e.target.country.value)
  }
  const filterCountry = (country) => {
    setJobs(copyJobs.filter(job => job.candidate_required_location.includes(country)))
  }
  const onSearchSubmit = (e) => {
    e.preventDefault()
    setJobs(copyJobs.filter(job => job.title.includes(e.target.search.value)))
  }
  return (
    <div className="App">
      <header>
        <h1><strong>Github</strong> Jobs</h1>
      </header>
      {jobPage ? 
      <JobPage job={selectedJob} getTime={getTime} setJobPage={setJobPage}/>
      :
      <AllJobsPage 
      currentJobs={currentJobs} 
      pageCount={pageCount} 
      checked={checked} 
      country={country} 
      handleJobClick={handleJobClick} 
      handlePageClick={handlePageClick} 
      handleChange={handleChange} 
      getTime={getTime} 
      onValueChange={onValueChange}
      onCountrySubmit={onCountrySubmit}
      onSearchSubmit={onSearchSubmit}
      />
      }
      <footer>
        <p>created by <a href="https://devchallenges.io/portfolio/cloudberries27" target="_blank" rel="noreferrer">@cloudberries27</a> - devchallenges.io </p>
      </footer>
    </div>
  );
}

export default App;
