import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ParentProductsComponent } from './components/parent-products/parent-products.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './components/joinus/sign-in/sign-in.component';
import { SignUpComponent } from './components/joinus/sign-up/sign-up.component';
import { JoinusComponent } from './components/joinus/joinus.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewProductComponent } from './components/admin/new-product/new-product.component';
import { userGuard } from './guards/user-guard.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'products',
    component: ProductsComponent,

    title: 'Products',
  },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  {
    path: 'admin',
    component: NewProductComponent,
    title: 'Admin DashBoard',
    children: [
      {
        path: 'insertProduct',
        component: NewProductComponent,
        title: 'Insert Product',
      },
    ],
  },
  {
    path: 'admin/insertProduct/:id',
    component: NewProductComponent,
    title: 'Insert Product',
  },
  { path: 'movies', component: MoviesComponent, title: 'Movies' },
  { path: 'about', component: AboutComponent, title: 'About Us' },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  {
    path: 'productparent',
    component: ParentProductsComponent,
    canActivate: [userGuard],
    title: 'Products',
  },
  {
    path: 'join',
    component: JoinusComponent,
    title: 'Join Us',
    children: [
      { path: 'signup', component: SignUpComponent, title: 'Register' },
      { path: 'login', component: SignInComponent, title: 'LogIn' },
    ],
  },

  { path: '**', component: NotfoundComponent },
];
