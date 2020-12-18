import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserStockPage } from './user-stock.page';

describe('UserStockPage', () => {
  let component: UserStockPage;
  let fixture: ComponentFixture<UserStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
