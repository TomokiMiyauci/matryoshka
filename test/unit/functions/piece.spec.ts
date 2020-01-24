import { isExistsPiece, getTopPiece, isPlayerPiece } from '~/functions/piece'
import { Piece } from '~/types/game-record.d.ts'

const piece: Piece = { id: 0, strength: 0, owner: 'PLAYER1' }

describe('isExistPiece', () => {
  it('should return false if it gives as below', () => {
    const pieces: Piece[] = []

    expect(isExistsPiece(pieces)).toBeFalsy()
  })

  it('should return true if it gives as below', () => {
    const pieces: Piece[] = [piece]

    expect(isExistsPiece(pieces)).toBeTruthy()
  })
})

describe('getTopPiece', () => {
  it('should return last piece object in pieces array', () => {
    const pieces: Piece[] = [{ id: 2, strength: 2, owner: 'PLAYER2' }, piece]

    expect(getTopPiece(pieces)).toEqual(piece)
  })

  it('should return last piece object in pieces array', () => {
    const piece2: Piece = { id: 2, strength: 2, owner: 'PLAYER2' }
    const pieces: Piece[] = [piece, piece2]

    expect(getTopPiece(pieces)).not.toEqual(piece)
  })
})

describe('isPlayerPiece', () => {
  it('should return true if it gives as below', () => {
    expect(isPlayerPiece(piece, 'PLAYER1')).toBeTruthy()
  })

  it('should return false if it gives as below', () => {
    expect(isPlayerPiece(piece, 'PLAYER2')).toBeFalsy()
  })
})
