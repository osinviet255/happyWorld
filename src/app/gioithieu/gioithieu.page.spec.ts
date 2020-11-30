import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GioithieuPage } from './gioithieu.page';

describe('GioithieuPage', () => {
  let component: GioithieuPage;
  let fixture: ComponentFixture<GioithieuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GioithieuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GioithieuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
