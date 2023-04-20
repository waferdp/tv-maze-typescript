const axios = require('axios');

function mockSearch() : void {

    jest.mock('axios');
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

export default mockSearch;



