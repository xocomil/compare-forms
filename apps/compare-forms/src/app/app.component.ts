import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TemplateDrivenComponent } from "./components/template-driven/template-driven.component";

@Component({
  selector: 'compare-forms-root',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  template: `<h1>Let's Compare Forms</h1>
    <div class="container">
      <compare-forms-template-driven></compare-forms-template-driven>
    </div>`,
  imports: [CommonModule, TemplateDrivenComponent],
})
export class AppComponent {
  title = 'compare-forms';
}
