'use client';
import {useState,useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import the Input component from Shadcn
import JobCard from '@/components/JobCard'; // Ensure this component exists and is correctly implemented
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const [jobs,setJobs] = useState(null)
  const [cvText,setcvText] = useState(null)
  const [loading,setLoading] = useState(false)

  const handleFileChange = async (event) => {
    const pdfFile = event.target.files[0];
    if (pdfFile && pdfFile.type === 'application/pdf') {
        const formData = new FormData();
        formData.append('pdfFile', pdfFile);
        try {
            const response = await fetch('/api/pdf-parser', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setcvText(data.text)
        } catch (error) {
            console.error('Error:', error);
        }
    }
  };

  const getJobs = async () => {
    setLoading(true)
      try {
        const response = await fetch('/api/job-recommendation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cv_text: cvText }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setJobs(data.jobs)
        } else {
          console.error('Failed to fetch jobs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      setLoading(false)
  };

  const handleCheckRecommendations = (event) => {
    event.preventDefault();
    if (cvText !== null) {
      getJobs()
    } else {
      alert('Please upload a resume first.');
    }
  };
  return (
    <div className="bg-white py-24 md:px-24 px-5 sm:py-32">
      <div className="flex flex-col gap-10">
        <Link href="/dashboard">
          <Button  variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upload Your Resume</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Upload your resume to get personalized job recommendations.
          </p>
        </div>

        <form onSubmit={handleCheckRecommendations} className="flex flex-col md:flex-row items-center gap-4">
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="md:w-[250px]"
              />
            {cvText && (<Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 hover:bg-primary hover:text-white"
            >
              {loading? "Generating Results...":"Check Job Recommendations"}
            </Button>)}
        </form>

        <br className="border-blue-100 border-x-2" />

        {jobs && <div className="max-w-2xl">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Recommended Jobs</h3>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Based on your resume, we recommend the following job positions.
          </p>
        </div>}

         <div className="w-full mt-8 flex flex-wrap gap-4">
          {jobs?.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              company={job.company}
              logo={job.logo}
              apply_link={job.apply_link}
              company_website={job.company_website}
              company_linkedin={job.company_linkedin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
