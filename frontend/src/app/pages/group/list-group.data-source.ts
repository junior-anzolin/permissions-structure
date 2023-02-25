import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, startWith, switchMap } from 'rxjs';
import { GroupService } from 'src/app/services/group.service';

export class ListgroupDataSource extends DataSource<any> {
  protected refreshSubject: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor(private readonly groupService: GroupService) {
    super();
  }

  connect(): any {
    return this.refreshSubject.pipe(
      startWith(true),
      switchMap(() => this.groupService.list())
    );
  }

  disconnect(): void {
    this.refreshSubject.complete();
  }

  refresh() {
    this.refreshSubject.next(true);
  }
}
