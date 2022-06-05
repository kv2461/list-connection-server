import React, { useState, useEffect } from 'react'

const ListDetails = ({post,list}) => {

    const genre = post?.genre;
    const subgenre = post?.subgenre;
    console.log(subgenre)
    console.log(genre)
    console.log(list)

// maybe need a new child component for this where it has a clean array.map feature for the list

//switch case with dependencies on genre and subgenre, storing it into new props that will be passed to child component
//with the same name e.g. 
// if genre is music then const listItemHeader = trackName;    map array -> <Child component listItemHeader = {listItemHeader}  />

    // useEffect(() => {

    //     const genrify = () => {
    //       if (genre === 'musicTracks') {
    //       setName(listItem?.trackName);
    //       } else if (genre === 'musicAlbums') {
    //       setName(listItem?.albumName);
    //       }
    //     }
    
    //     genrify();
    
    //   },[listItem?.albumName,genre,listItem?.trackName])


  return (
    <div>ListDetails</div>
  )
}

export default ListDetails