/* Core module */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

/* Component */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/header.component';
import { SideArticleComponent } from './components/side-article/side-article.component';
import { CommentComponent } from './components/Comment/comment.component';
import { SideNavComponent } from './components/Sidenav/sidenav.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ContactComponent } from './pages/Contact/contact.component';
import { BlogComponent } from './pages/Blog/blog.component';
import { ProjectComponent } from './pages/Project/project.component';
import { ModalComponent } from './components/Modal/modal.component';
import { HomeView } from './pages/Home/home-view.component';
import { AboutView } from './pages/Aboutme/about.component';
import { LoginComponent } from './components/Modal/Login/login.component';
import { PostComponent } from './components/Modal/Post/post.component';
import { ArticleComponent } from './pages/Article/article.component';
import { FooterComponent } from './components/Footer/footer.component';
import { ProfileComponent } from "./pages/Profile/Profile.component";

/* Service */
import { SharedService } from './services/shared.service';
import { AuthService } from './services/auth.service';

@NgModule({
	imports: [
	    CommonModule,
	    HttpModule,
	    TransferHttpModule,
	    FormsModule,
	    ReactiveFormsModule,
	    RouterModule.forRoot([
	      { path: '', component: HomeView},
	      { path: 'about', component: AboutView},
	      { path: 'exp', component: ProjectComponent},
		  { path: 'blog', component: BlogComponent},
	      { path: 'blog/search', component: BlogComponent},
	      { path: 'blog/:name', component: ArticleComponent},
		  { path: 'profile/:name', component: ProfileComponent},
	      { path: 'contact', component: ContactComponent}
	    ])
	],
	declarations: [ 
		AppComponent,
		HeaderComponent,
		LoadingComponent,
		HomeView,
		AboutView,
		ModalComponent,
		ProjectComponent,
		BlogComponent,
		ContactComponent,
		LoginComponent,
		PostComponent,
		ArticleComponent,
		SideArticleComponent,
		CommentComponent,
		FooterComponent,
		SideNavComponent,
		ProfileComponent
	],
    providers: [ AuthService, SharedService ],
    exports: [ AppComponent ]
})
export class AppModule {}
