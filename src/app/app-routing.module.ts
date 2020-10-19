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
import { CartComponent } from './cart/cart.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { CheckoutComponent } from './checkout/checkout.component'; 

const routes: Routes = [
	{ path: 'contact', component: ContactComponent },
	{ path: 'products', component: ProductsComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
	{ path: 'home', component: HomeComponent},
	{ path: 'login', component: LoginComponent },
	{ path: 'forget', component: ForgetPWDComponent},
	{ path: 'register', component: SignupComponent},
	{ path: 'reset', component: ResetPWDComponent, 
	// children:
	//  [{ path: ':str',
 //    	component: ResetPWDComponent}]
  	},
  	{ path: 'reset/:str', component: ResetPWDComponent },
	{ path: 'gen-verification', component: GenVerificationComponent},
	{ path: 'cart/:quantity/:pro_id', component: CartComponent, canActivate: [AuthGuard]},
	{ path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
	{ path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
	{ path: 'product_info/:id', component: ProductInfoComponent},
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
