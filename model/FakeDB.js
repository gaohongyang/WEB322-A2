const fakeDB = {
    products : [
        {
            id: 1,
            category: "movie",
            title: 'Wonder Woman',
            rentPrice: 9.99,
            sellPrice: 12.99,
            description: "Fast forward to the 1980s as Wonder Woman's next big screen adventure finds her facing a wide array of foes including: Max Lord and The Cheetah.",
            featured: true
        },
        {
            id: 2,
            category: "movie",
            title: 'The Croods: A New Age',
            rentPrice: 8.99,
            sellPrice: 13.99,
            description: "In search of a new home, the Croods encounter the more sophisticated Betterman family. A new threat forces the two families to set aside their differences to avoid extinction.",
            featured: true
        },
        {
            id: 3,
            category: "movie",
            title: 'Tenet',
            rentPrice: 7.99,
            sellPrice: 14.99,
            description: "Armed with only one word--Tenet-- and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
            featured: true
        },
        {
            id: 4,
            category: "tv",
            title: 'Wanda Vision',
            rentPrice: 8.99,
            sellPrice: 15.99,
            description: "Living idealized suburban lives, super-powered beings Wanda and Vision begin to suspect that everything is not as it seems.",
            featured: true
        },
        {
            id: 5,
            category: "movie",
            title: 'Warcraft',
            rentPrice: 3.99,
            sellPrice: 15.99,
            description: "A few human survivors must team up with a group of dissenting Orcs to stop an Orc horde from invading their planet through a magic portal.",
            featured: true
        },
        {
            id: 6,
            category: "movie",
            title: 'Love And Monsters',
            rentPrice: 9.99,
            sellPrice: 15.99,
            description: "In a monster-infested world, Joel (Dylan O'Brien) learns his high school sweetheart (Jessica Henwick) is just 80 miles away. Now, Joel must discover his inner hero, facing unknown dangers on the impossible journey to be with the girl of his dreams.",
            featured: false
        },
        {
            id: 7,
            category: "movie",
            title: 'Spider Man',
            rentPrice: 10.99,
            sellPrice: 15.99,
            description: "Peter Parker's relaxing European vacation takes an unexpected turn when Nick Fury suddenly shows up in his hotel room. Parker soon finds himself donning the Spider-Man suit to help Fury stop the evil Mysterio from wreaking havoc across the continent.",
            featured: true
        },
        {
            id: 8,
            category: "tv",
            title: 'Black Lightning: Season 4',
            rentPrice: 9.99,
            sellPrice: 13.99,
            description: "In the fourth and final season, the super-powered Pierce family - Jefferson Pierce aka Black Lightning, and his daughters Anissa, aka Thunder, and Jennifer, whose body generates electricity - face the challenges of the declined urban community that is Freeland, including the war between Tobias Whale and the menacing gang The 100.",
            featured: true
        },
        {
            id: 9,
            category: "tv",
            title: 'Equalizer: Season 1',
            rentPrice: 8.99,
            sellPrice: 10.99,
            description: "THE EQUALIZER is a reimagining of the classic series starring Queen Latifah as Robyn McCall, an enigmatic woman with a mysterious background who uses her extensive skills as a former CIA operative to help those with nowhere else to turn.",
            featured: true
        },
        {
            id: 10,
            category: "tv",
            title: 'Resident Alien: Season 1',
            rentPrice: 10.99,
            sellPrice: 15.99,
            description: "An alien on a mission to Earth crash lands and finds himself in the remote mountain town of Patience, Colorado.",
            featured: true
        },
        {
            id: 11,
            category: "tv",
            title: 'Snow Piercer: Season 2',
            rentPrice: 9.99,
            sellPrice: 12.99,
            description: "In season two, an entirely new power struggle emerges, causing a dangerous rift as people are divided between their loyalty to Layton and to Mr. Wilford, who has a new train, new technology and a game plan that keeps everyone guessing. While Layton battles Wilford for the soul of Snowpiercer, Melanie leads the charge on a shocking new discovery that could change the fate of humanity.",
            featured: true
        },
        {
            id: 12,
            category: "tv",
            title: 'The Expanse: Season 4',
            rentPrice: 7.99,
            sellPrice: 9.99,
            description: "With the Ring Gates now open to thousands of new planets, a blood-soaked gold rush begins, igniting new conflicts between Earth, Mars, and the Belt.",
            featured: false
        }
    ],

    deals: [
        {
            title: 'sale1',
            id: 1,
            description: '3.99 Rentals'
        },
        {
            title: 'sale2',
            id: 2,
            description: '2.99 Rentals'
        },
        {
            title: 'sale3',
            id: 3,
            description: 'Deals Store'
        },
        {
            title: 'sale4',
            id: 4,
            description: 'Rental Store'
        },
        {
            title: 'sale5',
            id: 5,
            description: 'Monthly Deals'
        },
        {
            title: 'sale6',
            id: 6,
            description: '4K Deals'
        },
    ],

    getAllDeals(){
        return this.deals;
    },

    getAllProducts(){
        return this.products;
    },

    getAProduct(id){
        return this.products.find((product)=> product.id == id)
    },

    getFeaturedMovies(){
        return this.products.filter((product) => product.category === 'movie' && product.featured === true)
    },
    
    getFeaturedTV(){
        return this.products.filter((product) => product.category === 'tv' && product.featured === true)
    },
}

module.exports=fakeDB;