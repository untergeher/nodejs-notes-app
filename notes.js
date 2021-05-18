const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your Notes...'

const addNote = (title,body) => {
    const notes = loadNotes()

    const duplicatedNotes = notes.filter((note) => note.title === title)

    debugger

    if(duplicatedNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
    
        saveNote(notes)
        console.log('New note added')
    } else{
        console.log('No note taken')
    }

}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = JSON.parse(dataBuffer)
        return dataJSON
    }
    catch(e){
        return []
    }  
}

const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => note.title !== title)

    if(filteredNotes.length !== notes.length){
        console.log(chalk.bgGreen('Note removed!'))
    }else{
        console.log(chalk.bgRed('No Note removed!'))
    }

    saveNote(filteredNotes)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green('Your Notes:'))
    notes.forEach((note)=>console.log(note.title))
}

const readNote = (title) =>{

    const notes = loadNotes()
    const noteToRead = notes.find((note)=> note.title === title)

    if(noteToRead){
        console.log(chalk.inverse(noteToRead.title))
        console.log(noteToRead.body)
    }else{
        console.log(chalk.red('No Note Found'))
    }


}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote:readNote
}