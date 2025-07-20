import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";

import { TasksComponent } from "./tasks/tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: '', // <your-domain>
        component: NoTaskComponent,
        // redirectTo: 'users/u1',
        // pathMatch: 'full' // 完全一致でリダイレクト
    },
    {
        path: 'users/:userId', // <your-domain>/users/<uid>
        component: UserTasksComponent,
        children: [
            {
                path: '',
                redirectTo: 'tasks',
                pathMatch: 'full'

            },
            {
                path: 'tasks', // <your-domain>/users/<uid>/tasks
                component: TasksComponent
            },
            {
                path: 'tasks/new',
                component: NewTaskComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];
