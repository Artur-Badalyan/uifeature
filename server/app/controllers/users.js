
import { isSchemeValidSync } from '#app/helpers/validate.js';
import { users as usersValidator } from '#app/schemes/index.js';
import { couldNotGet } from '#app/helpers/errorResponseBodyBuilder.js';
import models from '#app/models/index.js';
import CONSTANTS from '#app/constants/Constants.js';
const { users: Users, tasks: Tasks } = models;

export async function getUsers(req, res) {
    console.log('\n\n\n 111111111111111');
    return Users.findAndCountAll()
        .then(({ count, rows }) => {
            return res.json({ count, data: rows });
        })
        .catch(() => {
            return response
            .status(500)
            .json(
                couldNotGet(CONSTANTS.TypeNames.USERS.toLowerCase())
            );
        });
}

export async function getUser(req, res) {
    console.log('\n\n\n 111111111111111 ',req.params);

    return Users.findPk(req.params.id)
        .then((user) => {
            return res.json(user);
        })
        .catch(() => {
            return res.status(500).json({ message: 'Error in get user' });
        });
}

export async function updateFirebaseToken(req, res) {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const payload = { ...req.body };
        const { isValid, data: userData } = isSchemeValidSync(usersValidator.updateFirebaseToken, payload);
        if (!isValid) {
            return res.status(400).json({ message: 'validation failed' });
        }
        const updatedUser = await Users.update(userData, { where: { id: user.id } } );
        return res.json({ user: updatedUser, message: 'User firebase token has been updated.' });
    } catch(err) {
        return res.status(500).json({ message: 'Error to update firebase token.' });
    }
}