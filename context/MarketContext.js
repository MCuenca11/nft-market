import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { MarketAbi, MarketCoinAddress } from '../lib/constants'
import { ethers } from 'ethers'

export const MarketContext = createContext()

export const MarketProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [nickname, setNickname] = useState('')
    const [assets, setAssets] = useState([])
    const [currentAccount, setCurrentAccount] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const [amountDue, setAmountDue] = useState('')
    const [etherscanLink, setEtherscanLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [balance, setBalance] = useState('')

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

    const getBalance = async () => {
        try {
            if (!isAuthenticated || !currentAccount) return
                const options = {
                contractAddress: MarketCoinAddress,
                // from open zeppelin library
                functionName: 'balanceOf',
                abi: MarketAbi,
                params: {
                account: currentAccount,
                },
            }
            if (isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)
                console.log(response.toString())
                setBalance(response.toString())
            }
        } catch (error) {
          console.log(error)
        }
    }  

    useEffect(() => {
        ;(async() => {
            if(isAuthenticated) {
                await getBalanace()
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
                const account = await user?.get('ethAddress')
                setCurrentAccount(account)
            }
        })()
    }, [isAuthenticated, user, username, currentAccount, getBalance])

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

    const buyTokens = async () => {
        // wait for user to connect their wallet
        if (!isAuthenticated) {
          await connectWallet()
        }
    
        const amount = ethers.BigNumber.from(tokenAmount)
        const price = ethers.BigNumber.from('100000000000000')
        const calcPrice = amount.mul(price)
    
        console.log(MarketCoinAddress)
    
        let options = {
          contractAddress: MarketCoinAddress,
          functionName: 'mint',
          abi: MarketAbi,
          msgValue: calcPrice,
          params: {
            amount,
          },
        }
        const transaction = await Moralis.executeFunction(options)
        // the 4 provides more reliability
        const receipt = await transaction.wait(4)
        setIsLoading(false)
        console.log(receipt)
        setEtherscanLink(
          `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        )
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

    // global variables  
    return (
        <MarketContext.Provider
        value = {{
            formattedAccount,
            isAuthenticated,
            buyTokens,
            getBalance,
            balance,
            setTokenAmount,
            tokenAmount,
            amountDue,
            setAmountDue,
            isLoading,
            setIsLoading,
            setEtherscanLink,
            etherscanLink,
            buyAsset,
            currentAccount,
            nickname,
            setNickname,
            username,
            setUsername,
            handleSetUsername,
            assets,
            recentTransactions,
            ownedItems,
        }}
        >
            {children}
        </MarketContext.Provider>
    )
}