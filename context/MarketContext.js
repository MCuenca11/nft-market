import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const MarketContext = createContext()

export const MarketProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [assets, setAssets] = useState([])

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        useMoralisuser,
        isWeb3Enabled,
    } = useMoralis()

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: assetsDataIsLoading,
      } = useMoralisQuery('assets')


    useEffect(() => {
        ;(async() => {
            if(isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()
    }, [isAuthenticated, user, username])

    useEffect(() => {
        ;(async() => {
            if(isWeb3Enabled) {
                await getAssets()
            }
        })()
    }, [isWeb3Enabled, assetsData, assetsDataIsLoading])

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

    const getAssets = async () => {
        try {
          await enableWeb3()
          // const query = new Moralis.Query('assets')
          // const results = await query.find()
    
          setAssets(assetsData)
        } catch (error) {
          console.log(error)
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
            assets,
        }}
        >
            {children}
        </MarketContext.Provider>
    )
}