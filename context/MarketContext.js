import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const MarketContext = createContext()

export const MarketProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        useMoralisuser,
        isWeb3Enabled,
    } = useMoralis()

    // useEffect(async () => {
    //     console.log(assetsData)
    //     await enableWeb3()
    //     await getAssets()
    //     await getOwnedAssets()
    //   }, [userData, assetsData, assetsDataIsLoading, userDataIsLoading])

    useEffect(() => {
        ;(async() => {
            if(isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()
    }, [isAuthenticated, user, username])

    const handleSetUsername = () => {
        if(user) {
            if(nickname) {
                // save nickname on Moralis
                user.set('nickname', nickname)
                user.save()
                // clear input field
                setNickname('')
            } else {
                console.log("Can't set empty nickname")
            }
        } else {
            console.log('No user')
        }
    }

    return (
        <MarketContext.Provider
        value = {{
            isAuthenticated,
            nickname,
            setNickname,
            username,
            handleSetUsername,
        }}
        >
            {children}
        </MarketContext.Provider>
    )
}