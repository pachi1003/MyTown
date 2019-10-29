import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'prueba', loadChildren: './prueba/prueba.module#PruebaPageModule' },  { path: 'productos', loadChildren: './productos/productos.module#ProductosPageModule' },
  { path: 'logear', loadChildren: './logear/logear.module#LogearPageModule' },
  { path: 'registrar', loadChildren: './registrar/registrar.module#RegistrarPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
