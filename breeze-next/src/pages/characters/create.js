import axios from "lib/axios";
import {useEffect, useState} from "react";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Input from "@/components/Input";
import {useRouter} from "next/router";

const Create = () => {

    const router = useRouter();
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [family, setFamily] = useState("");
    const [families, setFamilies] = useState([]);


    useEffect(() => {
        getFamilies()
    }, [])

    const url = async (e) => {
        e.preventDefault()
        const obj = {lastname: lastname, firstname: firstname, family: family};
        await axios.post('/api/characters', obj).then((res) => {
            if (res.data.status === 'success') {
                router.push('/characters');
            }
        });
    }

    const getFamilies = async () => {
        await axios.get('/api/families').then((res) => { setFamilies(res.data.data) });
    }

    return(
        <div className="flex justify-center align-center">
            <form onSubmit={url} className="flex flex-col justify-center align-center w-1/3 m-5">
                <h1 className="font-bold my-5 text-2xl">Ajouter une personnage</h1>

                <div>
                    <Label htmlFor="lastname">Nom du personnage</Label>
                    <Input
                        id="lastname"
                        type="text"
                        value={lastname}
                        className="block mt-1 w-full"
                        onChange={event => setLastname(event.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <div>
                    <Label htmlFor="firstname">Prénom du personnage</Label>
                    <Input
                        id="firstname"
                        type="text"
                        value={firstname}
                        className="block mt-1 w-full"
                        onChange={event => setFirstname(event.target.value)}
                        required
                        autoFocus
                    />
                </div>

                {families ? (
                    <div>
                        <Label htmlFor="family">Famille du personnage</Label>
                        <select
                            id="family"
                            value={family}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={event => setFamily(event.target.value) }
                            required
                        >
                            {families.map(({id, name}) => {
                                return <option key={id} value={id}>{name}</option>
                            })}
                        </select>
                    </div>
                ) : null }

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-3">Valider</Button>
                </div>
            </form>
        </div>
    )
}
export default Create;
