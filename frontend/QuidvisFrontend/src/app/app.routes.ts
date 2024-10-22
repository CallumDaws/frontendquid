import { Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { PropertiesComponent } from './properties/properties.component';
import { AuditsComponent } from './audits/audits.component';

export const routes: Routes = [
    { path: '', redirectTo: '/clients', pathMatch: 'full' }, // Default route
    { path: 'clients', component: ClientsComponent },
    { path: 'properties', component: PropertiesComponent },
    { path: 'properties/:clientId', component: PropertiesComponent }, // For filtering by clientId
    { path: 'audits', component: AuditsComponent }, // Show all audits
    { path: 'audits/:propertyId', component: AuditsComponent }, // Filter by propertyId
  ];
  
