import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CostPage } from './cost.page';

describe('CostPage', () => {
  let component: CostPage;
  let fixture: ComponentFixture<CostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
