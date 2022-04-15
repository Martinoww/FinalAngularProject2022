import { RouterModule, Routes } from "@angular/router";
import { ContactsPageComponent } from "./contacts-page/contacts-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";



const routes:Routes = [
    {
        path:"",
        pathMatch: 'full',
        component: HomePageComponent
    },
    {
        path:"contacts",
        component: ContactsPageComponent
    },
]

export const PagesRoutingModule = RouterModule.forChild(routes)