import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserofroleComponent } from './userofrole.component';

describe('UserofroleComponent', () => {
  let component: UserofroleComponent;
  let fixture: ComponentFixture<UserofroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserofroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserofroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
