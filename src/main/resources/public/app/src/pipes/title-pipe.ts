import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'titlePipe'
})
@Injectable()
export class TitlePipe implements PipeTransform
{

  transform(value, args)
  {
    return value.filter(zone => {
      return zone.title.toLowerCase().indexOf(args.toLowerCase()) != -1;
    });
  }
}
