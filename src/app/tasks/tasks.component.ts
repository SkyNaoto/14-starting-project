import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent implements OnInit{
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('desc');
  private tasksService = inject(TasksService);
  userTasks = computed( () => 
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        console.log('sorted id', a.id, b.id);
        const aID = Number(a.id);
        const bID = Number(b.id);
        if (this.order() === 'desc') {
          console.log('desc',a.id, b.id);
          return aID - bID;
        } else {
          console.log('asc',a.id, b.id);
          return bID - aID;
        }
      })
 );
 private activatedRoute = inject(ActivatedRoute);
 private destroyRef = inject(DestroyRef);

 ngOnInit(): void {
     const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => this.order.set(params['order']),
     });

     this.destroyRef.onDestroy(() => subscription.unsubscribe());
 }




}
