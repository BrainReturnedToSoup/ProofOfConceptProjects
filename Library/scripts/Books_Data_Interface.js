export class Books {
    constructor() {
        this.titles = [];
        this.authors = [];
        this.totalPages = [];
        this.currentPages = [];
        this.totalPagesLeft = [];
        this.readYet = [];
    }

    addBook(title, author, pages, currentPage, readYet) {

        if(this.titles.includes(title)) {

            throw new Error(`Cannot add new book, book with this title already exists`)

        } else {

            this.titles.push(title);
            this.authors.push(author);
            this.totalPages.push(pages);
            this.currentPages.push(currentPage);
            this.totalPagesLeft.push(pages - currentPage);
            this.readYet.push(readYet);

        }

    }

    removeBook(title) {

        for(let index = 0; index < this.titles.length; index++) {

            if(this.titles[index] === title) {

                this.titles.splice(index, 1);
                this.authors.splice(index, 1);
                this.totalPages.splice(index, 1);
                this.currentPages.splice(index, 1);
                this.totalPagesLeft.splice(index, 1);
                this.readYet.splice(index, 1);

            }
            
        }

    }

    currentPageUp(title) {

        for(let index = 0; index < this.titles.length; index++) {

            if(this.titles[index] === title) {

                this.currentPages[index]++

            }
            
        }

    }

    currentPageDown(title) {

        for(let index = 0; index < this.titles.length; index++) {

            if(this.titles[index] === title) {

                this.currentPages[index]--

            }
            
        }

    }

    toggleReadYet(title) {

        for(let index = 0; index < this.titles.length; index++) {

            if(this.titles[index] === title) {

                if(this.readYet[index] === 'I have not read this book') {

                    this.readYet[index] = 'I have read this book';

                } else if(this.readYet[index] === 'I have read this book') {

                    this.readYet[index] = 'I have not read this book';

                }

            }
            
        }

    }

}

//  books = {
//
//  titles: [],
//  authors: [],
//  totalPages: [],
//  currentPages: [],
//  pagesLeft: [],
//  readYet: []
//
//  }






