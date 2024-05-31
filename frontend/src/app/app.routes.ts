import { Routes } from '@angular/router';
import {NewsComponent} from './components/news/news.component';
import {AddNewsComponent} from './components/add-news/add-news.component';
import {EditNewsComponent} from './components/edit-news/edit-news.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

export const routes: Routes = [
    { path: '', component: NewsComponent, title: 'News' },
    { path: 'news/addnew', component: AddNewsComponent, title: 'Add News'},
    { path: 'news/edit/:newsId', component: EditNewsComponent, title: 'Edit News'},
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'login', component: LoginComponent, title: 'Login' }
];
