import { Deck } from "../src/deck"
import type { Card } from "../src/types"

test('card count', () => {
    let d1 = new Deck(4)
    expect(d1.deck.length).toEqual(11)  // 36 - 24 = 12, minus one for final trump
    expect(d1.hands.length).toEqual(4)
    expect(d1.hands[0].length).toEqual(6)
    expect(d1.hands[3].length).toEqual(6)
    expect(d1.hands[2].length).toEqual(6)
})

test('full deal', () => {
    let d = new Deck(6) // 6 players means 36 cards of a 36 card deck.
    expect(d.deck.length).toEqual(0)
    let DealerHand: Card[] = d.hands[d.hands.length - 1]
    let LastCard: Card = DealerHand[DealerHand.length - 1]
    expect(d.trumpCard).toBe(LastCard)
    expect(d.finalTrumpLeft).toEqual(false)
})

test('double deal', () => {
    // this should never happen, but just to test how we handle this
    let d = new Deck(4)
    expect(d.deck.length).toEqual(11)
    let nh: Card[][] = d.deal(d.players, d.cardsPerPlayer)
    expect(nh.flat().length).toEqual(12)  // 11 in deck + 1 final trump
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