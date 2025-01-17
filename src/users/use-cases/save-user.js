import { User } from '../models/user';
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { localhostUserToModel } from '../mappers/localhost-user.mapper';

export const saveUser = async(userLike) => {

    const user = new User( userLike );

    if(!user.firstName || !user.lastName){
        throw 'First and Last Name required'
    }

    const userToSave = userModelToLocalhost( user );
    let userUpdated;

    userUpdated = (user.id) ? await updateUser(userToSave) : await createUser(userToSave);

    return localhostUserToModel(userUpdated);
}

const createUser = async ( user ) => {

    const url  = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch( url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newUser = await res.json();

    return newUser;
}

const updateUser = async ( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`;
    const res = await fetch( url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const updatedUser = await res.json();

    return updatedUser;
}