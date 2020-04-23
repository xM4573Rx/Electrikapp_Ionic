import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupsTwoPage } from './groups-two.page';

describe('GroupsTwoPage', () => {
  let component: GroupsTwoPage;
  let fixture: ComponentFixture<GroupsTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
