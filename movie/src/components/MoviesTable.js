import React from 'react';

function MoviesTable(props) {
  let {moviesArr,setMoviesArr,isLoaded, currPage,moviesToShowPerPage} = props;

  let filteredArr = [];
  let startIdx = (currPage-1)*moviesToShowPerPage;
  let endIdx = startIdx + moviesToShowPerPage
  if(moviesArr){
    filteredArr = moviesArr
    console.log(filteredArr);
    //search wala logic
    if(props.searchText !== ""){
      filteredArr = filteredArr.filter((movie)=>{
          let lowerCaseMovie = movie.title.toLowerCase();
          let lowerCaseSearchText = props.searchText.toLowerCase();
          return lowerCaseMovie.includes(lowerCaseSearchText);
      })
  }
    //genre wala logic
    if(props.genre !== ""){
      filteredArr = filteredArr.filter((movie)=>{
        return movie.genre.name.trim() === props.genre.trim();
      })
    }
    //pagination
    // console.log(props.moviesCount);
    
    filteredArr = filteredArr.slice(startIdx,endIdx);
  }
  const deleteEntry = (movieId)=>{
    // console.log(movieId);
    let newContent = filteredArr.filter((movie)=>{
      return movie._id !== movieId;
    })
    setMoviesArr(newContent);
  }
  return (
  <div>
    {isLoaded === true? <p>loading.....</p>:
      <table className='table-auto'>
        <thead className='bg-gray-700 border'>
          <tr>
            <th className="px-2 text-slate-100 text-center">#</th>
            <th className="px-2 text-slate-100 text-center">Title</th>
            <th className="px-2 text-slate-100 text-center">Genre</th>
            <th className="px-2 text-slate-100 text-center">Stock</th>
            <th className="px-2 text-slate-100 text-center">Rate</th>
            <th ></th>
          </tr>
        </thead>
        <tbody>
          {filteredArr.map(
            function(movie,idx){
              return <tr key={movie._id}>
                <td className='text-center px-2 border-l border-r border-b'>{idx+startIdx+1}</td>
                <td className='text-center px-2 border-r border-b'>{movie.title}</td>
                <td className='text-center px-4 border-r border-b'>{movie.genre.name}</td>
                <td className='text-center px-2 border-r border-b'>{movie.numberInStock}</td> 
                <td className='text-center px-2 border-r border-b'>{movie.dailyRentalRate}</td>
                <td className='text-center px-2 border-r border-b'>
                  <button className="bg-red-500 hover:bg-red-700 text-white 
        font-bold py-1 px-3 mx-1 my-1 rounded" onClick={()=>{
          deleteEntry(movie._id);
        }}>Delete</button>
                </td>
              </tr>
            })}
        </tbody>
      </table>
    }
    </div>
  )
}

export default MoviesTable