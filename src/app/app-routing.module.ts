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
import { GenVerificationComponent } from './gen-verification/gen-verification.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: 'contact', component: ContactComponent },
	{ path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
	{ path: 'about', component: AboutComponent },
	{ path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
	{ path: 'home', component: HomeComponent},
	{ path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
	{ path: 'forget', component: ForgetPWDComponent},
	{ path: 'register', component: SignupComponent},
	{ path: 'reset', component: ResetPWDComponent},
	{ path: 'gen-verification', component: GenVerificationComponent},
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
