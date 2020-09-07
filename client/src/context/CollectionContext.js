import React,{createContext,useState} from 'react'

export const collectionContext = createContext();


const CollectionContextProvider = (props) => { 
   
    return(
     <collectionContext.Provider>
         {props.children}
     </collectionContext.Provider>
    )
} 

export default CollectionContextProvider;
