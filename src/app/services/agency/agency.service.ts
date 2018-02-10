import { Injectable } from '@angular/core';
import { AGENCIES } from './agency.data';

@Injectable()

export class AgencyService {

  agencies: Agency[] = AGENCIES;

  getAgencies(): Agency[] {
    return this.agencies;
  }

  getAgency(id): Agency {
    return this.agencies.find(agency => agency.id === id);
  }

  getByName(name: string): Agency {
    return this.agencies.find(agency => agency.name.toLowerCase() === name.toLowerCase());
  }

  getIcon(agency) {
    return `assets/img/logos/agencies/${agency.id}-50x50.png`;
  }

}

export interface Agency {
  id: string;
  name: string;
}
