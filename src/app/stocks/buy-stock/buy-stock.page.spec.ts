import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyStockPage } from './buy-stock.page';

describe('BuyStockPage', () => {
  let component: BuyStockPage;
  let fixture: ComponentFixture<BuyStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
