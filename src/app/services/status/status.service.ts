import {
  Http,
  Headers,
  RequestOptions,
  RequestOptionsArgs,
  Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

class CodeJsonEnhancementParams {
  format: String;
}

class CodeJsonEnhancement {
  keyword: String;
  dataPath: String;
  schemaPath: String;
  params: CodeJsonEnhancementParams;
  message: String;
}

class CodeJsonWarning {

}

class CodeJsonError {

}

class CodeJsonIssueInformation {
  enhancements: Array<CodeJsonEnhancement>;
  warnings: Array<CodeJsonWarning>;
  errors: Array<CodeJsonError>;
}

class CodeJsonIssue {
  repoID: String;
  agency: String;
  organization: String;
  // tslint:disable-next-line:variable-name
  project_name: String;
  issues: CodeJsonIssueInformation;
}

class AgencyRequirements {
  agencyWidePolicy: Number;
  schemaFormat: Number;
  codeInventoried: Number;
  metOpenSourceRequirement: Number;
  overallCompliance: Number;
}

class AgencyInfo {
  name: String;
  acronym: String;
  website: String;
  codeUrl: String;
  requirements: AgencyRequirements;
}

class AgencyMetadata {
  agency: AgencyInfo;
}

class AgencyStatus {
  status: String;
  issues: Array<CodeJsonIssue>;
  version: String;
  metadata: AgencyMetadata;
  requirements: AgencyRequirements;
}

class AgencyStatuses {
  AID: AgencyStatus;
  CFPB: AgencyStatus;
  DHS: AgencyStatus;
  DOC: AgencyStatus;
  DOD: AgencyStatus;
  DOE: AgencyStatus;
  DOI: AgencyStatus;
  DOJ: AgencyStatus;
  DOL: AgencyStatus;
  DOS: AgencyStatus;
  DOT: AgencyStatus;
  ED: AgencyStatus;
  EPA: AgencyStatus;
  FEMA: AgencyStatus;
  GSA: AgencyStatus;
  HHS: AgencyStatus;
  HUD: AgencyStatus;
  NARA: AgencyStatus;
  NASA: AgencyStatus;
  NRC: AgencyStatus;
  NSF: AgencyStatus;
  OPM: AgencyStatus;
  SBA: AgencyStatus;
  SSA: AgencyStatus;
  TRE: AgencyStatus;
  USDA: AgencyStatus;
  VA: AgencyStatus;
}

class ComplianceStatusResponse {
  timestamp: String;
  statuses: AgencyStatuses;
}

@Injectable()
export class StatusService {
  constructor(private http: Http) {}

  getJsonFile(): Observable<ComplianceStatusResponse> {
    return this.http.get(
      'assets/report.json'
    )
    .map(response => response.json());
  }
}
