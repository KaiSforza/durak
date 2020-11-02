import type * as t from '../src/types'
import { cardCompare, cardCompareTrump } from '../src/common'

    // let d = new deck.Deck(2, 6, 6)
test('compares cards', () => {
    let c1: t.Card = {rank: 2, suit: "clubs"}
    let c2: t.Card = {rank: 6, suit: "clubs"}
    expect(cardCompare(c1, c2)).toBeLessThan(0)
})

test('compare cards with trump', () => {
    let c1: t.Card = {rank: 2, suit: "hearts"}
    let c2: t.Card = {rank: 6, suit: "clubs"}
    let c3: t.Card = {rank: 3, suit: "hearts"}
    expect(cardCompareTrump(c1, c2, "hearts")).toBeGreaterThan(0)
    expect(cardCompareTrump(c2, c1, "hearts")).toBeLessThan(0)
    expect(cardCompareTrump(c1, c3, "hearts")).toBeLessThan(0)
    expect(cardCompareTrump(c1, c3)).toBeLessThan(0)
})