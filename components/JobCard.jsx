import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { buttonVariants } from "@/components/ui/button"
import Image from 'next/image';
import Link from 'next/link';

const JobCard = ({ title, company, logo, apply_link, company_website, company_linkedin }) => {
  return (
    <Card className="w-full max-w-sm shadow-lg flex flex-col h-full">
      <CardHeader>
        <div className="flex flex-col items-center space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <img src={logo} alt={`${company} logo`} width={50} height={50} className="rounded-full h-12 w-12" />
          <CardTitle className="text-center md:text-left">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 font-medium text-center md:text-left">{company}</p>
        <div className="mt-2 flex flex-col items-center md:flex-row md:justify-start md:space-x-2">
          {company_website && (
            <Link href={company_website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Website
            </Link>
          )}
          {company_linkedin && (
            <Link href={company_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              LinkedIn
            </Link>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
         <Link href={apply_link} target="_blank" rel="noopener noreferrer" className={`w-full ${buttonVariants({ variant: 'secondary' })}`}>
          Apply Now
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
