import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { authorizationGuard } from './shared/guards/authorization.guard';
import { adminGuard } from './shared/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((module) => module.AccountModule),
  },
  {
    path: 'master-data',
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./master-data/master-data.module').then(
        (module) => module.MasterDataModule
      ),
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
