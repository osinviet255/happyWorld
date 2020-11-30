import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPhonePage } from './register-phone.page';

describe('RegisterPhonePage', () => {
  let component: RegisterPhonePage;
  let fixture: ComponentFixture<RegisterPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
