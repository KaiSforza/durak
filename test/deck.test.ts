import { Deck } from "../src/deck"
import type { Card } from "../src/types"

test('card count', () => {
    let d1 = new Deck(4)
    expect(d1.deck.length).toEqual(11)
    expect(d1.hands.length).toEqual(4)
    expect(d1.hands[0].length).toEqual(6)
    expect(d1.hands[3].length).toEqual(6)
    expect(d1.hands[2].length).toEqual(6)
})

test('not enough cards', () => {
    try {
        let d2 = new Deck(10, 10)
    } catch(e) {
        expect(e.__proto__.name).toEqual("Error")
    }
})

test('final trump test', () => {
    let d = new Deck(1, 10, 18) // 20 cards, 18 drawn, 1 trump set, 1 left
    let ftrump: Card = d.trumpCard
    expect(d.draw()).not.toBeUndefined() // card drawn, should be a card
    expect(d.draw()).toBe(ftrump) // card drawn, will be final trump
    expect(d.draw()).toBeUndefined() // card draw attempt, fail
})