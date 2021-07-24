import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarproductoComponent } from './visualizarproducto.component';

describe('VisualizarproductoComponent', () => {
  let component: VisualizarproductoComponent;
  let fixture: ComponentFixture<VisualizarproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarproductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
