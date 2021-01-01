import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellStockPage } from './sell-stock.page';

describe('SellStockPage', () => {
  let component: SellStockPage;
  let fixture: ComponentFixture<SellStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellStockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
