import { create } from 'zustand';
import axios from 'axios';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({
    coins: [],
    trending: '',

    query: '',


    setQuery: (e: React.FormEvent<HTMLFormElement>) => {
        set({ query: e.target.value })
    homeStore.getState().searchCoins()

},

    searchCoins: debounce(async () => {
        const {query, trending} = homeStore.getState()
        if (query.length > 2) {
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        const coins  = res.data.coins.map(coin=>{
            return {
                name: coin.name,
                image: coin.large,
                id: coin.id,
                priceBtc: coin.price_btc,

            }


        })

        set({coins})

    } else {
        set({coins:trending})

    }


    }, 500),


    fetchCoins: async () =>{
       const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')
       console.log(res)

       const coins = res.data.coins.slice(0,5).map(coin =>{
        return {
            id: coin.item.id,
            name: coin.item.name,
            symbol: coin.item.symbol,
            image: coin.item.large,
            priceBtc: coin.item.price_btc,
        }


       } )

       set({coins, trending:coins})

    }

}))

export default homeStore;