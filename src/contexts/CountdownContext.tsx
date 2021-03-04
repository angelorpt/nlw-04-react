import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

let countdownTimeout: NodeJS.Timeout;

// Interfaces
//-------------
interface CountdownContextData {
  minutes: Number,
  seconds: Number,
  hasFinished: Boolean,
  isActive: Boolean,
  startCountdown: () => void,
  resetCountdown: () => void, 
}

interface CountdownProviderProps {
  children: ReactNode
}


export const CountdownContext = createContext({} as CountdownContextData)

// Provider
//---------------
export function CountdownProvider({ children }: CountdownProviderProps) {

  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(3 * 2)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60) // arredonda para baixo
  const seconds = time % 60; // resto da divisão

  function startCountdown() {
    setHasFinished(false)
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(25 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
    }}>
      { children }
    </CountdownContext.Provider>
  )
}