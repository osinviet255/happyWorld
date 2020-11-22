import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersionalPage } from './persional.page';

describe('PersionalPage', () => {
  let component: PersionalPage;
  let fixture: ComponentFixture<PersionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
