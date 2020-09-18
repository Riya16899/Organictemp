import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
	{ path: 'contact', component: ContactComponent },
	{ path: 'products', component: ProductsComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }