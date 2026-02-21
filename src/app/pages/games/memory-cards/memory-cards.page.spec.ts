import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemoryCardsPage } from './memory-cards.page';

describe('MemoryCardsPage', () => {
  let component: MemoryCardsPage;
  let fixture: ComponentFixture<MemoryCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryCardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
