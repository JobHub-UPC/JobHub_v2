import{b as r,n as a}from"./chunk-RGMM4CGJ.js";import{X as o,ba as s}from"./chunk-5MFQLEWO.js";var i=class t{baseURL=`${a.apiUrl}/jobphases`;http=s(r);constructor(){}createJobPhase(e){return this.http.post(this.baseURL,e)}getPhasesByJob(e){return this.http.get(`${this.baseURL}/job/${e}`)}static \u0275fac=function(p){return new(p||t)};static \u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"})};export{i as a};
