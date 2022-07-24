import Role from "../models/Role"

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();//devuelve la cantidad de roles que hay creado
        //si hay mas de 0 roles, ya hay roles creados, si es 0, procedemos a crear el rol

        if (count > 0) { return } //si ya hay roles, se sale de la ejecucion

        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()

        ])

        console.log(values);
    } catch (error) {
        console.error(error)
    }
}