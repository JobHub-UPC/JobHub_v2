import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
@Injectable({providedIn:'root'})
export class SharedDataService{
  private planIdSource=new BehaviorSubject<number|null>(null);
  currentPlanId=this.planIdSource.asObservable();
  constructor() {}
  changePlanId(planId:number){
    this.planIdSource.next(planId);
  }
}
