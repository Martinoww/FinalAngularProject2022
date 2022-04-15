import { RouterModule, Routes } from "@angular/router";
import { ProfileGuard } from "src/app/core/guards/profile.guard";
import { CreateGamePageComponent } from "./create-game-page/create-game-page.component";
import { EditGamePageComponent } from "./edit-game-page/edit-game-page.component";
import { GameDetailPageComponent } from "./game-detail-page/game-detail-page.component";
import { GamesPageComponent } from "./games-page/games-page.component";
import { MyGamesComponent } from "./my-games/my-games.component";

const routes:Routes = [
    {
        path:"",
        pathMatch: 'full',
        component: GamesPageComponent
    },
    {
        canActivate: [ProfileGuard],
        path:"my-games",
        component: MyGamesComponent
    },
    {
        path:"details/:id",
        component: GameDetailPageComponent
    },
    {
        canActivate: [ProfileGuard],
        path:"edit/:id",
        component: EditGamePageComponent
    },
    {
        canActivate: [ProfileGuard],
        path:"add",
        component: CreateGamePageComponent
    }
]

export const GamesRoutingModule = RouterModule.forChild(routes)