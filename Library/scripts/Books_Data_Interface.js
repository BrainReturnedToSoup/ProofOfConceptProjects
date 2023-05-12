class Books {
    
    constructor() {
        this.title = [];
        this.author = [];
        this.totalPages = [];
        this.currentPage = [];
        this.pagesLeft = [];
        this.readYet = [];
    }

    addBook(title, author, pages, currentPage, readYet) {

        if(this.title.includes(title)) {
    
            throw new Error(`Cannot add new book, book with this title already exists`)
    
        } else {
    
            this.title.push(title);
            this.author.push(author);
            this.totalPages.push(pages);
            this.currentPage.push(currentPage);
            this.pagesLeft.push(pages - currentPage);
            this.readYet.push(readYet);
    
        }
    
    }
    
    removeBook(title) {
    
        for(let index = 0; index < this.title.length; index++) {
    
            if(this.title[index] === title) {
    
                this.title.splice(index, 1);
                this.author.splice(index, 1);
                this.totalPages.splice(index, 1);
                this.currentPage.splice(index, 1);
                this.pagesLeft.splice(index, 1);
                this.readYet.splice(index, 1);
    
            }
            
        }
    
    }
    
    currentPageUp(title) {
    
        for(let index = 0; index < this.title.length; index++) {
    
            if(this.title[index] === title && this.currentPage[index] > 0) {
                
                this.currentPage[index]--;
                this.pagesLeft[index]++;
    
            }
            
        }
    
    }
    
    currentPageDown(title) {
    
        for(let index = 0; index < this.title.length; index++) {
    
            if(this.title[index] === title && this.pagesLeft[index] > 0) {
    
                this.currentPage[index]++;
                this.pagesLeft[index]--;
    
            }
            
        }
    
    }
    
    toggleReadYet(title) {
    
        for(let index = 0; index < this.title.length; index++) {
    
            if(this.title[index] === title) {
    
                if(this.readYet[index] === 'I have not read this book') {
    
                    this.readYet[index] = 'I have read this book';
    
                } else if(this.readYet[index] === 'I have read this book') {
    
                    this.readYet[index] = 'I have not read this book';
    
                }
    
            }
            
        }
    
    }
    
}



export { Books }

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






