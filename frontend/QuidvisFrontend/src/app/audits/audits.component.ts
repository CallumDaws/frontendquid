import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-audits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.css'],
})
export class AuditsComponent implements OnInit {
  audits: any[] = [];
  properties: any[] = []; // For filtering by properties
  selectedPropertyId: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Load properties for the dropdown filter
    this.loadProperties();

    // Get propertyId from the route (if navigated from PropertiesComponent)
    this.selectedPropertyId = this.route.snapshot.paramMap.get('propertyId');

    // Load audits, either filtered by propertyId or all audits
    this.loadAudits(this.selectedPropertyId);
  }

  // Load audits (all or filtered by propertyId)
  loadAudits(propertyId: string | null): void {
    this.apiService.getAudits(propertyId).subscribe((data: any[]) => {
      this.audits = data;
    });
  }

  // Load all properties for the dropdown filter
  loadProperties(): void {
    this.apiService.getProperties().subscribe((data: any[]) => {
      this.properties = data;
    });
  }

  // When the dropdown selection changes, reload audits accordingly
  onPropertyFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement | null;
  
    // Check if the selected value is empty (i.e., "All Properties" selected)
    if (selectElement) {
      const propertyId = selectElement.value;
  
      // If empty (All Properties), reset filter and load all audits
      if (propertyId === '') {
        this.selectedPropertyId = null;  // Reset the selectedPropertyId
        this.loadAudits(null);           // Load all audits
      } else {
        // Load audits for the selected property
        this.selectedPropertyId = propertyId;
        this.loadAudits(propertyId);
      }
    }
  }
}
