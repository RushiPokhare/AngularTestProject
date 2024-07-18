import { Component, OnInit } from '@angular/core';

interface Workout {
  name: string;
  type: string;
  minutes: number;
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: any[] = [];
  workoutTypes: string[] = [];
  searchName: string = '';
  filterType: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    this.loadWorkouts();
    this.updateFilteredWorkouts();
  }

  loadWorkouts() {
    const storedWorkouts = localStorage.getItem('workouts');
    this.workouts = storedWorkouts ? JSON.parse(storedWorkouts) : [];
    this.workoutTypes = [...new Set(this.workouts.map(workout => workout.type))];
  }

  updateFilteredWorkouts() {
    const filtered = this.workouts
      .filter(workout => !this.searchName || workout.name.toLowerCase().includes(this.searchName.toLowerCase()))
      .filter(workout => !this.filterType || workout.type === this.filterType)
      .reduce((acc, workout) => {
        let user = acc.find(u => u.name === workout.name);
        if (!user) {
          user = { name: workout.name, workouts: [], totalMinutes: 0 };
          acc.push(user);
        }
        user.workouts.push(workout.type);
        user.totalMinutes += workout.minutes;
        user.workoutCount = user.workouts.length;
        return acc;
      }, []);

    // Pagination logic
    this.filteredWorkouts = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updateFilteredWorkouts();
  }

  get totalPages() {
    return Math.ceil(this.workouts.length / this.itemsPerPage);
  }
}
