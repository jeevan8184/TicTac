// @ts-nocheck

"use client"
import React, { useEffect, useState } from 'react'

const Main = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winpatterns=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const checkWinner=(board)=>{
        for(let i=0;i<winpatterns.length;i++) {
            const [a,b,c]=winpatterns[i];
            if(board[a] && board[a]===board[b] && board[a]===board[c]) {
                return board[a];
            }
        }
        if(!board.includes(null)) return "T"
        return null;
    }

    useEffect(()=> {
        if(!xIsNext) {
            setBoard((prevBoard)=> {
                const newBoard=[...prevBoard];

                for(let i=0;i<9;i++) {
                    if(!newBoard[i]) {
                        newBoard[i]='O';
                        if(checkWinner(newBoard)) {
                            setXIsNext(true);
                            return newBoard;
                        }
                        newBoard[i]=null;
                    }
                }
                for(let i=0;i<9;i++) {
                    if(!newBoard[i]) {
                        newBoard[i]='X';
                        if(checkWinner(newBoard)) {
                            newBoard[i]='O';
                            setXIsNext(true);
                            return newBoard;
                        }
                        newBoard[i]=null;
                    }
                }

                const boardVals=board.reduce((acc,value,idx)=> {
                    if(!value) {
                        acc.push(idx);
                    }
                    return acc;
                },[]);

                if(!newBoard[4]) {
                    newBoard[4]='O';
                    setXIsNext(true);
                    return newBoard;
                }

                if(boardVals.length>0) {
                    const idx=Math.floor(Math.random()*boardVals.length);
                    newBoard[boardVals[idx]]='O';
                    setXIsNext(true);
                    return newBoard;
                }
                return newBoard;
            })
        }
    },[xIsNext,board]);
    
    const handleClick=(val)=>{

        if(winner || board[val]) return;

        setBoard((prev)=> {
            const newBoard=[...prev];
            newBoard[val]='X';
            return newBoard;
        })
        setTimeout(()=> {
            setXIsNext(false);
        },500)
    }

    const winner=checkWinner(board);

    const display=winner ? winner==="T" ? "Tie Match" : ` winner ${winner}`:xIsNext? 'Next is X':'Next is O';

    console.log("board",board);

  return (
    <div className=' flex items-center justify-center h-screen flex-col gap-6'>
       <div className=''>
        <h1 className=' text-2xl font-semibold'>Tic Tac Toe</h1>
        <p className=''>play with computer</p>
       </div>
        <div className=' grid grid-cols-3 h-60 w-60 gap-2'>
            {Array.from({length:9},(_,i)=> (
                <button className=' border rounded-xl h-20 w-20 text-xl font-semibold' onClick={()=> handleClick(i)}>{board[i]}</button>
            ))}
            
        </div>
        <div className=' mt-3 text-xl'>{display}</div>
        <button 
            className=' px-8 py-3 rounded-xl bg-red-500 text-white' 
            onClick={()=> {
                setBoard(Array(9).fill(null));
            }}>
                Reset
        </button>
    </div>
  )
}

export default Main