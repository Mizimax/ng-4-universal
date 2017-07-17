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
import { BlogComponent } from './pages/BlogSearch/blog.component';
import { BlogListComponent } from './pages/BlogList/BlogList.component';
import { ProjectComponent } from './pages/Project/project.component';
import { ModalComponent } from './components/Modal/modal.component';
import { HomeView } from './pages/Home/home-view.component';
import { AboutView } from './pages/Aboutme/about.component';
import { LoginComponent } from './components/Modal/Login/login.component';
import { PostComponent } from './components/Modal/Post/post.component';
import { ArticleComponent } from './pages/Article/article.component';
import { FooterComponent } from './components/Footer/footer.component';
import { ShowArticleComponent } from './components/showArticle/showArticle.component';
import { ProfileComponent } from "./pages/Profile/Profile.component";
import { AboutComponent } from "./pages/Profile/About/About.component";
import { ActivityComponent } from "./pages/Profile/Activity/Activity.component";
import { EditComponent } from "./pages/Profile/edit/edit.component";
import { PmComponent } from "./pages/Profile/pm/pm.component";

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
		  { 
			path: 'blog',
			children: [
				{ path: '', component: BlogListComponent},
				{ path: 'search', component: BlogComponent},
				{ path: ':name', component: ArticleComponent}
			]
		  },
		  { 
			path: 'profile/:name',
			component: ProfileComponent,
			children: [
				{ path: '', component: AboutComponent },
				{ path: 'activities', component: ActivityComponent },
				{ path: 'edit', component: EditComponent },
				{ path: 'pm', component: PmComponent }
			]
		  },
		  { path: 'contact', component: ContactComponent},
		  { path: '**', component: HomeView } //404 page
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
		ProfileComponent,
		ShowArticleComponent,
		BlogListComponent,
		AboutComponent,
		ActivityComponent,
		EditComponent,
		PmComponent
	],
    providers: [ AuthService, SharedService ],
    exports: [ AppComponent ]
})
export class AppModule {}
