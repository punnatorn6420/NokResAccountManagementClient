import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsManagementComponent } from './agents-management.component';

describe('AgentsManagementComponent', () => {
  let component: AgentsManagementComponent;
  let fixture: ComponentFixture<AgentsManagementComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentsManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgentsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
