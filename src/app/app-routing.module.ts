import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { ForgetPWDComponent } from './forget-pwd/forget-pwd.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPWDComponent } from './reset-pwd/reset-pwd.component';
import { ToDoComponent } from './to-do/to-do.component';

const routes: Routes = [
	{ path: 'contact', component: ContactComponent },
	{ path: 'products', component: ProductsComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'home', component: HomeComponent},
	{ path: 'login', component: LoginComponent},
	{ path: 'forget', component: ForgetPWDComponent},
	{ path: 'register', component: SignupComponent},
	{ path: 'reset', component: ResetPWDComponent},
	{ path: 'todo', component: ToDoComponent},
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
