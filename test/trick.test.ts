import { strictEqual, deepStrictEqual } from "assert"
import type * as t from '../src/types'
import * as tr from '../src/trick'
import {Deck} from '../src/deck'

suite('tricks', function() {
    let deck = new Deck(2)
    let defaultDeck: t.Card[] = [
        {rank: 6, suit: 'spades'},
        {rank: 7, suit: 'spades'},
        {rank: 8, suit: 'spades'},
        {rank: 6, suit: 'hearts'},
        {rank: 7, suit: 'hearts'},
        {rank: 8, suit: 'hearts'},
        {rank: 6, suit: 'diamonds'},
        {rank: 7, suit: 'diamonds'},
        {rank: 8, suit: 'diamonds'},
    ]
    let defaultTrump: t.Card = {rank: 14, suit: "spades"}
    let defaultT: t.Suit = defaultTrump.suit
    let defaultHands: t.Card[][] = [
        [
            {rank: 9, suit: 'diamonds'},
            {rank: 10, suit: 'spades'},
            {rank: 11, suit: 'spades'},
            {rank: 10, suit: 'clubs'}
        ], [
            {rank: 9, suit: 'spades'},
            {rank: 10, suit: 'diamonds'},
            {rank: 12, suit: 'spades'},
            {rank: 12, suit: 'hearts'},
        ]
    ]
    setup('setup deck again', function() {
        deck.deck = defaultDeck
        deck.hands = defaultHands
        deck.trumpCard = defaultTrump
        deck.trump = defaultT
    })
    test('no cards played', function() {
        let trick = new tr.Trick(deck, 0, 1)
        deepStrictEqual(trick.playableCards()[1], defaultHands[0]) 
    })
    test('one card played', function() {
        let trick = new tr.Trick(deck, 0, 1)
        trick.tricks = [[defaultHands[0][0]]] // 9 of diamonds
        let playable = [
            {rank: 9, suit: 'spades'},
            {rank: 10, suit: 'diamonds'},
            {rank: 12, suit: 'spades'},
        ]
        let p = trick.playableCards()[1]
        deepStrictEqual(p, playable)
    })
    test('attack part 2 electric boogaloo', function() {
        let trick = new tr.Trick(deck, 0, 1)
        let played: t.Card[] = [{rank: 9, suit: 'diamonds'}, {rank: 10, suit: 'diamonds'}]
        let defaultHands: t.Card[][] = [
            [
                {rank: 10, suit: 'spades'},
                {rank: 11, suit: 'spades'},
                {rank: 10, suit: 'clubs'}
            ], [
                {rank: 9, suit: 'spades'},
                {rank: 12, suit: 'spades'},
                {rank: 12, suit: 'hearts'},
            ]
        ]
        deck.hands = defaultHands
        trick.tricks = [played] // 9 of diamonds
        let playable = [
            {rank: 10, suit: 'spades'},
            {rank: 10, suit: 'clubs'}
        ]
        let p = trick.playableCards()[1]
        deepStrictEqual(p, playable)
    })
    test('play card', function() {
        let trick = new tr.Trick(deck, 0, 1)
        let p: t.Card = {rank: 10, suit: 'spades'}
        trick.playCard(trick.attacker, p)
        deepStrictEqual(trick.tricks[0][0], p)
    })

})