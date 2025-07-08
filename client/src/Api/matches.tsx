import { BASE_URL } from "@/env";

export const getMatches=async(userId:string)=>{
    try{

        const response=await fetch(`${BASE_URL}/match/${userId}`, {
            method: 'GET'
        })
        if (!response.ok) {
            throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Error fetching matches:', error);
        throw error; // Re-throw the error for further handling if needed
    }

}