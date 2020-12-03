import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterStep2Page } from './register-step2.page';

describe('RegisterStep2Page', () => {
  let component: RegisterStep2Page;
  let fixture: ComponentFixture<RegisterStep2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterStep2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterStep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
