import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {

  constructor(
    private popoverControlller: PopoverController,
    private router: Router
  ) { }

  ngOnInit() {}

  openSettingsPage() {
    this.popoverControlller.dismiss();
    this.router.navigate(['/list']);
  }
}
