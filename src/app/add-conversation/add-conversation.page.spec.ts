import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddConversationPage } from './add-conversation.page';

describe('AddConversationPage', () => {
  let component: AddConversationPage;
  let fixture: ComponentFixture<AddConversationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConversationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddConversationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
