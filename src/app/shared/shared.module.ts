import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DividerModule,
    RippleModule,
  ],
  exports: [
    NotFoundComponent,
    ButtonModule,
    TabMenuModule,
    DividerModule,
    RippleModule,
    SidebarModule,
  ],
})
export class SharedModule {}
