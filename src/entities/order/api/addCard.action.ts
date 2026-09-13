"use server"

export const addCard = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {success: true}
}
