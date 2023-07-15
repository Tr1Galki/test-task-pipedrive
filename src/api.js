

async function getUser(accessToken) {
    const url = "https://api.pipedrive.com/v1/users/me"

    const requestOptions = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }

    const request = await fetch(url, requestOptions)

    const userInfo = await request.json()

    return userInfo
}


async function getDeals(accessToken) {
    const url = "https://api.pipedrive.com/v1/deals?status=open"

    const requestOptions = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }

    const request = await fetch(url, requestOptions)

    const deals = await request.json();

    return deals
}


async function updateDeal(id, outcome, accessToken) {
    const url = `https://api.pipedrive.com/v1/deals/${id}`

    const requestOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
        // json: {
        //     status: outcome,
        // },
    }

    await fetch(url, requestOptions)
}


module.exports = {
    getUser,
    getDeals,
    updateDeal,
};