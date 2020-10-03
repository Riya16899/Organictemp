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
import { ToDoComponent } from './to-do/to-do.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToDoReducer } from './todo.reducer';
import { ToDoEffects } from './todo.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app.interceptor';

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
    ToDoComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ todos: ToDoReducer }),
    EffectsModule.forRoot([ToDoEffects])
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
