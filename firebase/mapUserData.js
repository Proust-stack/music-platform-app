export const mapUserData = (user) => {
    const { uid, email, Aa} = user
    return JSON.stringify({
        id: uid,
        email,
        token: Aa,
    })
}