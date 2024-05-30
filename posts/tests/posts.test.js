const { test, expect } = require("@jest/globals");
const posts = require('../posts.js');

// funzione createSlug che crea gli slug dei nostri post ricevendo come argomento il titolo da convertire e la lista di tutti i post
const createSlug = (title, posts) => {
    let slug = title.toLowerCase();
    return slug;
}

// - createSlug dovrebbe ritornare una stringa
test('createSlug dovrebbe ritornare una stringa', () => {
    expect(typeof createSlug("Titolo test", posts)).toBe('string');
});

// - createSlug dovrebbe ritornare una stringa in lowercase
test('createSlug dovrebbe ritornare una stringa in lowercase', () => {
    expect(createSlug("Titolo test", posts)).toBe('titolo test');
})

// - createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -
// - createSlug dovrebbe incrementare di 1 lo slug quando esiste già
// - createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato
// - createSlug dovrebbe lanciare un errore se manca l'array dei post
