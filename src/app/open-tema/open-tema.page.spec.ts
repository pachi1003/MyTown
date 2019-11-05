import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTemaPage } from './open-tema.page';

describe('OpenTemaPage', () => {
  let component: OpenTemaPage;
  let fixture: ComponentFixture<OpenTemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTemaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
