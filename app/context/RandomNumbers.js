'use client'
import { useContext, createContext, } from 'react'

const RandomNumberContext = createContext()
//Beacuse we are using this function in more than one component, it is better to keep it in context file so we can use it any where
export const RandomContextProvider = ({ children }) => {

    //this function to Randomly select two users
    function getRandomNumbers(arr, num) {
        const randomNumbers = [];

        // Generate unique random indexes
        const indexes = new Set();
        while (indexes.size < num) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            indexes.add(randomIndex);
        }

        // Retrieve users based on the random indexes
        for (const index of indexes) {
            randomNumbers.push(arr[index]);
        }

        return randomNumbers;
    }

    return (
        // pass all the functions as props so we can use them in our app components
        <RandomNumberContext.Provider value={{ getRandomNumbers }}>
            {children}
        </RandomNumberContext.Provider>
    )
}

export const GetRandomNumbers = () => {
    return useContext(RandomNumberContext)
}