import React, { useContext, useState } from "react";
import { collectionContext } from "../../context/CollectionContext";

export const Collections = () => {
  const [name, setName] = useState("");
  const context = useContext(collectionContext);
  // console.log(("contextcontext", context));

  function addColl() {
    context.addColection(name);
    setName("");
  }
  return (
    <div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={addColl}> add collection</button>
      </div>
      <div>
        {context.collection.map((coll,i) => {
          return (
            <div key={i}>
              <h2>{coll.name}</h2>
              <div>
                {coll.books.map((book,j) => (
                   <div key={j}>book</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
