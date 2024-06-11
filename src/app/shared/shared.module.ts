import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [NotFoundComponent, ValidationMessagesComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DividerModule,
    RippleModule,
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    NotFoundComponent,
    ValidationMessagesComponent,
    ButtonModule,
    TabMenuModule,
    DividerModule,
    RippleModule,
    SidebarModule,
    InputTextModule,
    FloatLabelModule,
    CheckboxModule,
    TagModule,
    AvatarModule,
  ],
})
export class SharedModule {}
