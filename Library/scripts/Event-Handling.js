import { librariesManager, Book } from './library-data-constructor.js'
import { elementClasses, elementTags, templateElementTextContent, updateDOM, createBookElements } from './Dynamic-DOM.js'

//should be set to a librariesManager Object, if not it will be initialized once a new library is created
let infoToDisplayOnDOM;

const appRefs = {

    navBarButtonClasses: {
        newLibrary: 'New-Library',
        addBook: 'Add-Book',
        removeBook: 'Remove-Book'
    },

    bookCardButtonClasses: {
        xButton: elementClasses.xButton,
        pageLeftUpButton: elementClasses.pageLeftUpButton,
        pageLeftDownButton: elementClasses.pageLeftDownButton
    },

    formBackButtonClasses: {
        addBook: 'Add-Book-Back',
        newLibrary: 'New-Library-Back'
    },

    refElements: {
        home: document.querySelector('.Content-Wrapper'),
        addBookForm: document.querySelector('#Add-Book-To-Existing-Library'),
        newLibraryForm: document.querySelector('#New-Library-Creation'),
        allXButtons: document.querySelectorAll('.X-Button'),
        addBookFormBackground: document.querySelector('.Add-Book-PopUp-Background'),
        newLibraryFormBackground: document.querySelector('.New-Library-PopUp-Background')
    }

},

    eventMethods = {

        handleClick: {
            bookCardButtonClicked: function (eventTarget, tagClassName, identifierClassName) {

                const bookTitle = identifierClassName.replace(/_/g, ' ').trim(),
                    //since the identifier class for all related elements to a specific book is the title of the book but with
                    //underscores instead of spaces along with an underscore at the end, we just revert the class back to the title form
                    //in order to reference the book in the data

                    libraryOwner = document.querySelector(`.${elementClasses[libraryOwnerLabel]}.${identifierClassName}`).textContent;
                //grabs the owner of the book by referencing the library owner label and using its text content

                switch (tagClassName) {
                    case appRefs.bookCardButtonClasses.xButton:
                        //if the X button on a specific book card is clicked, which will delete the book

                        infoToDisplayOnDOM.removeBookFromLibrary(libraryOwner, bookTitle);
                        //removing book from infoToDisplayToDOM data structure

                        updateDOM(infoToDisplayOnDOM);
                        //updating what the DOM displays, which is based on infoToDisplayToDOM data structure
                        break;
                    case appRefs.bookCardButtonClasses.pageLeftUpButton:
                        //if the book card button clicked is a increment page left button
                        infoToDisplayOnDOM.changeBookPropertyValue(libraryOwner, bookTitle, 'pagesLeft', 'add');

                        updateDOM(infoToDisplayOnDOM);
                        break;
                    case appRefs.bookCardButtonClasses.pageLeftDownButton:
                        //if the book card button clicked is a decrement page left button
                        infoToDisplayOnDOM.changeBookPropertyValue(libraryOwner, bookTitle, 'pagesLeft', 'sub');

                        updateDOM(infoToDisplayOnDOM);
                        break;
                    default:
                        return console.log(`ERROR: Not a functional book button : RECEIVED EVENT TARGET ${eventTarget}, TAG CLASS ${tagClassName}, IDENTIFIER CLASS ${identifierClassName}  `);
                }

            },
            navBarButtonClicked: function (buttonClass) {


                switch (buttonClass) {
                    case appRefs.navBarButtonClasses.newLibrary:
                        //if the new library button is clicked on the nav bar
                        appRefs.refElements.home.style.display = 'none';
                        appRefs.refElements.newLibraryFormBackground.style.display = 'flex';
                        break;
                    case appRefs.navBarButtonClasses.addBook:
                        //if the add book button is clicked on the nav bar
                        if(infoToDisplayOnDOM.libraryData !== undefined) {
                        appRefs.refElements.home.style.display = 'none';
                        appRefs.refElements.addBookFormBackground.style.display = 'flex';
                        }
                        break;
                    case appRefs.navBarButtonClasses.removeBook:
                        //if the remove button is clicked on the nav bar, the display for the X button on book cards will toggle on or off
                        for (const xButton of appRefs.refElements.allXButtons) {

                            const xButtonDisplayValue = xButton.style.display;

                            if (xButtonDisplayValue === '') {
                                xButton.style.display = 'none';
                            } else if (xButtonDisplayValue === 'none') {
                                xButton.style.display = '';
                            }

                        }
                        break;
                    default:
                        //if other checks fail
                        return console.log(`ERROR: Not a functional nav bar button : RECEIVED BUTTON CLASS ${buttonClass}`);
                }
            },
            formCardBackButtonClicked: function (buttonClass) {
                switch (buttonClass) {
                    case appRefs.formBackButtonClasses.addBook:
                        //if the back button on the add book form is clicked, the inline styling is reverted to default
                        appRefs.refElements.home.style.display = '';
                        appRefs.refElements.addBookFormBackground.style.display = '';
                        break;
                    case appRefs.formBackButtonClasses.newLibrary:
                        //if the back button on the new library form is clicked, the inline styling is reverted to default
                        appRefs.refElements.home.style.display = '';
                        appRefs.refElements.newLibraryFormBackground.style.display = '';
                        break;
                    default:
                        //if other checks fail
                        return console.log(`ERROR: Not a functional form back button : RECEIVED BUTTON CLASS ${buttonClass}`);
                }
            }
        },

        handleSubmit: {
            newLibraryForm: function (formData) {
                const dataTest = formData;
                switch (true) {
                    case infoToDisplayOnDOM instanceof librariesManager === false:
                        //if the infoToDisplay variable is not initialized as a librariesManager object
                        break;
                    case infoToDisplayOnDOM instanceof librariesManager && infoToDisplayOnDOM.libraryData instanceof Map:
                        //if the infoToDisplay variable is initialized as a librariesManager property is equal to a Map data structure
                        break;
                    default:
                        //if the infoToDisplay variable fails both of the previous tests
                        return console.log(`ERROR: infoToDisplay is not either a valid data structure or undefined : EQUAL TO ${infoToDisplayOnDOM}`);
                }
            },

            addBookForm: function (formData) {
                if (infoToDisplayOnDOM instanceof librariesManager && infoToDisplayOnDOM.libraryData instanceof Map && infoToDisplayOnDOM.libraryData.size > 0) {
                    //if the infoToDisplay variable is an object from librariesManager and the libraryData property within such has a library within it
                } else {
                    //if the condition above fails, or in otherwords no valid structure exists for a new book to be added to
                    return console.log(`ERROR: no valid libraries to add books to : RECEIVED FORM DATA ${formData}`);
                }
            }
        },

        interpretEvent: {

            click: function (event) {

                const targetClassList = event.target.classList,
                    tagClassName = targetClassList[0],
                    identifierClassName = targetClassList[1]



                switch (true) {
                    case Object.values(appRefs.bookCardButtonClasses).includes(tagClassName):
                        //if the tag class of the event target matches that of a book card button
                        eventMethods.handleClick.bookCardButtonClicked(event.target, tagClassName, identifierClassName);

                        break;
                    case Object.values(appRefs.navBarButtonClasses).includes(tagClassName):
                        //if the tag class of the event target matches that of a nav bar button
                        eventMethods.handleClick.navBarButtonClicked(tagClassName);

                        break;
                    case Object.values(appRefs.formBackButtonClasses).includes(identifierClassName):
                        //if the identifier class matches that of a back button class present in a form page
                        eventMethods.handleClick.formCardBackButtonClicked(identifierClassName);
                    default:
                        return;
                }

            },

            submit: function (event) {
                //resets all styling values, so that the screen returns to the main menu upon a successful submission
                appRefs.refElements.home.style.display = '';
                appRefs.refElements.addBookFormBackground.style.display = '';
                appRefs.refElements.newLibraryFormBackground.style.display = '';

                //defines the data received in a form submission into the variable formData
                const formData = new FormData(event.target);

                switch (true) {
                    case event.target.classList.contains(appRefs.refElements.addBookForm):
                        //if the event target was a add book form submission
                        eventMethods.handleSubmit.addBookForm(formData);
                        break;
                    case event.target.classList.contains(appRefs.refElements.newLibraryForm):
                        //if the event target was a new library form submission
                        eventMethods.handleSubmit.newLibraryForm(formData);
                        break;
                    default:
                        //if the event failed both checks
                        return console.log(`ERROR: invalid submission received : RECEIVED ${event.target}`);
                }

            }

        }

    }

document.addEventListener('click', eventMethods.interpretEvent.click);
document.addEventListener('submit', eventMethods.interpretEvent.submit);



