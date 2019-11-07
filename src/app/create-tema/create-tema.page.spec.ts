import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemaPage } from './create-tema.page';

describe('CreateTemaPage', () => {
  let component: CreateTemaPage;
  let fixture: ComponentFixture<CreateTemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTemaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
