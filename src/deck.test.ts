import * as deck from "./deck"

    // let d = new deck.Deck(2, 6, 6)
test('compares cards', () => {
    let c1: deck.Card = {rank: 2, suit: "clubs"}
    let c2: deck.Card = {rank: 6, suit: "clubs"}
    expect(deck.cardCompare(c1, c2)).toBeLessThan(0)
})

test('compare cards with trump', () => {
    let c1: deck.Card = {rank: 2, suit: "hearts"}
    let c2: deck.Card = {rank: 6, suit: "clubs"}
    let c3: deck.Card = {rank: 3, suit: "hearts"}
    expect(deck.cardCompareTrump(c1, c2, "hearts")).toBeGreaterThan(0)
    expect(deck.cardCompareTrump(c2, c1, "hearts")).toBeLessThan(0)
    expect(deck.cardCompareTrump(c1, c3, "hearts")).toBeLessThan(0)
    expect(deck.cardCompareTrump(c1, c3)).toBeLessThan(0)
})

test('card count', () => {
    let d1 = new deck.Deck(4)
    expect(d1.deck.length).toEqual(11)
    expect(d1.hands.length).toEqual(4)
    expect(d1.hands[0].length).toEqual(6)
    expect(d1.hands[3].length).toEqual(6)
})

test('not enough cards', () => {
    try {
        let d2 = new deck.Deck(10, 10)
    } catch(e) {
        expect(e.__proto__.name).toEqual("Error")
    }
})

test('final trump test', () => {
    let d = new deck.Deck(1, 10, 18) // 20 cards, 18 drawn, 1 trump set, 1 left
    let ftrump: deck.Card = d.trumpCard
    expect(d.draw()).not.toBeNull() // card drawn, should be a card
    expect(d.draw()).toBe(ftrump) // card drawn, will be final trump
    expect(d.draw()).toBeNull() // card draw attempt, fail
})