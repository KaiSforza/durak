import type * as t from './types'
import * as d from './deck'
import * as c from './common'

/**
 * The trick class for durak
 * 
 * @param deck - the current deck class
 * @param attacker - the attackers hand
 * @param defender - the defenders hand
 */
export class Trick {
    deck: d.Deck
    tricks: t.Card[][]
    attacker: number
    defender: number
    trump: t.Suit

    constructor(deck: d.Deck, a: number, d: number) {
        this.deck = deck
        this.tricks = [[]] as t.Card[][]
        this.attacker = a
        this.defender = d
        this.trump = deck.trump
    }

    playableCards(): [number, t.Card[]] {
        if (this.tricks[this.tricks.length - 1].length === 1) {  // defender
            return [
                this.defender,
                this.deck.hands[this.defender].filter(
                    a => c.cardCompare(a, this.tricks[this.tricks.length - 1][0], this.deck.trump) === 1)
            ]
        } else if (this.tricks[this.tricks.length - 1].length === 2) {  // attacker after cards played
            let availableRanks: t.Rank[] = this.tricks.flat().map(a => a.rank)
            return [this.attacker, this.deck.hands[this.attacker].filter(a => availableRanks.includes(a.rank))]
        } else return [this.attacker, this.deck.hands[this.attacker]]  // start of a trick
    }

    playCard(player: number, card: t.Card) {
        let cardLoc: number = this.deck.hands[player].findIndex(a => c.cardCompare(a, card) === 0)
        let ca: t.Card = this.deck.hands[player].splice(cardLoc, 1)[0]
        this.tricks[this.tricks.length - 1].push(ca)
    }

    /*
    trick() {
        while (this.deck.hands[this.defender].length >= 1 && this.deck.hands[this.attacker].length >= 1) {
            let pc = this.playableCards()

        }
    }
    */
}