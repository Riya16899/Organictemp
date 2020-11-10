import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { ForgetPWDComponent } from './forget-pwd/forget-pwd.component';
import { ResetPWDComponent } from './reset-pwd/reset-pwd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app.interceptor';
import { GenVerificationComponent } from './gen-verification/gen-verification.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartPipe } from './cart/cart.pipe';
import { ProductPaginationComponent } from './product-pagination/product-pagination.component';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,

    ContactComponent,
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    BlogComponent,
    LoginComponent,
    ForgetPWDComponent,
    ResetPWDComponent,
    SignupComponent,
    GenVerificationComponent,
    ProductInfoComponent,
    CartComponent,
    CheckoutComponent,
    CartPipe,
    ProductPaginationComponent,
    PaymentDetailsComponent,
    ToasterComponent,


   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51HgUIAE6HZ2spzZbur7T9XS40mmCNzq1n7yqzzKEvhFmiS8FgKQJlYBC5Xlcfllkg1yCGvWeGXFnZ6EfzLX41qQx00gRzx7ZmM'),
    // ToastrModule.forRoot()
    ToastNotificationsModule,

  ],
  providers: [

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
