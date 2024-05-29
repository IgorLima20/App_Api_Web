import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieCadComponent } from './categorie-cad.component';

describe('CategorieCadComponent', () => {
  let component: CategorieCadComponent;
  let fixture: ComponentFixture<CategorieCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieCadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
