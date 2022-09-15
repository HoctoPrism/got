import axios from "lib/axios";
import {useEffect, useState} from "react";

export default function Characters(){

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        url();
    }, [])

    const url = async () => await axios.get('/api/characters').then((res) => {
        setCharacters(res.data.data)
    });

    return(
        <div>
            <table className="table-auto m-5">
              <thead>
                <tr>
                  <th>Familles</th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex justify-between align-center">
                    {characters.map(({id, lastname, firstname, family}) => {
                        return (
                            <div key={id+lastname} className="mx-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{lastname} {firstname}</h5>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">famille : {family.name}</h5>
                                </div>
                            </div>
                        )
                    })}
                </tr>
              </tbody>
            </table>
            <a href="characters/create" className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Créer</a>
        </div>
    )
}
