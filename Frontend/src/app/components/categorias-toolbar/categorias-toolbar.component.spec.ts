import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasToolbarComponent } from './categorias-toolbar.component';

describe('CategoriasToolbarComponent', () => {
  let component: CategoriasToolbarComponent;
  let fixture: ComponentFixture<CategoriasToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
