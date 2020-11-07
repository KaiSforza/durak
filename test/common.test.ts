import type * as t from '../src/types'
import { cardCompare, cardOrd, min, max } from '../src/common'

test('compare cards types', () => {
    let c1: t.Card = {rank: 2, suit: "hearts"}
    let c2: t.Card = {rank: 6, suit: "clubs"}
    let c3: t.Card = {rank: 3, suit: "hearts"}
    let c4: t.Card = {rank: 2, suit: "spades"}
    expect(cardOrd.compare(c1, c2)).toBe(-1)
    expect(min(cardOrd)(c1, c2)).toBe(c1)
    expect(min(cardOrd)(c2, c1)).toBe(c1)
    expect(min(cardOrd)(c1, c1)).toBe(c1)

    expect(max(cardOrd)(c1, c2)).toBe(c2)
    expect(max(cardOrd)(c2, c1)).toBe(c2)
    expect(max(cardOrd)(c1, c1)).toBe(c1)
})

test('compare cards', () => {
    let c1: t.Card = {rank: 2, suit: "hearts"}
    let c2: t.Card = {rank: 6, suit: "clubs"}
    let c3: t.Card = {rank: 3, suit: "hearts"}
    expect(cardCompare(c1, c2, "hearts")).toBeGreaterThan(0)  // trump v non-trump
    expect(cardCompare(c2, c1, "hearts")).toBeLessThan(0)  // non-trump v trump
    expect(cardCompare(c1, c3, "hearts")).toBeLessThan(0)  // trump v trump
    expect(cardCompare(c1, c3)).toBeLessThan(0) // no trump set
})
