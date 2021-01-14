import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListNewsPage } from './list-news.page';

describe('ListNewsPage', () => {
  let component: ListNewsPage;
  let fixture: ComponentFixture<ListNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
