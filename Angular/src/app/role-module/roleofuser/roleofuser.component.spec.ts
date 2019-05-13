import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleofuserComponent } from './roleofuser.component';

describe('RoleofuserComponent', () => {
  let component: RoleofuserComponent;
  let fixture: ComponentFixture<RoleofuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleofuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleofuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
