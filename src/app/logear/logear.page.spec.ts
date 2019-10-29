import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogearPage } from './logear.page';

describe('LogearPage', () => {
  let component: LogearPage;
  let fixture: ComponentFixture<LogearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
