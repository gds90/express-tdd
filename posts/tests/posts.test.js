const { test, expect } = require("@jest/globals");
const posts = require('../posts.js');

// funzione createSlug che crea gli slug dei nostri post ricevendo come argomento il titolo da convertire e la lista di tutti i post
const createSlug = (title, posts) => {
    // Controllo se è presente il titolo o se è del formato giusto
    if (!title || typeof title != 'string') {
        throw new Error('Il titolo deve essere una stringa');
    }

    // Trasformo la stringa in minuscolo e sostituisco spazi con trattino
    const baseSlug = title.toLowerCase().replace(/\s+/g, '-');

    // Recupero tutti gli slug presenti nel db
    const slugList = posts.map((p => p.slug));

    let counter = 1;

    let slug = baseSlug;

    // Controllo se lo slug esiste già nella lista di tutti gli slug
    while (slugList.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}

// - createSlug dovrebbe ritornare una stringa
test('createSlug dovrebbe ritornare una stringa', () => {
    expect(typeof createSlug("Titolo test", posts)).toBe('string');
});

// - createSlug dovrebbe ritornare una stringa in lowercase
test('createSlug dovrebbe ritornare una stringa in lowercase', () => {
    expect(createSlug("Titolo test", posts)).toBe('titolo-test');
});

// - createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -
test('createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -', () => {
    expect(createSlug("Titolo test", posts)).toBe('titolo-test');
});

// - createSlug dovrebbe incrementare di 1 lo slug quando esiste già
test('createSlug dovrebbe incrementare di 1 lo slug quando esiste già', () => {
    expect(createSlug("Ciambellone", posts)).toBe('ciambellone-1');
});

// - createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato
test('createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato', () => {
    expect(() => createSlug("", posts)).toThrow(Error);
    expect(() => createSlug(10, posts)).toThrow(Error);
})

// - createSlug dovrebbe lanciare un errore se manca l'array dei post
