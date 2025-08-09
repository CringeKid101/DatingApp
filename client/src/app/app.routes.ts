import { Routes } from '@angular/router';
import { MemberList } from '../features/members/member-list/member-list';
import { Messages } from '../features/messages/messages';
import { Home } from '../features/home/home';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Lists } from '../features/lists/lists';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
     { path: "", component: Home },
     {
          path: "",
          runGuardsAndResolvers: 'always',
          canActivate: [authGuard],
          children: [
               { path: "members", component: MemberList,},
               { path: "members/:id", component: MemberDetailed },
               { path: "messages", component: Messages },
               { path: "lists", component: Lists },
          ]
     },

     { path: "**", component: Home }
];
