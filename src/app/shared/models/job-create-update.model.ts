export interface JobCreateUpdateModel {
  id?:number;
  salary:number;
  title:string;
  deadlineDate:Date;
  description:string;
  jobType:string;
  location:string;
}
