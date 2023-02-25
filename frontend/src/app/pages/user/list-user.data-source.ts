import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, startWith, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export class ListUserDataSource extends DataSource<any> {
  protected refreshSubject: BehaviorSubject<any> = new BehaviorSubject(true);

  constructor(private readonly userService: UserService) {
    super();
  }

  connect(): any {
    return this.refreshSubject.pipe(
      startWith(true),
      switchMap(() => this.userService.list())
    );
  }

  disconnect(): void {
    this.refreshSubject.complete();
  }

  refresh() {
    this.refreshSubject.next(true);
  }
}
