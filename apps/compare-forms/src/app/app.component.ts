import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentStoreComponent } from './components/component-store/component-store.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { TemplateDrivenComponent } from './components/template-driven/template-driven.component';

@Component({
  selector: 'compare-forms-root',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  template: `<h1>Let's Compare Forms</h1>
    <div class="container">
      <compare-forms-template-driven></compare-forms-template-driven>
      <compare-forms-reactive-form></compare-forms-reactive-form>
      <compare-forms-component-store></compare-forms-component-store>
    </div>`,
  imports: [
    CommonModule,
    ComponentStoreComponent,
    TemplateDrivenComponent,
    ReactiveFormComponent,
  ],
})
export class AppComponent {
  title = 'compare-forms';
}
