import type { Card } from '../src/types'
import * as trick from '../src/trick'

let h: Card[][] = [
    [
        {rank: 2, suit: 'clubs'},
        {rank: 5, suit: 'spades'},
        {rank: 4, suit: 'diamonds'},
    ],
    [
        {rank: 5, suit: 'clubs'},
        {rank: 3, suit: 'spades'},
        {rank: 8, suit: 'diamonds'},
    ]
]

let h_def: Card[] = [
        {rank: 5, suit: 'clubs'},
        {rank: 8, suit: 'diamonds'},
    ]
let h_atk: Card[] = [
        {rank: 5, suit: 'spades'},
    ]

test('test empty trick', () => {
    let t = new trick.Trick(h, 0, 1, 'diamonds')
    expect(t.getAvailableCards(t.attacker)).toStrictEqual(h[0])
})

test('defender', () => {
    let t = new trick.Trick(h, 0, 1, 'diamonds')
    t.tricks = [[h[0][0]]]
    expect(t.getAvailableCards(t.defender)).toStrictEqual(h_def)
})

test('attack with cards on table', () => {
    let t = new trick.Trick(h, 0, 1, 'diamonds')
    t.tricks = [[h[0].splice(0, 1)[0], h[1].splice(0, 1)[0]]]
    expect(t.getAvailableCards(t.attacker)).toStrictEqual(h_atk)
})