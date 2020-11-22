import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NapTienPage } from './nap-tien.page';

describe('NapTienPage', () => {
  let component: NapTienPage;
  let fixture: ComponentFixture<NapTienPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NapTienPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NapTienPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
