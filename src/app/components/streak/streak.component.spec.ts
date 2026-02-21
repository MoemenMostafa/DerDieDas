import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreakComponent } from './streak.component';

describe('StreakComponent', () => {
  let component: StreakComponent;
  let fixture: ComponentFixture<StreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreakComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
