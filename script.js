document.addEventListener('DOMContentLoaded', () => {
    const allTokens = document.querySelectorAll('.token')
    const allDropTokenButtons = document.querySelectorAll('.drop-token-here')
    const playerTurnDisplay = document.querySelector('.player-turn')
    const playAgainButton = document.querySelector('.play-again')
    let column = []
    let player = 1

    playerTurnDisplay.innerHTML = 'Player ' + player + ' Turn'
    playerTurnDisplay.style.color = 'red'
    
    for(let i = 0; i < allDropTokenButtons.length; i++) {//loop through the 7 drop-token buttons and get the clicked one
        allDropTokenButtons[i].addEventListener('click', () => {
            if(allDropTokenButtons[i].classList.contains('clickable')) {
                updateChosenColumn(i)
                if (!isColumnFull()) {
                    dropTokenAtChosenColumn()
                    changePlayer()
                    checkHorizontalWin()
                    checkVerticalWin()
                    checkDiagonalWin()
                    checkDraw()                    
                } else {
                    playerTurnDisplay.innerHTML = "Can't go there..."
                    allDropTokenButtons.forEach(button => {
                        button.classList.remove('clickable')
                        button.classList.remove('animated-blue')
                        button.classList.remove('animated-red')
                    })
                    setTimeout( () => {
                        if(player == 1) {
                            playerTurnDisplay.innerHTML = "Player 1 Turn"
                            allDropTokenButtons.forEach(button => {
                                button.classList.add('clickable')
                                button.classList.add('animated-red')                            
                            })
                        } else if(player == 2) {
                            playerTurnDisplay.innerHTML = "Player 2 Turn"
                            allDropTokenButtons.forEach(button => {
                                button.classList.add('clickable')
                                button.classList.add('animated-blue')                            
                            })
                        }                        
                    }, 1500)
                }
            }            
        })
    }

    const updateChosenColumn = (i) => {
        column = []
        column.push(i)
        column.push(i + 7)
        column.push(i + 14)
        column.push(i + 21)
        column.push(i + 28)
        column.push(i + 35)
    }

    const isColumnFull = () => {
        for(let i = 5; i >= 0; i--) {
            //verify if column is already full
            if(!allTokens[column[0]].classList.contains('empty')) {
                return true
            } else {
                return false
            }
        }
    }

    const dropTokenAtChosenColumn = () => {
        //verify which is the first empty space from bottom to top
        for(let i = 5; i >= 0; i--) {
            //but only verify from the same column of the clicked drop-token button
            if(allTokens[column[i]].classList.contains('empty')) {
                allTokens[column[i]].classList.remove('empty')
                //verify who is playing and fill the space with respective player color
                if (playerTurnDisplay.innerHTML == 'Player 1 Turn') {
                    allTokens[column[i]].classList.add('player-one-token')
                } else {
                    allTokens[column[i]].classList.add('player-two-token')
                }                         
                break
            }
        }
    }

    const checkDraw = () => {
        const allTokensArray = Array.from(allTokens)
        //if there is no more empty spaces
        if (allTokensArray.every(token => !token.classList.contains('empty'))) {
            playerTurnDisplay.innerHTML = "It's a Draw!!!"
            playerTurnDisplay.style.color = 'black'
            allDropTokenButtons.forEach(button => {
                button.classList.remove('animated-red')
                button.classList.remove('animated-blue')
            })
            playAgain()
        }
    }

    const checkHorizontalWin = () => {
        for(let i = 0; i < allTokens.length; i++) {
            //check for first horizontal possibility of win
            if(
                allTokens[i].classList.contains(0) || allTokens[i].classList.contains(1) || allTokens[i].classList.contains(2) || allTokens[i].classList.contains(3) ||
                allTokens[i].classList.contains(7) || allTokens[i].classList.contains(8) || allTokens[i].classList.contains(9) || allTokens[i].classList.contains(10) ||
                allTokens[i].classList.contains(14) || allTokens[i].classList.contains(15) || allTokens[i].classList.contains(16) || allTokens[i].classList.contains(17) ||
                allTokens[i].classList.contains(21) || allTokens[i].classList.contains(22) || allTokens[i].classList.contains(23) || allTokens[i].classList.contains(24) ||
                allTokens[i].classList.contains(28) || allTokens[i].classList.contains(29) || allTokens[i].classList.contains(30) || allTokens[i].classList.contains(31) ||
                allTokens[i].classList.contains(35) || allTokens[i].classList.contains(36) || allTokens[i].classList.contains(37) || allTokens[i].classList.contains(38)
            ) {
                if(
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i + 1].classList.contains('player-one-token') &&
                    allTokens[i + 2].classList.contains('player-one-token') &&
                    allTokens[i + 3].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i), (i + 1), (i + 2), (i + 3))
                } else if(
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i + 1].classList.contains('player-two-token') &&
                    allTokens[i + 2].classList.contains('player-two-token') &&
                    allTokens[i + 3].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i), (i + 1), (i + 2), (i + 3))
                }
            }
            //check for second horizontal possibility of win
            if(
                allTokens[i].classList.contains(1) || allTokens[i].classList.contains(2) || allTokens[i].classList.contains(3) || allTokens[i].classList.contains(4) ||
                allTokens[i].classList.contains(8) || allTokens[i].classList.contains(9) || allTokens[i].classList.contains(10) || allTokens[i].classList.contains(11) ||
                allTokens[i].classList.contains(15) || allTokens[i].classList.contains(16) || allTokens[i].classList.contains(17) || allTokens[i].classList.contains(18) ||
                allTokens[i].classList.contains(22) || allTokens[i].classList.contains(23) || allTokens[i].classList.contains(24) || allTokens[i].classList.contains(25) ||
                allTokens[i].classList.contains(29) || allTokens[i].classList.contains(30) || allTokens[i].classList.contains(31) || allTokens[i].classList.contains(32) ||
                allTokens[i].classList.contains(36) || allTokens[i].classList.contains(37) || allTokens[i].classList.contains(38) || allTokens[i].classList.contains(39)
            ) {
                if(
                    allTokens[i - 1].classList.contains('player-one-token') &&
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i + 1].classList.contains('player-one-token') &&
                    allTokens[i + 2].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i - 1), (i), (i + 1), (i + 2))
                } else if(
                    allTokens[i - 1].classList.contains('player-two-token') &&
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i + 1].classList.contains('player-two-token') &&
                    allTokens[i + 2].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i - 1), (i), (i + 1), (i + 2))
                }
            }
            //check for third horizontal possibility of win
            if(
                allTokens[i].classList.contains(2) || allTokens[i].classList.contains(3) || allTokens[i].classList.contains(4) || allTokens[i].classList.contains(5) ||
                allTokens[i].classList.contains(9) || allTokens[i].classList.contains(10) || allTokens[i].classList.contains(11) || allTokens[i].classList.contains(12) ||
                allTokens[i].classList.contains(16) || allTokens[i].classList.contains(17) || allTokens[i].classList.contains(18) || allTokens[i].classList.contains(19) ||
                allTokens[i].classList.contains(23) || allTokens[i].classList.contains(24) || allTokens[i].classList.contains(25) || allTokens[i].classList.contains(26) ||
                allTokens[i].classList.contains(30) || allTokens[i].classList.contains(31) || allTokens[i].classList.contains(32) || allTokens[i].classList.contains(33) ||
                allTokens[i].classList.contains(37) || allTokens[i].classList.contains(38) || allTokens[i].classList.contains(39) || allTokens[i].classList.contains(40)
            ) {
                if(
                    allTokens[i - 2].classList.contains('player-one-token') &&
                    allTokens[i - 1].classList.contains('player-one-token') &&
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i + 1].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i - 2), (i - 1), (i), (i + 1))
                } else if(
                    allTokens[i - 2].classList.contains('player-two-token') &&
                    allTokens[i - 1].classList.contains('player-two-token') &&
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i + 1].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i - 2), (i - 1), (i), (i + 1))
                }
            }
            //check for fourth and last horizontal possibility of win
            if(
                allTokens[i].classList.contains(3) || allTokens[i].classList.contains(4) || allTokens[i].classList.contains(5) || allTokens[i].classList.contains(6) ||
                allTokens[i].classList.contains(10) || allTokens[i].classList.contains(11) || allTokens[i].classList.contains(12) || allTokens[i].classList.contains(13) ||
                allTokens[i].classList.contains(17) || allTokens[i].classList.contains(18) || allTokens[i].classList.contains(19) || allTokens[i].classList.contains(20) ||
                allTokens[i].classList.contains(24) || allTokens[i].classList.contains(25) || allTokens[i].classList.contains(26) || allTokens[i].classList.contains(27) ||
                allTokens[i].classList.contains(31) || allTokens[i].classList.contains(32) || allTokens[i].classList.contains(33) || allTokens[i].classList.contains(34) ||
                allTokens[i].classList.contains(38) || allTokens[i].classList.contains(39) || allTokens[i].classList.contains(40) || allTokens[i].classList.contains(41)
            ) {
                if(
                    allTokens[i - 3].classList.contains('player-one-token') &&
                    allTokens[i - 2].classList.contains('player-one-token') &&
                    allTokens[i - 1].classList.contains('player-one-token') &&
                    allTokens[i].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i - 3), (i - 2), (i - 1), (i))
                } else if(
                    allTokens[i - 3].classList.contains('player-two-token') &&
                    allTokens[i - 2].classList.contains('player-two-token') &&
                    allTokens[i - 1].classList.contains('player-two-token') &&
                    allTokens[i].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i - 3), (i - 2), (i - 1), (i))
                }
            }
        }
    }

    const checkVerticalWin = () => {
        for(let i = 0; i < allTokens.length; i++) {
            //check for first vertical possibility of win
            if(
                allTokens[i].classList.contains(0) || allTokens[i].classList.contains(7) || allTokens[i].classList.contains(14) ||
                allTokens[i].classList.contains(1) || allTokens[i].classList.contains(8) || allTokens[i].classList.contains(15) ||
                allTokens[i].classList.contains(2) || allTokens[i].classList.contains(9) || allTokens[i].classList.contains(16) ||
                allTokens[i].classList.contains(3) || allTokens[i].classList.contains(10) || allTokens[i].classList.contains(17) ||
                allTokens[i].classList.contains(4) || allTokens[i].classList.contains(11) || allTokens[i].classList.contains(18) ||
                allTokens[i].classList.contains(5) || allTokens[i].classList.contains(12) || allTokens[i].classList.contains(19) ||
                allTokens[i].classList.contains(6) || allTokens[i].classList.contains(13) || allTokens[i].classList.contains(20)
            ) {
                if(
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i + 7].classList.contains('player-one-token') &&
                    allTokens[i + 14].classList.contains('player-one-token') &&
                    allTokens[i + 21].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i), (i + 7), (i + 14), (i + 21))
                } else if(
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i + 7].classList.contains('player-two-token') &&
                    allTokens[i + 14].classList.contains('player-two-token') &&
                    allTokens[i + 21].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i), (i + 7), (i + 14), (i + 21))
                }
            }
            //check for second vertical possibility of win
            if(
                allTokens[i].classList.contains(7) || allTokens[i].classList.contains(14) || allTokens[i].classList.contains(21) ||
                allTokens[i].classList.contains(8) || allTokens[i].classList.contains(15) || allTokens[i].classList.contains(22) ||
                allTokens[i].classList.contains(9) || allTokens[i].classList.contains(16) || allTokens[i].classList.contains(23) ||
                allTokens[i].classList.contains(10) || allTokens[i].classList.contains(17) || allTokens[i].classList.contains(24) ||
                allTokens[i].classList.contains(11) || allTokens[i].classList.contains(18) || allTokens[i].classList.contains(25) ||
                allTokens[i].classList.contains(12) || allTokens[i].classList.contains(19) || allTokens[i].classList.contains(26) ||
                allTokens[i].classList.contains(13) || allTokens[i].classList.contains(20) || allTokens[i].classList.contains(27)
            ) {
                if(
                    allTokens[i - 7].classList.contains('player-one-token') &&
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i + 7].classList.contains('player-one-token') &&
                    allTokens[i + 14].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i - 7), (i), (i + 7), (i + 14))
                } else if(
                    allTokens[i - 7].classList.contains('player-two-token') &&
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i + 7].classList.contains('player-two-token') &&
                    allTokens[i + 14].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i - 7), (i), (i + 7), (i + 14))
                }
            }
            //check for third vertical possibility of win
            if(
                allTokens[i].classList.contains(14) || allTokens[i].classList.contains(21) || allTokens[i].classList.contains(28) ||
                allTokens[i].classList.contains(15) || allTokens[i].classList.contains(22) || allTokens[i].classList.contains(29) ||
                allTokens[i].classList.contains(16) || allTokens[i].classList.contains(23) || allTokens[i].classList.contains(30) ||
                allTokens[i].classList.contains(17) || allTokens[i].classList.contains(24) || allTokens[i].classList.contains(31) ||
                allTokens[i].classList.contains(18) || allTokens[i].classList.contains(25) || allTokens[i].classList.contains(32) ||
                allTokens[i].classList.contains(19) || allTokens[i].classList.contains(26) || allTokens[i].classList.contains(33) ||
                allTokens[i].classList.contains(20) || allTokens[i].classList.contains(27) || allTokens[i].classList.contains(34)
            ) {
                if(
                    allTokens[i - 14].classList.contains('player-one-token') &&
                    allTokens[i - 7].classList.contains('player-one-token') &&
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i + 7].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i - 14), (i - 7), (i), (i + 7))
                } else if(
                    allTokens[i - 14].classList.contains('player-two-token') &&
                    allTokens[i - 7].classList.contains('player-two-token') &&
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i + 7].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i - 14), (i - 7), (i), (i + 7))
                }
            }
            //check for fourth and last vertical possibility of win
            if(
                allTokens[i].classList.contains(21) || allTokens[i].classList.contains(28) || allTokens[i].classList.contains(35) ||
                allTokens[i].classList.contains(22) || allTokens[i].classList.contains(29) || allTokens[i].classList.contains(36) ||
                allTokens[i].classList.contains(23) || allTokens[i].classList.contains(30) || allTokens[i].classList.contains(37) ||
                allTokens[i].classList.contains(24) || allTokens[i].classList.contains(31) || allTokens[i].classList.contains(38) ||
                allTokens[i].classList.contains(25) || allTokens[i].classList.contains(32) || allTokens[i].classList.contains(39) ||
                allTokens[i].classList.contains(26) || allTokens[i].classList.contains(33) || allTokens[i].classList.contains(40) ||
                allTokens[i].classList.contains(27) || allTokens[i].classList.contains(34) || allTokens[i].classList.contains(41)
            ) {
                if(
                    allTokens[i - 21].classList.contains('player-one-token') &&
                    allTokens[i - 14].classList.contains('player-one-token') &&
                    allTokens[i - 7].classList.contains('player-one-token') &&
                    allTokens[i].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i - 21), (i - 14), (i - 7), (i))
                } else if(
                    allTokens[i - 21].classList.contains('player-two-token') &&
                    allTokens[i - 14].classList.contains('player-two-token') &&
                    allTokens[i - 7].classList.contains('player-two-token') &&
                    allTokens[i].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i - 21), (i - 14), (i - 7), (i))
                }
            }
        }
    }

    const checkDiagonalWin = () => {
        for(let i = 0; i < allTokens.length; i++) {
            //check for first diagonal possibility of win
            if(
                allTokens[i].classList.contains(21) || allTokens[i].classList.contains(22) || allTokens[i].classList.contains(23) || allTokens[i].classList.contains(24) ||
                allTokens[i].classList.contains(28) || allTokens[i].classList.contains(29) || allTokens[i].classList.contains(30) || allTokens[i].classList.contains(31) ||
                allTokens[i].classList.contains(35) || allTokens[i].classList.contains(36) || allTokens[i].classList.contains(37) || allTokens[i].classList.contains(38)
            ) {
                if(
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i - 6].classList.contains('player-one-token') &&
                    allTokens[i - 12].classList.contains('player-one-token') &&
                    allTokens[i - 18].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i), (i - 6), (i - 12), (i - 18))
                } else if(
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i - 6].classList.contains('player-two-token') &&
                    allTokens[i - 12].classList.contains('player-two-token') &&
                    allTokens[i - 18].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i), (i - 6), (i - 12), (i - 18))
                }
            }
            //check for second and last diagonal possibility of win
            if(
                allTokens[i].classList.contains(24) || allTokens[i].classList.contains(25) || allTokens[i].classList.contains(26) || allTokens[i].classList.contains(27) ||
                allTokens[i].classList.contains(31) || allTokens[i].classList.contains(32) || allTokens[i].classList.contains(33) || allTokens[i].classList.contains(34) ||
                allTokens[i].classList.contains(38) || allTokens[i].classList.contains(39) || allTokens[i].classList.contains(40) || allTokens[i].classList.contains(41)
            ) {
                if(
                    allTokens[i].classList.contains('player-one-token') &&
                    allTokens[i - 8].classList.contains('player-one-token') &&
                    allTokens[i - 16].classList.contains('player-one-token') &&
                    allTokens[i - 24].classList.contains('player-one-token')
                ) {
                    declareWinner('Player 1 won!', (i), (i - 8), (i - 16), (i - 24))
                } else if(
                    allTokens[i].classList.contains('player-two-token') &&
                    allTokens[i - 8].classList.contains('player-two-token') &&
                    allTokens[i - 16].classList.contains('player-two-token') &&
                    allTokens[i - 24].classList.contains('player-two-token')
                ) {
                    declareWinner('Player 2 won!', (i), (i - 8), (i - 16), (i - 24))
                }
            }
        }
    }

    const declareWinner = (winner, token1, token2, token3, token4) => {
        playerTurnDisplay.innerHTML = winner
        if (winner == 'Player 1 won!') {
            playerTurnDisplay.style.color = 'red'
            allTokens[token1].style.backgroundColor = "red"
            allTokens[token2].style.backgroundColor = "red"
            allTokens[token3].style.backgroundColor = "red"
            allTokens[token4].style.backgroundColor = "red"                       
        } else {
            playerTurnDisplay.style.color = 'blue'
            allTokens[token1].style.backgroundColor = "blue"
            allTokens[token2].style.backgroundColor = "blue"
            allTokens[token3].style.backgroundColor = "blue"
            allTokens[token4].style.backgroundColor = "blue" 
        }
        allDropTokenButtons.forEach(button => {
            button.classList.remove('animated-red')
            button.classList.remove('animated-blue')
        })
        playAgain()
    }

    const changePlayer = () => {
        if (playerTurnDisplay.innerHTML == 'Player 2 Turn') {
            player = 1
            playerTurnDisplay.innerHTML = 'Player 1 Turn'
            playerTurnDisplay.style.color = 'red'
            allDropTokenButtons.forEach(button => {
                button.classList.remove('animated-blue')
                button.classList.add('animated-red')
            })
            
        } else {
            player = 2
            playerTurnDisplay.innerHTML = 'Player 2 Turn'
            playerTurnDisplay.style.color = 'blue'
            allDropTokenButtons.forEach(button => {
                button.classList.remove('animated-red')
                button.classList.add('animated-blue')
            })
        }        
    }

    const playAgain = () => {
        allDropTokenButtons.forEach(button => {
            button.classList.remove('clickable')
        })
        playAgainButton.style.display = 'block'
        playAgainButton.addEventListener('click', resetInitialParameters)
    }

    const resetInitialParameters = () => {        
        playAgainButton.style.display = 'none'
        playerTurnDisplay.innerHTML = 'Player 1 Turn'
        playerTurnDisplay.style.color = 'red'
        allDropTokenButtons.forEach(button => {
            button.classList.add('clickable')
            button.classList.remove('animated-blue')
            button.classList.add('animated-red')            
        })
        allTokens.forEach(token => {
            token.classList.remove('player-one-token')
            token.classList.remove('player-two-token')
            token.classList.add('empty')
            token.style.backgroundColor = null
        })

    }

})