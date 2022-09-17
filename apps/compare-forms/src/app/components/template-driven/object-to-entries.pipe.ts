import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToEntries',
  standalone: true,
})
export class ObjectToEntriesPipe<T extends Record<string, unknown>>
  implements PipeTransform
{
  transform(value: T): [string, unknown][] {
    return Object.entries(value);
  }
}
