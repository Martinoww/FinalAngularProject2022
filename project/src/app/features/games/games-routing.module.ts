import { RouterModule, Routes } from "@angular/router";
import { CreateGamePageComponent } from "./create-game-page/create-game-page.component";
import { EditGamePageComponent } from "./edit-game-page/edit-game-page.component";
import { GameDetailPageComponent } from "./game-detail-page/game-detail-page.component";
import { GamesPageComponent } from "./games-page/games-page.component";
import { MyGamesComponent } from "./my-games/my-games.component";

const routes:Routes = [
    {
        path:"games",
        component: GamesPageComponent
    },
    {
        path:"my-games",
        component: MyGamesComponent
    },
    {
        path:"games/details/:id",
        component: GameDetailPageComponent
    },
    {
        path:"games/edit/:id",
        component: EditGamePageComponent
    },
    {
        path:"add",
        component: CreateGamePageComponent
    }
]

export const GamesRoutingModule = RouterModule.forChild(routes)