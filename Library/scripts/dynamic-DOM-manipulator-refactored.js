import { Library, Book } from './library-data-constructor';

class LibraryManager {

    constructor() {
        this.dataState = [];
        this.domState = [];
    }

    newLibrary(libraryOwner, ...bookProperties) {
        this.dataState.push(new Library(libraryOwner, new Book(...bookProperties)));
    }

    deleteLibrary(libraryOwner) {

        if (typeof libraryOwner === 'string') {

            for (let key in this.dataState) {
                this.dataState[key].libraryOwner === libraryOwner ?
                    this.dataState.splice(key, 1) : null;
                return;
            }

        }

    }

    updateDomState() {


    }

    stateTraversal(command, targetParameters) {

        function interpretCommand(command) {

            if (command === 'traverseDataState') {

                const targetParametersKeys = Object.keys(targetParameters);
                if (targetParametersKeys.length === 2 &&
                    targetParametersKeys.includes('refTitle') &&
                    targetParametersKeys.includes('targetProperty')) {
                    traverseDataState(targetParameters, this.dataState);
                } else {
                    console.log(`ERROR: invalid target parameters, received ${targetParameters}`)
                }

            } else if (command === 'compareBothStates') {
                compareBothStates();
            }

        }

        //command = 'traverseDataState or compareBothStates'
        //targetParameters = {refTitle: 'reference', targetProperty: 'target', action: 'find'}
        //targetParameters = {refTitle: 'reference', targetProperty: 'target', action: 'change', value: 'value'}
        // libraryObjectExample = {
        //      libraryOwner: 'Steve'
        //      bookList: [
        //          {
        //              title: 'The Hobbit',
        //              author: 'J.R.R. Tolkien',
        //              pagesLeft: 124,
        //              readYet: false
        //          },
        //          {...},
        //          {...}
        //      ]
        // }

        function traverseDataState(targetParameters, dataStructure, refTitleFound = false, executeSwitch = false) {

            switch (true) {
                case Object.keys(dataStructure).includes(targetParameters.targetProperty) && refTitleFound:
                    //checking if scope contains target property specifically in the book scope
                    targetParameters.action === 'find' ? dataStructure[targetParameters.targetProperty] :
                        targetParameters.action === 'change' ? dataStructure[targetParameters.targetProperty] = targetParameters.value :
                            console.log(`ERROR: invalid action value, received ${targetParameters.action}`);
                    break;
                case !Array.isArray(dataStructure) && Object.keys(dataStructure).includes('title'):
                    //scope is book object
                    if (dataStructure.title === targetParameters.refTitle) {
                        refTitleFound = true;
                    }
                    break;
                case Array.isArray(dataStructure) && dataStructure.bookList === undefined:
                    //scope is bookList array
                    for (let book of dataStructure) {
                        traverseDataState(targetParameters, book, refTitleFound);
                    }
                    break;
                case Array.isArray(dataStructure) && dataStructure.bookList !== undefined:
                    //scope is library object
                    traverseDataState(targetParameters, dataStructure.bookList, refTitleFound);
                    if (refTitleFound) {
                        executeSwitch = true;
                    }
                    break;
                case !Array.isArray(dataStructure):
                    //scope is dataState array
                    for (let library of dataStructure) {
                        traverseDataState(targetParameters, library, refTitleFound);
                    }
                    if (refTitleFound) {
                        executeSwitch = true;
                    }
                    break;
            }

            if (refTitleFound && executeSwitch) {
                switch (true) {
                    case Object.keys(dataStructure).includes(targetParameters.targetProperty) && refTitleFound:
                        //checking if scope contains target property outside of the book scope within the correct scope chain
                        targetParameters.action === 'find' ? dataStructure[targetParameters.targetProperty] :
                            targetParameters.action === 'change' ? dataStructure[targetParameters.targetProperty] = targetParameters.value :
                                console.log(`ERROR: invalid action value, received ${targetParameters.action}`);

                        executeSwitch = false;
                        break;
                }
            }

            return executeSwitch;

        }

        function compareBothStates() {

        }

        return interpretCommand(command);

    }

    dataHandler(data) {

        const dataHandlerMethods = {

            validation: function (target, libraryIndex, bookIndex) {

            },

            createClassRef: function () {

            },

            packageData: function () {

            }

        }
    }
}