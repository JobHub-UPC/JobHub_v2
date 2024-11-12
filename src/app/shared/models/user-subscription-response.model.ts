export interface UserSubscriptionResponse{
  id:number;
  user_id:number;
  role:string;
  subscriptionPlan_id:number;
  months:number;
  paymentStatus:string;
  lastUpdated:Date;
  amount:number;
}
