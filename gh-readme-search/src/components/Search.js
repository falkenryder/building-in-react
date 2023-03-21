import React from "react"

export default function Search() {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState([])

    // React.useEffect(() => {
    //     async function getMemes() {
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = await res.json()
    //         setAllMemes(data.data.memes)
    //     }
    //     getMemes()
    // }, [])

    function search() {
      fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then(res => res.json())
        .then(data => setResults(data.items))
      console.log(results)
    }

    return (
        <main>
            <div className="form">
              <h1>Github Readme Search</h1>
              <p>Get inspired by popular readmes and ideas!</p>
                <input
                  className="searchbar"
                  placeholder="Search for repositories"
                  onChange={event => setQuery(event.target.value)}
                />
                <button
                  className="searchbtn"
                  onClick={search}
                >
                    Search
                </button>
            </div>
            {
              results.map((result) => (
                <div className="card" key={result.id}>
                  <h3>{result.full_name}</h3>
                  <p>{result.description}</p>
                  <p>{result.language}</p>
                  <p><small>Updated {new Date(result.updated_at).toDateString()}</small></p>
                </div>
              ))
            }
        </main>
    )
}
