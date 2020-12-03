import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterStep3Page } from './register-step3.page';

describe('RegisterStep3Page', () => {
  let component: RegisterStep3Page;
  let fixture: ComponentFixture<RegisterStep3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStep3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterStep3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
