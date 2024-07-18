import { Component } from '@angular/core';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
  name: string = '';
  type: string = '';
  minutes: number = 0;

  addWorkout() {
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    workouts.push({ name: this.name, type: this.type, minutes: this.minutes });
    localStorage.setItem('workouts', JSON.stringify(workouts));

    this.name = '';
    this.type = '';
    this.minutes = 0;

    window.location.reload();
  }
}
