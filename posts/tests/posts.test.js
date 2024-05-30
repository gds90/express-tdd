const { test, expect } = require("@jest/globals");
const posts = require('../posts.js');

// Classe Model
class Model {

}

// Funzione createSlug che crea gli slug dei nostri post ricevendo come argomento il titolo da convertire e la lista di tutti i post
const createSlug = (title, posts) => {
    // Controllo se è presente il titolo o se è del formato giusto
    if (!title || typeof title != 'string') {
        throw new Error('Il titolo è obbligatorio e deve essere una stringa');
    }

    // Controllo se è presente l'array dei posts o se è del formato giusto
    if (!posts || !Array.isArray(posts)) {
        throw new Error('L\'array dei post è obbligatorio e deve essere un array');
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
});

// - createSlug dovrebbe lanciare un errore se manca l'array dei post
test("createSlug dovrebbe lanciare un errore se manca l'array dei post", () => {
    expect(() => createSlug("Titolo test")).toThrow(Error);
    expect(() => createSlug("Titolo test", 10)).toThrow(Error);
});

// Bonus
// Creiamo una classe Model la quale dovrà superare i seguenti test:
// - Model dovrebbe essere una classe (crea un'istanza della classe Model)
test("Model dovrebbe essere una classe (crea un'istanza della classe Model)", () => {
    const newInstance = new Model();
    expect(newInstance).toBeInstanceOf(Model);
});

// - L'istanza di model dovrebbe richiedere il nome del file json da usare in fase di creazione dell'istanza
// - L'istanza di model dovrebbe avere il metodo read
// - L'istanza di model dovrebbe avere il metodo add
// - read dovrebbe ritornare un array
// - add dovrebbe aggiungere un elemento all’array dei dati e ritornare tutta la lista