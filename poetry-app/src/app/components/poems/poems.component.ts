import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoetryService } from '../../services/poetry.service';

@Component({
  selector: 'app-poems',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poems.component.html',
  styleUrls: ['./poems.component.css'],
})
export class PoemsComponent implements OnInit {
  searchTerm = '';
  searchType: 'title' | 'author' = 'title';
  poems: any[] = [];
  randomPoems: any[] = [];
  errorMessage = '';
  hasSearched = false;

  constructor(private poemService: PoetryService) {}

  search() {
    this.errorMessage = '';
    this.poems = [];
    this.hasSearched = true;

    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Please enter a search term.';
      this.poems = [];
      this.hasSearched = false;
      this.loadRandomPoems();
      return;
    }

    const search$ =
      this.searchType === 'title'
        ? this.poemService.getPoemsByTitle(this.searchTerm)
        : this.poemService.getPoemsByAuthor(this.searchTerm);

    search$.subscribe({
      next: (data: any) => {
        console.log('Search response:', data);

        if (!data) {
          this.errorMessage = `No poems found for "${this.searchTerm}".`;
          this.poems = [];
          return;
        }

        if (data.status === 404 || data.reason === 'Not Found') {
          this.errorMessage = `No poems found for "${this.searchTerm}".`;
          this.poems = [];
          return;
        }

        this.poems = data;
      },
      error: () => {
        this.errorMessage = `Something went wrong while fetching poems for "${this.searchTerm}".`;
      },
    });
  }

  ngOnInit() {
    this.loadRandomPoems();
  }

  loadRandomPoems() {
    this.poemService.getRandomPoems(20).subscribe({
      next: (data) => (this.randomPoems = data),
      error: (err) => (this.errorMessage = err.message),
    });
  }

  expandPoems: Set<number> = new Set();
  expand(index: number) {
    if (this.expandPoems.has(index)) {
      this.expandPoems.delete(index);
    } else {
      this.expandPoems.add(index);
    }
  }
  selectedPoem: any = null;
  openPoem(poem: any) {
    this.selectedPoem = poem;
  }
  closeModal() {
    this.selectedPoem = null;
  }
  goHome() {
    this.searchTerm = '';
    this.searchType = 'title';
    this.poems = [];
    this.errorMessage = '';
    this.hasSearched = false;
    this.loadRandomPoems();
  }
}
