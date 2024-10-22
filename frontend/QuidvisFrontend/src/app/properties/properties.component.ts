import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties: any[] = [];
  clients: any[] = [];
  selectedClientId: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Load clients for the dropdown
    this.loadClients();

    // Check if clientId is provided in the route (for auto-filtering)
    this.selectedClientId = this.route.snapshot.paramMap.get('clientId');
    
    // Fetch properties, either all or filtered by clientId
    this.loadProperties(this.selectedClientId);
  }

  // Load properties (all or filtered by clientId)
  loadProperties(clientId: string | null): void {
    this.apiService.getProperties(clientId).subscribe((data: any[]) => {
      this.properties = data;
    });
  }

  // Load all clients for dropdown
  loadClients(): void {
    this.apiService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }

  onClientFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
  
    if (selectElement) {
      const clientId = selectElement.value;
  
      // If clientId is empty (meaning "All Clients" is selected), fetch all properties
      if (clientId === '') {
        this.selectedClientId = null; // Reset selectedClientId
        this.loadProperties(null); // Load all properties
      } else {
        this.selectedClientId = clientId; // Set the selected clientId
        this.loadProperties(clientId); // Load filtered properties
      }
    }
  }
  
  
}
