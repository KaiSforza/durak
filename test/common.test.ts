import { strictEqual } from "assert"
import type * as t from '../src/types'
import { cardCompare, ordCard, ordRank, } from '../src/common'

suite('compare cards types', function() {
    const c1: t.Card = {rank: 2, suit: "hearts"}
    const c2: t.Card = {rank: 6, suit: "clubs"}
    const c3: t.Card = {rank: 3, suit: "hearts"}
    const c4: t.Card = {rank: 2, suit: "spades"}
    test('functional card comparison', () => {
        strictEqual(ordCard.compare(c1, c2), -1)
        strictEqual(ordCard.compare(c1, c1), 0)
        strictEqual(ordCard.compare(c2, c1), -1)
        strictEqual(ordCard.compare(c3, c1), 1)
    })
    test('functional card equals', () => {
        strictEqual(ordCard.equals(c1, c1), true)
        strictEqual(ordCard.equals(c1, c2), false)
        strictEqual(ordCard.equals(c1, c4), false)
    })
    test('functional rank equals', () => {
        strictEqual(ordRank.equals(c1.rank, c1.rank), true)
        strictEqual(ordRank.equals(c1.rank, c2.rank), false)
        strictEqual(ordRank.equals(c1.rank, c4.rank), true)
    })
    test('trump card comparison', () => {
        strictEqual(cardCompare(c1, c2, "hearts"), 1)  // trump v non-trump
        strictEqual(cardCompare(c2, c1, "hearts"), -1)  // non-trump v trump
        strictEqual(cardCompare(c1, c3, "hearts"), -1)  // trump v trump
        strictEqual(cardCompare(c1, c1, "hearts"), 0)  // trump v trump
        strictEqual(cardCompare(c1, c3), -1) // no trump set
    })
})