import { Injectable } from '@angular/core';
import { AGENCIES } from './agency.data';

@Injectable()
export class AgencyService {
  agencies: Agency[] = AGENCIES;

  getAgencies(): Agency[] {
    return this.agencies;
  }

  getAgency(id): Agency {
    return this.agencies.filter(agency => agency.id === id)[0];
  }
}

export interface Agency {
  id: string;
  name: string;
}
