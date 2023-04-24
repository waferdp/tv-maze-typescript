const axios = require('axios');

export function mockSearchWithResult() : void {

    axios.get.mockResolvedValue({
        data: [
            {
                "score": 0.70303756,
                "show": {
                    "id": 210,
                    "name": "Doctor Who",
                    "language": "English",
                    "genres": [
                        "Drama",
                        "Adventure",
                        "Science-Fiction"
                    ],
                    "runtime": null,
                    "officialSite": "http://www.bbc.co.uk/programmes/b006q2x0",
                    "rating": {
                        "average": 8.3
                    },
                    "network": {
                        "name": "BBC One",
                    },
                    "externals": {
                        "tvrage": 3332,
                        "thetvdb": 78804,
                        "imdb": "tt0436992"
                    },
                    "image": {
                        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/375/938172.jpg",
                        "original": "https://static.tvmaze.com/uploads/images/original_untouched/375/938172.jpg"
                    },
                    "summary": "<p>Adventures across time and space with the time travelling alien and companions.</p>"
                }
            },
            
        ]
    });
}

export function mockSearchNoGenres() : void {
    axios.get.mockResolvedValue({
        data: [
            {
                "score": 0.66297936,
                "show": {
                    "id": 24765,
                    "url": "https://www.tvmaze.com/shows/24765/saknad",
                    "name": "Saknad",
                    "type": "Scripted",
                    "language": "Swedish",
                    "genres": [
                        "Drama",
                        "Crime",
                        "Mystery"
                    ],
                    "status": "Ended",
                    "runtime": 45,
                    "averageRuntime": 45,
                    "premiered": "2017-01-01",
                    "ended": "2017-01-19",
                    "officialSite": "https://www.cmore.se/serie/78344-saknad/sasong-1/episod-1/3700872-saknad",
                    "schedule": {
                        "time": "",
                        "days": [
                            "Thursday"
                        ]
                    },
                    "rating": {
                        "average": null
                    },
                    "weight": 43,
                    "network": null,
                    "webChannel": {
                        "id": 170,
                        "name": "C More",
                        "country": {
                            "name": "Sweden",
                            "code": "SE",
                            "timezone": "Europe/Stockholm"
                        },
                        "officialSite": null
                    },
                    "dvdCountry": null,
                    "externals": {
                        "tvrage": null,
                        "thetvdb": 322006,
                        "imdb": "tt6367940"
                    },
                    "image": {
                        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/117/294168.jpg",
                        "original": "https://static.tvmaze.com/uploads/images/original_untouched/117/294168.jpg"
                    },
                    "summary": "<p>Police superintendent Maja Silver goes back to her old hometown in the Swedish Bible belt to see her daughter, when a terrible discovery paralyzes the small community.</p>",
                    "updated": 1655015596,
                    "_links": {
                        "self": {
                            "href": "https://api.tvmaze.com/shows/24765"
                        },
                        "previousepisode": {
                            "href": "https://api.tvmaze.com/episodes/1053004"
                        }
                    }
                }
            },
            {
                "score": 0.65866876,
                "show": {
                    "id": 21759,
                    "url": "https://www.tvmaze.com/shows/21759/missing-millions",
                    "name": "Missing Millions",
                    "type": "Documentary",
                    "language": "English",
                    "genres": [],
                    "status": "Ended",
                    "runtime": 60,
                    "averageRuntime": 60,
                    "premiered": "2011-09-13",
                    "ended": "2011-10-04",
                    "officialSite": null,
                    "schedule": {
                        "time": "20:00",
                        "days": [
                            "Tuesday"
                        ]
                    },
                    "rating": {
                        "average": null
                    },
                    "weight": 40,
                    "network": {
                        "id": 35,
                        "name": "ITV1",
                        "country": {
                            "name": "United Kingdom",
                            "code": "GB",
                            "timezone": "Europe/London"
                        },
                        "officialSite": "https://www.itv.com/"
                    },
                    "webChannel": null,
                    "dvdCountry": null,
                    "externals": {
                        "tvrage": null,
                        "thetvdb": 251932,
                        "imdb": "tt2121551"
                    },
                    "image": {
                        "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/78/197089.jpg",
                        "original": "https://static.tvmaze.com/uploads/images/original_untouched/78/197089.jpg"
                    },
                    "summary": "<p><b>Missing Millions</b> is presented by Melanie Sykes and Paul Heiney. The presenters with the help of genealogist Nick Barratt and the Missing Millions team attempt to locate unwitting recipients with their forgotten fortunes.</p>",
                    "updated": 1590014051,
                    "_links": {
                        "self": {
                            "href": "https://api.tvmaze.com/shows/21759"
                        },
                        "previousepisode": {
                            "href": "https://api.tvmaze.com/episodes/951166"
                        }
                    }
                }
            }
        ]
    })
}

export function mockSearchNoResult() : void {
    axios.get.mockResolvedValue({
        data: []
    });
}




