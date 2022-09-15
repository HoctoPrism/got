import axios from "lib/axios";
import {useEffect, useState} from "react";
import Button from "@/components/Button";
import Label from "@/components/Label";
import Input from "@/components/Input";
import {useRouter} from "next/router";

const Create = () => {

    const router = useRouter();
    const [family, setFamily] = useState([]);

    const obj = {name: family};

    const url = async (e) => {
        e.preventDefault()
        await axios.post('/api/families', obj).then((res) => {
            if (res.data.status === 'success') {
                router.push('/families');
            }
        });
    }

    return(
        <div className="flex justify-center align-center">
            <form onSubmit={url} className="flex flex-col justify-center align-center w-1/3 m-5">
                <h1 className="font-bold my-5 text-2xl">Ajouter une famille</h1>

                <div>
                    <Label htmlFor="family">Nom de la famille</Label>
                    <Input
                        id="family"
                        type="text"
                        value={family}
                        className="block mt-1 w-full"
                        onChange={event => setFamily(event.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-3">Valider</Button>
                </div>
            </form>
        </div>
    )
}
export default Create;
