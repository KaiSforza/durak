import type * as t from './types'
import { cardCompare, cardCompareTrump } from './common'
/*
 * Setting up tricks:
 *  to card tricks
 *  first challenge can be anything
 *  response must beat challenge
 *  any challenge can be multiple cards of same rank
 *  next challenge must have rank on board
 */

export class Trick {
    /**
     * A trick.
     * A trick is a set of challenges and responses between a pair of players.
     * It can be ended any time.
     */
    hands: t.Card[][]
    attacker: number
    defender: number
    trump: t.Suit

    playable: t.Card[][] = [[]] as t.Card[][]
    tricks: t.Card[][] = [[]] as t.Card[][]

    draw: t.Card[] = []
    discard: t.Card[] = []

    constructor(hands: t.Card[][], attacker: number, defender: number, trump: t.Suit) {
        this.hands = hands
        this.attacker = attacker
        this.defender = defender
        this.trump = trump
    }

    getAvailableCards(player: number): t.Card[] {
        /**
         * returns all playable cards in the current hand.
         */
        if (this.tricks[0].length == 0) {  // no cards played yet
            return this.hands[player]
        } else if (this.tricks[this.tricks.length - 1].length == 1) {  // defenders turn
            let currentAttack: t.Card = this.tricks[this.tricks.length - 1][0]
            return this.hands[player].filter(
                    a => cardCompareTrump(a, currentAttack, this.trump) > 0
                )
        } else {
            // get list of cards played
            let availableRanks: t.Rank[] = this.tricks.flat().map(a => a.rank)
            return this.hands[player].filter(
                a => availableRanks.indexOf(a.rank) > -1
            )
        }
    }
}