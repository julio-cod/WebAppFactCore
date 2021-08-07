import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultalistaproductosComponent } from './consultalistaproductos.component';

describe('ConsultalistaproductosComponent', () => {
  let component: ConsultalistaproductosComponent;
  let fixture: ComponentFixture<ConsultalistaproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultalistaproductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultalistaproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
