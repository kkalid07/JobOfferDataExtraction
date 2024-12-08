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
  date_of_expiration: string | null; // Added for expiration date
  phone_number:string | null;
  email:string | null;
};
