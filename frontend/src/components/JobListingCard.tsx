import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  GraduationCapIcon,
  PhoneIcon,
  MailIcon
} from "lucide-react";

export type JobListing = {
  job_title: string | null;
  company_name: string | null;
  location: string | null;
  salary: string | null;
  benefits: string | null;
  duration: string | null;
  skills_qualifications: string[];
  opportunities: string | null;
  contract_type: string | null;
  language: string[];
  genre: string | null;
  experience: string | null;
  date_of_beginning: string | null;
  date_of_expiration: string | null;
  phone_number:string | null;
  email:string | null;
};

interface JobListingCardProps {
  job: JobListing;
}

const JobListingCard: FC<JobListingCardProps> = ({ job }) => {
  const isExpired =
    job.date_of_expiration && new Date(job.date_of_expiration) < new Date();

  return (
    <Card className="max-w-md mx-auto w-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-primary">
              {job.job_title || "Untitled Position"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {job.company_name || "Unknown Company"}
            </p>
          </div>
          {job.contract_type && (
            <Badge variant="secondary" className="text-xs">
              {job.contract_type}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-2">
        {job.location && (
          <div className="flex items-center text-sm">
            <MapPinIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
        )}
        {job.salary && (
          <div className="flex items-center text-sm">
            <BriefcaseIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{job.salary}</span>
          </div>
        )}
        {job.experience && (
          <div className="flex items-center text-sm">
            <GraduationCapIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{job.experience}</span>
          </div>
        )}
        {job.genre && (
          <div className="flex items-center text-sm">
            <GraduationCapIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{job.genre}</span>
          </div>
        )}
        {job.date_of_beginning && (
          <div className="flex items-center text-sm">
            <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>Start: {job.date_of_beginning}</span>
          </div>
        )}
        {job.phone_number && (
          <div className="flex items-center text-sm">
            <PhoneIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>+{job.phone_number}</span>
          </div>
        )}
        {job.email && (
          <div className="flex items-center text-sm">
            <MailIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>{job.email}</span>
          </div>
        )}
        {job.skills_qualifications && job.skills_qualifications.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-1">
              Skills & Qualifications
            </h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {job.skills_qualifications.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {job.benefits && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-1">Benefits</h4>
            <p className="text-sm text-muted-foreground">{job.benefits}</p>
          </div>
        )}
        
      </CardContent>
      <CardFooter className="bg-secondary/10 flex justify-between items-center">
        <div className="flex space-x-2">
          {job.language.map((lang, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>
        {job.date_of_expiration && (
          <div
            className={`flex items-center text-xs ${
              isExpired ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            <ClockIcon className="w-3 h-3 mr-1" />
            <span>
              {isExpired ? "Expired" : `Expires: ${job.date_of_expiration}`}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;
